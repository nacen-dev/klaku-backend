export const createConfirmationURL = (
  host: string,
  userEmail: string,
  token: string
) => {
  return `${host}/api/users/verify/${userEmail}/${token}`;
};
