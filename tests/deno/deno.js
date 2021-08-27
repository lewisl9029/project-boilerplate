const body = new TextEncoder().encode('Hello, Bench!')

const handle = async (connection) => {
  const httpConnection = Deno.serveHttp(connection)
  for await (const requestEvent of httpConnection) {
    requestEvent.respondWith(new Response(body))
  }
}

const server = Deno.listen({ port: 8080 })

for await (const connection of server) {
  handle(connection)
}
