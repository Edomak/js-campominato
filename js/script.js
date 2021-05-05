// CAMPO MINATO:

// Il computer deve generare 16 numeri casuali tra 1 e 100.

// I numeri non possono essere duplicati.

// In seguito deve chiedere all'utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.

// L'utente non può inserire più volte lo stesso numero.

// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all'utente un altro numero.

// La partita termina quando il giocatore inserisce un numero "vietato" o raggiunge il numero massimo possibile di numeri consentiti.

// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha inserito un numero consentito.

// BONUS:

// All'inizio il software richiede anche una difficoltà all'utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 => tra 1 e 80
// con difficoltà 2 => tra 1 e 50

// Creo le mie funzioni

// 1- Funzione per verificare l'esistenza di un elemento in un array:

function isInArray (element, array) {

    for (var i = 0; i < array.length; i++) {

        if (element == array[i]) {
            return true;
        }
    }
    return false;
}

// 2- Funzione per creare numeri casuali in un range compreso tra un "min" e un "max":

function getRandomNumber (min, max) {
    
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Dichiaro le mie variabili globali:

var bombe = [];
var tentativi = [];
var maxTentativi = 20;
var gameOver = false;

// Bonus: Chiedo al giocatore di impostare la difficoltà con un numero tra 0 e 2: 
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 => tra 1 e 80
// con difficoltà 2 => tra 1 e 50

var sceltaDifficolta = parseInt(prompt("Scegli il livello di difficoltà tra 0, 1 e 2 dove 0 rappresenta l'esperienza più facile; 1 equilibrata e 2 più difficile!"));

switch (sceltaDifficolta) {
    case 0:
        var maxTentativi = 20; // (100 - 16)
        break;
    
    case 1:    
        var maxTentativi = 10; // (80 - 16)
        break;
    
    case 2:
        var maxTentativi = 3; // (50 - 16)
        break;
    
    default:
        alert("Il gioco non conosce questa difficoltà!");
}

// Genero le bombe: 16 numeri casuali che non si ripetono in un intervallo tra 1 e ?. Usiamo un ciclo while in quanto non possiamo sapere precisamente quante iterazioni dovrà svolgere considerando gli eventuali duplicati:

while (bombe.length < 16) {
    //Creo i numeri:
    var numeroRandom = getRandomNumber (1, maxTentativi);
    // Tramite un if faccio in modo di non avere duplicati:
    if (!isInArray(numeroRandom, bombe)) {
        bombe.push(numeroRandom)
        // Li pusho nell array [bombe] solo se non duplicati.
    }
    // console.log(numeroRandom, bombe.length);
}

// Abbiamo le nostre 16 bombe:
console.log("Bombe :", bombe);

//---------------------------- CAMPO MINATO ----------------------------------

// Chiedo ora al giocatore di inserire i suoi tentativi in un range compreso tra (min(1),max(?)) - 16 (bombe). Ovviamente non sono ammessi doppioni. Visto che anche in questo caso non conosciamo il numero di iterazioni precise useremo ancora il ciclo while:

while (tentativi.length < maxTentativi && gameOver == false) {

    var numeroUtente;
    // Chiedo all'utente di inserire un NUMERO, non minore di 1 e non maggiore di 100.
    do {
        numeroUtente = parseInt(prompt("Inserisci un numero tra 1 e 100"));
    } while (isNaN(numeroUtente) || numeroUtente < 1 || numeroUtente > 100);
    // Se prova con un doppione non varrà come tentativo, altrimenti viene aggiunto all'array [tentativi] che in un secondo momento ci dirà il punteggio finale del giocatore. Gameover diventa "true" quando inserisce un numero presente nell'array [bombe].
    if (isInArray(numeroUtente, bombe)) {
        gameOver = true;
        alert("BOMBA!!\n il tuo punteggio è: " + tentativi.length + "!");
    } else if (!isInArray(numeroUtente, tentativi)) {
        tentativi.push(numeroUtente);
    } 
    // Tentativi.length è proprio il valore da cui andremo a ricavarne il punteggio finale.
    console.log(numeroUtente, tentativi.length);
}

// Se il giocatore riesce ad esaurire tutti suoi maxTentativi senza inserire un numero presente nell'array [bombe] allora ha vinto:

if (tentativi.length == maxTentativi) {
    alert("COMPLIMENTI!!\N " + "Il tuo punteggio è: " + tentativi.length + "!");
}
console.log("Punteggio finale: " + tentativi.length);










