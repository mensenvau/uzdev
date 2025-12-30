"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Calendar, Clock, CheckSquare, List, Star, AlignLeft } from "lucide-react";

interface FormField {
  field_id: string;
  field_order: number;
  label: string;
  description?: string;
  is_required: boolean;
  field_type: string;
  options?: Array<{
    option_id: string;
    label: string;
    value: string;
    option_order: number;
  }>;
  scale_min?: number;
  scale_max?: number;
  scale_min_label?: string;
  scale_max_label?: string;
}

interface FormStructure {
  form_id: string;
  title: string;
  description?: string;
  document_title?: string;
  fields: FormField[];
}

interface FormViewerProps {
  form: FormStructure;
  loading?: boolean;
  error?: string | null;
  showSubmit?: boolean;
  onSubmit?: (answers: any[]) => void;
}

const getFieldIcon = (field_type: string) => {
  switch (field_type) {
    case "text":
      return <AlignLeft className="h-4 w-4" />;
    case "textarea":
      return <FileText className="h-4 w-4" />;
    case "radio":
    case "select":
      return <List className="h-4 w-4" />;
    case "checkbox":
      return <CheckSquare className="h-4 w-4" />;
    case "date":
      return <Calendar className="h-4 w-4" />;
    case "time":
      return <Clock className="h-4 w-4" />;
    case "score":
      return <Star className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

export function FormViewer({ form, loading, error, showSubmit = false, onSubmit }: FormViewerProps) {
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleAnswerChange = (field_id: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [field_id]: value }));
  };

  const handleSubmit = () => {
    const formattedAnswers = Object.entries(answers).map(([field_id, value]) => ({
      field_id,
      value,
    }));
    onSubmit?.(formattedAnswers);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!form) {
    return (
      <Alert>
        <AlertDescription>No form data available</AlertDescription>
      </Alert>
    );
  }

  const renderField = (field: FormField) => {
    const fieldId = `field-${field.field_id}`;

    switch (field.field_type) {
      case "text":
        return (
          <Input
            id={fieldId}
            placeholder={field.description || "Enter your answer"}
            onChange={(e) => handleAnswerChange(field.field_id, e.target.value)}
            required={field.is_required}
          />
        );

      case "textarea":
        return (
          <Textarea
            id={fieldId}
            placeholder={field.description || "Enter your answer"}
            rows={4}
            onChange={(e) => handleAnswerChange(field.field_id, e.target.value)}
            required={field.is_required}
          />
        );

      case "radio":
        return (
          <RadioGroup onValueChange={(value) => handleAnswerChange(field.field_id, value)}>
            {field.options?.map((option) => (
              <div key={option.option_id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${fieldId}-${option.option_id}`} />
                <Label htmlFor={`${fieldId}-${option.option_id}`} className="font-normal cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option.option_id} className="flex items-center space-x-2">
                <Checkbox
                  id={`${fieldId}-${option.option_id}`}
                  onCheckedChange={(checked) => {
                    const currentValues = answers[field.field_id] || [];
                    const newValues = checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v: string) => v !== option.value);
                    handleAnswerChange(field.field_id, newValues);
                  }}
                />
                <Label htmlFor={`${fieldId}-${option.option_id}`} className="font-normal cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        );

      case "select":
        return (
          <Select onValueChange={(value) => handleAnswerChange(field.field_id, value)}>
            <SelectTrigger id={fieldId}>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.option_id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "date":
        return (
          <Input
            id={fieldId}
            type="date"
            onChange={(e) => handleAnswerChange(field.field_id, e.target.value)}
            required={field.is_required}
          />
        );

      case "time":
        return (
          <Input
            id={fieldId}
            type="time"
            onChange={(e) => handleAnswerChange(field.field_id, e.target.value)}
            required={field.is_required}
          />
        );

      case "score":
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{field.scale_min_label || field.scale_min}</span>
              <span>{field.scale_max_label || field.scale_max}</span>
            </div>
            <RadioGroup
              onValueChange={(value) => handleAnswerChange(field.field_id, parseInt(value))}
              className="flex space-x-2"
            >
              {Array.from({ length: (field.scale_max || 5) - (field.scale_min || 1) + 1 }, (_, i) => {
                const value = (field.scale_min || 1) + i;
                return (
                  <div key={value} className="flex flex-col items-center">
                    <RadioGroupItem value={value.toString()} id={`${fieldId}-${value}`} />
                    <Label htmlFor={`${fieldId}-${value}`} className="mt-1 text-xs">
                      {value}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        );

      default:
        return <Input id={fieldId} placeholder="Unsupported field type" disabled />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-2xl">{form.title}</CardTitle>
            {form.description && <CardDescription>{form.description}</CardDescription>}
          </div>
          <Badge variant="outline" className="ml-4">
            {form.fields.length} {form.fields.length === 1 ? "question" : "questions"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {form.fields.map((field, index) => (
          <div key={field.field_id} className="space-y-3 p-4 border rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary flex-shrink-0">
                {getFieldIcon(field.field_type)}
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor={`field-${field.field_id}`} className="text-base font-medium flex items-center gap-2">
                  <span>
                    {index + 1}. {field.label}
                  </span>
                  {field.is_required && <span className="text-destructive">*</span>}
                </Label>
                {field.description && (
                  <p className="text-sm text-muted-foreground">{field.description}</p>
                )}
                {renderField(field)}
              </div>
            </div>
          </div>
        ))}

        {showSubmit && onSubmit && (
          <div className="flex justify-end pt-4">
            <Button onClick={handleSubmit} size="lg">
              Submit Form
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
