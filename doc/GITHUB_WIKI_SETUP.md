# Configuración de GitHub Wiki - Paso a Paso

## 📋 Habilitar la Wiki

### Opción 1: Desde la Interfaz Web (Recomendado)

1. **Ir a Settings del repositorio**
   - URL: https://github.com/getafeelectronic/miserviciotecnico/settings

2. **Navegar a Features**
   - Scroll hasta la sección "Features"
   - Buscar la opción "Wikis"

3. **Activar Wikis**
   - ✅ Marcar el checkbox "Wikis"
   - Guardar cambios

4. **Configurar Permisos** (Opcional pero recomendado)
   - En Settings → General → Features
   - Junto a "Wikis" hay una opción de permisos
   - **Recomendado**: "Restrict editing to collaborators only"
   - Esto evita vandalismo y ediciones no autorizadas

### Opción 2: Desde GitHub CLI (Alternativa)

```bash
# Si tienes permisos de admin
gh api repos/getafeelectronic/miserviciotecnico \
  -X PATCH \
  -f has_wiki=true
```

## 🌐 Acceder a la Wiki

Una vez habilitada, accede a:
**https://github.com/getafeelectronic/miserviciotecnico/wiki**

## 📝 Crear Páginas Iniciales

### Método 1: Desde la Web

1. **Ir a la Wiki**: https://github.com/getafeelectronic/miserviciotecnico/wiki
2. **Create the first page**
3. **Nombre**: `Home` (página principal)
4. **Contenido**: Ver plantilla abajo
5. **Save Page**

### Método 2: Clonar Wiki Localmente

```bash
# La wiki es un repo Git separado
git clone https://github.com/getafeelectronic/miserviciotecnico.wiki.git

cd miserviciotecnico.wiki

# Crear página Home
cat > Home.md << 'EOF'
# Bienvenido a Mi Servicio Técnico - Wiki

> 📍 Servicio técnico especializado en reparación de televisores en Getafe

## 📱 Para Clientes

- [Preguntas Frecuentes (FAQ)](FAQ-Clientes)
- [Cómo Solicitar una Reparación](Como-Solicitar-Reparacion)
- [Política de Garantías](Politica-Garantias)
- [Proceso de Reparación](Proceso-Reparacion)

## 🔧 Para Técnicos

- [Base de Conocimiento](Base-Conocimiento)
- [Procedimientos Operativos](Procedimientos-SOP)
- [Proveedores de Repuestos](Proveedores-Repuestos)
- [Casos de Estudio](Casos-Estudio)

## 📊 Administración

- [Gestión de Garantías](Gestion-Garantias)
- [Facturación y Pagos](Facturacion-Pagos)
- [Inventario de Repuestos](Inventario-Repuestos)

## 🗺️ Desarrollo

- [Roadmap del Portal](Roadmap-Portal)
- [Changelog Público](Changelog-Publico)
- [Solicitar Funcionalidades](https://github.com/getafeelectronic/miserviciotecnico/issues/new?template=feature_request.md)

## 🔗 Enlaces Útiles

- [Portal Web](https://getafeelectronic.github.io/miserviciotecnico/)
- [Repositorio GitHub](https://github.com/getafeelectronic/miserviciotecnico)
- [Documentación Técnica](https://github.com/getafeelectronic/miserviciotecnico/tree/main/doc)

---

💡 **¿No encuentras lo que buscas?** [Abre un issue](https://github.com/getafeelectronic/miserviciotecnico/issues/new)
EOF

# Commit y push
git add Home.md
git commit -m "docs: initialize wiki home page"
git push origin master
```

## 📄 Plantillas de Páginas

### FAQ-Clientes.md

