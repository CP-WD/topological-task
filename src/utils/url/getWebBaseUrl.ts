export const getWebBaseUrl = () => {
  if (!!process.env.VERCEL) {
    return "https://" + process.env.VERCEL_BRANCH_URL;
  }
  return process.env.WEB_BASE_URL;
};
