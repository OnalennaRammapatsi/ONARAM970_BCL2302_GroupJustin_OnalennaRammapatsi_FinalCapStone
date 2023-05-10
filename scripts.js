//imported the data from data.js to scripts.js
import { authors } from "./data.js" //I declared 3 variables (authors, genres, books) and initialized by importing them from the data.js file.
import { genres } from "./data.js"
import { books } from "./data.js"
const matches = books   //declared my varibles with their values
let page = 1;
if (!books && !Array.isArray(books)) { throw new Error('Source required') }
if (!page && page.length < 2) { throw new Error('Range must be an array with two numbers') }
//declared the objects day and night with their RGB values
const day = {         
  dark: '10, 10, 20',
  light: '255, 255, 255',
}
const night = {
  dark: '255, 255, 255',
  light: '10, 10, 20',
}
const fragment = document.createDocumentFragment() /*The new DocumentFragment is created and used to hold the newly created div 
                                                      that will contain the previes of the books*/

let startIndex = 0; //Initialized 2 varibles `startIndex` and `endIndex` to 0 and 36. 
let endIndex = 36;
const extracted = books.slice(startIndex, endIndex) // .slice returns elements in an array, as a new array.
for (let i = 0; i < extracted.length; i++) {
  const preview = document.createElement('button') 
  preview.className = 'preview'
  preview.dataset.id = books[i].id
  preview.dataset.title = books[i].title
  preview.dataset.image = books[i].image
  preview.dataset.subtitle = `${authors[books[i].author]} (${(new Date(books[i].published)).getFullYear()})`
  preview.dataset.description = books[i].description
  preview.dataset.genre = books[i].genres
  //creates a template to structure the html then append the preview to fragment
  preview.innerHTML = /*html*/`
    <div>
    <image class='preview__image' src="${books[i].image}" alt="book pic"}/>
    </div>
    <div class='preview__info'>
    <dt class='preview__title'>${books[i].title}<dt>
    <dt class='preview__author'> By ${authors[books[i].author]}</dt>
    </div>`
  //console.log(preview)
  fragment.appendChild(preview) // `appendElement()`: a function that appends a child element to a parent element.
}
const booklist1 = document.querySelector('[data-list-items]')
booklist1.appendChild(fragment)

//SHOW MORE BUTTONS
const showMoreButton = document.querySelector('[data-list-button]')

const numItemsToShow = Math.min(books.length - endIndex,) /*numItemsToShow: a variable initialized with the value of the minimum of the difference between
                                                          the total number of books and endIndex, and the number of books to be displayed when the 
                                                          "Show More" button is clicked.*/ 
                                                          
