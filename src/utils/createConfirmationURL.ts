export const createConfirmationURL = (
  host: string,
  userEmail: string,
  token: string
) => {
  return `${host}/verify?email=${userEmail}&token=${token}`;
};
