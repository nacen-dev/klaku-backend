export const createConfirmationURL = (
  host: string,
  userEmail: string,
  token: string
) => {
  return `http://${host}/api/users/verify/${userEmail}/${token}`;
};
