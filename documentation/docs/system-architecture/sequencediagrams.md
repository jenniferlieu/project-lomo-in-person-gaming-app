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

## Use Case 7: User Blocks Another User
```mermaid
---
title: Blocking user
---
sequenceDiagram
   # initialize actors and participants
   actor user as User
   participant homePage as HomePage
   participant otherUserPage as otherUserPage
   participant apiMiddleware as API Middleware
   participant database as Database
   
   # search for user
   activate user
   activate homePage
   user->>homePage: User searches for other user

   # api call for user
   activate apiMiddleware
   homePage->>apiMiddleware: Search input is put into an API call

   activate database
   apiMiddleware->>database: API queries the database

   # database response
   database->>homePage: database returns results to homePage
   homePage-->>user: HomePage displays results to user
   deactivate database
   deactivate apiMiddleware

   # select user
   activate otherUserPage
   homePage->>otherUserPage: User selects other user
   deactivate homePage

   activate apiMiddleware
   otherUserPage->>apiMiddleware: User clicks "Block" button
   
   activate database
   apiMiddleware->>database: Insert blocked user

   databse->>otherUserPage: Returns success
   database-->>user: Displays success
   deactivate apiMiddleware
   deactivate database

   # end
   deactivate user
```

## Use Case 8: User friends Another User
```mermaid
---
title: Adding user as friend
---
sequenceDiagram
   # initialize actors and participants
   actor user as User
   participant homePage as HomePage
   participant otherUserPage as otherUserPage
   participant apiMiddleware as API Middleware
   participant database as Database
   
   # search for user
   activate user
   activate homePage
   user->>homePage: User searches for other user

   # api call for user
   activate apiMiddleware
   homePage->>apiMiddleware: Search input is put into an API call

   activate database
   apiMiddleware->>database: API queries the database

   # database response
   database->>homePage: database returns results to homePage
   homePage-->>user: HomePage displays results to user
   deactivate database
   deactivate apiMiddleware

   # select user
   activate otherUserPage
   homePage->>otherUserPage: User selects other user
   deactivate homePage

   activate apiMiddleware
   otherUserPage->>apiMiddleware: User clicks "Add friend" button
   
   activate database
   apiMiddleware->>database: Insert user into friends list

   databse->>otherUserPage: Returns success
   database-->>user: Displays other user friends list 
   deactivate apiMiddleware
   deactivate database

   # end
   deactivate user
```

**As a user, it's important to create a beacon so that I can find other users that meet the requirements of the beacon.**

1. The user taps the “create beacon” button
2. The user navigates the menu to describe the game, schedule, location and extra requirements like how 3. many people they want.
3. The user chooses whether the beacon is for friends or for everyone
4. After confirming all of the beacon’s info, the Beacon is placed on the map