# Chavita33_Arcade

Arcade web hecha con HTML, CSS y JavaScript puro (sin dependencias ni build). Incluye **Gatodoku**, un puzzle de gatos estilo sudoku, y funciona en PC, móvil y consolas.

## Gatodoku: reglas

- Un gato por fila y por columna.
- Un gato por zona de color.
- Los gatos no pueden tocarse, ni en diagonal.
- Toca una casilla vacía para poner un gato y tócala otra vez para quitarlo.

Tiene 3 vidas (o modo relajado sin vidas), pistas, cronómetro, récords por tamaño (6×6, 8×8, 10×10) y tableros generados al azar con solución única cuando es posible.

## Controles

| Dispositivo | Cómo se juega |
|---|---|
| Móvil / tablet / pantalla táctil | Tocar las casillas |
| PC | Ratón, o flechas (o WASD) + Enter/Espacio. `H` pista, `N` nuevo, `Esc` salir |
| Mando / consola | Cruceta o stick para mover, `A` gato, `X` pista, `Y` nuevo, `B` salir, `LB`/`RB` cambiar de sección |

## Probar en local

Abre `index.html` en el navegador, o levanta un servidor local:

```bash
python3 -m http.server 8000
# luego visita http://localhost:8000
```

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta a la raíz de tu repositorio.
2. En GitHub: **Settings → Pages → Build and deployment**.
3. En *Source* elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
4. Guarda. En un par de minutos tendrás la web en `https://TU_USUARIO.github.io/NOMBRE_DEL_REPO/`.

## Estructura

```
index.html      Estructura de la página
css/style.css   Estilos y colores (variables al inicio del archivo)
js/app.js       Navegación, lógica de Gatodoku, teclado y mando
assets/logo.png Logotipo
```

## Personalizar

- **Colores y tema:** variables CSS al inicio de `css/style.css` (`:root`). La paleta base es `#E7F5DC`, `#CFE1B9`, `#B6C99B`, `#98A77C`, `#88976C`, `#728156`.
- **Colores de las zonas del tablero:** constante `COL` en `js/app.js`.
- **Agregar juegos:** añade un objeto a la lista `GM` en `js/app.js`.
- **Barra móvil:** hay 3 estilos (clara, acento y oscura). Se elige en *Ajustes* y se guarda en `localStorage`.

El progreso (victorias, récords, ajustes) se guarda solo en el navegador de cada jugador.

## Licencia

MIT. Consulta el archivo `LICENSE`.
