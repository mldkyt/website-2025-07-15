// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://8d18488c293c49e3bf2e8792592b3e45@glitchtip.mldchan.dev/19",

  integrations: [
    Sentry.zodErrorsIntegration(),
    Sentry.prismaIntegration(),
    Sentry.postgresIntegration(),
    Sentry.consoleIntegration()
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
