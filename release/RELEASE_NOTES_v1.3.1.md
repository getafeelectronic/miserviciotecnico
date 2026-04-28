# Release v1.3.1 - Ajustes de EmailJS y despliegue

## Cambios principales

- El formulario de contacto vuelve a un flujo simple: un único correo al SAT.
- Se mantiene compatibilidad con la variable legacy `VITE_EMAILJS_TEMPLATE_ID` para evitar fallos en despliegues previos.
- Los workflows de deploy y release ahora admiten las variables nuevas de EmailJS en GitHub Secrets.
- Los scripts de configuración de secrets se han actualizado para incluir todas las variables de EmailJS.

## Impacto funcional

- El usuario envía el formulario y el SAT recibe un único correo.
- Se elimina la confirmación automática al cliente para reducir incidencias de entrega.
- La configuración de EmailJS queda alineada entre local, CI y GitHub Actions.

## Variables relevantes

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_BUSINESS_ID`
- `VITE_EMAILJS_TEMPLATE_ID` (compatibilidad)
- `VITE_EMAILJS_PUBLIC_KEY`

## Verificación

- Build de frontend completado con éxito.
- Secrets de GitHub presentes para negocio, Supabase y EmailJS.

## Despliegue esperado

- Deploy manual o por push a `main` o `develop`.
- Release automática al publicar el tag `v1.3.1`.

---

Fecha: 28 de abril de 2026
Tipo: Patch release