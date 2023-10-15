# Real Estate

The idea behind this application is to create a place where buyers and sellers can meet. In this
application the user can register an account, search for a real estate listing base of his/her
preference(s) and make an inquiry of the listing; and the admin can manage resources including
property listings, realtors and contact inquiries in the admin area. Here we are creating the front
end of the application that you can see live
[here](https://deploy-real-estate-app.lm.r.appspot.com). You can find the backend repository
[here.](https://github.com/DamyanBG/real-estate-flask-rest-api)

### Representation of the project in YouTube

https://www.youtube.com/watch?v=dR8qX2cMPcE&t=25s

## Getting Started

### Dependencies

##### Before start, you need install the following tools in your computer:

<img align="center" alt="GIT" height="25" width="35" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" style="max-width:100%;">[Git](https://git-scm.com)</img>

<img align="center" alt="NodeJS" height="25" width="35" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" style="max-width:100%;">[Node.js](https://nodejs.org/en/)</img>

##### It is also recommended to have a good code editor, like the following:

<img align="center" alt="VisualStudioCode" height="25" width="35" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/visualstudio/visualstudio-plain.svg" style="max-width:100%;">[VSCode](https://code.visualstudio.com/)</img>

### Installing on local machine

```bash

# Clone the repository
$ git clone https://github.com/DamyanBG/real-estate-react-app.git

# Enter the project folder in the terminal
$ cd real-estate-react-app

# Install all the dependencies
$ npm install

# Execute the appliction with this command
$ npm start

# The server will start in the port:3000
go to http://localhost:3000/

```

### Run the project with Docker

```bash

#Clone the integration repo
$ git clone https://github.com/DamyanBG/real-estate-integration

# Add .env files

# Build the image
$ docker-compose build

# Run the application
$ docker-compose up

```

### Integrate the backend

Since this is the Front end of the application, you will need the back end to run (since I do not host anymore the project on Azure).
To achieve this you have 3 options:

1. To install Python and PostgreSQL, to clone the backend and run the back end.
2. To install PostgreSQL and Docker and to use the container for the back end.
3. To instal Docker and to use containers for the back end for the database. I recommend this way, since there will be added
container for the NEXTCLOUD, which I am using to store the images.

## Contributing

First off, we would like to thank you for taking the time to contribute and make this a better
project!

This is perfect project for people with not so much experience in React. As such pull requests are
welcome. For major changes, please open an issue first to discuss what you would like to change. For
details about contributing you can access
[contributing.](https://github.com/DamyanBG/real-estate-react-app/blob/main/CONTRIBUTING.md)

And do not forget to enjoy and have fun!

## Authors

<a href="https://github.com/DamyanBG">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/93829069?v=4" width="100px;" alt=""/>
</a>
<a href="https://github.com/tihomirtx88">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/88166066?v=4" width="100px;" alt=""/>
</a>

## Used Technologies

Those following tools were used in the project development:

### **Application** ([ReactJS](https://reactjs.org/) + [Sass](https://sass-lang.com/))

-   **[ReactDom](https://reactjs.org/docs/react-dom.html)**
-   **[ReactRouter](https://reactrouter.com/en/main)**
-   **[ReactContext](https://reactjs.org/docs/context.html)**
