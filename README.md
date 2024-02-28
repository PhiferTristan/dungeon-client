# Dungeon Docs App

Dungeon Docs is a full-stack application with full CRUD functionality for my Backend Capstone Project at Nashville Software School. I've played Dungeons & Dragons since I was a teenager back in 2006, and I've always loved the online tools that became available over time to play the tabletop game. The character creation process seemed a little time consuming, in my opinion, and you were limited to a number of characters to create. I figured the backend project would be the perfect time to have my go at building an application for this purpose. The main goal of this app is for users to quickly create characters for Dungeons & Dragons 5th Edition SRD when they sign-up as "Player" users, and for "Parties" to be created and maintained by users that sign-up as "Dungeon Master" users.  

### Player Users

Users may sign-up as a Player with the following actions:

- View a list of Dungeon Masters with their Looking for Players Status shown
- View a list of Parties with their Looking for Players Status shown
- View, join, or leave Parties
- Create, edit, or delete Characters following the 5th Edition SRD rules
- View a list of all Characters
- Edit or delete their profile

### Dungeon Master Users

Users may also sign-up as a Dungeon Master with the following actions:

- View a list of Players and see if they are actively looking for a party
- View a list of all Parties
- Create, edit, or delete Parties
- View a list of Characters
- Edit or delete their profile

## Technologies

- HTML
- Tailwind CSS
- Javascript
- ReactJS
- Python
- Django

## How to use the application

In your terminal, navigate to the directory you wish to create the app in and type:

`git clone git@github.com:PhiferTristan/dungeon-client.git`

Once it has been cloned down, cd into that directory and install any additional dependencies by running the line:

`npm install`

This project uses a backend developed in Python/Django for the api running on port 8000. You will need to follow the "Installation" directions to get the api running after clicking this [link](https://github.com/PhiferTristan/dungeonproject).

Once all the dependencies are installed and you have the api running on port 8000, from the source directory run:

`npm run dev`

You may now sign-up and begin using the application.
