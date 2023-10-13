---
sidebar_position: 2
---
# Setup Instructions

Instructions on how to setup a local instance of the app.

## System requirments and prerequisites
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
- git 2+
- (For Windows machines only) WSL2 + Ubuntu 22.04.3 LTS (Jammy Jellyfish)
   1. [Install WSL2 with Ubuntu 22.04.2 LTS](https://www.youtube.com/watch?v=28Ei63qtquQ)
   2. [Setup Docker Desktop with WSL2](https://docs.docker.com/desktop/wsl/)
   3. If using Visual Studio Code, [setup WSL2 with vscode](https://code.visualstudio.com/docs/remote/wsl) and install the "WSL extension" into the WSL's version of vscode.

## Setup local machine

For frontend development, **make sure you're in the `frontend/` folder**.

For backend development, **make sure you're in the `backend/` folder**.

For documentation, **make sure you're in the `documentation/` folder**.


### 1. Git clone the repo
```bash
git clone https://github.com/Capstone-Projects-2023-Fall/project-lomo-in-person-gaming-app.git
```

### 2. Setup frontend
1. Go to the `frontend/` folder
2. Install node dependencies:
   ```bash
   npm install
   ```
3. Copy the `.env.example` file and name it `.env` **! IMPORTANT !** secret keys are pinned in Discord

### 3. Setup backend
1. Go to the `backend/` folder
2. Start the Docker Desktop application (Docker Desktop must be running the background to run any docker commands)
3. Install composer dependencies (composer is a package manager for php)
   ```bash
   docker run --rm -u "$(id -u):$(id -g)" -v "$(pwd):/var/www/html" -w /var/www/html laravelsail/php82-composer:latest composer install --ignore-platform-reqs
   ```
4. Copy the `.env.example` file and name it `.env` **! IMPORTANT !** secret keys are pinned in Discord
5. Build the image and start the docker container (in detached mode)
   ```bash
   ./vendor/bin/sail up -d
   ```
6. Go to http://localhost in your browser to view the backend UI

To stop the container: from your terminal, run `./vendor/bin/sail down`

#### (Optional) Setup sail alias
In order to use the `sail` command, it has to be completely typed out: `./vendor/bin/sail <command>`

**If you want to use the docker commands, don't setup the alias.** Refer to the **Exceute commands in conatiner** guide for executing laravel commands in docker. For simplicity, all guides will use `sail` commands.

If you want to use the sail command, then you can continue to use `./vendor/bin/sail` or setup an alias to shortend it to `sail`.
- To setup the alias run:
   ```bash
   alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'
   ```

### 4. Setup docusaurus
1. Go to `documentation/` folder
2. Install node dependencies:
   ```bash
   yarn install
   ```

## Run

### Run the app
1. **Start the backend server**
   ```bash
   ./vendor/bin/sail up -d
   ```
2. **Start frontend development server**
   ```bash
   npm start
   ```
3. Go to https://localhost:3000 to see the frontend server

### Stop running the app
1. **Stop docker**
   ```bash
   ./vendor/bin/sail down
   ```
2. **Stop the react server**: enter `Ctrl+C` into the terminal running the react server.

### Run docusaurus
Go into the `documentation/` folder and run:
```bash
export PROJECT_NAME=project-lomo-in-person-gaming-app && yarn start
```

## Troubleshooting for setting up the backend on Windows 
If you **CANNOT RUN THE DOCKER COMMAND TO INSTALL COMPOSER DEPENDENCIES**, (supported solution) you must git clone the project in the WSL's virtual machine instead of crossing over to the Windows files and folders. 
- (Unsuported solution) If you wish to use the repo on your Windows filesystem AND already have PHP 8.2.10 and composer installed on your development machine, then run `composer install --ignore-platform-reqs` to install the composer dependencies. Just remember to use the `sail` or `docker` commands when running any `php` or `composer` commands AFTER the Docker container is setup so that the commands run inside the docker container and NOT on your machine! 

If you **get a PERMISSIONS type error for `/var/www/html/storage`**, you need to change the permissions and owner of the `storage/` folder (only do this on the development machine!). In the container's terminal (Docker Desktop Dashboard > "Containers" tab > laravel.test > "exec" tab), run these commands in order:

```bash
# enter the bash command line
bash

# recursively change permissions on storage to allow read,write,execute for owner and group
chmod -R 775 storage/

# recursively change owner and group to root
chown -R root:root storage/

# setup the storage link between storage/ and public/storage folders
php artisan storage:link

# clear the cache and config
php artisan cache:clear
php artisan config:clear
```