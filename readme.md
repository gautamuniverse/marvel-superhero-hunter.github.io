# Superhero Hunter App

The Superhero Hunter App is a web application built using vanilla JavaScript, HTML, and CSS. It allows users to search for their favorite superheroes, view detailed information about them, and add them to their list of favorite superheroes.

## Features

### Home Page

- Fetches and displays a list of superheroes (characters) on the home page.
- Provides a search bar that filters characters based on a search query. For example, searching for "iron" will show "Iron Man".
- Utilizes the [Marvel API](https://gateway.marvel.com/v1/public/characters) for superhero data.
- Each search result includes a favorite button. Clicking this button adds the superhero to the "My Favorite Superheroes" list.
- Clicking on a superhero opens a new page with more information about that superhero.

### Superhero Page

- Displays detailed information about a superhero, including their name, bio, and other information provided by the API (comics, events, series, stories, etc).

### My Favorite Superheroes Page

- Lists all the favorite superheroes added by the user.
- The list is persistent, ensuring that the same superheroes remain even after closing the browser.
- Each superhero in the list has a "Remove from Favorites" button to remove them from the favorites list.

## Technologies Used

- HTML
- CSS (Bootstrap framework used for creating search results modal)
- Vanilla JavaScript
- [Marvel API](https://gateway.marvel.com/v1/public/characters) for superhero data

## Project Structure

The project contains the following files and directories:

- `index.html`: The HTML file for the home page.
- `superhero.html`: The HTML file for the superhero details page.
- `favorites.html`: The HTML file for the "My Favorite Superheroes" page.
- `styles.css`: The CSS file for styling the application.
- `*.js`: The JavaScript file containing the application logic. Each .html file has its own java script file. They are present under javascript/ directory.
- `images/`: A directory for storing images.

## Live Website

- https://gautamuniverse.github.io/marvel-superhero-hunter.github.io/

## How to Use

1. Clone this repository to your local machine:
bash git clone https://github.com/gautamuniverse/marvel-superhero-hunter.github.io

2. Open the `index.html` file in your web browser to access the home page.

3. Use the search bar to find your favorite superheroes and add them to your favorites.

4. Click on a superhero to view their detailed information.

5. Open the `favorites.html` page by clicking the Favorites headline on the aside menu or by clicking the Favorites link at the footer. View and manage your favorite superheroes here.

## Development

To further develop or customize this app, you can modify the `*.js` and `styles.css` files. You can also explore the [Marvel API documentation](https://developer.marvel.com/documentation/getting_started) for more superhero data and features.

## Credits

- Superhero data provided by [Marvel API](https://developer.marvel.com/).
- This project was created for educational purposes.

## Author
- Name : Gautam
- Contact me at gmail: gautamthapameriid@gmail.com or DM me on Instagram : @gautamuniverse.in
