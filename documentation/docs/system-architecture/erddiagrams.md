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
    USERS { 
        int user_id PK
        string email UK
        string password
        string username
        string first_name
        string last_name
        list friends
        object profile
    }

    USERS ||--|| profile : contains
    profile {
        string about
        list beacons_hosted
        list beacons_attended
    }

    profile ||--|| beacons_hosted : contains


    USERS ||--o{ friend : contains
    friend {
        int user_id FK
        int username FK
    }

    USERS }o--o{ BEACONS : "host or attend"
    BEACONS {
        int beacon_id PK
        int host_id FK
        string title
        string image
        string description
        string game
        string date_time
        string location
        int num_players_needed
        list players_waitlist
        list players_attended
        list comments
    }

    BEACONS ||--o{ comment : contains
    comment {
        int user_id FK
        string timestamp
        string comment_body
    }
```

### Users
#### JSON schema
```json
"Users": {
    "user_id": int,
    "email": "",
    "username": "",
    "password": "",
    "first_name": "",
    "last_name": "",
    "profile": {
        "about me": "",
        "beacons_hosted": [{beacon_id, beacon_name}, {}],
        "beacons_attended": [{beacon_id, beacon_name}, {}],
    },
    "friends": [{user_id, user_name}, {}]
}
```

### Beacons