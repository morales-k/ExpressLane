import React, { useState, useEffect } from 'react';
import { setCSSVar } from '../ViewModel/SettingsVM';

function Settings() {
  const [arrowSide, setArrowSide] = useState("arrowsRight");

  useEffect(() => {
    setCSSVar(arrowSide);
  }, [arrowSide]);

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <form name="settings" className="settings-form">
        <fieldset>
        <h2>Arrow key placement</h2>
          <label htmlFor="leftkeys">Left</label>
          <input 
            type="radio" 
            id="leftKeys" 
            name="key-layout" 
            value="left" 
            onChange={() => setArrowSide("arrowsLeft")}
            checked={arrowSide === "arrowsLeft" ? true : false} />
          <label htmlFor="rightkeys">Right</label>
          <input 
            type="radio" 
            id="rightKeys" 
            name="key-layout" 
            value="right" 
            onChange={() => setArrowSide("arrowsRight")} 
            checked={arrowSide === "arrowsRight" ? true : false} />
        </fieldset>
      </form>
    </div>
  )
}

export default Settings;