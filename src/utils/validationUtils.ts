export interface NameValidationErrors {
  minLength: boolean;
  maxLength: boolean;
  invalidChars: boolean;
}

export interface TaskTitleValidationErrors {
  minLength: boolean;
  maxLength: boolean;
}

export interface DescriptionValidationErrors {
  minWords: boolean;
  maxLength: boolean;
}

export const validateName = (value: string): NameValidationErrors => {
  if (!value) {
    return {
      minLength: false,
      maxLength: false,
      invalidChars: false,
    };
  }

  return {
    minLength: value.length < 2,
    maxLength: value.length > 255,
    invalidChars: !/^[a-zA-Zა-ჰ]+$/.test(value),
  };
};

export const validateTitle = (value: string): TaskTitleValidationErrors => {
  if (!value) {
    return {
      minLength: false,
      maxLength: false,
    };
  }

  return {
    minLength: value.length < 3,
    maxLength: value.length > 255,
  };
};

export const validateDescription = (
  value: string
): DescriptionValidationErrors => {
  if (!value) {
    return { minWords: false, maxLength: false };
  }

  const words = value.trim().split(/\s+/);

  return {
    minWords: words.length < 4,
    maxLength: value.length > 255,
  };
};
