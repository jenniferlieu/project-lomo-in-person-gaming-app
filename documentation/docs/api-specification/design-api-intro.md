---
sidebar_position: 1
description: What should be in this section.
---

Design Document - Part II API
=============================
# JSON Overview
# This will likely be changed as we hammer out the details / decide how we want to do this

## Users Class
### This will include a method to POST a user, a method to get all users, and a method to get a specific user by user_id
```js
"Users": { // Class for the users
  "user_id": int, // Unique identifier
  "email": "", // Registration
  "username": "", // Public identifier
  "password": "", // 3 guesses
  "first_name": "", // Registration (do we need this?)
  "last_name": "", // Registration (do we need this?)
  "profile": { // public information, filters, accountability
    "about me": "",
    "profile_pic": ""
    "beacons_hosted": [{beacon_id}],
    "beacons_attended": [{beacon_id}],
    "preferred_games":"",
    "preference_tags":"",
  },
  "friends": [{user_id}, {}]
}
```
## Beacon Class
### This will include a POST, a GET by beacon_id, and a GET by location (i.e. distance from a spot)
```js
"Beacons": {
  "beacon_id": int, // Unique identifier
  "host_id": "", // user_id of the User
  "title": "", // What is going to happen at the event (doubles practice, mario wonder, pokemans vgc, etc.)
  "game": {
    "game_title": "",
    "game_image": ""
  },
  "date": "",
  "time": "",
  "location":  {
    "description": "", // Address / Name of place
    "latitude": float, // For the map
    "longitude": float // For the map
   },
  "players_needed": int, // Amount of players wanted
  "players_attending": [{user_id}], // List of players attended
  "comments": { // A place of intelligent discussion and detailed politics
    "comment_id": int, // Unique identifier
    "beacon_id": int, // What beacon its connected to
    "user_id" :int, // user_id of the commenter
    "body": "", // The comment
    "timestamp: "" // Timestamp
  }
}
```
