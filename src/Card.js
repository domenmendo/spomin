import React from "react";

const Card = ({ id, isFlipped, onClick, content }) => {

    const handleClick = () =>{
        if(!isFlipped){
            onClick(id);
        }
    }

    return (
        <div
            className={'memory-card ' + (isFlipped ? 'flipped' : '')}
            onClick={handleClick}
        >
            {isFlipped ? content : '?'}
        </div>
    );
}

export default Card;