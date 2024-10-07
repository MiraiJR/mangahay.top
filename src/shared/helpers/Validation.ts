const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const emailValidation = (value: string): boolean => {
  return EMAIL_REGEX.test(value);
};
