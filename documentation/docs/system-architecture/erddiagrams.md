---
sidebar_position: 4
description: Database Diagram
---

# Database Diagram

```mermaid
---
title: Database Entity-Relationship-Diagram
---
erDiagram
    USERS ||--|| profile : contains
    USERS { 
        int user_id
        string email
        string password
        string username
        string first_name
        string last_name
        string avatar
        list friends
        object profile
    }

    USERS ||--|| profile : contains
    profile {
        string about
        list beacons_hosted
        list beacons_attended
    }

    profile ||--|| beacon_hosted : contains
    beacon_hosted {
        int beacon_id
        string title
        string image
    }

    profile ||--|| beacon_attended : contains
    beacon_attended {
        int beacon_int
        string title
        string image
    }

    USERS ||--o{ friend : contains
    friend {
        int user_id
        int username
        string avatar
    }

    USERS }o--o{ BEACONS : "hosts or attends"
    BEACONS {
        int beacon_id
        int host_id
        string title
        string image
        string game
        string description
        date date_time
        string location
        int num_players_needed
        list waitlist
        list players_attended
        list comments
    }

    BEACONS ||--|| waitlist : contains
    waitlist {
        int user_id
        string username
        string avatar
    }

    BEACONS ||--|| player_attended : contains
    player_attended {
        int user_id
        string username
        string avatar
    }

    BEACONS ||--o{ comment : contains
    comment {
        int user_id
        string username
        string avatar
        date timestamp
        string comment_body
    }

    USERS ||--o{ REPORTS : "has against them"
    REPORTS {
        int reportee_id
        int reported_id
        date timestamp
        string report_body
    }
```

#### Figure 1. Database Entity-Relation-Diagram for NoSQL database

The MongoDB database has 3 tables: [Users](#users-table), [Beacons](#beacons-table), and [Reports](#reports-table).

The Users table contains data about the users such as their account data, user profile data, and friends data.

The Beacons table contains data about the beacons such as beacon information, waitlist, a history of all the users who attended the beacon, and a list of all the comments posted on the beacon from users.

The Reports table contains data about user reports about another using.

## Users table
```json
"Users": {
    "user_id": 0,
    "email": "",
    "username": "",
    "password": "",
    "first_name": "",
    "last_name": "",
    "avatar_image": "",
    "profile": {
        "about": "",
        "beacons_hosted": [
            {
                "beacon_id": 0,
                "title": "",
                "image": "",
            },
        ],
        "beacons_attended": [
            {
                "beacon_id": 0,
                "title": "",
                "image": "",
            },
        ],
    },
    "friends": [
        {
            "user_id": 0,
            "username": "",
            "avatar": "",
        }
    ]
}
```
#### Figure 2. Users JSON schema
The Users schema contains all the information about the app's user from account data such as email, username, password, first_name, last_name, and avatar. And then the [profile object](#profile) for the user's profile a [friends list](#friends) of all of their friends.

The user_id acts as a primary key and is unique. The email and the username are also unique as well.

#### profile
The profile object contains data that will be displayed to the user's profile such as their about me section, a list of beacons that they hosted, and a list of beacons that they attended. Each item in the list contains an object with some fields from the [Beacons](#beacons-table) schema: {beacon_id, title}.

#### friends
The friends list contains a list of other users that the user is friends with. Each item in the list is an object with some fields from the [Users](#users-table) schema: {user_id, username, avatar}.

#### beacons_hosted
The beacons hosted list contains a list of all the beacon events that the user has hosted/created. Each item in the list is an object with some fields from the [Beacons](#beacons-table) schema. {beacon_id, title, iamge}

#### beacons_attended
The beacons attended list contains a list of all the beacon events that the user attended. Each item in the list is an object with some fields from the [Beacons](#beacons-table) schema: {beacon_id, title, iamge}

## Beacons table
```json
"Beacons": {
    "beacon_id": 0,
    "host_id": 0,
    "title": "",
    "image": "",
    "game": "",
    "date_time": Date(),
    "location": "",
    "num_players_needed": 0,
    "waitlist": [
        {
            "user_id": 0,
            "username": "",
            "avatar": "",
        },
    ],
    "players_attended": [
        {
            "user_id": 0,
            "username": "",
            "avatar": "", 
        },
    ],
    "comments": [
        {
            "user_id": 0,
            "username": "",
            "avatar": "",
            "timestamp": Date(),
            "comment_body": "",
        },
    ]
}
```
#### Figure 3. Beacons JSON schema

The Beacons schema contains all data about a beacon event that will be displayed on the Beacons' Page. It also has all the comments associated with the beacon. It contains the [waitlist](#waitlist), [players attened list](#players_attended), and the [comments list](#comments).

The beacon_id is the primary key and is unique.

#### waitlist
The wait list contains a list of all users who wants to the join the beacon event. Each item in the list is an object with some fields from the [Users](#users-table) schema: {user_id, username, avatar}.

#### players_attended
The players attended list contains a list of all users who were accepted by the host and attended the beacon event. Each item in the list is an object with some fields from the [Users](#users-table) schema: {user_id, username, avatar}.

#### comments
The comments list contains a list of all comments posted by users on the beacon's page, for the beacon. Each item in the list is a comment object with its own fields and with some fields from the [Users](#users-table) schema: {user_id, username, avatar, timestamp, comment_body}. 


## Reports Schema
```json
"Reports":{
    "reportee_id": 0,
    "reported_id": 0,
    "timestamp": Date(),
    "report_body": "",
}
```
#### Figure 4. Reports JSON Schema

The Reports schema contains data about a user who has been reported for harassment and/or unsafe or inapproprate beacon events. It contains data about the the user who reported them, and the user who was reported on as well as the timestamp and the report itself.

## Datatype Conversion from MongoDB to PHP
- **String**: Converted to PHP string.
- **Integer (Int32)**: Converted to PHP integer.
- **Long (Int64)**: Converted to PHP float for 64-bit integers (since PHP's `int` is 32-bit).
- **Double**: Converted to PHP float.
- **Boolean**: Converted to PHP boolean.
- **Date**: Converted to PHP `DateTime` object.
- **Array**: Converted to PHP array.
- **Embedded Document (Subdocument)**: Converted to PHP associative array or object.
- **ObjectId**: Converted to PHP string (hex representation).
- **Binary Data**: Converted to PHP binary data.
- **Decimal128**: Converted to PHP string (MongoDB's Decimal128 is precise and can have more significant digits than PHP float).
- **Undefined**: Converted to PHP `null`.
- **MinKey**: Converted to PHP `null`.
- **MaxKey**: Converted to PHP `null`.
- **Regular Expression**: Converted to PHP string (regex pattern).