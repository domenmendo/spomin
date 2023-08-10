import Card from './Card';
import React, { useState } from 'react';
import './App.css';

const cardNames= ["name1","name2","name3","name4","name5","name6","name7","name8"];
const doubledCardNames = cardNames.concat(cardNames);
const shuffledCardNames = shuffle(doubledCardNames);

function shuffle(arr){
  let currIndex = arr.length,randIndex;
  while(currIndex!==0){
    randIndex=Math.floor(Math.random()*currIndex);
    currIndex--;
    [arr[currIndex],arr[randIndex]]=[arr[randIndex],arr[currIndex]];
  }
  return arr;
}

const cards = Array.from({ length: 16 }, (_, index) => ({
  id: index + 1, 
  content: shuffledCardNames[index],
  isFlipped: false,
}));

console.log(cards);

function removeCardsFromDeck(cardId1, cardId2) {
  const index1 = cards.findIndex(card => card.id === cardId1);
  const index2 = cards.findIndex(card => card.id === cardId2);

  if (index1 !== -1) {
    cards.splice(index1, 1);
  }

  if (index2 !== -1) {
    cards.splice(index2 > index1 ? index2 - 1 : index2, 1);
  }
}


function MemoryGame() {

    const [flippedCards, setFlippedCards] = useState([]);

    const handleClick = (cardId) => {
      if(flippedCards.length<2){
        setFlippedCards([...flippedCards,cardId])

        if (flippedCards.length === 1) {//if this is the second card then...
          const c1 = cards.find(card=>card.id===flippedCards[0]);
          const c2 = cards.find(card=>card.id===flippedCards[1]);
          
          if(c1 && c2 && c1.content===c2.content){
            console.log("here!");
            removeCardsFromDeck(c1.id,c2.id);
          }

          setTimeout(() => {
            setFlippedCards([]);
          }, 2000);//2s
        }
      }
    }

    return (
        <div className="memory-game">
            <header>
                <h1>Spomin</h1>
            </header>

            <main>
                <div className="game-board">
                    {cards.map(card=>(
                      <Card
                        id={card.id}
                        isFlipped={flippedCards.includes(card.id) || card.isFlipped}
                        onClick={handleClick}
                        content={card.content}
                      />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default MemoryGame;
