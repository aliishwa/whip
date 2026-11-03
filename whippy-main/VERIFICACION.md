# Resultado de pruebas · Whippy

## Ejecutado en un navegador real

Entorno: Chromium 153.0.8010.0, automatizado en Linux.

| Prueba del widget | Resultado |
|---|---|
| Aparición y dibujo del SVG sobre una página | Correcto |
| Botones de la página fuera del widget | Siguen recibiendo clics |
| Clic en el látigo | Inicia animación y reproducción del MP3 |
| Silenciar y reactivar sonido | Correcto |
| Arrastre mediante ratón | Cambia la posición |
| Reducir ventana a 390 × 600 | El widget permanece dentro de la zona visible |
| Cerrar y volver a abrir | Correcto |
| Ejecutar content.js repetidamente | Alterna el widget sin duplicados |
| Errores JavaScript de página | Ninguno en las pruebas |

El MP3 se ha reconocido como audio MP3 estéreo a 44,1 kHz y duración aproximada de 1,59 s. La comprobación de reproducción observa el estado y el avance de tiempo del reproductor real; no es una escucha humana del altavoz.

Se ha corregido un recorte del texto de ayuda inferior detectado al revisar la captura del navegador.

## Pruebas con API simuladas

- Service worker: validación de pestaña HTTP/HTTPS, solicitud de inserción, error al intentar páginas protegidas.
- Electron: ventana compacta, aislamiento de contexto, navegación bloqueada, cierre IPC validado y atajo para mostrar/ocultar.
- Widget: audio, silencio, cierre y arrastre sin chasquido accidental.

## Límites de estas pruebas

El Chromium disponible no carga extensiones nativas en este modo de ejecución. La prueba real de content.js proporciona una implementación de prueba de runtime.getURL; no verifica el permiso activeTab ni el flujo de instalación del navegador.

No se han ejecutado Opera, Chrome de marca, Edge, Windows ni macOS. No se ha compilado ni ejecutado un EXE o DMG. Estas plataformas siguen pendientes de una prueba nativa. Los resultados anteriores no certifican compatibilidad completa con todas ellas ni con cualquier página web.
