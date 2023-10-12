"use strict";
let selectedCards = [];
let boardGame = [];
let cardsSequence = []; // permet de récupérer à chaque clic la carte sélectionnée
let visibleCards = [];
let timeBarBox;
let pointsBar;
let timeBar;
let timer;
let points = 2000;
let timeBarHeight = 0;
let pointsBarHeight = 100;
let time = 0;
let timeOver = document.getElementById('timeOver');
const numberOfCards = 18; //nombre totale  de cartes
const numberOfSelectedCards = 14; // Nous pourrions dans une v2 permettre au joueur/se de choisir le nombre de cartes.
const boardGameSize = numberOfSelectedCards*2;
const cards = document.querySelectorAll('.card');
const clic = new Audio('assets/audio/clic.mp3')




function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
} 

// Fonction permettant de choisir un certain nb de cartes (ici 14) parmi la liste de 18 et de les insérer aléatoirement dans le tableau selectedCards 
const selectCards = (numberOfSelectedCards) =>{
    while(selectedCards.length < numberOfSelectedCards)
    {        
        let cardNumber = getRandomInt(0, numberOfCards);
        if(!selectedCards.includes(cardNumber))
            selectedCards.push(cardNumber);        
    }
}

selectCards(numberOfSelectedCards);

const fillBoardGame = (boardGameSize) =>{ // fillBoardGame = remplir tableau de jeu
    while(boardGame.length < boardGameSize)
    {        
        for(let i = 0; i < numberOfSelectedCards; i++)
        {        
            boardGame.push(selectedCards[i]); // insertion de 2 cartes par itération (cartes en parité)
            boardGame.push(selectedCards[i]);       
        }
    }
    return boardGame;
}

fillBoardGame(boardGameSize);  


// copie de la table de jeu dans un tableau temporaire qui sera vidé indice par indice pour remplir un tableau aléatoirement
let boardGameCopy = boardGame;

const shuffleBoardGame = (boardGame) => {
    let ramdomKey;
    let boardGameShuffled = [];
    for(let i = 27; i >= 0; i--)
    {
        ramdomKey = getRandomInt(0, boardGameCopy.length); // parcours de la longueur du tableau pour récupérer un des indices au hasard, puis suppression
        boardGameShuffled.push(boardGameCopy.splice(ramdomKey, 1));     // de cette manière la longueur (length) du tableau diminue.
    }
    return boardGameShuffled;
}

let boardGame = shuffleBoardGame(boardGame);

let insertBoardGame = (boardGame) => { // insère la table de jeu dans le HTML
    let id; 
    let cardBox;
    let boardGameContainer = document.getElementById('boardGameContainer');
    for(let i = 0; i < boardGameSize ; i++)
    {
        id = boardGame[i];        
        cardBox = document.createElement('div'); 
        cardBox.classList.add('cardBox');      
        cardBox.innerHTML =`<img class="card" src="assets/img/pokemons/img-${id}.png" data-img="${id}" alt="image ${id}" />`    
        boardGameContainer.append(cardBox);    
    }
}

insertBoardGame(boardGame); 

/*
    Traitement des possibles
    Carte = visible ou invisible, on ne peut voir que 2 cartes en même temps
    l'une après l'autre (=> traitement séquentiel), sauf si les cartes sont identiques
    elles restent visibles définitivement.
    1. récupérer l'état de chaque carte = écouteur addEventListenet
    2. changer son état au click et en fonction d'une comparaison avec la
    carte précédente. Verrouiller en mode visible son état.
    3. lancer un timer
*/

// Pose d'un écouteur
 // récupération de toutes les cartes insérées dans le HTML dans la variables cards
const putListener = () =>{    
    let cards = document.querySelectorAll('.card');        
    cards.forEach(card => {
        card.addEventListener('click', revealCard)
    });    
}

const hideNonLockedCards = () => {// masque les cartes visibles mais non verrouillées
    visibleCards = document.querySelectorAll('.visible');
    for(let i = 0; i < visibleCards.length; i++)
    {
        if(!visibleCards[i].classList.contains('locked'))
            visibleCards[i].classList.remove('visible');            
    }
}

const createTimeBar = () => {
    timeBarBox = document.getElementById('timeBarBox');
    timeBar = document.createElement('div');
    timeBar.setAttribute('id', 'timeBar')
    timeBarBox.appendChild(timeBar);    
}

