# Full Fashion

An educational clothing-store demo built with HTML, CSS, and JavaScript.

## Features

- Fashion landing page with collection navigation.
- Eveningwear and everyday clothing collections.
- Product images, prices, and size selection.
- Checkout form with input validation.
- Order confirmation with selected clothing items.
- Save, list, and delete demo orders using localStorage.
- Embedded Google Maps and Spotify content.

## Technologies

- HTML
- CSS
- JavaScript
- Browser localStorage

## Project Structure

- index.html: main page
- style1.css: page styling
- script1.js: interactions and form validation
- script2.js: localStorage access
- Image files: product photos and backgrounds

## Run Locally

Download the repository and open index.html in a modern browser.

An internet connection is needed for the Google Maps and Spotify embeds.

## Demo Limitations

This is a coursework project, not a production store.

- No backend or payment gateway is implemented.
- The payment confirmation is simulated.
- Demo orders are stored in the current browser's localStorage.
- The current implementation stores card details, including CVV,
  and displays them in demo output. Use fictitious data only.
- Validation and expiration-date checks require further improvement.
- The layout requires further work for smaller screens.

## Manual Verification

Product images, collection images, and the landing-page background
were checked locally after correcting image filename capitalization.

## Possible Improvements

- Remove card-number and CVV storage.
- Use structured JSON and dedicated localStorage keys.
- Improve validation and expiration-date checks.
- Improve responsive layouts and accessibility.
- Add automated tests.