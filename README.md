# Node.js-opdracht
 


## Installation
> [!warning]
>Before installing, make sure you have Node, Express and mongoDB installed

Use git clone with the URL of this page in the directory where you want to install the page. After installing navigate to the project
using ``` CD route/to/the/project/Node.js-opdracht ```

Run ``` npm install  ```
this will install all packages 

Now you can open the project and connect it to a mongoData Base, 

run this in your terminal  ``` npm start ``` make sure you are in the Directory of the project. in the terminal you will se the port the server is running on. (standard 3000).

in your prowser, Type: ``` localhost:3000 ```. this will bring you to the root of the site. Here you will find the API Documentation and all the used endpoints.


## Introduction
I used inspiration fromm another project (Laravel-project_Backend-web) to create this one. The Project uses CRUD interfaces where u can create new entities, open edit and delete them.
This project is focusd on a data driven API. Since this is not for a design course i used ChatGPT to spare some time creating this website to help me with the CSS (Sources)





## Sources


## CSS source
I am unable to share the full chat of ChatGPT since i used a screenshot.

```![image](https://github.com/user-attachments/assets/b40516de-6de2-4c05-bda4-fded46d57548)```

This is the last message with ChatGPT to aid with CSS.
```
Here's the updated CSS with the body background color set to `#f5f5f5` and uniform button sizes for "View Details," "Edit," and "Delete" buttons:

```css
/* General Styles */
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5; /* Updated background color */
    color: #333;
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: 20px auto;
}

h1, h2, h3, h4 {
    color: #222;
    margin-bottom: 15px;
}

/* Navigation */
nav {
    background-color: #007BFF;
    color: #fff;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-brand a {
    color: #fff;
    font-size: 1.5rem;
    text-decoration: none;
}

.nav-links a {
    color: #fff;
    margin-left: 20px;
    text-decoration: none;
}

.nav-links a:hover {
    text-decoration: underline;
}

/* Games Grid */
.games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.game-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 15px;
    text-align: center;
}

.game-card img {
    max-width: 100%;
    border-radius: 5px;
    margin-bottom: 15px;
}

.game-card h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #007BFF;
}

.game-card p {
    margin: 5px 0;
    color: #555;
}

.card-actions {
    margin-top: 10px;
}

.card-actions .btn {
    margin: 5px;
    text-decoration: none;
    display: inline-block;
    padding: 10px 15px; /* Ensures all buttons are the same size */
    border-radius: 4px;
    font-size: 0.9rem;
    width: 100px; /* Uniform width for all buttons */
    text-align: center;
    white-space: nowrap;
}

/* Individual Button Styles */
.btn {
    color: #fff;
    background-color: #007BFF;
    border: none;
    cursor: pointer;
}

.btn:hover {
    background-color: #0056b3;
}

.btn-edit {
    background-color: #28a745;
}

.btn-edit:hover {
    background-color: #218838;
}

.btn-delete {
    background-color: #dc3545;
}

.btn-delete:hover {
    background-color: #c82333;
}

/* Utility Classes */
.text-center {
    text-align: center;
}

.mt-20 {
    margin-top: 20px;
}

.mb-20 {
    margin-bottom: 20px;
}


### Changes:
1. **Body Background Color**: Changed to `#f5f5f5`.
2. **Button Sizes**: Added consistent width (`100px`) and padding (`10px 15px`) to ensure uniform sizing for "View Details," "Edit," and "Delete" buttons.

Let me know if there are any further changes you'd like!
```
