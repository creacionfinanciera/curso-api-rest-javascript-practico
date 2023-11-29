# CACHE VS MEMORIA

Cuando hablamos de optimización en una aplicación web, por una parte tenemos las optimizaciones que hace el backend para ir más rápido, para tener la base de datos, utilizar herramientas como "Redis", por ejemplo; y por otra parte tenemos las optimizaciones que hace el frontend, entonces tenemos las optimizaciones con respecto al tiempo que nos toma consumir una API REST para obtener los datos que vamos a mostrar en la aplicación.

Con el cache y la memoria no hacemos que vaya más rápida la solicitud HTTP sino que podamos no hacer solicitudes HTTP cuando estamos seguros que ya tenemos la información suficiente y que no tenemos que volver a pedirla.

Hablemos un poco más acerca de éstas estrategias.

Recuerda que el Caché es la forma en la que nosotros podemos decirle al navegador que siempre nos traiga la última información, que cuando utilicemos FETCH, AXIOS o cualquier otra herramienta siempre nos traiga la última información del backend, de la API, o por el contrario siempre nos de la información que nosotros tenemos guardada en caché, si nosotros alguna vez ya hicimos nuestra solicitud HTTP, el navegador va a tener esa información, así que no es necesario que volvamos a hacer esa petición porque lo datos ya los datos ya los tenemos ahí

## Caché:
- default
- no-store
- reload
- no-cache
- force-cache
- only-if-cached

La otra opción es la Memorization, es decir, que ya no sea el navegador el que haga ese condicional con el caché, sino que seamos nosotros con nuestro código javaScript, con objetos, con arrays, y demás, quienes guardemos esa información en nuestro propio código y en nuestro propio código, validemos si hace falta volver a consumir la API, o si utilizamos la información que ya tengamos ahí en nuestro código, entonces la Memorization es guardar los cálculos que ya hicimos para no repetirlos.

## Memorization:
- Crear un objeto
- Preguntar si el objeto tiene la información que necesitamos
- Si sí, usar la información
- Si no, hacer el fetch y guardar la información en el objeto

Una consideración importante es saber que nuestro código javaScript con las modificaciones que hagamos en tiempo y ejecución, solamente se van a guardar hasta que refresquemos la página, apaguemos la computadora o cerremos el navegador, es decir, si tu guardas o modificas alguna variable o código javaScript, pues cómo haces para que permanezca esa información ahí después de que recargues la página, tendrías que hacer almacenamiento local usando herramientas como localstorage o sessionstorage.

## Posibles problemas:

¿Cómo sabemos si la información que tenemos en el frontend cambió en el backend después de que nosotros hicieramos esa primera solicitud?, no sabemos si nuestro caché o nuestra memorization está actualizada o desactualizada.