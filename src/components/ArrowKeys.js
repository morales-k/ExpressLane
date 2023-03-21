import React from 'react';
import { handleDirection } from '../ViewModel/CanvasVM';

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
                onMouseDown={(e) => handleDirection(e)}
                onMouseUp={(e) => handleDirection(e)}>
              </button>
            </span>
          );
        })
      }
    </div>
  )
}

export default ArrowKeys;