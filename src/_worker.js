export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (url.pathname.startsWith('/api/log')) {
            return new Response('Ok ' + request);
        }
        return env.ASSETS.fetch(request);
    },
}