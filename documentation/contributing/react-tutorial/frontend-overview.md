---
sidebar_position: 1
---
# Frontend Overview

- Uses Tailwind CSS to style the components. Refer to the [Tailwind CSS docs](https://tailwindcss.com/docs/installation) for css class names, ids, or [UI components](https://tailwindui.com/components?ref=sidebar) like buttons, forms, etc.
- Uses a http-request library to make HTTP API calls

This guide is meant to provide a general understand of how React works and start coding as quickly as possible.

To learn more about React, consult the [React docs](https://react.dev/).

## React concepts
- React is all about building reusable UI components. A component is a self-contained, independent piece of the user interface.
- React components are often written in JSX. JSX is a syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript files.
- `App.js` is the main component. It acts similar to the main class in Java. All other components are child components to the `App.js`
- Parent component = the one importing the component
- Child component = the compontent imported

## React files and folders
- `src/` is the main folder for all the code
- new components `.js` files can be created in the `src/` folder or in the `components/` folder, but that's a convention decided by the frontend team
- import paths are usually relative to the location of the parent component, so if using the `components/` paths will need to be managed somehow