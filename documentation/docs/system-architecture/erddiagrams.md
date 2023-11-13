---
sidebar_position: 4
description: Database Diagram
---

# Database Diagram

```mermaid
---
title: Database Entity-Relationship-Diagram vers. omega-0.0.2
---
erDiagram
    users { 
        uuid id PK
        text email UK
        text username UK
        text password
        text avatar
    }

    users ||--|| profiles : "have only one"
    profiles {
        uuid id PK
        uuid user_id FK
        text about_me
        array preferred_games
        array preferred_tags
    }

    users ||--o{ friends : "have many"
    friends {
        uuid id PK
        uuid user_id FK
        uuid friend_id FK
    }
    
    users ||--o{ beacons : "host many"
    beacons {
        uuid id PK
        uuid host_id FK
        text title
        text game_title
        text game_system
        text description
        timestamp start_date_time
        timestamp end_date_time
        text address
        geography coordinates
        int players_needed
        timestamp created_at
        timestamp updated_at
    }

    users ||--o{ comments : "create many"
    beacons ||--o{ comments : "have many"
    comments {
        uuid id PK
        uuid user_id FK
        uuid beacon_id FK
        text body
        timestamp created_at
        timestamp updated_at
    }

    beacons ||--o{ attendees : "have many"
    attendees {
        uuid id PK
        uuid beacon_id FK
        uuid user_id FK
    }

    users ||--o{ reports : "have against them many"
    reports {
        uuid id PK
        uuid user_id FK
        uuid reported_id FK
        text body
        timestamp created_at
        timestamp updated_at
    }
```

#### Figure 1. Database Entity-Relation-Diagram

The app uses PostgreSQL as the database for its for its geospatial abilities that make it easier to query nearby locations using latitude and longitude coordinates.

- **users table** contains basic account information about the user
- **profiles table** contains more information about the user for their profile page
- **friends table** is a relationship table that maps a one to one relationship between users when they befriend each other
- **beacons table** contains all information about the beacon
- **comments table** contains a list of all comments made
- **attendees table** is a relationship that maps a one to one relationship between a user and the beacon event that they attended as a guest, not as a host
- **reports table** contains information about a report made by a user against another user (the reported user)