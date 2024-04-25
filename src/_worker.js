export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/log')) {
      const size = url.searchParams.get('size');
      const startIndex = url.searchParams.get('startIndex');

      return new Response(
        `Ok ${size} ${startIndex} ${JSON.stringify(request)}`
      );
    }
    return env.ASSETS.fetch(request);
  },
};
