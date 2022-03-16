
//######################################## APP Méteo ########################################
let ville;
let url;

if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition((position) => {
        //utilisation de la methode Fetch
        let urlAlt = 'https://api.openweathermap.org/data/2.5/weather?lat='+ position.coords.latitude +'&lon=' +
            position.coords.longitude + '&appid=YOUR TOKEN HERE &units=metric';

        async function recupererMeteoAlt() {
            const requeteAlt = await fetch(urlAlt, {
                method: 'GET',
            });

            if(!requeteAlt.ok) {
                alert('Un problème est survenu.');
            } else {
                let donnees = await requeteAlt.json();
                let ville = donnees.name;
                let temperature = donnees.main.temp;
                document.querySelector("#ville").textContent = ville;
                document.querySelector("#temperature_label").textContent = temperature;
            }
        }
        recupererMeteoAlt();

    }, error, option)


}

else {
    error();
}

var option = {
    enableHighAccuracy : true,

}

function error(){
    ville = "Paris";
    url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville +
        '&appid=YOUR TOKEN HERE&units=metric';
    recupererMeteo();
}

function recupererMeteo() {
    let requete = new XMLHttpRequest();
    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function () {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                let reponse = requete.response;
                let ville = reponse.name;
                let temperature = reponse.main.temp;
                document.querySelector("#ville").textContent = ville;
                document.querySelector("#temperature_label").textContent = temperature;
            } else {
                alert('Un problème est intervenu, merci de revenir plus tard.');
            }
        }
    }
}


let btn = document.querySelector("#changer");
btn.addEventListener('click', () => {
    ville = prompt("Entrez la Ville que vous voulez !");
    url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville +
        '&appid=YOUR TOKEN HERE a&units=metric';
    recupererMeteo();
})


//#################################### Night mode #############################################################
let btnNightMode = document.querySelector('#mode');
let span = document.querySelector('span');

function modeSombre() {
    let cls = document.body.classList;  //on peut aussi utiliser document.body.className ='';
    cls.remove(...cls);
    document.body.className = 'dark';
    span.textContent = 'Thème clair';
    localStorage.setItem('theme', 'sombre');

}

btnNightMode.addEventListener('click', ()=>{
    if (document.body.classList.contains('dark')){
        let cls = document.body.classList;  //on peut aussi utiliser document.body.className ='';
        cls.remove(...cls);
        //document.body.className = 'lightMode';
        span.textContent = 'Thème sombre';
        localStorage.setItem('theme', 'clair');

    } else {
        modeSombre();
    }
})

// Il va falloir récupérer toutes les classes de l'élément body grâce à la fonction .classList
// Cette fonction retourne un tableau de toutes les classes sur un élément.
// Vous devrez utiliser la fonction .contains('dark') pour vérifier si la classe 'dark' est déjà présente.

if (localStorage.getItem('theme') == 'sombre') {
    modeSombre();
}