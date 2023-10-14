---
sidebar_position: 1
---
# Introduction

LOMO is a full-stack, mobile-first web app using **ReactJS and Tailwind CSS** for the frontend, **Laravel Sail** (dockerized version of Laravel) as the API backend, **MongoDB** as the database hosted on MongoDB Atlas, and **Docusaurus** as the documentation site hosted on **GitHub Pages**.

The purpose of the frontend is to create a user interface for the app. 

The purpose of the backend is to be the app's API and move data between the frontend and database. 

The purpose of the database is to the persist data. 

The purpose of docker is to containzer the backend so that everyone is developing in the same environment as the production environment (in theory).

Check out the [Setup Instructions](https://capstone-projects-2023-fall.github.io/project-lomo-in-person-gaming-app/#setup-instructions) on the main page of Docusaurus on how to setup a local instance of the app.

Below are links to project boards, resources, official documentation, and tutorials.

## Project Boards and Resources
- [Jira board](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/LM/boards/53)
- [Miro board](https://miro.com/app/board/uXjVMg75Ffs=/) - team document drafts and ideas
- Secret keys for .env variables in Discord and Miro?
- [Capstone site](https://capstone.ianapplebaum.com/) - syllabus, schedule, etc
- [Canvas Course site](https://templeu.instructure.com/courses/133974)
- [Study Buddy's docusaurus](https://capstone-projects-2023-spring.github.io/project-virtual-pet/docs/intro) - referenced as the gold standard for a documentation site

## Quick start guides
- **React and Tailwind**
  - [React quick start guide](https://www.codementor.io/reactjs/tutorial/the-reactjs-quick-start-guide)
  - [Tailwind quick start guide](https://www.codeinwp.com/blog/tailwind-css-tutorial/)
  - [React API calls and State (sidebar)](https://capstone-projects-2023-fall.github.io/project-lomo-in-person-gaming-app/resources/state-and-api-calls#performing-side-effects-api-calls)
- **Laravel and Docker**
  - [Laravel quick start guide - 7 Laravel RESTful APIs best practices for 2023](https://benjamincrozat.com/laravel-restful-api-best-practices)
    - [List of HTTP status codes](https://benjamincrozat.com/laravel-restful-api-best-practices#use-the-correct-http-code-for-responses)
  - [Laravel docs generator](https://www.youtube.com/watch?v=gp-_kcblYGA)
  - [Laravel Sail docs: Executing Laravel commands in the docker container](https://laravel.com/docs/10.x/sail#executing-sail-commands)
  - [Docker quick start guide (sidebar)](https://capstone-projects-2023-fall.github.io/project-lomo-in-person-gaming-app/resources/quick-start-docker)
- **MongoDB**
  - [Tutorial on Setting up MongoDB with Laravel Sail](https://discord.com/channels/1150870543092949102/1150870543092949105/1156730930090737684)
  - [MongoDB datatype to php conversion](https://capstone-projects-2023-fall.github.io/project-lomo-in-person-gaming-app/docs/system-architecture/erddiagrams#datatype-conversion-from-mongodb-to-php)
- **Docusuarus**
  - [Official docusaurus quick start guide](https://capstone-projects-2023-fall.github.io/project-lomo-in-person-gaming-app/resources/quick-start-docusaurus)

## More Resources
### ReactJS
- [Official React documentation](https://react.dev/)

### Tailwind CSS
- [Official Tailwind documentation](https://tailwindcss.com/docs/installation)
- [Tailwind components docs](https://tailwindui.com/components?ref=sidebar)

### Docker
- [Official Docker documentation](https://docs.docker.com/get-started/overview/)
- [Official Docker installation guide](https://docs.docker.com/get-docker/)
- [YouTube - Full Docker Tutorial Zero to Hero in 3 Hours](https://www.youtube.com/watch?v=3c-iBn73dDE&t=5589s&pp=ygUGZG9ja2Vy)

### Laravel 10
Keep in mind that the some of the Laravel official documentation are written for people using it as BOTH the frontend and the backend. LOMO will ONLY be using Laravel as the API backend. Ignore docs referring to the views, "web.php" (the Laravel frontend routes), and other references to the Laravel frontend.

- [Official Laravel documentation](https://laravel.com/docs/10.x/readme)
- [Laravel Routing doc](https://laravel.com/docs/10.x/routing)
- [Laravel Controller doc](https://laravel.com/docs/10.x/controllers)
- [Laravel Model doc](https://laravel.com/docs/10.x/eloquent)
- [Laravel WebSocket doc](https://laravel.com/docs/10.x/broadcasting)
  - [Laravel Event and Event Listener docs](https://laravel.com/docs/10.x/events)
- [Laravel Sanctum docs to authenticate API routes](https://laravel.com/docs/10.x/sanctum)
- [Laravel Testing docs](https://laravel.com/docs/10.x/testing)
- [Laravel Sail docs](https://laravel.com/docs/10.x/sail)

### MongoDB
- [Official MongoDB documentation](https://www.mongodb.com/docs/)
- [MongoDB docs for Laravel 10 on github](https://github.com/mongodb/laravel-mongodb)

### Docusaurus
- [Offical Docusaurus documentation](https://docusaurus.io/docs)
- [Styling and Layout](https://docusaurus.io/docs/styling-layout)

### WSL
- [Official WSL installation guide](https://learn.microsoft.com/en-us/windows/wsl/install)
- [YouTube - How to install WSL2 on Windows 11](https://www.youtube.com/watch?v=28Ei63qtquQ) - will work on Windows 10 as well
- [Official guide on setting up Docker Desktop with WSL2](https://docs.docker.com/desktop/wsl/)
- [Official guide on setting up WSL2 with Visual Studio Code](https://code.visualstudio.com/docs/remote/wsl)