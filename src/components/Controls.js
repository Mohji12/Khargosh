import React from 'react';
import './Controls.css';

function Controls({ isRotating, onToggleRotate, rotationSpeed, onSpeedChange, photoCount }) {
  return (
    <div className="controls-panel">
      <div className="controls-group">
        <button 
          className={`control-btn ${isRotating ? 'active' : ''}`}
          onClick={onToggleRotate}
          aria-label={isRotating ? 'Pause rotation' : 'Start rotation'}
        >
          {isRotating ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>
        
        <div className="speed-control">
          <label>Speed</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={rotationSpeed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          />
        </div>
      </div>
      
      <div className="photo-count">
        {photoCount} Photos
      </div>
      
      <div className="controls-hint">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span>Click photos to view full size</span>
      </div>
    </div>
  );
}

export default Controls;

