/**
 * Vendoora Interactive Kiosk Render System
 * JavaScript functionality for tap/click toggle on touch devices
 * 
 * This script handles the interactive finish swap for kiosk renders:
 * - Desktop: Hover shows black finish (handled by CSS)
 * - Mobile/Touch: Tap toggles between white and black finishes
 */

(function() {
  'use strict';
  
  /**
   * Initialize kiosk interactive behavior
   */
  function initKioskInteractive() {
    const kioskWraps = document.querySelectorAll('.kiosk-wrap');
    
    kioskWraps.forEach(function(wrap) {
      // Set ARIA attributes for accessibility
      wrap.setAttribute('role', 'button');
      wrap.setAttribute('aria-pressed', 'false');
      wrap.setAttribute('tabindex', '0');
      
      // Add click/tap handler for touch devices
      wrap.addEventListener('click', function(e) {
        e.preventDefault();
        toggleKioskFinish(wrap);
      });
      
      // Add keyboard support for accessibility
      wrap.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleKioskFinish(wrap);
        }
      });
      
      // Preload both images for smooth transitions
      preloadKioskImages(wrap);
    });
  }
  
  /**
   * Toggle between white and black finishes
   * @param {HTMLElement} wrap - The kiosk wrapper element
   */
  function toggleKioskFinish(wrap) {
    const whiteImg = wrap.querySelector('.kiosk-img.white');
    const blackImg = wrap.querySelector('.kiosk-img.black');
    
    if (!whiteImg || !blackImg) {
      console.warn('Kiosk images not found in wrapper');
      return;
    }
    
    // Toggle active class
    whiteImg.classList.toggle('active');
    blackImg.classList.toggle('active');
    
    // Update ARIA state
    const isBlackActive = blackImg.classList.contains('active');
    wrap.setAttribute('aria-pressed', isBlackActive ? 'true' : 'false');
    
    // Update finish indicator if present
    updateFinishIndicator(wrap, isBlackActive);
  }
  
  /**
   * Update finish indicator visual state
   * @param {HTMLElement} wrap - The kiosk wrapper element
   * @param {boolean} isBlackActive - Whether black finish is active
   */
  function updateFinishIndicator(wrap, isBlackActive) {
    const indicator = wrap.nextElementSibling;
    if (!indicator || !indicator.classList.contains('kiosk-finish-indicator')) {
      return;
    }
    
    const whiteDot = indicator.querySelector('.kiosk-finish-dot.white');
    const blackDot = indicator.querySelector('.kiosk-finish-dot.black');
    
    if (whiteDot && blackDot) {
      if (isBlackActive) {
        whiteDot.style.opacity = '0.5';
        whiteDot.style.transform = 'scale(0.8)';
        blackDot.style.opacity = '1';
        blackDot.style.transform = 'scale(1.2)';
      } else {
        whiteDot.style.opacity = '1';
        whiteDot.style.transform = 'scale(1)';
        blackDot.style.opacity = '0.5';
        blackDot.style.transform = 'scale(0.8)';
      }
    }
  }
  
  /**
   * Preload both kiosk images for smooth transitions
   * @param {HTMLElement} wrap - The kiosk wrapper element
   */
  function preloadKioskImages(wrap) {
    const images = wrap.querySelectorAll('.kiosk-img');
    images.forEach(function(img) {
      if (img.dataset.src && !img.src) {
        img.src = img.dataset.src;
      }
      
      // Create preload link
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = img.src;
      document.head.appendChild(link);
    });
  }
  
  /**
   * Lazy load kiosk images when they come into viewport
   */
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const wrap = entry.target;
            const images = wrap.querySelectorAll('.kiosk-img[data-src]');
            
            images.forEach(function(img) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            });
            
            observer.unobserve(wrap);
          }
        });
      }, {
        rootMargin: '50px'
      });
      
      document.querySelectorAll('.kiosk-wrap').forEach(function(wrap) {
        imageObserver.observe(wrap);
      });
    }
  }
  
  /**
   * Reset all kiosks to white finish
   */
  function resetAllKiosks() {
    document.querySelectorAll('.kiosk-wrap').forEach(function(wrap) {
      const whiteImg = wrap.querySelector('.kiosk-img.white');
      const blackImg = wrap.querySelector('.kiosk-img.black');
      
      if (whiteImg && blackImg) {
        whiteImg.classList.add('active');
        blackImg.classList.remove('active');
        wrap.setAttribute('aria-pressed', 'false');
      }
    });
  }
  
  /**
   * Get current finish state
   * @param {HTMLElement} wrap - The kiosk wrapper element
   * @returns {string} - 'white' or 'black'
   */
  function getCurrentFinish(wrap) {
    const blackImg = wrap.querySelector('.kiosk-img.black');
    return blackImg && blackImg.classList.contains('active') ? 'black' : 'white';
  }
  
  /**
   * Set specific finish
   * @param {HTMLElement} wrap - The kiosk wrapper element
   * @param {string} finish - 'white' or 'black'
   */
  function setFinish(wrap, finish) {
    const whiteImg = wrap.querySelector('.kiosk-img.white');
    const blackImg = wrap.querySelector('.kiosk-img.black');
    
    if (!whiteImg || !blackImg) return;
    
    if (finish === 'black') {
      whiteImg.classList.remove('active');
      blackImg.classList.add('active');
      wrap.setAttribute('aria-pressed', 'true');
    } else {
      whiteImg.classList.add('active');
      blackImg.classList.remove('active');
      wrap.setAttribute('aria-pressed', 'false');
    }
    
    updateFinishIndicator(wrap, finish === 'black');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKioskInteractive);
  } else {
    initKioskInteractive();
  }
  
  // Initialize lazy loading if supported
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoading);
  } else {
    initLazyLoading();
  }
  
  // Expose API for programmatic control
  window.VendooraKiosk = {
    reset: resetAllKiosks,
    getCurrentFinish: getCurrentFinish,
    setFinish: setFinish,
    init: initKioskInteractive
  };
  
  // Re-initialize on dynamic content load (for SPA navigation)
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
          const hasKioskWrap = Array.from(mutation.addedNodes).some(function(node) {
            return node.nodeType === 1 && 
                   (node.classList.contains('kiosk-wrap') || 
                    node.querySelector && node.querySelector('.kiosk-wrap'));
          });
          
          if (hasKioskWrap) {
            initKioskInteractive();
          }
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
})();

