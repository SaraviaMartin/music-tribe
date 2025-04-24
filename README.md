<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <h3 align="center">Blog API con Next.js y PostgreSQL</h3>

  <p align="center">
    Una API moderna para gestión de blogs construida con Next.js y PostgreSQL
    <br />
    <a href="#getting-started"><strong>Explora la documentación »</strong></a>
    <br />
    <br />
    <a href="#demo">Ver Demo</a> •
    <a href="#issues">Reportar Bug</a> •
    <a href="#feature-request">Solicitar Feature</a>
  </p>
</div>

<details>
  <summary>Tabla de Contenidos</summary>
  <ol>
    <li>
      <a href="#about-the-project">Sobre el Proyecto</a>
      <ul>
        <li><a href="#built-with">Tecnologías Utilizadas</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Comenzando</a>
      <ul>
        <li><a href="#prerequisites">Prerrequisitos</a></li>
        <li><a href="#installation">Instalación</a></li>
      </ul>
    </li>
    <li><a href="#usage">Uso</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contribuir</a></li>
    <li><a href="#license">Licencia</a></li>
    <li><a href="#contact">Contacto</a></li>
  </ol>
</details>

## Sobre el Proyecto

Este proyecto es una API moderna para gestión de blogs que permite:
* Crear y gestionar usuarios
* Publicar y editar posts
* Sistema de autenticación seguro
* API RESTful con Next.js
* Base de datos PostgreSQL con Prisma ORM

### Tecnologías Utilizadas

* [![Next.js][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
* [![Prisma][Prisma]][Prisma-url]

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Comenzando

### Prerrequisitos

* Node.js (versión 18 o superior)
* PostgreSQL
* npm o yarn

### Instalación

1. Clona el repositorio
   ```sh
   git clone https://github.com/tu-usuario/tu-repo.git
   ```
2. Instala las dependencias
   ```sh
   npm install
   ```
3. Configura las variables de entorno
   ```sh
   cp .env.example .env
   ```
4. Configura la base de datos en el archivo `.env`
   ```env
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/mydb?schema=public"
   ```
5. Ejecuta las migraciones
   ```sh
   npx prisma migrate dev
   ```
6. Inicia el servidor de desarrollo
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Uso

La API proporciona los siguientes endpoints:

### Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `POST /api/users` - Crear un nuevo usuario
- `GET /api/users/:id` - Obtener un usuario específico
- `PUT /api/users/:id` - Actualizar un usuario
- `DELETE /api/users/:id` - Eliminar un usuario

### Posts
- `GET /api/posts` - Obtener todos los posts
- `POST /api/posts` - Crear un nuevo post
- `GET /api/posts/:id` - Obtener un post específico
- `PUT /api/posts/:id` - Actualizar un post
- `DELETE /api/posts/:id` - Eliminar un post

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Roadmap

- [x] Configuración inicial del proyecto
- [x] Integración con PostgreSQL
- [x] Modelos básicos (User, Post)
- [ ] Autenticación con NextAuth
- [ ] Sistema de roles y permisos
- [ ] Interfaz de usuario
- [ ] Sistema de búsqueda
- [ ] Paginación
- [ ] Filtros avanzados
- [ ] Documentación de API
- [ ] Tests unitarios y de integración

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Contribuir

Las contribuciones son lo que hace que la comunidad de código abierto sea un lugar increíble para aprender, inspirar y crear. Cualquier contribución que hagas será **muy apreciada**.

1. Fork el Proyecto
2. Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al Branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Contacto

Tu Nombre - [@tu_twitter](https://twitter.com/tu_usuario) - email@ejemplo.com

Link del Proyecto: [https://github.com/tu-usuario/tu-repo](https://github.com/tu-usuario/tu-repo)

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/tu-usuario/tu-repo.svg?style=for-the-badge
[contributors-url]: https://github.com/tu-usuario/tu-repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tu-usuario/tu-repo.svg?style=for-the-badge
[forks-url]: https://github.com/tu-usuario/tu-repo/network/members
[stars-shield]: https://img.shields.io/github/stars/tu-usuario/tu-repo.svg?style=for-the-badge
[stars-url]: https://github.com/tu-usuario/tu-repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/tu-usuario/tu-repo.svg?style=for-the-badge
[issues-url]: https://github.com/tu-usuario/tu-repo/issues
[license-shield]: https://img.shields.io/github/license/tu-usuario/tu-repo.svg?style=for-the-badge
[license-url]: https://github.com/tu-usuario/tu-repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/tu-usuario
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Prisma]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/ 