export const authenticateUser = (
  username: string,
  password: string,
): boolean => {
  return username === 'admin' && password === '12345';
};
