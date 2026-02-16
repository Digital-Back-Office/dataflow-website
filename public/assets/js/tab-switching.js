// Tab switching functionality for use cases section
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.use-case-tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (!tabButtons.length || !tabContents.length) return;
  
  let currentTabIndex = 0;
  let autoRotateTimeout = null;
  let currentVideoListener = null;
  let userInteracted = false;
  let userInteractionTimeout = null;
  
  // Function to switch to a specific tab
  function switchToTab(index) {
    const targetButton = tabButtons[index];
    const targetTab = targetButton.getAttribute('data-tab');
    
    // Remove active styling from all buttons and ensure non-active buttons have hover state
    tabButtons.forEach(btn => {
      btn.classList.remove('bg-primary', 'text-white');
      btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
    });
    
    // Add active class to target button (also remove hover state so it doesn't gray on hover)
    targetButton.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');
    targetButton.classList.add('bg-primary', 'text-white');
    
    // Hide all tab contents with fade out
    tabContents.forEach(content => {
      content.classList.remove('active', 'fade-in');
      content.classList.add('fade-out');
    });
    
    // Show the selected tab content with fade in after a brief delay
    const activeContent = document.querySelector(`.tab-content[data-content="${targetTab}"]`);
    if (activeContent) {
      setTimeout(() => {
        activeContent.classList.remove('fade-out');
        activeContent.classList.add('active', 'fade-in');
      }, 150);
    }
    
    currentTabIndex = index;
    
    // Setup auto-advance for this tab
    if (!userInteracted) {
      setupAutoAdvance(activeContent);
    }
  }
  
  // Setup auto-advance based on content type (video or image)
  function setupAutoAdvance(tabContent) {
    // Clear any existing timeout or listener
    stopAutoRotate();
    
    if (!tabContent) return;
    
    const video = tabContent.querySelector('video');
    
    if (video) {
      // For videos: advance when video ends
      const handleVideoEnd = () => {
        if (!userInteracted) {
          currentTabIndex = (currentTabIndex + 1) % tabButtons.length;
          switchToTab(currentTabIndex);
        }
      };
      
      // Remove previous listener if exists
      if (currentVideoListener) {
        currentVideoListener.video.removeEventListener('ended', currentVideoListener.handler);
      }
      
      video.addEventListener('ended', handleVideoEnd);
      currentVideoListener = { video, handler: handleVideoEnd };
      
      // Restart video from beginning
      video.currentTime = 0;
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If autoplay fails, fall back to 4-second timer
          autoRotateTimeout = setTimeout(() => {
            if (!userInteracted) {
              currentTabIndex = (currentTabIndex + 1) % tabButtons.length;
              switchToTab(currentTabIndex);
            }
          }, 4000);
        });
      }
      
      // Fallback: use video duration if available
      if (video.duration && !isNaN(video.duration)) {
        autoRotateTimeout = setTimeout(() => {
          if (!userInteracted) {
            currentTabIndex = (currentTabIndex + 1) % tabButtons.length;
            switchToTab(currentTabIndex);
          }
        }, (video.duration * 1000) + 500); // Add 500ms buffer
      }
    } else {
      // For images: advance after 4 seconds
      autoRotateTimeout = setTimeout(() => {
        if (!userInteracted) {
          currentTabIndex = (currentTabIndex + 1) % tabButtons.length;
          switchToTab(currentTabIndex);
        }
      }, 4000);
    }
  }
  
  // Stop auto-rotate
  function stopAutoRotate() {
    if (autoRotateTimeout) {
      clearTimeout(autoRotateTimeout);
      autoRotateTimeout = null;
    }
    
    if (currentVideoListener) {
      currentVideoListener.video.removeEventListener('ended', currentVideoListener.handler);
      currentVideoListener = null;
    }
  }
  
  // Click event listeners
  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      userInteracted = true;
      switchToTab(index);
      
      // Stop auto-rotate
      stopAutoRotate();
      
      // Clear any pending timeout
      if (userInteractionTimeout) {
        clearTimeout(userInteractionTimeout);
      }
      
      // Restart auto-rotate after 5 seconds of user interaction
      userInteractionTimeout = setTimeout(() => {
        userInteracted = false;
        const activeContent = document.querySelector('.tab-content.active');
        setupAutoAdvance(activeContent);
      }, 5000);
    });
  });
  
  // Start auto-advance on page load
  const initialContent = document.querySelector('.tab-content.active');
  setupAutoAdvance(initialContent);
});
