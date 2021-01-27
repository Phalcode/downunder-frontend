/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
export const environment = {
  production: true,
  backendUrl: "https://downunder-server.platform.alfagun74.de",
  appVersion: `${require("../../package.json").version}`
};
