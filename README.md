# Overlook

A [Front-End Project](https://frontend.turing.io/projects/overlook.html) by [Jessica Justice](https://github.com/m1073496)



1. [Overview](#overview)
2. [Planning Resources](#planning-resources)
3. [Set Up](#set-up)
4. [Learning Goals](#learning-goals)
5. [Technologies](#technologies)
6. [Features](#features)
7. [Challenges](#challenges)
8. [Wins](#wins)
9. [Future Additions](#future-additions)


## Overview

This is a Turing School of Software and Design - Module 2 solo project.

The purpose of this project was to test knowledge of Mod 2 concepts, including iterator methods, unit-testing, making API requests, and implementing SASS and techniques to ensure users experience a responsive and intuitive design across multiple screen sizes. 

The project was Overlook, an app that tracks a user's hotel bookings at the fictitious Overlook hotel, including all their past and current room bookings and their corresponding information, as well as the total price they have spent on all their rooms to date. The app also gives users the ability to search for available rooms by date, to filter those results by room type, and to book any available rooms they would like. Room bookings made on the app are POSTed to the corresponding API, and the DOM is updated instantly. To get to their user dashboard, however, a user must first log in to the app by providing a username and password, and can later log out of the app when they are finished.


My task on this project was to build out the skeleton layout provided, as well as a log in page, including the responsiveness of the app on various screen sizes, to make for a better UI, as well as to write unit tests for each class I implemented for the app. All data used on the app I fetched with an API, and I implemented POST request functionality for booking rooms that subsequently updates the DOM. To style the app, I implemented SASS files, mixins, and variables to DRY up the code, and implemented a reset file so that the styling carries across multiple browsers. I also ensured that the user dashboard scores a 100% on the Lighthouse Accessibility audit.



## Planning Resources

* [Trello Project Board](https://trello.com/b/kAHi1zB5/kanban-template)
* [Balsamiq Wireframes](https://balsamiq.cloud/s7n551d/prk0r1/r2278)
* [Jam Board - Class Structure Outline](https://jamboard.google.com/d/1E7BeOAuH8xQxR1RJQ89Ik9NK7wHRkcgJGVZc2_LfjO0/viewer?f=0)


## Set Up (server and application must be running simultaneously)

### Overlook API Server

Clone down this repo: [Overlook API](https://github.com/turingschool-examples/overlook-api)

cd into directory and run:

```
npm install
```

To start the server, run:

```
npm start
```

### Overlook Application

Clone down this repository to your local machine, then install the library dependencies by running:

```
npm install
```


To start application, run:

```
npm start
```

If you see `Compiled successfully` in your terminal, the application is running and the app can be veiwed at `http://localhost:8080/` in your browser. Make sure this application, and the Overlook API server, are both running to ensure you see the right information displayed on the app.



### Logging In

  To log in to the app, you can choose any username between `customer1` through `customer50` with the password `overlook2021`.


## Learning Goals

* Webpack
* SASS
* Fetch API -> Making GET and POST requests/Error handling
* CSS Grid and Responsive design


## Technologies

* HTML
* CSS
* SASS
* Javascript
* Git
* GitHub
* Webpack
* Fetch API
* Lighthouse

---
## Features

+ [Log-In](#log-in)
+ [User Dashboard](#user-dashboard)
+ [Responsiveness](#responsiveness)


## Log-In


![](https://media.giphy.com/media/9oz1m9y304Gx21GS3x/giphy.gif)


## User Dashboard


![](https://media.giphy.com/media/rLU2vF8QP39gy07aaW/giphy.gif)


## Responsiveness

![](https://media.giphy.com/media/LlfJl59IjapuzuWGDY/giphy.gif)

![](https://media.giphy.com/media/LMPWqjBjI7x2KLciy4/giphy.gif)





---
## Challenges

* Making POST requests
* Implementing proper error handing for fetch requests
* Styling

---
## Wins

* Getting a better understand of the fetch API
* Creating log in and log out functionality (the latter is my own extension)
* Implementing a date picker
* Writing all of the code in 3 days!

---
## Future Iterations

* Better styling 😅
* Implement an intermediary view that lets the user know their room was booked before returning to the dashboard view
* Implementing the Manager extension:
  - Creating a manager log in who can add or remove booking for individual customers
