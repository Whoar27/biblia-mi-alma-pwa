📋 Análisis de los Cambios Requeridos:
1. 🎯 Eliminación de PageHeader General
Problema: PageHeader es muy genérico y no se adapta a las necesidades específicas de cada página
Solución: Cada página debe tener su propio header personalizado
Ejemplo: ChapterReader ya tiene su header propio (modelo a seguir)

2. 📱 Headers Específicos por Página
📖 Página "Planes":
Header fijo: "Mis Planes", "Encontrar", etc.
Comportamiento: Al hacer scroll, estas opciones permanecen visibles
Ubicación: Header específico para la sección de planes

🔍 Página "Buscar":
Header fijo: Campo de búsqueda
Comportamiento: El campo de búsqueda debe permanecer visible durante el scroll
Funcionalidad: Búsqueda persistente

📚 Página "Biblia" (ChapterReader):
Problema actual: Botones de navegación (siguiente/anterior) desaparecieron
Problema: Doble scroll (página + capítulo)
Problema: Nombres de libros muy largos causan desbordamiento

3. 🔧 Rediseño del Header de ChapterReader
�� Formato de Nombres:
Antes: "1 Juan 5" (muy largo)
Después: "1Jn 5" (abreviado)
Beneficio: Evita desbordamiento en pantallas pequeñas

��️ Reorganización de Opciones:
Izquierda: "1Jn 5 | RVR1960" (libro/capítulo + versión)
Derecha:
Icono de búsqueda
Icono de opciones (menú desplegable)
Menú de opciones: Tamaño de fuente, versión, temas, compartir

4. 🎨 Funcionalidad de Selección de Versículos
📌 Selección Individual:
Comportamiento: Al tocar un versículo, se subraya
Feedback visual: El usuario sabe qué versículo seleccionó
Opciones: Aparecen las opciones disponibles abajo

�� Selección Múltiple:
Funcionalidad: Seleccionar múltiples versículos (ej: 1, 3, 11)
Comportamiento:
Tocar versículo 1 → se subraya + aparecen opciones
Tocar versículo 3 → se subraya + opciones siguen visibles
Tocar versículo 11 → se subraya + opciones siguen visibles
Aplicación: Cualquier acción (resaltar, etc.) se aplica a todos los seleccionados

5. �� Navegación Inteligente por Testamentos
📖 Lógica de Navegación:
Si estás en: "1Jn 5" (Nuevo Testamento)
Al tocar: Te lleva al Nuevo Testamento
Si estás en: "Génesis 8" (Antiguo Testamento)
Al tocar: Te lleva al Antiguo Testamento
Problema actual: Siempre muestra el primer testamento

6. �� Problemas Técnicos a Resolver
📜 Doble Scroll:
Problema: Scroll de página + scroll de capítulo
Solución: Unificar en un solo scroll
Beneficio: Mejor experiencia de usuario

🎨 Interfaz Responsiva:
Problema: Opciones se corren y desaparecen en pantallas pequeñas
Solución: Menú de opciones colapsable
Beneficio: Interfaz más limpia y funcional

🎯 Resumen de Implementación:
Eliminar PageHeader general
Crear headers específicos para cada página
Rediseñar ChapterReader header con formato abreviado
Implementar menú de opciones colapsable
Agregar funcionalidad de selección múltiple de versículos
Corregir navegación por testamentos
Resolver problema de doble scroll
Mejorar responsividad general