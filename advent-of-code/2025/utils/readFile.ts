export const readFile = (filePath: string) => {
  return Bun.file(filePath).text();
};