```markdown
# Preguntas Frecuentes - Clientes

> **Última actualización**: 28 de abril de 2026

## Proceso de Reparación

### ¿Cuánto tarda el diagnóstico?
Generalmente **24-48 horas** laborables. Para modelos menos comunes puede tardar hasta 3-4 días.

### ¿El diagnóstico tiene coste?
**No**, el diagnóstico es completamente gratuito y sin compromiso. Solo pagas si decides proceder con la reparación.

### ¿Qué pasa si no acepto la reparación?
No hay ningún coste. Devolvemos tu televisor sin cargo alguno.

### ¿Cuánto tarda la reparación?
Una vez aceptado el presupuesto, la mayoría de reparaciones se completan en **24-48 horas**. Reparaciones que requieren piezas especiales pueden tardar hasta 7-10 días.

## Garantías

### ¿Qué garantía ofrecen?
Todas las reparaciones incluyen **garantía de 6 meses** en mano de obra y repuestos instalados.

### ¿Qué cubre la garantía?
Cualquier problema relacionado con la reparación realizada: componentes defectuosos, problemas de soldadura, fallos en las piezas instaladas.

### ¿Qué NO cubre la garantía?
- Daños físicos nuevos (golpes, caídas, líquidos)
- Sobretensiones eléctricas externas
- Problemas no relacionados con la reparación original
- Uso inadecuado del equipo

## Precios

### ¿Cuánto cuesta una reparación típica?
Depende del problema:
- Fuente de alimentación: 50-80€
- Retroiluminación LED: 60-100€
- Placa T-CON: 70-120€
- Placa Main: 80-150€

### ¿Incluye IVA?
Sí, todos los precios incluyen IVA (21%).

### ¿Qué métodos de pago aceptan?
- Efectivo
- Tarjeta de crédito/débito
- Transferencia bancaria (solo empresas)

## Ubicación y Horario

### ¿Dónde están ubicados?
**Calle Ejemplo 123, Getafe, Madrid**

[Ver en Google Maps](https://www.google.com/maps)

### ¿Cuál es el horario?
**Lunes a Viernes**: 9:00 - 19:00  
**Sábados**: 10:00 - 14:00  
**Domingos y festivos**: Cerrado

## Contacto

### ¿Cómo puedo contactarles?
- 📞 Teléfono: +34 916 950 781
- 📧 Email: info@miserviciotecnico.com
- 💬 WhatsApp: +34 916 950 781
- 🌐 Web: [Formulario de contacto](https://getafeelectronic.github.io/miserviciotecnico/#/contacto)

---

💡 **¿Tu pregunta no está aquí?** [Contáctanos](https://getafeelectronic.github.io/miserviciotecnico/#/contacto)
```

### Base-Conocimiento.md

