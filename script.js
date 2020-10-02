const list = document.getElementById("list");
const description = document.getElementById("description");

const api = "https://pokeapi.co/api/v2/pokemon?limit=150";

/**
 * Try to parse a response as JSON data
 * @param {Response} response - API fetch response
 */
function transformToJson (response) {
    if (response.ok) {
        return response.json();
    }

    throw Error("Content not loaded");
}

/**
 * fill the item list with values
 * @param {Object} json - Some JSON formatted data
 */
function fillList (json) {
    // Empty the list
    list.innerHTML = "";
    json.results.forEach((pokemon) => {
        // Create a li tag
        const item = document.createElement("li");
        // Create a img tag
        const image = new Image();
        // Fetch the individual url to have the image
        fetch(pokemon.url).then(transformToJson).then((info) => {
            // Set the img url
            image.src = info.sprites.front_default;
            // Add the click event
            item.addEventListener("click",  () => fillDescription(info));
        });
        // Put the image into the item
        item.appendChild(image);
        // Put the item into the list
        list.appendChild(item);
    });
}

// Show or hide the description box
function showDescription () {
    description.classList.add("show");
}
function hideDescription () {
    description.classList.remove("show");
}

/**
 * Fill the description box with values
 * @param {Object} json - Some JSON formatted data
 */
function fillDescription (json) {
    // ...
}

// Fetch the API end-point and fill the list
fetch(api).then(transformToJson).then(fillList);
