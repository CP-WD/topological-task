export const getWebBaseUrl = () => {
  if (!process.env.VERCEL) {
    return process.env.WEB_BASE_URL;
  }
  if (process.env.VERCEL_ENV === "production") {
    return "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL;
  }
  return "https://" + process.env.VERCEL_BRANCH_URL;
};
