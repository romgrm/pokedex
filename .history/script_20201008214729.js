const list = document.getElementById("list"); // recup l'élément css list
const description = document.getElementById("description"); // recup l'élément html description

const api = "https://pokeapi.co/api/v2/pokemon?limit=150"; // url de l'api 

/**
 * Try to parse a response as JSON data
 */
function transformToJson (response) {
    if (response.ok) {
        return response.json();             //OSEF
    }

    throw Error("Content not loaded");
}

/**
 * Clear the list of all its items //   NETTOIE LA LISTE
 */
function emptyList () {
    // ...
}

/**
 * Create an item, fetch its data and setup event listener
 */
function createItem (pokemon) {
    const item = document.createElement("li"); // CREATION ITEM  
    const photo = document.createElement("img"); // CREATION PHOTO
    
    
    fetch(pokemon.url).then(transformToJson).then((data) => {// ON RECUP LES DONNEES DE L'API    
        list.appendChild(item); // on intègre le "item"(=li) dans la "list"(=ul). Ne pas oublier de les déclarer avant si ce n'est pas fait. 
        item.textContent=data.name + data.id; // on intègre le fichier data -> name de l'API directement dans le "item" (donc dans le <li>)
        item.appendChild(photo);
        photo.src = data.sprites.front_shiny;
        
        item.addEventListener('mouseover', Fonction1);
        item.addEventListener('mouseout', Fonction2);
        function Fonction1(){
            item.textContent=data.height + data.stats;
            this.style.backgroundColor = 'orange';
        }
        function Fonction2(){
            item.textContent=data.name + data.id; 
            photo.src = data.sprites.front_shiny; 
            this.style.backgroundColor = '';
        }
        
        console.log(data);
    });
    
}

/**
 * fill the item list with values
 */
function fillList (json) {
    emptyList();                        //ON REMPLIE LA LIST AVEC LES ITEMS
    json.results.forEach(createItem);
    console.log(json);
}

/**
 * Fill and display the description
 */
function showDescription (data) {
    description.classList.add("show");

    const fields = description.querySelectorAll("dd");
    fields.forEach((dd) => {
        // ...
    });
}

/**
 * Hide the description
 */
function hideDescription () {
    description.classList.remove("show");
}

// Fetch the API end-point and fill the list
fetch(api).then(transformToJson).then(fillList); // FETCH GLOBAL

/*Fetch permet d'appeler l'api (via son url). On ne sait cependant pas le temps que ça va mettre à avoir
une réponse vu que c'est une requête réseau, ça dépend de la qualité du réseau. 
Une fois que l'api à répondu, on utilise le "then" qui permet de dire quel liste d'actions à faire une fois
qu'on a reçu la réponse (ex: stocker les données reçues dans un fichier Json). On peut utiliser plusieurs then,
En gros on appel l'api, on stock les données reçues dans un .json, on remplie la List */


// LIRE DE BAS EN HAUT 