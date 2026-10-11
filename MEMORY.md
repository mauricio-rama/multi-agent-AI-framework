# MEMORY.md — Diario de Estudio

## Estado actual
- App estática funcional: registra y lista sesiones, muestra rachas, minutos semanales y días estudiados este mes.
- Los datos se guardan en `localStorage` (`diario-estudio-sesiones`).

## Decisiones
- Sin backend ni dependencias; debe funcionar abriendo `index.html` directamente.
- La fecha del formulario es editable para permitir registrar sesiones pasadas.
- La mejor racha se deriva de las fechas guardadas, cuenta días únicos consecutivos y excluye futuras; no se persiste por separado.
- El resumen semanal suma los minutos de lunes a hoy usando fechas locales y excluye futuras.
- El resumen mensual cuenta días únicos del mes calendario local actual y excluye fechas futuras.
- La interfaz usa una paleta de tinta azul y papel frío con mandarina como acento; las fuentes son locales, sin recursos externos.

## Errores a evitar
- Manejar fechas en hora local; `toISOString()` y `new Date("YYYY-MM-DD")` pueden desplazar el día por UTC.
- La racha actual sigue activa si se estudió ayer aunque hoy aún no haya sesión.
