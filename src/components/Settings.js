import React from 'react'

function Settings() {

function setCSSVar(side) {
  let root = document.documentElement;

  switch (side) {
    case 'arrowsLeft':
      root.style.setProperty('--arrowsLeft', '25px');
      root.style.setProperty('--arrowsRight', '');
      break;
    case 'arrowsRight':
      root.style.setProperty('--arrowsLeft', '');
      root.style.setProperty('--arrowsRight', '25px');
      break;
    default:
      return;
  }
}

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <form name="settings" className="settings-form">
        <fieldset>
        <h2>Arrow key placement</h2>
          <label htmlFor="leftkeys">Left</label>
          <input type="radio" id="leftKeys" name="key-layout" value="left" onChange={() => setCSSVar('arrowsLeft')} />
          <label htmlFor="rightkeys">Right</label>
          <input type="radio" id="rightKeys" name="key-layout" value="right" onChange={() => setCSSVar('arrowsRight')} checked />
        </fieldset>
      </form>
    </div>
  )
}

export default Settings;