/**
 * useFormValidation — lightweight client-side form validation hook.
 * No external library. No `any`. Typed field definitions.
 */
"use client";

import { useState, useCallback } from "react";

// ─── Types ─────────────────────────────────────────────────────────

type FieldValue = string;
type ValidatorFn = (value: FieldValue, fields: Record<string, FieldValue>) => string | null;

interface FieldConfig {
  initialValue?: FieldValue;
  validators?: ValidatorFn[];
}

type FieldsConfig = Record<string, FieldConfig>;
type FieldValues = Record<string, FieldValue>;
type FieldErrors = Record<string, string | null>;
type TouchedFields = Record<string, boolean>;

interface UseFormValidationReturn {
  values: FieldValues;
  errors: FieldErrors;
  touched: TouchedFields;
  isValid: boolean;
  setValue: (field: string, value: FieldValue) => void;
  setTouched: (field: string) => void;
  validateAll: () => boolean;
  reset: () => void;
}

// ─── Built-in validators ───────────────────────────────────────────

export const validators = {
  required: (message = "This field is required"): ValidatorFn =>
    (value) => value.trim() === "" ? message : null,

  minLength: (min: number, message?: string): ValidatorFn =>
    (value) =>
      value.trim().length < min
        ? (message ?? `Must be at least ${min} characters`)
        : null,

  email: (message = "Enter a valid email address"): ValidatorFn =>
    (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? null : message,

  matches: (otherField: string, message = "Fields do not match"): ValidatorFn =>
    (value, fields) =>
      value === fields[otherField] ? null : message,
};

// ─── Hook ──────────────────────────────────────────────────────────

export function useFormValidation(
  config: FieldsConfig
): UseFormValidationReturn {
  const initialValues: FieldValues = Object.fromEntries(
    Object.entries(config).map(([key, cfg]) => [key, cfg.initialValue ?? ""])
  );

  const [values, setValues] = useState<FieldValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>(
    Object.fromEntries(Object.keys(config).map((k) => [k, null]))
  );
  const [touched, setTouchedState] = useState<TouchedFields>(
    Object.fromEntries(Object.keys(config).map((k) => [k, false]))
  );

  const validate = useCallback(
    (field: string, currentValues: FieldValues): string | null => {
      const fieldConfig = config[field];
      if (!fieldConfig?.validators) return null;
      for (const validator of fieldConfig.validators) {
        const error = validator(currentValues[field] ?? "", currentValues);
        if (error) return error;
      }
      return null;
    },
    [config]
  );

  const setValue = useCallback(
    (field: string, value: FieldValue) => {
      setValues((prev) => {
        const next = { ...prev, [field]: value };
        // Validate on change only if field has been touched
        setTouchedState((t) => {
          if (t[field]) {
            setErrors((e) => ({ ...e, [field]: validate(field, next) }));
          }
          return t;
        });
        return next;
      });
    },
    [validate]
  );

  const setTouched = useCallback(
    (field: string) => {
      setTouchedState((prev) => {
        if (prev[field]) return prev;
        const next = { ...prev, [field]: true };
        setValues((v) => {
          setErrors((e) => ({ ...e, [field]: validate(field, v) }));
          return v;
        });
        return next;
      });
    },
    [validate]
  );

  const validateAll = useCallback((): boolean => {
    const allTouched = Object.fromEntries(Object.keys(config).map((k) => [k, true]));
    setTouchedState(allTouched);
    const newErrors: FieldErrors = {};
    let valid = true;
    for (const field of Object.keys(config)) {
      const error = validate(field, values);
      newErrors[field] = error;
      if (error) valid = false;
    }
    setErrors(newErrors);
    return valid;
  }, [config, validate, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors(Object.fromEntries(Object.keys(config).map((k) => [k, null])));
    setTouchedState(Object.fromEntries(Object.keys(config).map((k) => [k, false])));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isValid = Object.values(errors).every((e) => e === null) &&
    Object.values(values).every((v, i) => {
      const field = Object.keys(values)[i];
      return !config[field]?.validators?.length || v.trim() !== "";
    });

  return { values, errors, touched, isValid, setValue, setTouched, validateAll, reset };
}
