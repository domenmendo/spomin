import Card from './Card';
import React, { useEffect, useState } from 'react';
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

function MemoryGame() {

    const [flippedCards, setFlippedCards] = useState([]);
    const [isWon,setIsWon]=useState(false);
    const [timer, setTimer] = useState(0);

    const handleClick = (cardId) => {
      if(flippedCards.length<2){
        setFlippedCards([...flippedCards,cardId])

        if (flippedCards.length === 1) {//if this is the second card then..
          
          setTimeout(() => {
            setFlippedCards([]);
          }, 200);//2s
        }
      }
    }

    function removeCards(cardId1, cardId2) {

      const index1 = cards.findIndex(card => card.id === cardId1);
      const index2 = cards.findIndex(card => card.id === cardId2);
    
      if (index1 !== -1) {
        cards.splice(index1, 1);
      }
    
      if (index2 !== -1) {
        cards.splice(index2 > index1 ? index2 - 1 : index2, 1);
      }
    
      if(cards.length===0){
        setIsWon(true);
      }
    }

    useEffect(() => {
      //console.log("tukaj.");
      const c1 = cards.find(card=>card.id===flippedCards[0]);
      const c2 = cards.find(card=>card.id===flippedCards[1]);
          
      if(c1 && c2 && c1.content===c2.content){
        console.log("here!");
        removeCards(c1.id,c2.id);
        console.log(cards.length);
      }

      if (flippedCards.length === 1) {
        // Start the timer when the first card is flipped
        const interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer + 1);
        }, 1000); // Update timer every second
  
        // Cleanup the interval when all cards are gone
        if (cards.length === 0) {
          setIsWon(true);
          clearInterval(interval);
        }
  
        return () => clearInterval(interval); // Cleanup when component unmounts or game ends
      }
    }, [flippedCards,cards]); 

    return (
        <div className="memory-game">
            <header>
                <h1>Spomin</h1>
            </header>

            <main>
                <div>{isWon&& "zmaga!"}</div>
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
                <div>Time: {timer} seconds</div>
            </main>
        </div>
    );
}

export default MemoryGame;
