# MEMORY.md — Diario de Estudio

## Estado actual
- App estática funcional: registra y lista sesiones, muestra la racha actual y la mejor racha.
- Los datos se guardan en `localStorage` (`diario-estudio-sesiones`).

## Decisiones
- Sin backend ni dependencias; debe funcionar abriendo `index.html` directamente.
- La fecha del formulario es editable para permitir registrar sesiones pasadas.
- La mejor racha se deriva de las fechas guardadas, cuenta días únicos consecutivos y excluye futuras; no se persiste por separado.

## Errores a evitar
- Manejar fechas en hora local; `toISOString()` y `new Date("YYYY-MM-DD")` pueden desplazar el día por UTC.
- La racha actual sigue activa si se estudió ayer aunque hoy aún no haya sesión.
