# Esta rama no se edita a mano

Esta rama (`hostinger-deploy`) contiene el sitio ya compilado (`next build`
con `output: "export"`) — exactamente lo que Hostinger necesita servir
directamente, sin ningún paso de build.

No es la rama de desarrollo. El código fuente vive en `claude/new-session-6e1qzi`
(o la rama de trabajo que corresponda). Cada vez que se actualiza el sitio,
se reconstruye desde ahí y se sobreescribe el contenido de esta rama por
completo — nunca se edita directamente.

Configurá el despliegue por Git de Hostinger para que apunte a *esta*
rama (`hostinger-deploy`), no a la de desarrollo — así el auto-deploy
sirve el sitio compilado en vez del código fuente sin compilar.
