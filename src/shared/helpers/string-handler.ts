export const removeAccentsAndLowerCase = (value: string): string => {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
};

export const removeAccentsAndLowerCaseArray = (
  arrayString: string[]
): string[] => {
  return arrayString.map((value) => removeAccentsAndLowerCase(value));
};
