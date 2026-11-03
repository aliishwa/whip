# Whippy · Látigo flotante

Dos formas de utilizar el mismo proyecto: **extensión de Chrome/Edge/Opera (Windows o Mac)** para ponerlo sobre la web abierta, y **aplicación Electron** para mantener una pequeña ventana por encima del escritorio.

## Opción recomendada: extensión, sin npm

1. Descarga y **extrae todo el ZIP** en una carpeta permanente.
2. En Chrome abre `chrome://extensions`. En Edge abre `edge://extensions`. En Opera abre `opera://extensions` (también en macOS).
3. Activa **Modo de desarrollador**.
4. Pulsa **Cargar descomprimida** (Load unpacked).
5. Selecciona la carpeta **extension**, la que contiene `manifest.json`. No selecciones el ZIP ni la carpeta superior.
6. En el menú de extensiones del navegador, fija Whippy a la barra de herramientas.
7. Abre una web HTTP o HTTPS y pulsa el icono de Whippy: aparece sobre esa página.
8. Haz clic en el látigo para animarlo y reproducir el chasquido. Arrástralo para moverlo. ♫ silencia o activa el sonido y × lo cierra.
9. Pulsa otra vez el icono para ocultarlo. El atajo propuesto es **Alt + Mayús + W**; puedes cambiarlo en los atajos de extensiones si está ocupado.

El látigo se activa en cada pestaña cuando tú pulsas el icono. Al recargar o navegar a un documento nuevo, vuelve a pulsarlo. No modifica otras pestañas automáticamente. La extensión usa `activeTab` y `scripting`; no solicita historial ni lee formularios.

### Si no aparece

- No funciona en `chrome://`, `edge://`, `opera://`, la tienda de extensiones, nuevas pestañas, visores PDF y otras páginas protegidas del navegador. Pruébalo en una web normal. Algunos sitios o estados especiales de la pestaña también pueden impedir la inserción.
- Si el icono muestra **!**, pasa el ratón por él para ver la indicación. Abre otra web y vuelve a pulsarlo.
- Si has actualizado los archivos, pulsa **Recargar** en la tarjeta de Whippy de la pantalla de extensiones y recarga la pestaña donde lo estabas probando.
- Para el audio, comprueba el botón ♫ y que el sitio o la pestaña no estén silenciados.
- No borres ni muevas la carpeta de la extensión después de cargarla.

## Probar solo la animación

Abre `index.html` en un navegador. Es una demostración dentro de esa página: un HTML normal no puede ponerse encima de otras pestañas o aplicaciones. Para eso usa la extensión o Electron.

## Escritorio con Electron

Necesitas Node.js con npm instalado y conexión para descargar las dependencias. Abre una terminal en la carpeta que contiene `package.json`:

```sh
npm install
npm start
```

La ventana es pequeña, transparente y permanece encima de las ventanas normales. Para moverla, arrastra la barra WHIPPY. Clic en el látigo: animación y audio. × o Esc: cerrar. **Ctrl + Mayús + W** (Cmd + Mayús + W en macOS) muestra u oculta la ventana si el sistema permite registrar el atajo. No garantiza estar por encima de pantallas de seguridad o aplicaciones a pantalla completa.

Solo la pequeña zona de la ventana puede interceptar clics; no hay una capa transparente ocupando todo el monitor. El resto de la pantalla se utiliza normalmente. La transparencia y la prioridad pueden variar con el sistema y su gestor de ventanas.

### Crear una descarga .exe para Windows

**Este ZIP contiene el código fuente y la extensión lista para cargar; no contiene un .exe ya compilado.** Para generarlo en Windows:

1. Instala Node.js si no lo tienes.
2. Abre `CREAR_EXE_WINDOWS.cmd`, o ejecuta desde la carpeta:

```sh
npm install
npm run dist:win
```

3. Encontrarás el ejecutable portable en `dist/Whippy-1.1.0-Windows.exe`.
4. Ese archivo es el que debes adjuntar en una Release de GitHub para que otras personas lo descarguen y ejecuten sin npm. No está firmado digitalmente: Windows puede mostrar una advertencia de editor desconocido.

## Opera en Mac: usar la extensión

No necesitas compilar nada ni instalar Node.js para esta opción. Extrae el ZIP, abre `opera://extensions`, activa Modo de desarrollador y pulsa Cargar descomprimida. Selecciona la carpeta `extension` y activa Whippy desde el icono en una web HTTP/HTTPS. En páginas internas del navegador no puede insertarse.

## Aplicación de escritorio para macOS

Para usar Whippy también por encima de aplicaciones distintas del navegador, usa Electron. En un Mac con Node.js instalado, abre Terminal y entra en la carpeta del proyecto. Puedes escribir `cd ` y arrastrar esa carpeta a Terminal para completar su ruta.

```sh
npm ci
npm start
```

Para generar una imagen de instalación `.dmg` para la arquitectura del Mac donde trabajas:

```sh
npm run dist:mac
```

Alternativamente, ejecuta `bash CREAR_APP_MAC.command` desde esa carpeta. El script instala las dependencias y prepara el DMG. Si tiene permiso de ejecución, también puedes abrirlo con doble clic.

- Apple Silicon (M1, M2 y posteriores): `npm run dist:mac:apple` → `dist/Whippy-1.1.0-macOS-arm64.dmg`.
- Intel: `npm run dist:mac:intel` → `dist/Whippy-1.1.0-macOS-x64.dmg`.

Compila preferiblemente en un Mac de la misma arquitectura. Abre el DMG y arrastra Whippy a Aplicaciones. Son builds para uso local en el Mac que los genera, con firma ad hoc y hardened runtime desactivado para evitar conflictos de validación, sin firma Developer ID ni notarización de Apple; macOS puede solicitar autorización o bloquear la apertura. No desactives globalmente las protecciones del sistema.

**Este ZIP no contiene un DMG ni una app Mac ya compilada.** La creación y ejecución nativa en macOS quedan pendientes de comprobar en un Mac.

Safari no admite directamente esta carpeta de extensión Chromium; usa Opera, Chrome o Edge para la versión de navegador.

## Archivos

| Archivo o carpeta | Función |
|---|---|
| `extension/manifest.json` | Configuración de extensión Manifest V3 |
| `extension/background.js` | Activa/oculta el widget en la pestaña y comunica errores |
| `extension/content.js` | Monta o elimina el widget |
| `widget.js` | Widget con SVG, estilos aislados, arrastre, animación, audio y limpieza |
| `extension/widget.js` | Copia del widget utilizada por la extensión |
| `main.js` | Ventana Electron compacta, instancia única y atajo |
| `preload.js` | Puente limitado para cerrar Electron |
| `renderer.js` | Arranque de la demostración/escritorio |
| `index.html` / `styles.css` | Demostración y superficie de escritorio |
| `whip.mp3` / `extension/whip.mp3` | Sonido incluido en el proyecto original |
| `package.json` | Dependencias y configuración para generar el portable |

Si editas el widget, mantén sincronizados `widget.js` y `extension/widget.js`.

## Referencias

- https://developer.chrome.com/docs/extensions/develop/concepts/activeTab
- https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world
- https://www.electronjs.org/docs/latest/api/browser-window
- https://www.electronjs.org/docs/latest/tutorial/security

- https://help.opera.com/en/extensions/testing/
- https://www.electron.build/v26/docs/mac/
