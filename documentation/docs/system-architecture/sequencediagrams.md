---
sidebar_position: 3
description: Sequence diagrams for all use cases.
---

# Sequence Diagrams
## Use Case 1: User Creates an Account

```mermaid
   sequenceDiagram
   actor User
   participant HomePage
   participant AccountCreationPage
   participant Database

    activate User
    User->>HomePage: User Clicks "Create Account Button"
    deactivate User

    activate HomePage
    HomePage->>AccountCreationPage:Prompt Display please!
    deactivate HomePage
   
    activate AccountCreationPage
    AccountCreationPage->>User:EnterDetailsPlease
    deactivate AccountCreationPage

    activate User
    User->>AccountCreationPage: *EntersDetails"
    deactivate User

    activate AccountCreationPage
    AccountCreationPage->>Database: *Enters Info*
    deactivate AccountCreationPage
    Database->>User: Account Created
```
## Use Case 2: User Logs In
```mermaid
   sequenceDiagram
   actor User
   participant HomePage
   participant LoginPage
   participant Database


   activate User
   User->>HomePage: User Clicks "Log In Button"
   deactivate User

   activate HomePage
   HomePage->>LoginPage:Prompt Display please!
   deactivate HomePage
   
   activate LoginPage
   
   LoginPage->>Database: *requests details*
   activate Database
   Database->>LoginPage:GivesDetails for check
   
   
   LoginPage->>User:EnterDetailsPlease
   deactivate LoginPage

   activate User
   User->>LoginPage: *EntersDetails*
   deactivate User

   activate LoginPage
   LoginPage->>Database: *EntersDetails*
   deactivate LoginPage
   
   Database->>Database: Checks for correct details
   loop Wrongloop
        Database->>Database: WrongCredentials
        
        Database->>LoginPage: *Display WrongCredentials*
        activate LoginPage
       
            loop Reprompt 
            
                LoginPage->>User:EnterDetailsPlease
                deactivate LoginPage
                activate User
                User->>LoginPage: *EntersDetails*
                activate LoginPage
                deactivate User
                LoginPage->>Database: *EntersDetails*
                deactivate LoginPage
                Database->>Database: Checks for correct details
            end
    end

    Database->>Database: CorrectCredentials
    deactivate Database
    Database->>User: Access Granted
    
   
```

## Use Case 3: User Creates a Beacon
```mermaid
---
title: Beacon Creation
---
sequenceDiagram
   # initialize actors and participants
   actor user as User
   participant homePage as HomePage
   participant createBeaconPage as CreateBeaconPage
   participant apiMiddleware as API Middleware
   participant database as Database
   
   # click "create beacon" button
   activate user
   user->>homePage: User clicks "Create Beacon" button

   # display to beacon creation page
   activate homePage
   homePage->>createBeaconPage: Switch display to "Create a beacon" page
   deactivate homePage
   
   activate createBeaconPage
   createBeaconPage-->>user: Display beacon creation form to the user
   
   # user fills out the form and submits it
   user->>createBeaconPage: User fills out the form and submits it

   # POST new beacon to middleware
   createBeaconPage->>apiMiddleware: POST beacon
   activate apiMiddleware
   
   # insert new beacon into database
   apiMiddleware->>database: Insert new beacon
   activate database

   # return success
   database-->>apiMiddleware: Return success
   deactivate database

   apiMiddleware-->>createBeaconPage: Return success
   deactivate apiMiddleware

   createBeaconPage-->>user: Display success
   deactivate createBeaconPage

   # end
   deactivate user
```

**As a user, it's important to create a beacon so that I can find other users that meet the requirements of the beacon.**

1. The user taps the “create beacon” button
2. The user navigates the menu to describe the game, schedule, location and extra requirements like how 3. many people they want.
3. The user chooses whether the beacon is for friends or for everyone
4. After confirming all of the beacon’s info, the Beacon is placed on the map