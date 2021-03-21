/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
export const environment = {
  production: false,
  backendUrl: "http://localhost:80",
  appVersion: `${require("../../package.json").version}-dev`
};
