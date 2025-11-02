import React, { useEffect, useState } from 'react';
import './Lightbox.css';

function Lightbox({ imageUrl, description, isOpen, onClose, onNext, onPrevious, currentIndex, totalPhotos }) {
  const [showDescription, setShowDescription] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrevious();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Show description after image loads
      setShowDescription(true);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!isOpen) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <button className="lightbox-nav lightbox-prev" onClick={onPrevious} aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <div className="lightbox-image-container">
          <img 
            src={imageUrl} 
            alt={`Photo ${currentIndex + 1}`} 
            className="lightbox-image"
            onLoad={() => setShowDescription(true)}
          />
          
          {description && (
            <div className={`lightbox-description ${showDescription ? 'visible' : ''}`}>
              {/* Decorative Corner Elements */}
              <div className="card-corner card-corner-top-left">
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <path d="M0,10 Q10,0 10,10 Q0,10 0,0" fill="rgba(255, 192, 203, 0.2)" stroke="rgba(255, 192, 203, 0.4)" strokeWidth="1"/>
                </svg>
              </div>
              <div className="card-corner card-corner-top-right">
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <path d="M30,10 Q20,0 20,10 Q30,10 30,0" fill="rgba(255, 192, 203, 0.2)" stroke="rgba(255, 192, 203, 0.4)" strokeWidth="1"/>
                </svg>
              </div>
              <div className="card-corner card-corner-bottom-left">
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <path d="M0,20 Q10,30 10,20 Q0,20 0,30" fill="rgba(255, 192, 203, 0.2)" stroke="rgba(255, 192, 203, 0.4)" strokeWidth="1"/>
                </svg>
              </div>
              <div className="card-corner card-corner-bottom-right">
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <path d="M30,20 Q20,30 20,20 Q30,20 30,30" fill="rgba(255, 192, 203, 0.2)" stroke="rgba(255, 192, 203, 0.4)" strokeWidth="1"/>
                </svg>
              </div>

              {/* Romantic Header with Hearts */}
              <div className="description-header">
                <div className="heart-icon">
                  <svg width="20" height="18" viewBox="0 0 24 21" fill="none">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 0 11.28 0 6.5 0 2.92 2.92 0 6.5 0 8.24 0 9.91.81 11 2.09 12.09.81 13.76 0 15.5 0 19.08 0 22 2.92 22 6.5c0 4.78-5.4 8.86-10.55 13.54L12 21.35z" fill="rgba(255, 192, 203, 0.8)"/>
                  </svg>
                </div>
                <div className="header-line header-line-left"></div>
                <span className="header-text">For You, My Love</span>
                <div className="header-line header-line-right"></div>
                <div className="heart-icon">
                  <svg width="20" height="18" viewBox="0 0 24 21" fill="none">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 0 11.28 0 6.5 0 2.92 2.92 0 6.5 0 8.24 0 9.91.81 11 2.09 12.09.81 13.76 0 15.5 0 19.08 0 22 2.92 22 6.5c0 4.78-5.4 8.86-10.55 13.54L12 21.35z" fill="rgba(255, 192, 203, 0.8)"/>
                  </svg>
                </div>
              </div>

              {/* Decorative Top Swirl */}
              <div className="description-decorative-top">
                <svg width="120" height="25" viewBox="0 0 120 25" fill="none">
                  <path d="M0,12 Q30,5 60,12 T120,12" stroke="rgba(255, 192, 203, 0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <circle cx="30" cy="12" r="2" fill="rgba(255, 192, 203, 0.5)"/>
                  <circle cx="90" cy="12" r="2" fill="rgba(255, 192, 203, 0.5)"/>
                </svg>
              </div>

              {/* Main Text */}
              <p className="description-text">
                <span className="quote-mark quote-mark-open">"</span>
                {description}
                <span className="quote-mark quote-mark-close">"</span>
              </p>

              {/* Decorative Bottom Swirl */}
              <div className="description-decorative-bottom">
                <svg width="120" height="25" viewBox="0 0 120 25" fill="none">
                  <path d="M0,12 Q30,19 60,12 T120,12" stroke="rgba(255, 192, 203, 0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <circle cx="30" cy="12" r="2" fill="rgba(255, 192, 203, 0.5)"/>
                  <circle cx="90" cy="12" r="2" fill="rgba(255, 192, 203, 0.5)"/>
                </svg>
              </div>

              {/* Romantic Footer */}
              <div className="description-footer">
                <div className="footer-hearts">
                  <svg width="12" height="11" viewBox="0 0 24 21" fill="none">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 0 11.28 0 6.5 0 2.92 2.92 0 6.5 0 8.24 0 9.91.81 11 2.09 12.09.81 13.76 0 15.5 0 19.08 0 22 2.92 22 6.5c0 4.78-5.4 8.86-10.55 13.54L12 21.35z" fill="rgba(255, 192, 203, 0.6)"/>
                  </svg>
                  <svg width="12" height="11" viewBox="0 0 24 21" fill="none">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 0 11.28 0 6.5 0 2.92 2.92 0 6.5 0 8.24 0 9.91.81 11 2.09 12.09.81 13.76 0 15.5 0 19.08 0 22 2.92 22 6.5c0 4.78-5.4 8.86-10.55 13.54L12 21.35z" fill="rgba(255, 192, 203, 0.6)"/>
                  </svg>
                  <svg width="12" height="11" viewBox="0 0 24 21" fill="none">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 0 11.28 0 6.5 0 2.92 2.92 0 6.5 0 8.24 0 9.91.81 11 2.09 12.09.81 13.76 0 15.5 0 19.08 0 22 2.92 22 6.5c0 4.78-5.4 8.86-10.55 13.54L12 21.35z" fill="rgba(255, 192, 203, 0.6)"/>
                  </svg>
                </div>
              </div>

              {/* Animated Sparkles */}
              <div className="sparkles">
                <div className="sparkle sparkle-1">✨</div>
                <div className="sparkle sparkle-2">✨</div>
                <div className="sparkle sparkle-3">✨</div>
                <div className="sparkle sparkle-4">✨</div>
              </div>
            </div>
          )}
        </div>
        
        <button className="lightbox-nav lightbox-next" onClick={onNext} aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        
        <div className="lightbox-info">
          <span className="photo-counter">Photo {currentIndex + 1} of {totalPhotos}</span>
        </div>
      </div>
    </div>
  );
}

export default Lightbox;

