---
sidebar_position: 1
---

# System Overview
Keywords
Lomo is a social media application accessible through a mobile device or computer as a progressive web app. 

Abstract
It encourages and facilitates in-person gaming in a real time environment using geolocation on a 2d map and networking between users and their posts. 

High Level Requirement
When a user opens the app, they will see the interface of a 2d map in a top down perspective. A user can see a list of people that currently want to play games, and can choose to let others know they want to play something as well. When a user has a game they want to find people to play, they establish a “Beacon” that details how many people they want, what the game is, and a list of other factors that detail what those viewing the beacon can expect. Users can then apply to a beacon, with their name, supplies they can provide, and an optional attached message. Users will be able to browse beacons by category, distance, and by friends/groups only. Being friends with someone lets the user create more beacons tailored to them only, such as ones with more detailed and personal information. The user will also be able to adjust their preferences for their profile pertaining to games, controllers they have, and tags that tell others what they want to do. 

Background
This app is similar to Niantic Campfire, which is a companion app developed for Niantic games meant to facilitate in-person meetups for games like Pokemon Go. While many features in Pokemon Go require players to be in close proximity, the mainstream gaming environment today is primarily online. In many cases, I personally felt that there must be so many people that would want to play the same games together but miss out on finding each other. I want to turn this fear of missing out (FOMO) into a lack of missing out (LOMO). For those that want an in-person connection when gaming, Lomo is intended to be as non-invasive as possible, where only essential communication is used by the app to facilitate getting together. 

Conceptual Design
This will be a progressive web application using React. It will utilize geolocation as well as networking to connect users and their beacons to a server.

Required Resources
A background/understanding of web app development would be required. For software, React is most likely to be used. The utilization of APIs will also be required, such as a comprehensive list of games that the app can update and utilize. 
