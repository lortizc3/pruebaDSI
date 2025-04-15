# Rick and Morty Explorer 🧪👽

Una aplicación Angular 17.3.12 que consume la [API de Rick and Morty](https://rickandmortyapi.com/) e implementa un sistema de autenticación básico con control de acceso basado en roles. ¡Explora el multiverso con estilo!

![Rick and Morty Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/1200px-Rick_and_Morty.svg.png)

## ✨ Características

- 🔐 Sistema de autenticación simulado (almacenamiento local)
- 👽 Listado de personajes con paginación y filtrado
- 🔍 Vista detallada de cada personaje
- 👑 Panel de administración para gestión de usuarios (solo rol admin)
- 📱 Diseño responsivo utilizando componentes de PrimeNG
- 🌀 Efectos de portal y estética de Rick and Morty en toda la aplicación
- 🚀 Server-Side Rendering (SSR) con Angular Universal

## 🛠️ Requisitos previos

- Node.js (v18 o superior)
- npm (v8 o superior)

## 🚀 Instalación

### Paso 1: Clonar el repositorio

Abre tu terminal (Command Prompt en Windows o Terminal en Mac/Linux) y ejecuta:

```bash
git clone https://github.com/lortizc3/prueba-DSI.git
```

### Paso 2: Entrar al directorio del proyecto


```bash
npm install
```
Este paso puede tomar unos minutos. ¡No te preocupes! Es normal que aparezcan algunos mensajes en amarillo.

## 🎮 Ejecutando la aplicación

### Modo de desarrollo (cliente)

```bash
npm start
```
o
```bash
ng serve --port 4201
```

Una vez que termine de compilar, abre tu navegador favorito y navega a:
```
http://localhost:4201
```

### Modo SSR (Server-Side Rendering)

Para construir la aplicación con SSR:

```bash
ng build && ng run rick-and-morty-simple:server
```

Para ejecutar la versión SSR:

```bash
node dist/rick-and-morty-simple/server/server.mjs
```

## 🔑 Credenciales de acceso

La aplicación incluye dos usuarios predefinidos:

| Rol | Usuario | Contraseña |
|-----|---------|------------|
| Administrador | `admin` | `admin123` |
| Usuario regular | `user` | `user123` |

## 📱 Guía de uso para principiantes

### 1. Inicio de sesión
- Ingresa cualquiera de las credenciales mencionadas arriba
- Haz clic en "Login" o presiona Enter

### 2. Explorar personajes
- Después de iniciar sesión, verás la lista de personajes de Rick and Morty
- Utiliza los controles de paginación para navegar entre páginas
- Haz clic en el botón "Show Filters" para mostrar/ocultar opciones de filtrado

### 3. Filtrar personajes
- Especies: Selecciona Human, Alien, Robot o combínalos
- Estado: Elige entre Alive, Dead, Unknown o All
- Dimensión: Selecciona una dimensión del dropdown
- Morty-o-Meter: Ajusta el nivel de "Rickness" con el slider
- Haz clic en "Apply Filters" para ver los resultados filtrados
- Usa "Reset Filters" para volver a la lista completa

### 4. Ver detalles de personaje
- Haz clic en cualquier tarjeta de personaje para ver información detallada
- Usa el botón "Go Back" (con efecto portal) para volver a la lista

### 5. Panel de administración (solo admin)
- Si has iniciado sesión como "admin", verás un enlace "Admin Panel" en la parte superior
- En el panel de administración puedes:
  - Ver todos los usuarios registrados
  - Agregar nuevos usuarios con el botón "Add User"
  - Editar roles de usuario (cambia entre User y Administrator)
  - Eliminar usuarios (excepto tu propio usuario)
- Utiliza el botón con efecto portal para volver a la lista de personajes

## 🧠 Estructura del proyecto

```
rick-and-morty-simple/
├── src/                      # Código fuente
│   ├── app/                  # Componentes de la aplicación
│   │   ├── admin/            # Componente de administración
│   │   ├── character-detail/ # Componente de detalle de personaje
│   │   ├── characters/       # Componente de listado de personajes
│   │   ├── guards/           # Guards de autenticación y administración
│   │   ├── login/            # Componente de inicio de sesión
│   │   ├── services/         # Servicios (auth, rick-and-morty)
│   │   ├── shared/           # Componentes compartidos (sidebar)
│   │   └── app.server.module.ts # Módulo para SSR
│   ├── assets/               # Recursos estáticos
│   ├── styles.scss           # Estilos globales y PrimeNG
│   ├── main.ts               # Punto de entrada de la aplicación
│   ├── main.server.ts        # Punto de entrada para SSR
│   └── server.ts             # Configuración del servidor Express
├── angular.json              # Configuración de Angular
└── tsconfig.server.json      # Configuración TypeScript para SSR
```

## 🛠️ Tecnologías utilizadas

- ⚡ Angular 17.3.12 (Standalone Components)
- 🎨 PrimeNG 17.18.15
- 🖥️ Angular Universal para SSR
- 🔄 RxJS
- 🌐 Rick and Morty API
- 🖌️ SCSS para estilos personalizados
- 👾 Chat GPT
- 👾 Cursor

## 🤔 Solución de problemas comunes

### La aplicación no inicia
- Verifica que estás ejecutando `ng serve` dentro del directorio correcto
- Confirma que has instalado todas las dependencias con `npm install`
- Asegúrate de tener las versiones correctas de Node.js y npm

### Error de autenticación
- Verifica que las credenciales sean exactamente como se especifican
- Recuerda que las contraseñas distinguen entre mayúsculas y minúsculas

### Problemas con localStorage
- Si ves errores relacionados con localStorage, es posible que estés navegando en modo incógnito
- Algunos navegadores bloquean localStorage en modo incógnito
- Al utilizar SSR, recuerda que localStorage solo está disponible en el navegador, no en el servidor

### Problemas con SSR
- Verifica que el directorio de salida (`dist/rick-and-morty-simple`) esté correcto
- Asegúrate de que `AppServerModule` está importado correctamente
- Comprueba que las dependencias de Angular Universal estén instaladas

## 💡 Consejos para desarrolladores

- Explora el código fuente para entender la estructura y patrones utilizados
- Los estilos de PrimeNG se importan desde `styles.scss` usando la notación de tilde (~):
  ```scss
  @import "~primeng/resources/themes/lara-light-blue/theme.css";
  @import "~primeng/resources/primeng.min.css";
  @import "~primeicons/primeicons.css";
  ```
- El SSR está implementado usando la configuración estándar de Angular Universal en Angular 17
- Los guards protegen rutas según el rol del usuario (authGuard y adminGuard)
- La aplicación usa un enfoque modular con componentes independientes

---

