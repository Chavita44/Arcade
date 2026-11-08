# Chavita33_Arcade

Arcade web hecha con HTML, CSS y JavaScript puro (sin dependencias ni build). Incluye **Logodoku**, un puzzle estilo sudoku donde buscas el logo de la página, y funciona en PC, móvil y consolas.

## Logodoku: reglas

- Un logo por fila y por columna.
- Un logo por zona de color.
- Los logos no pueden tocarse, ni en diagonal.
- Toca una casilla para marcarla con X, vuelve a tocarla para poner el logo y otra vez para quitarlo.

Tiene 3 vidas (o modo relajado sin vidas), pistas, cronómetro, récords por tamaño (6×6, 8×8, 10×10) y tableros generados al azar.

## Novedades

- **Marcar con X:** un toque o clic pone una **X**, otro toque sobre la X pone el **logo**, y otro lo quita. Si **deslizas** el dedo o el ratón sobre casillas vacías, se tachan todas con X (si empiezas sobre una X, las destacha). Clic derecho o mantener pulsado pone el logo directo.
- **Tableros de 6×6 hasta 20×20.** Hasta 10×10 la solución es única; en 12×12 y más se intenta que lo sea, pero algunos tableros pueden tener más de una solución válida (cualquiera gana). Los grandes pueden tardar unos segundos en generarse.
- **Gamer tag** que se elige una sola vez al entrar. Nivel de cuenta fijo en 1 por ahora.
- **Estadísticas** por juego: tiempo, victorias, racha, récords por tamaño.
- **Trofeos y logros** (100 horas, 25/100/500/1000 victorias y 13 logros más).
- **Monedas y cofres:** cada victoria da 10 monedas.
- **Tienda de aspectos:** cambia el logo por animales y objetos. El más caro (10.000 monedas) es el logo arcoíris.

## Controles

| Dispositivo | Cómo se juega |
|---|---|
| Móvil / tablet / pantalla táctil | Tocar: X, luego logo, luego vacío. Deslizar para tachar varias |
| PC | Clic igual que en móvil, o flechas (o WASD) + Enter. `X` logo directo, `H` pista, `N` nuevo, `Esc` salir |
| Mando / consola | Cruceta o stick para mover, `A` marcar (X, logo, vacío), `X` logo directo, `Y` pista, `Start` nuevo, `B` salir, `LB`/`RB` cambiar de sección |

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
js/app.js       Navegación, lógica de Logodoku, teclado y mando
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
