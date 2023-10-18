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
        string username
        string password
        string first_name
        string last_name
        object profile
        list friends
    }

    USERS ||--|| profile : contains
    profile {
        string about_me
        string profile_pic
        list beacons_hosted
        list beacons_attended
        list preferred_games
        list preferred_tags
    }

    profile ||--|| beacon_hosted : contains
    beacon_hosted {
        int beacon_id
        string title
        string game_image
    }

    profile ||--|| beacon_attended : contains
    beacon_attended {
        int beacon_id
        string title
        string game_image
    }

    USERS ||--o{ friend : contains
    friend {
        int user_id
        int username
        string profile_pic
    }

    USERS }o--o{ BEACONS : "hosts or attends"
    BEACONS {
        int beacon_id
        int host_id
        string title
        object game
        string description
        date date_time
        object location
        int players_needed
        list players_attended
        list comments
    }

    BEACONS ||--|| game : contains
    game {
        list game_title
        list game_image
    }

    BEACONS ||--|| location : contains
    location {
        string description
        float latitude
        float longitude
    }

    BEACONS ||--|| players_attending : contains
    players_attending {
        int user_id
        string username
        string profile_pic
    }

    BEACONS ||--o{ comment : contains
    comment {
        int user_id
        int beacon_id
        string username
        string profile_pic
        date timestamp
        string body
    }

    USERS ||--o{ REPORTS : "has against them"
    REPORTS {
        int reportee_id
        int reported_id
        date timestamp
        string body
    }
```

#### Figure 1. Database Entity-Relation-Diagram for NoSQL database

The MongoDB database has 3 tables: [Users](#users-table), [Beacons](#beacons-table), and [Reports](#reports-table).

The Users table contains data about the users such as their account data, user profile data, and friends data.

The Beacons table contains data about the beacons such as beacon information, waitlist, a history of all the users who attended the beacon, and a list of all the comments posted on the beacon from users.

The Reports table contains data about user reports about another using.

## Users Table
The Users table contains all the information about the app's user from account data such as email, username, password, first_name, last_name, and avatar. And then the [profile object](#profile) for the user's profile a [friends list](#friends) of all of their friends.

The user_id acts as a primary key and is unique. The email and the username are also unique as well.

#### profile
The profile object contains data that will be displayed to the user's profile such as their about me section, a list of beacons that they hosted, and a list of beacons that they attended. Each item in the list contains an object with some fields from the [Beacons](#beacons-table) table.

#### friends
The friends list contains a list of other users that the user is friends with. Each item in the list is an object with some fields from the [Users](#users-table) table.

#### beacons_hosted
The beacons hosted list contains a list of all the beacon events that the user has hosted/created. Each item in the list is an object with some fields from the [Beacons](#beacons-table) table. 

#### beacons_attended
The beacons attended list contains a list of all the beacon events that the user attended. Each item in the list is an object with some fields from the [Beacons](#beacons-table) table.

## Beacons Table
The Beacons table contains all data about a beacon event that will be displayed on the Beacons' Page. It also has all the comments associated with the beacon. It contains the [waitlist](#waitlist), [players attened list](#players_attended), and the [comments list](#comments).

The beacon_id is the primary key and is unique.

#### waitlist
The wait list contains a list of all users who wants to the join the beacon event. Each item in the list is an object with some fields from the [Users](#users-table) table: {user_id, username, avatar}.

#### players_attended
The players attended list contains a list of all users who were accepted by the host and attended the beacon event. Each item in the list is an object with some fields from the [Users](#users-table) table: {user_id, username, avatar}.

#### comments
The comments list contains a list of all comments posted by users on the beacon's page, for the beacon. Each item in the list is a comment object with its own fields and with some fields from the [Users](#users-table) table: {user_id, username, avatar, timestamp, comment_body}. 


## Reports Table
The Reports table contains data about a user who has been reported for harassment and/or unsafe or inapproprate beacon events. It contains data about the the user who reported them, and the user who was reported on as well as the timestamp and the report itself.

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