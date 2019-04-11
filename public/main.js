// user must log in/create an account. allow: google log in, local log in, pintrest(?)

// vvv outside api vvv
// create a click event on a button to run function that triggers the 'color picker' for browsing, keep popup open when user clicks on a color display hex, rgb (use color api?) to display in the popup and the save button

// vvv database vvv
// three collections: user (dont touch), colors (based on user session), palettes (based on user session)

// vvv own api vvv
// save button function fetches to own api (post) and saves the color in specific user's post (do i have a seperate collection for each user's color or do i utilize the user IDs?)

// ========= after user login page ========== //
//as chrome extension pop up
//button to activate the color picker //click again gives color info aka preview //second click saves color into color log
//display color log in a new tab in the pop up?? so user doesnt save the same color

// ============ color log page ============= //
//make color palette and palette gallery buttons at the top. redirect to respected pages
//display colors from specific user in colors collection on the page
//color collection must contain: color visual (img), color name(?), rgb and hex codes. (retrieved from color api then sent to own api/color collection db, then displayed into color log)
//delete req: delete saved colors

// ============ make palette page ============= //

// "make palette" button function redirects to palette creation page which is a form that makes another post req to own api

// render color documents in color collection for specific user for the user to PICK colors from
// user can pick colors, create palette name, optional palette description
//on the click of create button: take the selected colors from color collection - take color code (rgb or hex) combine and display into one image, send to routes to create a new doc in palettes collection
//create a new document in palettes collection containing the newly made palette image, palette name and optional description.


// ============ palettes gallery page ========== //
//display all palettes from user in palettes collection on the page
// update req: change palette name && || description
// delete: delete palettes
