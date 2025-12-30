const { google } = require("googleapis");

function createGoogleFormsClient(credentials) {
  let auth;

  if (credentials.type === "service_account") {
    auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        "https://www.googleapis.com/auth/forms.responses.readonly",
        "https://www.googleapis.com/auth/forms.body.readonly",
        "https://www.googleapis.com/auth/drive.readonly",
      ],
    });
  } else if (credentials.access_token) {
    const oauth2_client = new google.auth.OAuth2();
    oauth2_client.setCredentials({
      access_token: credentials.access_token,
      refresh_token: credentials.refresh_token,
    });
    auth = oauth2_client;
  } else {
    throw new Error("Invalid credentials provided");
  }

  return google.forms({ version: "v1", auth });
}

function createGoogleDriveClient(credentials) {
  let auth;

  if (credentials.type === "service_account") {
    auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
  } else if (credentials.access_token) {
    const oauth2_client = new google.auth.OAuth2();
    oauth2_client.setCredentials({
      access_token: credentials.access_token,
      refresh_token: credentials.refresh_token,
    });
    auth = oauth2_client;
  } else {
    throw new Error("Invalid credentials provided");
  }

  return google.drive({ version: "v3", auth });
}

async function fnGetFormsList({ credentials, page_size = 10, page_token = null }) {
  try {
    const drive = createGoogleDriveClient(credentials);

    const response = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.form' and trashed=false",
      fields: "nextPageToken, files(id, name, createdTime, modifiedTime, webViewLink, owners)",
      pageSize: page_size,
      pageToken: page_token,
      orderBy: "modifiedTime desc",
    });

    const forms = response.data.files || [];
    const service_account_email = credentials.client_email || "unknown";

    console.log(`✓ Forms query successful. Found ${forms.length} forms accessible to ${service_account_email}`);

    if (forms.length === 0) {
      console.warn("⚠ No forms found. Make sure Google Forms are shared with:", service_account_email);
      console.warn("  1. Open your Google Form");
      console.warn("  2. Click 'Send' button");
      console.warn("  3. Add this email as an editor:", service_account_email);
    }

    return {
      forms,
      next_page_token: response.data.nextPageToken || null,
      service_account_email,
    };
  } catch (error) {
    console.error("Error fetching Google Forms list:", error.message);

    if (error.message.includes("has not been used") || error.message.includes("is disabled")) {
      throw new Error("Google Drive API is not enabled. Please enable it in Google Cloud Console.");
    }

    throw new Error(`Failed to fetch Google Forms: ${error.message}`);
  }
}

async function fnGetFormStructure({ credentials, form_id }) {
  try {
    const forms = createGoogleFormsClient(credentials);

    const response = await forms.forms.get({
      formId: form_id,
    });

    const form = response.data;
    const fields = [];

    if (form.items) {
      form.items.forEach((item, index) => {
        const question = item.questionItem?.question;
        if (question) {
          const field = {
            field_id: item.itemId,
            field_order: index,
            label: item.title || `Question ${index + 1}`,
            description: item.description || null,
            is_required: question.required || false,
          };

          if (question.textQuestion) {
            field.field_type = question.textQuestion.paragraph ? "textarea" : "text";
          } else if (question.choiceQuestion) {
            const choice_type = question.choiceQuestion.type;
            if (choice_type === "RADIO") {
              field.field_type = "radio";
            } else if (choice_type === "CHECKBOX") {
              field.field_type = "checkbox";
            } else if (choice_type === "DROP_DOWN") {
              field.field_type = "select";
            }
            field.options = question.choiceQuestion.options?.map((opt, idx) => ({
              option_id: opt.value,
              label: opt.value,
              value: opt.value,
              option_order: idx,
            })) || [];
          } else if (question.scaleQuestion) {
            field.field_type = "score";
            field.scale_min = question.scaleQuestion.low;
            field.scale_max = question.scaleQuestion.high;
            field.scale_min_label = question.scaleQuestion.lowLabel;
            field.scale_max_label = question.scaleQuestion.highLabel;
          } else if (question.dateQuestion) {
            field.field_type = "date";
          } else if (question.timeQuestion) {
            field.field_type = "time";
          }

          fields.push(field);
        }
      });
    }

    return {
      form_id: form.formId,
      title: form.info?.title || "Untitled Form",
      description: form.info?.description || null,
      document_title: form.info?.documentTitle || null,
      fields,
    };
  } catch (error) {
    console.error("Error fetching Google Form structure:", error);
    throw new Error(`Failed to fetch form structure: ${error.message}`);
  }
}

