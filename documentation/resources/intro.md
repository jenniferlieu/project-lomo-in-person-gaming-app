---
sidebar_position: 1
---
# Introduction

[Setup Instructions](/#setup-instructions) are on the main page of Docusaurus. [Run instructions](/#run) are also on the main page of the Docusaurus.

Below are links to project boards, resources, official documentation, and tutorials.

## Project Boards and Resources
- [Jira board](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/LM/boards/53)
- [Miro board](https://miro.com/app/board/uXjVMg75Ffs=/) - team document drafts and ideas
- Secret keys for .env variables in Discord and Miro
- [Capstone site](https://capstone.ianapplebaum.com/) - syllabus, schedule, etc
- [Canvas Course site](https://templeu.instructure.com/courses/133974)
- [Study Buddy's docusaurus](https://capstone-projects-2023-spring.github.io/project-virtual-pet/docs/intro) - referenced as the gold standard for a documentation site

## Quick start guides
- **React and Tailwind**
  - [React quick start guide](https://www.codementor.io/reactjs/tutorial/the-reactjs-quick-start-guide)
  - [Tailwind quick start guide](https://www.codeinwp.com/blog/tailwind-css-tutorial/)
  - [React API calls and State (sidebar)](/resources/react-api-calls-and-state)
- **Laravel**
  - [Laravel quick start guide - 7 Laravel RESTful APIs best practices for 2023](https://benjamincrozat.com/laravel-restful-api-best-practices)
    - [List of HTTP status codes](https://benjamincrozat.com/laravel-restful-api-best-practices#use-the-correct-http-code-for-responses)
  - [Laravel Sail docs: Executing Sail commands](https://laravel.com/docs/10.x/sail#executing-sail-commands)
  - [Laravel API endpoints docs generator YouTube guide](https://www.youtube.com/watch?v=gp-_kcblYGA)
    - [Laravel Request Docs Github (the API endpoints docs generator)](https://github.com/rakutentech/laravel-request-docs)
- **Docker**
  - [Docker quick start guide (sidebar)](/resources/docker-quick-start)
- **MongoDB**
  - [Official MongoDB and Laravel quick start docs](https://www.mongodb.com/compatibility/mongodb-laravel-integration#laravel-mongodb-crud-example)
  - [Official MongoDB query builder docs](https://github.com/mongodb/laravel-mongodb/blob/4.1/docs/query-builder.md)
  - [MongoDB datatype to php conversion](/docs/system-architecture/erddiagrams#datatype-conversion-from-mongodb-to-php)
- **Docusuarus**
  - [Official docusaurus quick start guide](https://capstone-projects-2023-fall.github.io/project-lomo-in-person-gaming-app/resources/quick-start-docusaurus)

## Documentation for Packages Used
- [Laravel Twitch](https://github.com/romanzipp/Laravel-Twitch) - Twitch API wrapper for Laravel to make API calls easier
- [Twitch Games API](https://dev.twitch.tv/docs/api/reference#get-games) - Twitch API
- [Laravel Request Docs](https://github.com/rakutentech/laravel-request-docs) - Automatically generates an interactive API documentation website
- [Laravel Magellan](https://github.com/clickbar/laravel-magellan) - Adds Postgres functionality for geospatial data
- [Laravel Echo WebSocket](https://laravel.com/docs/10.x/broadcasting#receiving-broadcasts) - Laravel's frontend WebSocket library and wrapper for Pusher
- [Pusher WebSocket](https://pusher.com/docs/channels/using_channels/client-api-overview/?ref=docs-index) - Pusher's frontend WebSocket documentation - Laravel Echo uses Pusher behind the scenes, so if you want to do more advanced stuff with the WebSocket client in the frontend, check out this documentation
- [Zustand](https://github.com/pmndrs/zustand) - Lightweight state management library for React

## More Resources
### ReactJS
- [Official React documentation](https://react.dev/)
- [React Unit Tests](https://www.freecodecamp.org/news/how-to-write-unit-tests-in-react/)

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
  - [YouTube - How to create WebSocket channels](https://www.youtube.com/watch?v=NMstI0hghnE)
- [Laravel Sanctum docs to authenticate API routes](https://laravel.com/docs/10.x/sanctum)
- [Laravel Testing docs](https://laravel.com/docs/10.x/testing)
- [Laravel Sail docs](https://laravel.com/docs/10.x/sail)
- [Blog Guide - Rate Limiting](https://medium.com/@antoine.lame/using-the-rate-limiter-in-laravel-dab58a5040bc)

### MongoDB
- [Official MongoDB documentation](https://www.mongodb.com/docs/)
- [Official MongoDB docs for Laravel 10 on github](https://github.com/mongodb/laravel-mongodb)

### Docusaurus
- [Offical Docusaurus documentation](https://docusaurus.io/docs)
- [Styling and Layout](https://docusaurus.io/docs/styling-layout)
- [docusaurus2-dotenv-2](https://www.npmjs.com/package/docusaurus2-dotenv-2)
- [redocusaurus](https://www.npmjs.com/package/redocusaurus) - embed OpenAPI specs into docusaurus

### WSL
- [Official WSL installation guide](https://learn.microsoft.com/en-us/windows/wsl/install)
- [YouTube - How to install WSL2 on Windows 11](https://www.youtube.com/watch?v=28Ei63qtquQ) - will work on Windows 10 as well
- [Official guide on setting up Docker Desktop with WSL2](https://docs.docker.com/desktop/wsl/)
- [Official guide on setting up WSL2 with Visual Studio Code](https://code.visualstudio.com/docs/remote/wsl)