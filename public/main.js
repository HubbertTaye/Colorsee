// do: html and little(?) css first
// user must log in/create an account. allow: google log in, local log in, pintrest(?)

// vvv outside api vvv
// create a click event on a button to run function that triggers the 'color picker' for browsing, keep popup open when user clicks on a color display hex, rgb (use color api?) to display in the popup and the save button

// vvv database vvv
// three collections: user (dont touch), colors (based on user session), palettes (based on user session)

// vvv own api vvv
// save button function fetches to own api (post) and saves the color in specific user's post (ask if you can have the property be the color name in the db? or how one collection will contain all one user's color?)
// color log can be shown within the popup on another tab || on website on its own tab. displays all the color documents in the color db
// on color log page: render small img, hex code, rgb code and above all that is a "make palette" button.
// "make palette" button function redirects to palette creation page which is a form that makes another post req to own api of all the colors in the palette (name, rgb, hex), name of palette, optional description and the src of the palette img.
// update req: change palette name && || description
// delete: delete palettes or saved colors
