---
sidebar_position: 2
---

# Class Diagrams

## App Mockup
![Image of the home page mockup](https://github.com/Capstone-Projects-2023-Fall/project-lomo-in-person-gaming-app/assets/44854928/e04277b1-2799-41e4-b6f9-1bb9b4c9ee34)

The homepage can be divided into 3 sections: header, map, and footer.

The header displays important navigation icons such as the user icon and the friends icon. The user icon will take the user to the user's page. And the friends icon will take the user to their friends list.

Beacons can be viewed in 2 ways: a map view and a list view displaying available beacons. The map view is the default view and displays beacons near the user. The list view can be pulled up as an overlay from the footer to show a list of beacons. Users also have the option to filter beacons by "nearby" or "recommended".

When a beacon is clicked, a popup will display important information about the beacon at a glance. When a pop up beacon is clicked, it will display a full screen beacon page with all information and a comment section.

## Frontend class diagram
```mermaid
---
title: Frontend class diagram
---
classDiagram
    %% -- establish connections -- %%
    
    %% top level page views %%
    App *-- SignupPage
    App *-- HomePage
    App *-- BeaconPage
    App *-- CreateBeaconPage
    App *-- AccountPage
    App *-- FriendsPage

    %% page components %%
    HomePage *-- MapContainer
    MapContainer *-- BeaconCircle

    HomePage *-- ListViewContainer
    ListViewContainer *-- ListView

    FriendsPage *-- FriendsList

    %% --------------------------------- %%
    %% -- class variables and methods -- %%

    class SignupPage{
        + login()
        + signup()
        + fetch('api/user', GET)
        + fetch('api/user', POST, JSON)
    }

    class HomePage{
        + fetch('api/user', GET)
    }

    class MapContainer{
        + fetch('api/nearby_beacons', GET)
        + fetch('googleAPI', GET)
    }

    class BeaconCircle{
        + fetch('api/beacon', GET)
    }

    class ListViewContainer{
        + fetch('api/nearby_beacons')
        + fetch('api/all_beacons')
    }

    class BeaconPage{
        + fetch('api/beacon', GET)
        + fetch('api/beacon', POST, JSON)
        + fetch('api/beacon', PUT, JSON)
        + fetch('api/beacon', DELETE)
    }

    class CreateBeaconPage{
        + fetch('api/beacon', POST)
    }

    class AccountPage{
        + fetch('api/user', GET)
        + fetch('api/user', POST, JSON)
        + fetch('api/user', PUT, JSON)
        + fetch('api/user', DELETE)
        + logout()
    }

    class FriendsPage{
        + fetch('api/all_friends', GET)
        + fetch('api/recent_friends', GET)
    }

    
```

## Backend class diagram
```mermaid
---
title: Backend class diagram
---
classDiagram
    %% -- establish connections -- %%

    %% top level connections %%%
    api *-- DatabaseSeeder

    %% database connections %%
    DatabaseSeeder *-- database
    DatabaseSeeder *-- UserFactory
    DatabaseSeeder *-- BeaconFactory
    DatabaseSeeder *-- CommentFactory
    DatabaseSeeder *-- ReportFactory
    
    %% --------------------------------- %%
    %% -- class variables and methods -- %%

    class api {
        %% UserFactory %%
        - GET('api/user'): JSON
        - POST('api/user'): JSON
        - PUT('api/user'): JSON
        - DELETE('api/user'): JSON

        %% BeaconFactory %%
        - GET('api/beacon'): JSON
        - POST('api/beacon'): JSON
        - PUT('api/beacon'): JSON
        - DELETE('api/beacon'): JSON
        - GET('api/all_beacons'): JSON
        - GET('api/nearby_beacons'): JSON
        - GET('api/recommended_beacons'): JSON

        %% CommentFactory %%
        - GET('api/comment'): JSON
        - POST('api/comment'): JSON
        - PUT('api/comment'): JSON
        - DELETE('api/comment'): JSON

        %% ReportFactory %%
        - POST('api/report'): JSON
    }

    class database{
        + array connections
    }

    %% database/DatabaseSeeder.php %%

    class UserFactory{
        + defintions(): array 
        + unverified(): array
        + getUser(): array
        + insertUser(): array
        + updateUser(): array
        + deleteUser(): array
        + getFriends(): array
    }

    class BeaconFactory{
        + defintions(): array 
        + getBeacon(): array
        + insertBeacon(): array
        + updateBeacon(): array
        + deleteBeacon(): array
        + getAllBeacons(): array
        + getRecommendedBeacons(): array
        + getNearbyBeacons(): array
    }

    class CommentFactory{
        + defintions(): array
        + getComments(): array
        + insertComment(): array
        + updateComment(): array
        + deleteComment(): array
    }

    class ReportFactory{
        + defintions(): array
        + insertReport(): array
    }
```