/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
        for(let i = 0; i < games.length; i++) {
            const card = document.createElement("div");
            card.classList.add("game-card");
            card.innerHTML = `
                <img class = 'game-img' src='${games[i].img}'/>
                <div >
                    <div class = "game-name">${games[i].name}</div>
                    <div class = "game-description">${games[i].description}</div>
                    <div class = "game-backers">Backers: ${games[i].backers}</div>
                </div>
            `
            gamesContainer.appendChild(card);
        }
}

addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
const totalContribution = GAMES_JSON.reduce((acc, game) => 
    game.backers + acc
, 0);

contributionsCard.innerHTML = totalContribution;

// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => 
    game.pledged + acc
, 0);

raisedCard.innerHTML = `$${totalRaised}`;
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
const searchBar = document.querySelector("#searchbar");

function filterUnfundedOnly(games) {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = games.filter(game => game.pledged < game.goal);


    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

}

// show only games that are fully funded
function filterFundedOnly(games) {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = games.filter(game => game.pledged > game.goal);


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames)
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}

showAllGames()

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
let [showUnfunded, showFunded, showAll] = [false, false, true];

const buttonContainer = document.getElementById("button-container");
console.log(buttonContainer.children)

// add event listeners with the correct functions to each button

fundedBtn.addEventListener("click", () => {
    Array.from( buttonContainer.children).forEach(btn => {
        btn.classList.remove("btn-active");
        btn.classList.add("btn-outline");
    })
    fundedBtn.classList.remove("btn-outline")
    fundedBtn.classList.add("btn-active");
    showFunded = true;
    showUnfunded = false;
    showAll = false;
    filterFundedOnly(GAMES_JSON);
    
    searchBar.value = "";
})

unfundedBtn.addEventListener("click", () => {
    Array.from(buttonContainer.children).forEach(btn => {
        btn.classList.remove("btn-active");
        btn.classList.add("btn-outline");
    })
    unfundedBtn.classList.remove("btn-outline")
    unfundedBtn.classList.add("btn-active");
    showFunded = false;
    showUnfunded = true;
    showAll = false;
    filterUnfundedOnly(GAMES_JSON);
    searchBar.value = "";

})

allBtn.addEventListener("click", () => {
    Array.from(buttonContainer.children).forEach(btn => {
        btn.classList.remove("btn-active");
        btn.classList.add("btn-outline");
    })
    allBtn.classList.remove("btn-outline")
    allBtn.classList.add("btn-active");
    showFunded = false;
    showUnfunded = false;
    showAll = true;
    showAllGames();
    searchBar.value = "";

})
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");


// use filter or reduce to count the number of unfunded games

const numberOfUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;
const termination = `${numberOfUnfundedGames > 1 ? "s":""}`;

// create a string that explains the number of unfunded games using the ternary operator

const displayStr = `A total of $${totalRaised.toLocaleString()} for ${GAMES_JSON.length} games. Currently, ${numberOfUnfundedGames} game${termination} remain${termination} unfunded. We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container

const paragraph = document.createElement("p");
paragraph.innerHTML = displayStr;
descriptionContainer.appendChild(paragraph);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [first, second, ...others] = sortedGames;
console.log(first, second)

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstMostFundedGame = document.createElement("p");
firstMostFundedGame.innerHTML = first.name
firstGameContainer.appendChild(firstMostFundedGame);

const secondMostFundedGame = document.createElement("p");
secondMostFundedGame.innerHTML = second.name
secondGameContainer.appendChild(secondMostFundedGame);

// do the same for the runner up item
// Search a game

searchBar.addEventListener("input", event => {
    deleteChildElements(gamesContainer);
    let games = GAMES_JSON.filter(game => game.name.toLowerCase().includes(event.target.value.toLowerCase()))

    if(showFunded) {
        filterFundedOnly(games)
    } else if(showUnfunded) {
        filterUnfundedOnly(games)
    } else {
        addGamesToPage(games)
    }
})