const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PHONE_REGEX = /^0\d{9}$/;
export const emailValidation = (value: string): boolean => {
  return EMAIL_REGEX.test(value);
};

export const phoneValition = (value: string): boolean => {
  return PHONE_REGEX.test(value);
};
