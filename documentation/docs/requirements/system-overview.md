---
sidebar_position: 1
---

# System Overview
## Keywords
Lomo, gaming, social media, social gaming, web app, geolocation, map, real-time, networking

## Abstract
LOMO facilitates in-person gaming in a real time environment using geolocation on a 2d map and networking between users and their posts. This service is made to address those who want to play games that have little to no online functionality and those who want to make friends beyond exclusively online environments. 

When a user opens the app, they will see the interface of a 2d map in a top down perspective. A user can see a list of people that currently want to play games, and can choose to let others know they want to play something as well. When a user has a game they want to find people to play, they establish a “Beacon”. A beacon within LOMO is an circular icon on the map that represents an event or gathering that someone wants to host for any game. It will detail how many people they want, what the game is, and a list of other factors that detail what those viewing the beacon can expect. Users can then apply to a beacon, with their name, supplies they can provide, and an optional attached message. Users will be able to browse beacons by category, distance, and by friends/groups only. Being friends with someone lets the user create more beacons tailored to them only, such as ones with more detailed and personal information. The user will also be able to adjust their preferences for their profile pertaining to games, controllers they have, and tags that tell others what they want to do.


## High Level Requirement

## Background
This app is similar to Niantic Campfire, which is a companion app developed for Niantic games meant to facilitate in-person meetups for games like Pokemon Go. While many features in Pokemon Go require players to be in close proximity, the mainstream gaming environment today is primarily online. Where Niantic Campfire is meant for games that require outside and in-person gameplay. Lomo is meant for games that can be often difficult to play in-person with others.

In many cases, there are people that, as much as they want to make in-person friends and play in-person games, they have a hard time finding a good method to do so. The name LOMO is inspired by the term FOMO, which stands for “fear of missing out”. For those that want an in-person connection when gaming, Lomo is intended to be as non-invasive as possible, where only essential communication is used by the app to facilitate getting together. 

## Conceptual Design
This will be a progressive web application using React as a frontend with Laravel PHP serving as our backend. Our backend will use MongoDB for establishing and maintaining a database. Laravel provides many built-in functions that can be expanded on to meet the needs of the project in a more productive fashion.

## Required Resources
A background/understanding of web app development would be required. For software, React is most likely to be used. The utilization of APIs will also be required, such as a comprehensive list of games that the app can update and utilize. Everyone will need proper workspaces such as laptop or desktop computers compatible with our software. Software requirements include Docker, Git and Github.