const createPointsBar = () => {
    pointsBarBox = document.getElementById('pointsBarBox');    
    pointsBar = document.createElement('div');    
    pointsBar.setAttribute('id', 'pointsBar')
    pointsBarBox.appendChild(pointsBar);    
}

let timeElapsedBox = document.getElementById('timeElapsedBox');

const convertToMin = (seconds) =>{
    let minutes = 0;
    if(seconds >= 60){        
        minutes = Math.floor(seconds / 60);
    }
    seconds = seconds%60;  
    if(seconds < 10)
        seconds = `0${seconds}`;  
    return `${minutes} min : ${seconds} sec`;
}

const startGame = () => {  
    putListener();    
    let increaseBar = () =>{         
        time++;          
        timeOver.setAttribute('value', time);        
        timeElapsedBox.innerHTML = `${convertToMin(time)}`;          
        if(isOver()) // vérifie si toutes les cartes ont été révélées(over = terminé)  
        {
            alert(`Bravo vous avez gagné ! vos points : ${points}, votre temps ${convertToMin(time)}`);                   
            clearInterval(timer);
            sendForm('timeForm');                           
        }         
        else if(timeBarHeight < 100 && pointsBarHeight > 0)
        {
            timeBar.style.height = `${++timeBarHeight}%`;
            points -= 5;
            pointsBar.style.height = `${--pointsBarHeight}%`;             
        }
        else
        {
            clearInterval(timer);            
            alert(`Game over vous avez perdu ! vos points : ${points}` );
            cards.forEach(card => {
                card.removeEventListener('click', revealCard)
            });                         
            pointsBar.style.height = `0%`;
            timeBar.style.height = `0%`;
            timeBarHeight = 0;
            pointsBarHeight = 100;
            points = 2000;
            location.reload();           
        }
    } 
    timer = setInterval(increaseBar, 1000);    
}
  

createTimeBar();
createPointsBar();
let startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);

const sendForm = (myForm) =>{
    let formFinal = document.forms[myForm];          
    formFinal.submit();
}


const revealCard = (e) =>{    
     
    if(!e.target.classList.contains('locked'))  //traitement sur la carte uniquement si ellen'est pas verrouillée
        {
            hideNonLockedCards();
            let visibleCards = document.querySelectorAll('.visible');
            let idCard = e.target.getAttribute(`data-img`);
            cardsSequence.push(idCard);   
            e.target.classList.toggle('visible'); 
            e.target.classList.toggle('selected'); 
            e.target.classList.toggle('locked'); 
            
            if(cardsSequence.length === 2)
            {
                // cardsSequence[0] renvoit un tableau, parseInt convertit la donnée en int
                let card1 = parseInt(cardsSequence[0]); 
                let card2 = parseInt(cardsSequence[1]);

                if(card1 === card2)
                {                    
                    clic.play(); 
                    clic.volume = .8;
                    let cardsRevealed = document.querySelectorAll(`[data-img="${card1}"]`);
                    for(let i = 0; i < cardsRevealed.length; i++)
                    {
                        cardsRevealed[i].classList.add('locked');
                        cardsRevealed[i].classList.remove('selected');
                    } 
                    points += 75;
                    pointsBarHeight = 5 + pointsBarHeight;           
                }
                else
                {
                    let cardsRevealed = document.querySelectorAll('.selected');                   
                    for(let i = 0; i < cardsRevealed.length; i++)
                    {
                        cardsRevealed[i].classList.remove('selected');
                        cardsRevealed[i].classList.remove('locked');
                    }                    
                }                    
                localStorage.setItem('card1', cardsSequence[0]);    
                cardsSequence = []; // Après 2 cartes cliquées d'affilé on vide notre tableau cardsSequence qui enregistre les séquences de 2 cartes.                       
            }   
        }     
        else if(cardsSequence.length === 2)
        {
            cardsSequence = [];            
        }           
}

const isOver = () =>{  // Cette fonction compare le nombre de cartes révélées et le nombre total de cartes et renvoie true si toutes révélées
    let revealedCards = document.querySelectorAll('.visible'); // revealedCards = cartes révélées
    if(revealedCards.length > 0 && revealedCards.length === boardGameSize)
        return true;
    else    
        return false;
}



