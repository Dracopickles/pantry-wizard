let keywordArray = [];
let restrictionsArray = [];
let indexVar = 0;

// function to populate div from array
function populateDivFromArray(){
    $('#ingredient-list-div').empty(); // clear it first
    for (let i = 0; i < keywordArray.length; i++) {
        let btnDiv = $('<button class="ingredients-list">');
        // give it an attribute = to its text so we can find and delete later
        btnDiv.attr('keyword-attr', keywordArray[i])
           .text(keywordArray[i]);
        $('#ingredient-list-div').append(btnDiv);
    }
}

// function to add item to search field
$('#add-keyword-button').click(function(){
    event.preventDefault(); // don't reload the page
    let skipVar = false;
    let currentKey = $('#keyword-text').val().trim();
    currentKey = currentKey.toLowerCase();

    // if word is already in the array, bail out
    for (let i = 0; i < keywordArray.length; i++) {
      if (currentKey === keywordArray[i]){
          skipVar = true;
          return;
      }
    } // otherwise add to keyword array
    if (skipVar === false){
        keywordArray.push(currentKey);
    }
    // clear keyword box, clear & repopulate div
    $('#keyword-text').val('');
    populateDivFromArray();
})

// function to remove item from search field
$(document).on('click', '.ingredients-list', function(){
    let keywordToRemove = $(this).attr('keyword-attr');
    for (let i = 0; i < keywordArray.length; i++) { // loop through the array
        if (keywordToRemove === keywordArray[i]){ // when you find the entry that matches the button
            keywordArray.splice(i,1); // remove just that entry from the array
        }
      }
    populateDivFromArray(); // and reprint the buttons, using the new array
})

// function to save recipe to favorites
$(document).on('click', '.save-button', function(){
    console.log('you clicked the button');
    let cardToSave = '#' + $(this).attr('index');
    // push $(cardToSave).html to firebase as a variable
})

// function to populate restrictions array from dropdown
function populateRestrictionsFromDropdown(){
    restrictionsArray = []; // clear the array first
    let restrictionSelector = $('.restriction-key'); // store the whole set of divs with this class
    Object.keys(restrictionSelector).forEach(function(key){ // render that as an object with keys, then look at each key
        if (restrictionSelector[key].checked){ // if the current key has the checked property
            let valueVar = restrictionSelector[key].value; // get the value of the key
            restrictionsArray.push(valueVar); // store it in the array
        }        
    })
    console.log('restrictionsArray = ', restrictionsArray);
}

/* some dummy variables for test pending API functions */
const recipeImg = 'https://assets.simplyrecipes.com/wp-content/uploads/2007/01/homemade-pizza-vertical-a-1200.jpg'
const recipeHTML = 'https://www.simplyrecipes.com/recipes/homemade_pizza/'
const recipeName = 'Homemade Pizza'
const recipeSummary = 'It\'s homemade pizza. If you can\'t figure out what homemmade pizza is I don\'t know that I can help you.'

// function to generate card from API data
function generateCardFromAPI(recipeImg, recipeHTML, recipeName, recipeSummary){
    $('#recipe-anchor-div').empty(); // clear the current card list
    // make a row to hold image & text
    let rowDiv = $('<div class="row no-gutters">');

    // create a div for the image
    let imageDiv = $('<div class="col-md-4">');
    imageDiv.html('<img src="' + recipeImg + '" class="card-img">');

    // create a div for the text
    let textDiv = $('<div class="col-md-8">');
    textDiv.html('<div class="card-body"><h5 class="card-title">' + recipeName
                + '</h5><p class="card-text">' + recipeSummary
                + '</p></div>');

    // create a button to save the recipe
    let buttonDiv = $('<p class="card-text">');
    buttonDiv.html('<small class="btn-outline-secondary save-button">Save this recipe for later</small>')
             .attr('index', 'card-'+ indexVar);
    textDiv.append(buttonDiv);

    // add image & text to row
    rowDiv.append(imageDiv)
          .append(textDiv);

    // make a larger card to stick row in
    let cardDiv = $('<div class="card">');
    cardDiv.append(rowDiv);

    // and a larger row to stick card in
/*    let hrefDiv = $('<a>')
    hrefDiv.attr('href', recipeHTML); */
    rowDiv = $('<div class="row recipe-card">')
    rowDiv.attr('id', 'card-' + indexVar)
          .append(cardDiv);
/*    hrefDiv.append(rowDiv);
    $('#recipe-anchor-div').append(hrefDiv); */
    $('#recipe-anchor-div').append(rowDiv); //delete this line if we add the commented lines back in
    
    indexVar++;
}

// send the search to the API, generate 
$('#run-search-button').on('click', function(){
    populateRestrictionsFromDropdown();
    // run API function()

    // run cardmaker
    generateCardFromAPI(recipeImg, recipeHTML, recipeName, recipeSummary);
});