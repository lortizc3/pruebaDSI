# Rick and Morty Explorer 🧪👽

Una aplicación Angular 17 que consume la [API de Rick and Morty](https://rickandmortyapi.com/) e implementa un sistema de autenticación básico con control de acceso basado en roles. ¡Explora el multiverso con estilo!

![Rick and Morty Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/1200px-Rick_and_Morty.svg.png)

## ✨ Características

- 🔐 Sistema de autenticación simulado (almacenamiento local)
- 👽 Listado de personajes con paginación y filtrado
- 🔍 Vista detallada de cada personaje
- 👑 Panel de administración para gestión de usuarios (solo rol admin)
- 📱 Diseño responsivo utilizando componentes de PrimeNG
- 🌀 Efectos de portal y estética de Rick and Morty en toda la aplicación

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
cd prueba-DSI/rick-and-morty-simple
```

### Paso 3: Instalar dependencias

```bash
npm install
```
Este paso puede tomar unos minutos. ¡No te preocupes! Es normal que aparezcan algunos mensajes en amarillo.

## 🎮 Ejecutando la aplicación

### Paso 1: Iniciar el servidor de desarrollo

```bash
ng serve
```

### Paso 2: Abrir la aplicación en el navegador

Una vez que termine de compilar, abre tu navegador favorito y navega a:
```
http://localhost:4200
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
│   │   └── shared/           # Componentes compartidos (sidebar)
│   ├── assets/               # Recursos estáticos
│   ├── styles.scss           # Estilos globales
│   └── main.ts               # Punto de entrada de la aplicación
└── angular.json              # Configuración de Angular
```

## 🛠️ Tecnologías utilizadas

- ⚡ Angular 17 (Standalone Components)
- 🎨 PrimeNG Components
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

## 💡 Consejos para desarrolladores

- Explora el código fuente para entender la estructura y patrones utilizados
- Los componentes de PrimeNG se han personalizado para mantener la estética de Rick and Morty
- Los guards protegen rutas según el rol del usuario (authGuard y adminGuard)
- La aplicación usa un enfoque modular con componentes independientes

---
