# Esta rama no se edita a mano

Esta rama (`hostinger-deploy`) contiene el sitio ya compilado (`next build`
con `output: "export"`) — exactamente lo que Hostinger necesita servir
directamente, sin ningún paso de build.

No es la rama de desarrollo. El código fuente vive en `claude/new-session-6e1qzi`
(o la rama de trabajo que corresponda). Cada vez que se actualiza el sitio,
se reconstruye desde ahí y se sobreescribe el contenido de esta rama por
completo — nunca se edita directamente.

Hostinger está configurado (hPanel → Sitios web → estudiaenmadrid.com →
Avanzado → Git) para desplegar automáticamente esta rama en `public_html`
en cada push — así el `git push` sí actualiza el sitio en vivo, porque lo
que llega es HTML ya compilado, no el código fuente de Next.js.
