export function onRequest(context) {
  return new Response(
    context.params.user +
      ' ' +
      JSON.stringify(context.params) +
      ' ' +
      JSON.stringify(context)
  );
}
