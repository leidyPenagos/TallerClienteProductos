# TallerClienteProductos
# API de Clientes y Productos

##  Integrante
**Nombre:** Leidy Ximena Penagos Martinez

## Generalidades de la API
Esta API proporciona funcionalidades para la gestión de clientes y productos en un sistema de compraventa. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los clientes y productos, utilizando una estructura modular en Node.js con Express y MongoDB para la persistencia de datos.

## Arquitectura de la API
La API sigue una arquitectura basada en **MVC (Modelo-Vista-Controlador)** y cuenta con los siguientes módulos:

- **Modelo:** Define los esquemas de `Cliente` y `Producto` en MongoDB.
- **Controlador:** Implementa la lógica de negocio y maneja las solicitudes HTTP.
- **Rutas:** Define los endpoints disponibles para interactuar con la API.
- **Persistencia:** Se realiza mediante MongoDB, utilizando Mongoose como ODM.
- **Documentación:** Swagger es utilizado para describir y probar los endpoints.

### Estructura del Proyecto
```
cliente_productos_api_corrected/
│── config/
│   ├── database.js    # Configuración de la conexión a MongoDB
│── controllers/
│   ├── controlCliente.js
│   ├── controlProductos.js
│── models/
│   ├── cliente.js      # Modelo de Cliente
│   ├── producto.js     # Modelo de Producto
│── routes/
│   ├── cliente.js      # Rutas de Clientes
│   ├── producto.js     # Rutas de Productos
│── .env                # Variables de entorno
│── package.json        # Dependencias y configuración del proyecto
│── server.js           # Archivo principal para ejecutar el servidor
│── swagger.js          # Configuración de Swagger para documentación
```

##  Despliegue y Requisitos
###  Requisitos previos
1. Tener instalado **Node.js** y **MongoDB**
2. Instalar las dependencias con:
   ```sh
   npm install
   ```
3. Configurar el archivo `.env` con los parámetros de conexión a la base de datos MongoDB.

### Ejecución local
Para iniciar el servidor, ejecutar:
```sh
npm start
```
La API estará disponible en `http://localhost:3000`.

## Endpoints principales
### Clientes
- `GET /clientes`: Obtener todos los clientes
- `POST /clientes`: Crear un nuevo cliente
- `PUT /clientes/:id`: Actualizar un cliente por ID
- `DELETE /clientes/:id`: Eliminar un cliente por ID

### Productos
- `GET /productos`: Obtener todos los productos
- `POST /productos`: Crear un nuevo producto
- `PUT /productos/:id`: Actualizar un producto por ID
- `DELETE /productos/:id`: Eliminar un producto por ID

## Documentación con Swagger
Para acceder a la documentación interactiva de la API, visitar:
"http://localhost:3000/api-docs"

##  Autenticación (Opcional)
Si se implementa autenticación en el futuro, se podrían agregar **tokens JWT** para proteger los endpoints.

## Tecnologías Utilizadas
- **Node.js + Express** - Backend
- **MongoDB + Mongoose** - Base de Datos
- **Swagger** - Documentación de API
- **dotenv** - Gestión de variables de entorno


