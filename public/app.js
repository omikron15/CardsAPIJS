const app = function(){
  const url = "http://deckofcardsapi.com/";
  let deck;
  newDeck();

  const button = document.querySelector("#draw-card-button")
  button.addEventListener("click", function(){
    drawCard(this.deck, 2);
  }.bind(this))

}

const newDeck = function (){
  const request = new XMLHttpRequest();
  request.open("GET", "https://deckofcardsapi.com/api/deck/new/");
  request.addEventListener("load", deckRequestComplete);
  request.send();
}

const deckRequestComplete = function (){
  if(this.status !== 200) return;
  deck = JSON.parse(this.response);
  shuffleDeck(deck);
}

const showDeckStatus = function(deck){
  const div = document.querySelector("#deck-container")
  while (div.firstChild){
     div.removeChild(div.firstChild);
   }
      const li1 = document.createElement("li");
      // const li2 = document.createElement("li");
      const li3 = document.createElement("li");
      li1.textContent = "Id: " + deck.deck_id;
      // li2.textContent = "Shuffled " + (deck.shuffled || "true");
      li3.textContent = "Cards remaining: " + deck.remaining;
      div.appendChild(li1);
      // div.appendChild(li2);
      div.appendChild(li3);
  }

  const shuffleDeck = function (deck){
    const request = new XMLHttpRequest();
    url = "https://deckofcardsapi.com/api/deck/" + deck.deck_id + "/shuffle/"
    request.open("GET", url);
    request.addEventListener("load", deckShuffleRequestComplete);
    request.send();
  }

  const deckShuffleRequestComplete = function (){
    if(this.status !== 200) return;
    shuffledDeck = JSON.parse(this.response);
    showDeckStatus(shuffledDeck);
    const button = document.querySelector("#draw-card-button")
    button.hidden = false;
  }

  const drawCard = function(deck, noOfCards){
    const request = new XMLHttpRequest();
    url = "https://deckofcardsapi.com/api/deck/" + deck.deck_id + "/draw/" + "?count=" + noOfCards
    request.open("GET", url);
    request.addEventListener("load", cardDrawComplete);
    request.send();
  }

  const cardDrawComplete = function (){
    if(this.status !== 200) return;
    drawnCards = JSON.parse(this.response);
    displayDrawnCards(drawnCards);
    showDeckStatus(drawnCards);
    console.log(drawnCards);
  }

  const displayDrawnCards = function (drawnCards){

    drawnCards.cards.forEach(function(card){
      const div = document.querySelector("#hand")
      const li1 = document.createElement("li");
      const img = document.createElement("img");
      li1.textContent = "Card: " + card.code;
      img.src = card.image;
      img.width = 50;
      div.appendChild(li1)
      div.appendChild(img)
    })
}

window.addEventListener('load', app);