```markdown
# Base de Conocimiento de Reparaciones

> 🔧 Documentación técnica de problemas comunes y soluciones probadas

## Samsung TV LCD/LED

### Problema: No enciende (LED parpadea)

**Síntomas**:
- LED frontal parpadea en rojo
- No aparece imagen ni sonido
- El TV no responde al mando

**Diagnóstico**:
- **95% de casos**: Fuente de alimentación defectuosa
- Capacitores electrolíticos hinchados (C304, C305 típicamente)
- Fusible F801 quemado

**Modelos afectados**:
- Serie UN55 (2014-2017)
- Serie UN60 (2015-2018)
- Serie UE55 (2016-2019)

**Solución**:
1. Reemplazo de capacitores defectuosos
2. Verificación de fusibles
3. Prueba de voltajes (5V, 12V, 24V según modelo)

**Tiempo estimado**: 30-45 minutos  
**Coste medio**: 45-60€  
**Dificultad**: Media

**Repuestos necesarios**:
- Capacitor 470µF 25V x2
- Capacitor 1000µF 16V x1
- Fusible 5A (si aplica)

---

### Problema: Líneas verticales en pantalla

**Síntomas**:
- Una o varias líneas verticales de colores
- Líneas pueden ser finas o gruesas
- Resto de la imagen funciona correctamente

**Diagnóstico**:
- **80% de casos**: Placa T-CON defectuosa
- **15% de casos**: Cable Flat (LVDS) con mal contacto
- **5% de casos**: Problema en el panel (irreparable)

**Modelos afectados**:
- Series 6, 7, 8 (años 2015-2018)
- Especialmente modelos curvos

**Solución**:
1. Reemplazo de placa T-CON completa
2. Resoldado de cable Flat si está accesible
3. Evaluación económica vs panel nuevo

**Tiempo estimado**: 1-2 horas  
**Coste medio**: 85-110€  
**Dificultad**: Media-Alta

**Repuestos necesarios**:
- Placa T-CON específica del modelo
- Cable Flat (opcional)

---

## LG TV LED

### Problema: Pantalla oscura (se oye sonido)

**Síntomas**:
- Imagen muy oscura o completamente negra
- Audio funciona correctamente
- Con linterna se puede ver imagen débilmente

**Diagnóstico**:
- **90% de casos**: Retroiluminación LED fallida
- Tiras LED quemadas
- Inversor de LED defectuoso (modelos más antiguos)

**Modelos afectados**:
- Serie LB (2014)
- Serie UF (2015)
- Serie UH (2016)

**Solución**:
1. Reemplazo de tiras LED completas
2. Verificación de voltajes de alimentación LED
3. Prueba individual de cada tira

**Tiempo estimado**: 2-3 horas  
**Coste medio**: 90-130€  
**Dificultad**: Alta (requiere desmontaje completo)

**Repuestos necesarios**:
- Kit completo de tiras LED (8-12 tiras según tamaño)
- Adhesivo térmico 3M

---

## Sony Bravia

### Problema: Parpadeo de imagen

**Síntomas**:
- Imagen parpadea intermitentemente
- Puede incluir líneas horizontales
- Problema se agrava con uso prolongado

**Diagnóstico**:
- **70% de casos**: Placa T-CON con soldaduras frías
- **20% de casos**: Cable Flat oxidado/dañado
- **10% de casos**: Fuente de alimentación inestable

**Modelos afectados**:
- Serie KD (2015-2017)
- Serie XBR (años múltiples)

**Solución**:
1. Resoldado de componentes críticos en T-CON
2. Limpieza y reasentamiento de cables Flat
3. Verificación de voltajes estables

**Tiempo estimado**: 1-1.5 horas  
**Coste medio**: 65-85€  
**Dificultad**: Media

---

## Philips

### Problema: No detecta señal HDMI

**Síntomas**:
- Puertos HDMI no detectan dispositivos
- Mensaje "Sin señal" permanente
- Otros puertos (USB, antena) funcionan

**Diagnóstico**:
- **60% de casos**: Puerto HDMI físicamente dañado
- **30% de casos**: Chip HDMI en placa Main defectuoso
- **10% de casos**: Firmware corrupto

**Solución**:
1. Reemplazo de puerto HDMI individual (soldadura)
2. Reflashing de firmware
3. Reemplazo de placa Main (último caso)

**Tiempo estimado**: 45 min - 2 horas  
**Coste medio**: 40-90€  
**Dificultad**: Media-Alta (soldadura SMD)

---

## 📊 Estadísticas de Reparaciones

| Marca | Problema Más Común | Frecuencia |
|-------|-------------------|-----------|
| Samsung | Fuente alimentación | 35% |
| LG | Retroiluminación LED | 40% |
| Sony | T-CON / Soldaduras | 25% |
| Philips | Puertos dañados | 20% |
| Hisense | Varios | 15% |

## 🔗 Recursos Adicionales

- [Proveedores de Repuestos](Proveedores-Repuestos)
- [Herramientas Recomendadas](Herramientas)
- [Procedimientos SOP](Procedimientos-SOP)

---

💡 **Contribuir**: Si tienes soluciones para otros modelos, [abre un issue](https://github.com/getafeelectronic/miserviciotecnico/issues) o contacta con el equipo.
```

## 🚀 Siguientes Pasos

1. **Habilitar Wiki** (desde Settings)
2. **Crear página Home** (plantilla arriba)
3. **Añadir FAQ-Clientes** (contenido para clientes)
4. **Añadir Base-Conocimiento** (documentación técnica)
5. **Configurar Sidebar** (navegación)
6. **Actualizar README.md** (enlazar a wiki)

## 📌 Tips de Uso

- **Usa el buscador** de la wiki para encontrar contenido
- **Enlaza entre páginas** usando `[Texto](Nombre-Pagina)`
- **Incluye imágenes** subiendo a la wiki o enlazando URLs
- **Mantén actualizado** - La wiki es un documento vivo
- **Revisa el historial** - Cada cambio queda registrado

---

**Ubicación de este documento**: `doc/GITHUB_WIKI_SETUP.md`
