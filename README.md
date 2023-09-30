[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=11814775)
<div align="center">

# LOMO
[![Report Issue on Jira](https://img.shields.io/badge/Report%20Issues-Jira-0052CC?style=flat&logo=jira-software)](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/DT/issues)
[![Deploy Docs](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml)
[![Documentation Website Link](https://img.shields.io/badge/-Documentation%20Website-brightgreen)](https://applebaumian.github.io/tu-cis-4398-docs-template/)


</div>

- [LOMO](#lomo)
  - [Contributing](#contributing)
    - [Setup instructions](#setup-instructions)
  - [Keywords](#keywords)
  - [Project Abstract](#project-abstract)
  - [High Level Requirement](#high-level-requirement)
  - [Conceptual Design](#conceptual-design)
  - [Background](#background)
  - [Required Resources](#required-resources)
  - [Collaborators](#collaborators)


## Contributing

Hi, Team!

LOMO uses ReactJS for the frontend, Laravel Sail (Laravel in a docker container) as the backend server, and MongoDB as the database.

For tips on how to get started with either the frontend or the backend in the context of LOMO, then check out this repo's Wiki tab.

### Setup instructions

Instructions on how to setup this project for development on your local machine.

**For frontend development, make sure you're in the `frontend/` folder**.

**For backend development, make sure you're in the `backend/` folder**.

1. **Install** 
   1. Docker Desktop 4+
   2. npm 8+
   3. git 2+
2. **Git clone this repo**
3. **Setup frontend**
   1. Go to the `frontend` folder
      ```bash
      cd frontend
      ```
   2. Install node dependencies 
      ```bash
      npm install
      ```
4. **Setup backend**
   1. Go to the `backend` folder
      ```bash
      cd backend
      ```
   2. Install backend dependencies
      1. Start the Docker Desktop application (Docker Desktop must be running the background to run any docker commands)
      2. Install composer dependencies
          ```bash
         # multiline
          docker run --rm \
            -u "$(id -u):$(id -g)" \
            -v "$(pwd):/var/www/html" \
            -w /var/www/html \
            laravelsail/php82-composer:latest \
            composer install --ignore-platform-reqs
         
         # single line for powershell (may/may not work on windows)
          docker run --rm -u "$(id -u):$(id -g)" -v "$(pwd):/var/www/html" -w /var/www/html laravelsail/php82-composer:latest composer install --ignore-platform-reqs
          ```
      3. (Optional) Setup an alias for the `sail` command
          ```bash
          # you can either run this command from the laravel documentation website
          alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'

          # or you can add this to your ~/.bashrc or ~/.zshrc config files
          alias sail='vendor/bin/sail'

          # or don't setup an alias and use this:
          vendor/bin/sail 

          # or don't use sail at all and use the docker commands
          # <container-name> should be backend-laravel.test-1
          docker exec -it <container-name> <command>
          docker exec -it <container-name> php artisan

          # or don't use sail or the docker commands and use the docker container's command line instead
          docker exec -it sh # first run this to get inside the docker container's command line
          php artisan <command> # then run commands as if you it's your local machine
          ```
5. **Run app**
   1. Start the backend server
      1. Open the Docker Desktop application (Docker Desktop must be running the background to run any docker commands)
      2. Start the docker container
          ```bash
          cd backend
          
          # you can use sail
          sail up -d

          # or use docker commands
          docker compose up -d

          # -d means to start the container in detached mode so that it's running in the background and doesn't show real time logs in your terminal
          ```
   2. Start frontend server
      ```bash
      cd frontend
      npm start
      ```
    3. Go to http://localhost:3000 to view the frontend web app

To stop running the app:
1. Stop docker
    ```bash
    sail down # using sail
    docker compose down # or using docker
    ```
2. Stop the react server: enter `Ctrl+C` into the terminal running the react server.

## Keywords

Section #, as well as any words that quickly give your peers insights into the application like programming language, development platform, type of application, etc.

## Project Abstract

This document proposes a novel application of a text message (SMS or Email) read-out and hands-free call interacted between an Android Smartphone and an infotainment platform (headunit) in a car environment. When a phone receives an SMS or Email, the text message is transferred from the phone to the headunit through a Bluetooth connection. On the headunit, user can control which and when the received SMS or E-mail to be read out through the in-vehicle audio system. The user may press one button on the headunit to activate the hands-free feature to call back the SMS sender.

## High Level Requirement

Describe the requirements – i.e., what the product does and how it does it from a user point of view – at a high level.

## Conceptual Design

Describe the initial design concept: Hardware/software architecture, programming language, operating system, etc.

## Background

The background will contain a more detailed description of the product and a comparison to existing similar projects/products. A literature search should be conducted and the results listed. Proper citation of sources is required. If there are similar open-source products, you should state whether existing source will be used and to what extent. If there are similar closed-source/proprietary products, you should state how the proposed product will be similar and different.

## Required Resources

Discuss what you need to develop this project. This includes background information you will need to acquire, hardware resources, and software resources. If these are not part of the standard Computer Science Department lab resources, these must be identified early and discussed with the instructor.

## Collaborators

[//]: # ( readme: collaborators -start )
<table>
<tr>
    <td align="center">
        <a href="https://github.com/ApplebaumIan">
            <img src="https://avatars.githubusercontent.com/u/9451941?v=4" width="100;" alt="ApplebaumIan"/>
            <br />
            <sub><b>Ian Tyler Applebaum</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/leighflagg">
            <img src="https://avatars.githubusercontent.com/u/77810293?v=4" width="100;" alt="leighflagg"/>
            <br />
            <sub><b>Null</b></sub>
        </a>
    </td></tr>
</table>

[//]: # ( readme: collaborators -end )