async function fnGetFormResponses({ credentials, form_id, page_size = 100, page_token = null, filters = {} }) {
  try {
    const forms = createGoogleFormsClient(credentials);
    const form_structure = await fnGetFormStructure({ credentials, form_id });

    const request = {
      formId: form_id,
      pageSize: page_size,
      filter: filters.filter || undefined,
    };
    if (page_token) {
      request.pageToken = page_token;
    }

    const response = await forms.forms.responses.list(request);

    const responses = response.data.responses || [];
    const formatted_responses = [];

    for (const resp of responses) {
      const formatted = {
        response_id: resp.responseId,
        created_at: resp.createTime,
        updated_at: resp.lastSubmittedTime,
        respondent_email: resp.respondentEmail || null,
        answers: [],
      };

      if (resp.answers) {
        for (const [question_id, answer] of Object.entries(resp.answers)) {
          const field = form_structure.fields.find((f) => f.field_id === question_id);

          const formatted_answer = {
            field_id: question_id,
            label: field?.label || question_id,
            field_type: field?.field_type || "unknown",
            value: null,
          };

          if (answer.textAnswers) {
            formatted_answer.value = answer.textAnswers.answers?.map((a) => a.value).join(", ") || null;
          } else if (answer.fileUploadAnswers) {
            formatted_answer.value = answer.fileUploadAnswers.answers?.map((a) => a.fileId) || [];
            formatted_answer.file_urls = answer.fileUploadAnswers.answers?.map((a) => a.fileUrl) || [];
          }

          formatted.answers.push(formatted_answer);
        }
      }

      formatted_responses.push(formatted);
    }

    return {
      form_id,
      form_title: form_structure.title,
      responses: formatted_responses,
      next_page_token: response.data.nextPageToken || null,
      total_count: formatted_responses.length,
    };
  } catch (error) {
    console.error("Error fetching Google Form responses:", error);
    throw new Error(`Failed to fetch form responses: ${error.message}`);
  }
}

async function fnGetFormResponsesWithColumns({ credentials, form_id, visible_columns = [], calculate_columns = [] }) {
  try {
    const result = await fnGetFormResponses({ credentials, form_id });

    if (visible_columns.length > 0) {
      result.responses = result.responses.map((response) => ({
        ...response,
        answers: response.answers.filter((answer) => visible_columns.includes(answer.field_id)),
      }));
    }

    if (calculate_columns.length > 0) {
      result.responses = result.responses.map((response) => {
        const calculated = {};

        calculate_columns.forEach((calc) => {
          if (calc.type === "sum") {
            calculated[calc.name] = calc.fields.reduce((sum, field_id) => {
              const answer = response.answers.find((a) => a.field_id === field_id);
              const value = parseFloat(answer?.value) || 0;
              return sum + value;
            }, 0);
          } else if (calc.type === "concat") {
            calculated[calc.name] = calc.fields
              .map((field_id) => {
                const answer = response.answers.find((a) => a.field_id === field_id);
                return answer?.value || "";
              })
              .join(calc.separator || " ");
          } else if (calc.type === "count") {
            calculated[calc.name] = calc.fields.filter((field_id) => {
              const answer = response.answers.find((a) => a.field_id === field_id);
              return answer?.value !== null && answer?.value !== "";
            }).length;
          } else if (calc.type === "average") {
            const values = calc.fields
              .map((field_id) => {
                const answer = response.answers.find((a) => a.field_id === field_id);
                return parseFloat(answer?.value) || 0;
              })
              .filter((v) => !isNaN(v));
            calculated[calc.name] = values.length > 0 ? values.reduce((sum, v) => sum + v, 0) / values.length : 0;
          }
        });

        return {
          ...response,
          calculated_fields: calculated,
        };
      });
    }

    return result;
  } catch (error) {
    console.error("Error processing responses with columns:", error);
    throw new Error(`Failed to process responses: ${error.message}`);
  }
}

module.exports = {
  fnGetFormsList,
  fnGetFormStructure,
  fnGetFormResponses,
  fnGetFormResponsesWithColumns,
};
