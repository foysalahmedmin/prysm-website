/**
 * Copy for not-found and error screens. It lives in config, not in the content service, on purpose:
 * these screens must still render when the data layer is the thing that failed.
 */
export const systemCopy = {
  notFound: {
    title: 'Page not found',
    body: 'The page you are looking for has moved or does not exist.',
    cta: 'Back to home',
  },
  error: {
    title: 'Something went wrong',
    body: 'We could not load this page. Try again, or come back in a moment.',
    retry: 'Try again',
  },
} as const
