[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://urban-rotary-phone-rp7jq9p5wp43rrj.github.dev/)
<div align="center">

# LOMO In Person Gaming App
[![LOMO Web App](https://img.shields.io/badge/-LOMO%20Web%20App-blue)](https://lomogaming.netlify.app/)
[![Documentation Website Link](https://img.shields.io/badge/-Documentation%20Website-brightgreen)](https://capstone-projects-2023-fall.github.io/project-lomo-in-person-gaming-app/)

[![Report Issue on Jira](https://img.shields.io/badge/Report%20Issues-Jira-0052CC?style=flat&logo=jira-software)](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/LM/issues)
[![Deploy Docs](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/f2ed186c-f3f0-4d94-aa1d-c1a935d61d7f/deploy-status)](https://app.netlify.com/sites/lomogaming/deploys)
[![Deploy Backend](https://github.com/Capstone-Projects-2023-Fall/project-lomo-in-person-gaming-app/actions/workflows/deploy-backend.yml/badge.svg)](https://github.com/Capstone-Projects-2023-Fall/project-lomo-in-person-gaming-app/actions/workflows/deploy-backend.yml)
[![Test Backend](https://github.com/Capstone-Projects-2023-Fall/project-lomo-in-person-gaming-app/actions/workflows/test-backend.yml/badge.svg)](https://github.com/Capstone-Projects-2023-Fall/project-lomo-in-person-gaming-app/actions/workflows/test-backend.yml)

</div>

- [LOMO In Person Gaming App](#lomo-in-person-gaming-app)
  - [Keywords](#keywords)
  - [Project Abstract](#project-abstract)
  - [High Level Requirement](#high-level-requirement)
  - [Conceptual Design](#conceptual-design)
  - [Background](#background)
  - [Required Resources](#required-resources)
  - [Setup Instructions](#setup-instructions)
    - [System requirements and prerequisites](#system-requirements-and-prerequisites)
    - [Setup local machine](#setup-local-machine)
      - [1. Git clone the repo](#1-git-clone-the-repo)
      - [2. Setup frontend](#2-setup-frontend)
      - [3. Setup backend](#3-setup-backend)
        - [(Optional) Setup sail alias](#optional-setup-sail-alias)
      - [4. Setup docusaurus](#4-setup-docusaurus)
  - [Run](#run)
    - [Run the app](#run-the-app)
    - [Stop running the app](#stop-running-the-app)
    - [Run docusaurus](#run-docusaurus)
  - [Collaborators](#collaborators)


## Keywords

Lomo, gaming, social media, social gaming, web app, geolocation, map, real-time, networking

## Project Abstract

It facilitates in-person gaming in a real time environment using geolocation on a 2d map and networking between users and their posts. This service is made to address those who want to play games that have little to no online functionality and those who want to make friends beyond exclusively online environments.

When a user opens the app, they will see the interface of a 2d map in a top down perspective. A user can see a list of people that currently want to play games, and can choose to let others know they want to play something as well. When a user has a game they want to find people to play, they establish a “Beacon” that details how many people they want, what the game is, and a list of other factors that detail what those viewing the beacon can expect. Users can then apply to a beacon, with their name, supplies they can provide, and an optional attached message. Users will be able to browse beacons by category, distance, and by friends/groups only. Being friends with someone lets the user create more beacons tailored to them only, such as ones with more detailed and personal information. The user will also be able to adjust their preferences for their profile pertaining to games, controllers they have, and tags that tell others what they want to do.

## High Level Requirement

## Conceptual Design

This will be a progressive web application using React as a frontend with Laravel PHP serving as our backend. Our backend will use PostgreSQL for establishing and maintaining a database. Laravel provides many built-in functions that can be expanded on to meet the needs of the project in a more productive fashion.

## Background

This app is similar to Niantic Campfire, which is a companion app developed for Niantic games meant to facilitate in-person meetups for games like Pokemon Go. While many features in Pokemon Go require players to be in close proximity, the mainstream gaming environment today is primarily online. In many cases, there are people that, as much as they want to make in-person friends and play in-person games, they have a hard time finding a good method to do so. The name LOMO is inspired by the term FOMO, which stands for “fear of missing out”. For those that want an in-person connection when gaming, Lomo is intended to be as non-invasive as possible, where only essential communication is used by the app to facilitate getting together.

## Required Resources

A background/understanding of web app development would be required. For software, React is most likely to be used. The utilization of APIs will also be required, such as a comprehensive list of games that the app can update and utilize. Everyone will need proper workspaces such as laptop or desktop computers compatible with our software. Software requirements include Docker, Git and Github.

## Setup Instructions

Instructions on how to setup a local instance of the app.

### System requirements and prerequisites
**Any of these operating systems should work for development:**
- Windows 10 and above, or any Windows version that can run WSL2 and Docker Desktop 4+
- Ubuntu 22.04.3 LTS (Jammy Jellyfish) and above
- MacOS 10.15.7 Catalina and above
- Other OS's that can run Docker Desktop 4+

**Your system MUST have these installed:**
- Docker Desktop 4+
- node 18.18+ (should come installed with npm 8+)
- npm 8+
- yarn 1.22+
- serve 14.2+ (or something similar)
- git 2+
- (For Windows machines only) WSL2 + Ubuntu 22.04.3 LTS (Jammy Jellyfish)
   1. [Install WSL2 with Ubuntu 22.04.2 LTS](https://www.youtube.com/watch?v=28Ei63qtquQ)
   2. [Setup Docker Desktop with WSL2](https://docs.docker.com/desktop/wsl/)
   3. If using Visual Studio Code, [setup WSL2 with vscode](https://code.visualstudio.com/docs/remote/wsl) and install the "[WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)" extension into the WSL's version of vscode. (Also install the "[Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)" extension if you want the Docker Desktop Dashboard inside vscode).

### Setup local machine

For Windows users only, start up and use WSL2 as your development machine.

#### 1. Git clone the repo
```bash
git clone https://github.com/Capstone-Projects-2023-Fall/project-lomo-in-person-gaming-app.git
```

#### 2. Setup frontend
1. Go to the `frontend/` folder
    ```bash
    cd frontend
    ```
2. Install node dependencies:
   ```bash
   npm install
   ```
3. Copy the .env.example file to .env
    ```bash
    cp .env.example .env
    # add secret keys to .env
    ```

#### 3. Setup backend
1. Go to the `backend/` folder
    ```bash
    cd backend
    ```
2. Start the Docker Desktop application (Docker Desktop must be running the background to run any docker commands)
3. Install composer dependencies (composer is a package manager for php)
   ```bash
   docker run --rm -u "$(id -u):$(id -g)" -v "$(pwd):/var/www/html" -w /var/www/html laravelsail/php82-composer:latest composer install --ignore-platform-reqs
   ```
   - **PROBLEM:** If you run into problems installing dependencies, then first check to make sure that you're in the `backend` folder and on the correct branch
   - **PROBLEM:** If you continue to have problems with docker, then install php82, php82-openssl, and composer onto your machine, and use your machine's composer to install the dependencies `composer install --ignore-platform-reqs`. **IMPORTANT!** Afterwards, only use the container's composer and php commands so that they'll make changes to the container and **not** to your machine! `sail composer` and `sail php`
4. Copy the .env.example file to .env
    ```bash
    cp .env.example .env
    # add secret keys to .env
    ```
5. Build the image and start the docker container (in detached mode)
   ```bash
   ./vendor/bin/sail up -d
   ```
6. Generate Laravel app key
    ```bash
    ./vendor/bin/sail artisan key:generate
    ```
7. Go to [http://localhost](http://localhost) in your browser to make sure that you can see the laravel welcome screen, and you're set!
   1. **PROBLEM:** If you see a 500 server error and no detailed explanation of the error, then you forgot to copy the env file
   2. **PROBLEM:** If you get permission errors for the `storage/` folder. Run the commands below one line at a time, in order:
        ```bash
        # enter the docker container command line as the root user
        ./vendor/bin/sail root-shell
        ```
        
        ```bash
        # recursively change permissions on storage to allow read,write,execute for owner and group
        chmod -R 777 storage/

        # recursively change owner and group to root
        chown -R root:root storage/

        # setup the storage link between storage/ and public/storage folders
        php artisan storage:link

        # clear the cache and config
        php artisan cache:clear
        php artisan config:clear
        
        # exit the docker container command line
        exit
        ```

To stop the container: from your terminal, run `./vendor/bin/sail down`

##### (Optional) Setup sail alias
Add this line to your `~/.bashrc` or `~/.zshrc` in your home directory:
   ```bash
   alias sail="./vendor/bin/sail"
   ```

#### 4. Setup docusaurus
1. Go to `documentation/` folder
    ```bash
    cd documentation
    ```
2. Install node dependencies:
   ```bash
   yarn install
   ```

## Run

### Run the app
1. **Start the backend server**
   ```bash
   cd backend
   ```
   ```bash
   ./vendor/bin/sail up -d
   ```
2. **Start frontend server**
    Use build files, otherwise development server can sometimes cause Beacon display issues.
   ```bash
   cd ../frontend
   ```
   ```bash
   npm run build
   serve -s build
   ```
3. Go to [https://localhost:3000](https://localhost:3000) to see the app

### Stop running the app
1. **Stop backend**
   ```bash
   ./vendor/bin/sail down
   ```
2. **Stop the frontend server**: enter `Ctrl+C` or `Cmd-C` into the terminal tab running the frontend server.

### Run docusaurus
Go into the `documentation/` folder and run:

```bash
cd documentation
```
```bash
yarn start-lomo

# or use the long form
# PROJECT_NAME=project-lomo-in-person-gaming-app ORG_NAME=Capstone-Projects-2023-Fall yarn start
```

## Collaborators

[//]: # ( readme: collaborators -start )
<table>
    <tr>
        <td align="center">
            <a href="https://github.com/JonathanAltenburg">
                <img src="https://avatars.githubusercontent.com/u/144725445?v=4" width="100;" alt="JonathanAltenburg"/>
                <br />
                <sub><b>Jonathan Altenburg</b></sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/Andy-Olshanky">
                <img src="https://avatars.githubusercontent.com/u/105177790?v=4" width="100;" alt="Andy-Olshanky"/>
                <br />
                <sub><b>Andy Olshanky</b></sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/tuk04480">
                <img src="https://avatars.githubusercontent.com/u/111888674?v=4" width="100;" alt="tuk04480"/>
                <br />
                <sub><b>Emma Pincus</b></sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/Ziyike1">
                <img src="https://avatars.githubusercontent.com/u/111989865?v=4" width="100;" alt="Ziyike1"/>
                <br />
                <sub><b>Ziyi Ke</b></sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/del-cj">
                <img src="https://avatars.githubusercontent.com/u/74061493?v=4" width="100;" alt="del-cj"/>
                <br />
                <sub><b>Carla Delima</b></sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/AlanU21">
                <img src="https://avatars.githubusercontent.com/u/74085921?v=4" width="100;" alt="AlanU21"/>
                <br />
                <sub><b>Alan Uthuppan</b></sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/jenniferlieu">
                <img src="https://avatars.githubusercontent.com/u/44854928?v=4" width="100;" alt="jenniferlieu"/>
                <br />
                <sub><b>Jennifer Lieu</b></sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/ApplebaumIan">
                <img src="https://avatars.githubusercontent.com/u/9451941?v=4" width="100;" alt="ApplebaumIan"/>
                <br />
                <sub><b>Ian Tyler Applebaum</b></sub>
            </a>
        </td>
    </tr>
</table>

[//]: # ( readme: collaborators -end )