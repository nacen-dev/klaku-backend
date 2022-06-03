export const createConfirmationURL = async (
  host: string,
  userEmail: string,
  token: string
) => {
  return `${host}/api/users/verify/${userEmail}/${token}`;
};
