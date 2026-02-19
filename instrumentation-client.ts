import * as Sentry from '@sentry/nextjs';

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const tracesSampleRate = Number(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE ?? 0.1);
const replaySessionSampleRate = Number(process.env.NEXT_PUBLIC_SENTRY_REPLAY_SESSION_SAMPLE_RATE ?? 0);
const replayOnErrorSampleRate = Number(process.env.NEXT_PUBLIC_SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE ?? 0.1);

Sentry.init({
  dsn,
  enabled: process.env.NODE_ENV === 'production' && Boolean(dsn),
  environment: process.env.SENTRY_ENVIRONMENT ?? process.env.VERCEL_ENV ?? process.env.NODE_ENV,
  release: process.env.SENTRY_RELEASE ?? process.env.VERCEL_GIT_COMMIT_SHA,
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: Number.isFinite(tracesSampleRate) ? tracesSampleRate : 0.1,
  replaysSessionSampleRate: Number.isFinite(replaySessionSampleRate) ? replaySessionSampleRate : 0,
  replaysOnErrorSampleRate: Number.isFinite(replayOnErrorSampleRate) ? replayOnErrorSampleRate : 0.1,
  sendDefaultPii: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
