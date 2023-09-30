---
sidebar_position: 3
description: Sequence diagrams for all use cases.
---

# Sequence Diagrams

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
   createBeaconPage->>apiMiddleware: POST ('api/beacon')
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