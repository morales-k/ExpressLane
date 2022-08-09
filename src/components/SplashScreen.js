import React, {useState} from 'react'
import Settings from './Settings';

function SplashScreen(props) {
const [settings, toggleSettings] = useState(false);

  return (
    <div className="splash-container">
      <h1>Express Lane</h1>
      <button className="btn" onClick={() => props.toggleStart(true)}>Start</button>
      <button className="btn" onClick={() => toggleSettings(!settings)}>Settings</button>

      {
        settings ? <Settings /> : null
      }
    </div>
  )
}

export default SplashScreen