import React from 'react';
import { handleEvent } from '../ViewModel/CanvasVM';

function ArrowKeys() {
  const directions = ["Left", "Up", "Down", "Right"];

  return (
    <div className="arrow-keys-container">

      {
        directions && directions.map(dir => {
          return (
            <span key={`arrow${dir}Span`}>
              <button 
                type="button" 
                className="arrow"
                id={`arrow${dir}`} 
                onMouseDown={(e) => handleEvent(e)}
                onMouseUp={(e) => handleEvent(e)}>
              </button>
            </span>
          );
        })
      }
    </div>
  )
}

export default ArrowKeys;