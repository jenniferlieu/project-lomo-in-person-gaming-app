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

1. **Install these onto your machine:**
   - Docker Desktop
   - npm
2. **Git clone this repo**
3. **Install frontend dependencies:**
   1. `cd frontend`
   2. `npm install`

    This will install all the dependencies listed in the `frontend/package.json` file. You need to install dependencies the first time. Then after that, whenever the `frontend/package.json` file gets updated with new dependencies.
4. **Start backend dependencies:**
   - Open Docker Desktop

    Docker Desktop **must** be running in the background in order to actually run any docker commands.
5. **Run app**
   1. Open Docker Desktop
   2. Start laravel server by starting the docker container `cd backend && sail up -d`
      - Alternatively, you can use the docker command `docker compose up -d`
   3. Start ReactJS `cd frontend && npm start`
   4. Go to http://localhost:3000 to view the user interface (React frontend)
6. **To stop the running app:**
   - Shutdown the larvel server by stopping the docker container: `cd backend && sail down`
     - Alternatively, you can use the docker command `docker compose down`
   - Shutdown ReactJS: `Ctrl+C` in the shell running ReactJS

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
