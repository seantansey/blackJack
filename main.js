document.addEventListener('DOMContentLoaded', function(){

//Possible card names, values, and suits
  let cardNames = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
  let cardValues = [2,3,4,5,6,7,8,9,10,10,10,10,11]
  let suits = ['♥', '♦', '♠', '♣']

// creates a full deck of cards - array of objects - each card is an object
  let createDeck = () => {
    let result = []
    for (let x = 0; x < suits.length; x++) {
      for (let y = 0; y < cardNames.length; y++) {
        let cardObj = {}
        cardObj.name = cardNames[y]
        cardObj.numVal = cardValues[y]
        cardObj.suit = suits[x]
        result.push(cardObj)
      }
    }
    return result
  }

//variable for the deck of cards created
  let cardDeck = createDeck()

//deals a randomly selected card
  let dealCard = () => {
    return cardDeck[Math.floor(Math.random() * cardDeck.length)]
  }

//creates a variable for the dealer card location
let dealerArea = document.querySelector('#dealerArea')

//variable for deal button
let dealButton = document.querySelector('#dealButton')

//variable for hit hitButton
let hitButton = document.querySelector('#hitButton')

//variable for dealerCount
let dealerCount = document.querySelector('#dealerCount')
dealerCount.textContent = '0'

//variable for playerCount
let playerCount = document.querySelector('#playerCount')
playerCount.textContent = '0'

//creates a counter for the cards left in Deck
let cardsLeftInDeck = document.querySelector('#cardsLeftInDeck')
cardsLeftInDeck.textContent = cardDeck.length

//function which removes whichever card was played from the Deck
let removeCard = (arrOfCards, cardPlayed) => {
  let result = []
  for (let x = 0; x < arrOfCards.length; x++) {
    if (arrOfCards[x] !== cardPlayed) {
      result.push(arrOfCards[x])
    }
  }
  return result
}


//create variable for stand button
let standButton = document.querySelector('#standButton')

//standButton function adds dealercard until total > 17
let stand = () => {
  while (dealerCount.textContent < 17) {
    dealerCard()
  }
}


let dealerCard = () =>{
  //run dealCard() to create new card, set equal to variable card for access
  let card = dealCard()

  //create card elements
  let newCard = document.createElement('div')
  let newCardName = document.createElement('div')
  let newCardSuit = document.createElement('div')
  let newCardName2 = document.createElement('div')

  //style card
  newCard.style.backgroundColor = 'white'
  newCard.style.width = "14%"
  newCard.style.margin = '1%'
  newCard.style.float = 'left'
  newCard.style.borderRadius = '0.5em'
  newCardName.textContent = card.name
  newCardName.style.marginLeft = '5%'
  newCardSuit.textContent = card.suit
  newCardSuit.style.textAlign = 'center'
  newCardSuit.style.fontSize = '200%'
  newCardSuit.style.marginTop = '40%'
  newCardSuit.style.marginBottom = '40%'
  newCardName2.textContent = card.name
  newCardName2.style.textAlign = 'right'
  newCardName2.style.marginRight = '5%'

  //changes card text to red if a heart or diamond
  if(newCardSuit.textContent === '♦' || newCardSuit.textContent === '♥') {
    newCard.style.color = 'red'
  }

  //append new card
  newCard.appendChild(newCardName)
  newCard.appendChild(newCardSuit)
  //newCard.appendChild(newCardNumVal)
  newCard.appendChild(newCardName2)
  dealerArea.appendChild(newCard)

  //dealer total points for hand
  let parsedDealerCount = parseInt(dealerCount.textContent, 10)
  parsedDealerCount += card.numVal
  if (parsedDealerCount > 21) {
    parsedDealerCount = 'BUST'
  }
  dealerCount.textContent = JSON.stringify(parsedDealerCount)

  //removes card from deck when played
  cardDeck = removeCard(cardDeck, card)

  // counter for the cards left in deck
  cardsLeftInDeck.textContent = cardDeck.length
}

let playerCard = () =>{
  //run dealCard() to create new card, set equal to variable card for access
  let card = dealCard()

  //create card elements
  let newCard = document.createElement('div')
  let newCardName = document.createElement('div')
  let newCardSuit = document.createElement('div')
  //let newCardNumVal = document.createElement('div')
  let newCardName2 = document.createElement('div')

  //style card
  newCard.style.backgroundColor = 'white'
  newCard.style.width = "14%"
  newCard.style.margin = '1%'
  newCard.style.float = 'left'
  newCard.style.borderRadius = '0.5em'
  newCardName.textContent = card.name
  newCardName.style.marginLeft = '5%'
  newCardSuit.textContent = card.suit
  newCardSuit.style.textAlign = 'center'
  newCardSuit.style.fontSize = '200%'
  newCardSuit.style.marginTop = '40%'
  newCardSuit.style.marginBottom = '40%'
  newCardName2.textContent = card.name
  newCardName2.style.textAlign = 'right'
  newCardName2.style.marginRight = '5%'

  //changes card text to red if a heart or diamond
  if(newCardSuit.textContent === '♦' || newCardSuit.textContent === '♥') {
    newCard.style.color = 'red'
  }

  //append new card
  newCard.appendChild(newCardName)
  newCard.appendChild(newCardSuit)
  newCard.appendChild(newCardName2)
  playerArea.appendChild(newCard)

  //dealer total points for hand
  let parsedPlayerCount = parseInt(playerCount.textContent, 10)
  parsedPlayerCount += card.numVal
  if (parsedPlayerCount > 21) {
    parsedPlayerCount = 'BUST'
  }
  playerCount.textContent = JSON.stringify(parsedPlayerCount)

  //removes card from deck when played
  cardDeck = removeCard(cardDeck, card)

  // counter for the cards left in deck
  cardsLeftInDeck.textContent = cardDeck.length
}

//eventListener for dealButton
dealButton.addEventListener('click', function() {
  playerCard()
  playerCard()
  dealerCard()
 })

 //eventListener for dealButton
 hitButton.addEventListener('click', function() {
   playerCard()

  })

  //eventListener for standButton
  standButton.addEventListener('click', function() {
    stand()
   })

})