const showMoreButtonText = `Show More (${numItemsToShow})` //showMoreButtonText: (variable) indicating the number of items to be displayed when clicked.
showMoreButton.textContent = showMoreButtonText
showMoreButton.addEventListener('click', () => {
  const fragment = document.createDocumentFragment()
  startIndex += 36; //increment the startIndex and endIndex variables by 36 each time the button is clicked.
  endIndex += 36;
  const startIndex1 = startIndex 
  const endIndex1 = endIndex //created two new variables startIndex1 and endIndex1 and assigned them the values of startIndex and endIndex. 
  console.log(startIndex1) //These variables are then used to slice a new subset of items from the books array.
  console.log(endIndex1)
  const extracted = books.slice(startIndex1, endIndex1)
  for (const { author, image, title, id, description, published } of extracted) { //A for loop that iterates over each item in the extracted array, and creates a new preview element for each item.
    const preview = document.createElement('dl') //create a new dl element, assign it a `preview` class, and set several dataset attributes to store data.
    preview.className = 'preview'
    preview.dataset.id = id
    preview.dataset.title = title
    preview.dataset.image = image
    preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
    preview.dataset.description = description
    // preview.dataset.genre = genres
    //The `innerHTML property` of the preview element is also set to a string of HTML code that defines the structur of the preview element.
    preview.innerHTML = /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`
    fragment.appendChild(preview) //This line appends the preview element to the fragment DocumentFragment object
  }
  const booklist1 = document.querySelector('[data-list-items]')
  booklist1.appendChild(fragment) //This updates the display to show the newly added book items.
})

//FOR BUTTONS
const searchbutton = document.querySelector("[data-header-search]"); //a constant variable `searchbutton` is declared and selects an element with the attribute data-header-search from the document.
searchbutton.addEventListener('click', (event) => {
  document.querySelector("[data-search-overlay]").style.display = "block";
  /*this line adds an event listener to `searchbutton` for the click event. When searchbutton is clicked,a function is executed that 
  selects an element with the attribute data-search-overlay from the document 
  and sets its display style property to "block", making it visible.*/
})
const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener('click', (event) => {
  document.querySelector("[data-search-overlay]").style.display = "none";
})
//FOR SETTINGS
const settingbutton = document.querySelector("[data-header-settings]")
settingbutton.addEventListener('click', (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "block";
})
const settingCancel = document.querySelector('[data-settings-cancel]')
settingCancel.addEventListener('click', (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "none";
})
//TO CHANGE THEME TO DARK OR LIGHT
const dataSettingsTheme = document.querySelector('[data-settings-theme]') //dataSettingsTheme: a variable that selects the theme dropdown in the settings dialog.
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary") //used the CSS selector that finds the button element position in the hierarchy docu
saveButton.addEventListener('click', (event) => { //added the click event listener to the save button using the `addEventListener` method.
  event.preventDefault() //prevents the default form submission behavior when the save button is clicked.
  if (dataSettingsTheme.value === 'day') { //checks if value is 'day'.
    document.querySelector('body').style.setProperty('--color-dark', day.dark) //sets the value of --color-dark and --color-light CSS variables on 
    document.querySelector('body').style.setProperty('--color-light', day.light) //the body element to the dark and light values of the day object.
    document.querySelector("[data-settings-overlay]").style.display = "none";
  }
  if (dataSettingsTheme.value === 'night') {
    document.querySelector('body').style.setProperty('--color-dark', night.dark)
    document.querySelector('body').style.setProperty('--color-light', night.light)
    document.querySelector("[data-settings-overlay]").style.display = "none"; //hides the settings dialog from the view
  }

})

//This part is responsible for creating and appending options to select elements in a 'search form'.
const authorSelect = document.querySelector('[data-search-authors]')
const authorsAppend = document.createDocumentFragment()

let elementAuthor = document.createElement('option')
elementAuthor.value = 'any'  //creates a new option element with the value "any" and the inner text "All Authors", and append it to the authorsAppend fragment.
elementAuthor.innerText = 'All Authors'
authorsAppend.appendChild(elementAuthor) //`authorsAppend`: a variable used to create a document fragment that will contain the options for the author select element.

/*Here its a loop that iterates through each author in the authors object and creates a new option element for each author,
sets its value to the author ID, and sets its inner text to the author name. 
Each option element is then appended to the authorsAppend fragment.*/
for (const [id, name] of Object.entries(authors)) {
  let elementAuthor = document.createElement('option')
  elementAuthor.value = id
  elementAuthor.innerText = name
  authorsAppend.appendChild(elementAuthor)
}
authorSelect.appendChild(authorsAppend)


const genreSelect = document.querySelector("[data-search-genres]"); //creates a variable genreSelect that selects a dropdown element with the attribute data-search-genres.
const genresAppend = document.createDocumentFragment()
let element = document.createElement('option')
element.value = 'any'
element.innerHTML = 'All Genres'
genresAppend.appendChild(element)

for (const [id, name] of Object.entries(genres)) {
  let element = document.createElement('option')
  element.value = id
  element.innerText = name
  genresAppend.appendChild(element)
}
genreSelect.appendChild(genresAppend)


//Display of book details
const detailsToggle = (event) => { //creates a function detailsToggle that takes an event as a parameter.
  const overlay1 = document.querySelector('[data-list-active]');
  const title = document.querySelector('[data-list-title]')
  const subtitle = document.querySelector('[data-list-subtitle]')
  const description = document.querySelector('[data-list-description]')
  const image1 = document.querySelector('[data-list-image]')
  const imageblur = document.querySelector('[data-list-blur]')
  event.target.dataset.id ? overlay1.style.display = "block" : undefined; //searching attribute for `id` and displays `overlay1` or "block" if not found
  event.target.dataset.description ? description.innerHTML = event.target.dataset.description : undefined; //searching attribute for `description`
  event.target.dataset.subtitle ? subtitle.innerHTML = event.target.dataset.subtitle : undefined;
  event.target.dataset.title ? title.innerHTML = event.target.dataset.title : undefined;
  event.target.dataset.image ? image1.setAttribute('src', event.target.dataset.image) : undefined;
  event.target.dataset.image ? imageblur.setAttribute('src', event.target.dataset.image) : undefined;
}; //this line ends the detailsToggle function definition
const detailsClose = document.querySelector('[data-list-close]')
detailsClose.addEventListener('click', (event) => {
  document.querySelector("[data-list-active]").style.display = "none";
})


const bookclick = document.querySelector('[data-list-items]')
bookclick.addEventListener('click', detailsToggle) //This adds an event listener to bookclick that listens for a click event and runs the detailsToggle function when the event occurs.
const dataSearchResults = document.querySelector('[data-search-results]')
document.querySelector('[data-search-form]').addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector('[ data-search-overlay]').style.display = 'none'
  document.querySelector('[data-list-items]').innerHTML = ''; //set the innerHTML of the first element with a `data-list-items` attribute and the first element with a 
  document.querySelector('[data-search-results]').innerHTML = ''; //`data-search-results` attribute to an empty string, effectively clearing their contents.
  const formData = new FormData(event.target) //create a new `formData` object from `event.target`
  const title = formData.get('title'); //the values are then extracted from the form data
  const genre = formData.get('genre');
  const author = formData.get('author');
  const filteredBooks = []; //Empty array which holds the books that match the searching criteria
  for (let i = 0; i < books.length; i++) { //This loops through `books` array when searched and adds a book to `filteredBooks` if it matches
    const book = books[i];
    if (genre === 'any' && author === 'any') {
      if (book.title.toLowerCase().includes(title.toLowerCase())) {
        filteredBooks.push(book);
      }
    }
    if (genre === 'any') {
      if (book.title.toLowerCase().includes(title.toLowerCase()) && book.author === author) {
        filteredBooks.push(book);
      }
    }
    if (title === '') {
      if (book.author === author && book.genres.includes(genre)) {
        filteredBooks.push(book);
      }
    }
    if (title === '' && author === 'any') {
      if (book.genres.includes(genre)) {
        filteredBooks.push(book);
      }
    }

  }
  for (const { author, image, title, id } of filteredBooks) { 
    let element = document.createElement('button'); // a new button element is created and assigned to the variable element
    element.classList = 'preview';
    element.setAttribute('data-preview', id);
    element.innerHTML = //The innerHTML property of the element is set to a string of HTML code
      `<img
      class="preview__image"
      src="${image}"
      />
      <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
      </div>
      `;
    fragment.appendChild(element);
    dataSearchResults.appendChild(fragment);
  }
  document.querySelector('[data-search-form]').reset() // the reset() method is called on the data-search-form element to clear entered search queries.

})









































