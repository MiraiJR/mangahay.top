const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^0\d{9}$/;

/**
 * Validates an email address against a regular expression.
 * @param value - The email address to validate.
 * @returns True if the email is valid, false otherwise.
 */
export const emailValidation = (value: string): boolean => {
  if (!value || typeof value !== "string") return false;
  return EMAIL_REGEX.test(value.trim());
};

/**
 * Validates a phone number against a regular expression.
 * @param value - The phone number to validate.
 * @returns True if the phone number is valid, false otherwise.
 */
export const phoneValidation = (value: string): boolean => {
  if (!value || typeof value !== "string") return false;
  return PHONE_REGEX.test(value.trim());
};
