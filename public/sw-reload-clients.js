self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const scopeUrl = new URL(self.registration.scope);
      const windowClients = await self.clients.matchAll({
        includeUncontrolled: true,
        type: 'window',
      });

      await Promise.all(
        windowClients.map((client) => {
          const clientUrl = new URL(client.url);
          if (
            clientUrl.origin !== scopeUrl.origin ||
            !clientUrl.pathname.startsWith(scopeUrl.pathname)
          ) {
            return undefined;
          }

          return client.navigate(client.url);
        }),
      );
    })(),
  );
});
