import React from 'react';
import leftarrow from "../Assets/leftarrow.png";
import rightarrow from "../Assets/rightarrow.png";
import uparrow from "../Assets/uparrow.png";
import downarrow from "../Assets/downarrow.png";

function ArrowKeys() {

  return (
    <div className="arrow-keys-container">
      <span>
        <button type="button" className="arrow">
          <img src={leftarrow} alt="Left arrow" />
        </button>
      </span>
      <span>
        <button type="button" className="arrow">
          <img src={uparrow} alt="Up arrow" />
        </button>
        <button type="button" className="arrow">
          <img src={downarrow} alt="Down arrow" />
        </button>
      </span>
      <span>
        <button type="button" className="arrow">
          <img src={rightarrow} alt="Right arrow" />
        </button>
      </span>
    </div>
  )
}

export default ArrowKeys;