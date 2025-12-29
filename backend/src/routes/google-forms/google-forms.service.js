const { google } = require("googleapis");

/**
 * Creates a Google Forms API client using service account or OAuth credentials
 * @param {Object} credentials - Google API credentials
 * @returns {Object} - Google Forms API client
 */
function createGoogleFormsClient(credentials) {
  let auth;

  if (credentials.type === "service_account") {
    // Service Account authentication
    auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        "https://www.googleapis.com/auth/forms.responses.readonly",
        "https://www.googleapis.com/auth/forms.body.readonly",
        "https://www.googleapis.com/auth/drive.readonly",
      ],
    });
  } else if (credentials.access_token) {
    // OAuth2 token authentication
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: credentials.access_token,
      refresh_token: credentials.refresh_token,
    });
    auth = oauth2Client;
  } else {
    throw new Error("Invalid credentials provided");
  }

  return google.forms({ version: "v1", auth });
}

/**
 * Creates Google Drive API client for listing forms
 */
function createGoogleDriveClient(credentials) {
  let auth;

  if (credentials.type === "service_account") {
    auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
  } else if (credentials.access_token) {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: credentials.access_token,
      refresh_token: credentials.refresh_token,
    });
    auth = oauth2Client;
  } else {
    throw new Error("Invalid credentials provided");
  }

  return google.drive({ version: "v3", auth });
}

/**
 * Get list of Google Forms from user's Drive
 */
async function fnGetGoogleFormsList({ credentials, page_size = 10, page_token = null }) {
  try {
    const drive = createGoogleDriveClient(credentials);

    const response = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.form' and trashed=false",
      fields: "nextPageToken, files(id, name, createdTime, modifiedTime, webViewLink, owners)",
      pageSize: page_size,
      pageToken: page_token,
      orderBy: "modifiedTime desc",
    });

    return {
      forms: response.data.files || [],
      next_page_token: response.data.nextPageToken || null,
    };
  } catch (error) {
    console.error("Error fetching Google Forms list:", error);
    throw new Error(`Failed to fetch Google Forms: ${error.message}`);
  }
}

/**
 * Get a specific Google Form structure
 */
async function fnGetGoogleFormStructure({ credentials, form_id }) {
  try {
    const forms = createGoogleFormsClient(credentials);

    const response = await forms.forms.get({
      formId: form_id,
    });

    const form = response.data;

    // Extract questions/fields
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

          // Determine field type
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

/**
 * Get responses from a Google Form
 */
async function fnGetGoogleFormResponses({ credentials, form_id, page_size = 100, page_token = null, filters = {} }) {
  try {
    const forms = createGoogleFormsClient(credentials);

    // Get form structure first to understand the fields
    const formStructure = await fnGetGoogleFormStructure({ credentials, form_id });

    // Get responses
    const response = await forms.forms.responses.list({
      formId: form_id,
      pageSize: page_size,
      pageToken: page_token,
      filter: filters.filter || undefined,
    });

    const responses = response.data.responses || [];
    const formatted_responses = [];

    // Format responses with field labels
    for (const resp of responses) {
      const formatted = {
        response_id: resp.responseId,
        created_at: resp.createTime,
        updated_at: resp.lastSubmittedTime,
        respondent_email: resp.respondentEmail || null,
        answers: [],
      };

      if (resp.answers) {
        for (const [questionId, answer] of Object.entries(resp.answers)) {
          const field = formStructure.fields.find((f) => f.field_id === questionId);

          const formatted_answer = {
            field_id: questionId,
            label: field?.label || questionId,
            field_type: field?.field_type || "unknown",
            value: null,
          };

          // Extract answer value based on type
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
      form_title: formStructure.title,
      responses: formatted_responses,
      next_page_token: response.data.nextPageToken || null,
      total_count: formatted_responses.length,
    };
  } catch (error) {
    console.error("Error fetching Google Form responses:", error);
    throw new Error(`Failed to fetch form responses: ${error.message}`);
  }
}

/**
 * Get responses with column visibility settings
 */
async function fnGetGoogleFormResponsesWithColumns({ credentials, form_id, visible_columns = [], calculate_columns = [] }) {
  try {
    const result = await fnGetGoogleFormResponses({ credentials, form_id });

    // Apply column visibility filter
    if (visible_columns.length > 0) {
      result.responses = result.responses.map((response) => ({
        ...response,
        answers: response.answers.filter((answer) => visible_columns.includes(answer.field_id)),
      }));
    }

    // Add calculated columns
    if (calculate_columns.length > 0) {
      result.responses = result.responses.map((response) => {
        const calculated = {};

        calculate_columns.forEach((calc) => {
          if (calc.type === "sum") {
            // Sum numeric values from specified fields
            calculated[calc.name] = calc.fields.reduce((sum, field_id) => {
              const answer = response.answers.find((a) => a.field_id === field_id);
              const value = parseFloat(answer?.value) || 0;
              return sum + value;
            }, 0);
          } else if (calc.type === "concat") {
            // Concatenate values
            calculated[calc.name] = calc.fields
              .map((field_id) => {
                const answer = response.answers.find((a) => a.field_id === field_id);
                return answer?.value || "";
              })
              .join(calc.separator || " ");
          } else if (calc.type === "count") {
            // Count non-empty answers
            calculated[calc.name] = calc.fields.filter((field_id) => {
              const answer = response.answers.find((a) => a.field_id === field_id);
              return answer?.value !== null && answer?.value !== "";
            }).length;
          } else if (calc.type === "average") {
            // Average numeric values
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
  fnGetGoogleFormsList,
  fnGetGoogleFormStructure,
  fnGetGoogleFormResponses,
  fnGetGoogleFormResponsesWithColumns,
};
