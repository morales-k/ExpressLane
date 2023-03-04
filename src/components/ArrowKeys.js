import React from 'react'

function ArrowKeys(props) {

  return (
    <div className="arrow-keys-container">
      <div className="arrow" onClick={(e) => props.movePlayer(e)}>←</div>
      <div className="arrow" onClick={(e) => props.movePlayer(e)}>→</div>
    </div>
  )
}

export default ArrowKeys;