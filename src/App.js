import Card from './Card';
import React, { useState } from 'react';
import './App.css';

function MemoryGame() {

    const cards = Array.from({ length: 16 }, (_, index) => ({id: index + 1, content: 'X',}));

    const [flippedCards, setFlippedCards] = useState([]);

    const handleClick = (cardId) => {
      if(flippedCards.length<2){
        setFlippedCards([...flippedCards,cardId])

        if (flippedCards.length === 1) {//if this is the second card then...
          setTimeout(() => {
            setFlippedCards([]);
          }, 2000);
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
