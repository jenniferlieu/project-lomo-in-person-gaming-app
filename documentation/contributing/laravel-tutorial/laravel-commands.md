---
sidebar_position: 2
---
# Laravel Commands

This guide will use the `sail` command. For docker commands, check out the [Docker commands guide](/contributing/docker-commands).

## Run tests
```bash
sail artisan test
```

## View a list of API routes
```bash
sail artisan route:list
```

## Generate files

We don't actually need to manually create any files in Laravel. We can use the `sail artisan` commands to scaffold files for us in.

**Generate 3 files at once: Models, Migration, and Controllers:**
```bash
sail artisan -mrc make:model ModelName
```
- `-m` = make migration using model name
- `-c` = make controller using model name and connect it to the model class
- `-r` = add CRUD methods to the controller class

Example files generated with ModelName = User:
- Model: User
- Controller: UserController with CRUD functions and automatically connects the User model file
- Migration: create_users_table

**Generate FEATURE tests:**

Feature test files will be generated in the `app/tests/Feature/` folder.

```bash
sail artisan make:test FeatureTestName
```

**Generate models only:**
```bash
sail artisan make:model ModelName
```

**Generate controllers only:**
```bash
sail artisan make:controller ControllerName --resource
```
- `--resource`: generates skeletons of all the CRUD methods for you. without the option, it just generates the boilerplate file

**Generate events and event listeners:**

For more info, read the [Laravel event and event listener docs](https://laravel.com/docs/10.x/events)

First, add listeners and events to the `app/Providers/EventServiceProvider` file, then use the `event:generate` Artisan command. 

This command will generate any events or listeners that are listed in your EventServiceProvider that do not already exist:

```bash
sail artisan event:generate EventName
```