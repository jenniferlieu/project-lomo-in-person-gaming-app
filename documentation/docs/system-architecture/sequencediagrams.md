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


## USE CASE 5: User Fills Out a Beacon Application 
 ```mermaid
    sequenceDiagram
    actor User
    participant BeaconPage
    participant CommentSection
    participant BeaconApply
    participant API Middleware
    participant Database
    participant FriendList  

    activate User
    User->>BeaconPage:User taps on on "Apply"

    activate BeaconPage
    BeaconPage->>BeaconApply:Display Beacon Application 

    activate BeaconApply
    BeaconApply-->>User:Displays Beacon Application
    User->>BeaconApply:Fills out application
    BeaconApply->>API Middleware: POST beaconApplication

    activate API Middleware
    API Middleware->>Database: insert beacon application
   
    activate Database
    Database-->>API Middleware: return success
    deactivate Database

    API Middleware-->>BeaconApply: return success
    deactivate API Middleware

    BeaconApply->>BeaconPage: User has applied to a beacon

    deactivate BeaconApply
    deactivate BeaconPage


    opt Comments on Beacon
    activate BeaconPage
        User->>+CommentSection:Comments
        CommentSection-->>-User:Replies
    end
    deactivate BeaconPage

    alt Notify Friend
        User->>FriendList:I have joined a beacon
    end

    
    User->>BeaconPage:Arrives
    activate BeaconPage
    BeaconPage->>BeaconApply: Open application

    activate BeaconApply
    BeaconApply-->>User:Displays application
    User->>BeaconApply: updates application
    BeaconApply->>API Middleware: PUT hasArrived 
    
    activate API Middleware
    API Middleware->>Database:update beaconApplication 

    activate Database
    Database-->>API Middleware: return Success
    deactivate Database

    API Middleware-->>BeaconApply:return success
    deactivate API Middleware
    
    BeaconApply->>BeaconPage: User has updated application
    deactivate BeaconApply

    deactivate BeaconPage

    deactivate User


 ```
 **As a user, I want to be able to apply a beacon.**
 
 1. The user fills out the application with an ETA, any controllers they can supply, and (automatically) their profile.
 2. The user (if enabled) notifies their friends that they have joined a beacon
 3. The user (optionally) comments on the beacon to communicate with the host and coordinate the event
 4. Once the user arrives, they mark it on the application, and leave the beacon’s space for others if the beacon hasn’t ended.


## USE CASE 6: User Reports an Unpleasant Experience 
```mermaid
    sequenceDiagram 
    actor User
    actor User2
    participant BeaconPage
    participant ReportPage 
    participant Administration
    participant API Middleware
    participant Database 

    alt User reports through Beacon
        activate User
        User->>+BeaconPage:User clicks on beacon

        BeaconPage->>+ReportPage:Open a report
        User->>ReportPage:User fills out report

        par Report sent to Administration
            ReportPage->>Administration:Report is sent to admins
        and Report sent to Database
            ReportPage->>+API Middleware: POST Report
            API Middleware->>+Database:insert report 
            Database-->>-API Middleware:return success
            API Middleware-->>-ReportPage:return success
        end
        
        ReportPage->>-User:Report is filed
        deactivate BeaconPage
        deactivate User

        alt Report is accurate
            Administration->>User2:User is suspended 
        end
    else User reports through other user's profile
        activate User
        User->>User2: Click on profile
        
        activate User2
        User->>+ReportPage:Report is opened
        User->>ReportPage:User fills out report

        par Report sent to Administration
            ReportPage->>Administration:Report is sent to admins
        and Report sent to Database
            ReportPage->>+API Middleware: POST Report
            API Middleware->>+Database:insert report 
            Database-->>-API Middleware:return success
            API Middleware-->>-ReportPage:return success
        end

        ReportPage->>-User:Report is filed

        deactivate User2
        deactivate User

        alt Report is accurate
            Administration->>User2:User is suspended 
        end
    end

```
**As a user, I want to be able to report a user who violates the community guildline.**

1. The user reports a user through either the beacon or the user’s profile
2. They will be prompted to check off a reason and any additional details through a text input
3. This report will be sent to administrators, if the report is found to be accurate, the offending user will be disciplined with a reduction in privileges or a complete suspension of the account.
