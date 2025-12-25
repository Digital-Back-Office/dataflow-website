// Tab switching functionality for use cases section
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.use-case-tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (!tabButtons.length || !tabContents.length) return;
  
  let currentTabIndex = 0;
  let autoRotateInterval = null;
  let userInteracted = false;
  let userInteractionTimeout = null;
  
  // Function to switch to a specific tab
  function switchToTab(index) {
    const targetButton = tabButtons[index];
    const targetTab = targetButton.getAttribute('data-tab');
    
    // Remove active class from all buttons
    tabButtons.forEach(btn => {
      btn.classList.remove('bg-primary', 'text-white');
      btn.classList.add('bg-white', 'text-gray-700');
    });
    
    // Add active class to target button
    targetButton.classList.remove('bg-white', 'text-gray-700');
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
  }
  
  // Auto-rotate tabs every 3 seconds
  function startAutoRotate() {
    // Clear any existing interval first
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
    }
    
    autoRotateInterval = setInterval(() => {
      if (!userInteracted) {
        currentTabIndex = (currentTabIndex + 1) % tabButtons.length;
        switchToTab(currentTabIndex);
      }
    }, 3000);
  }
  
  // Stop auto-rotate
  function stopAutoRotate() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
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
        startAutoRotate();
      }, 5000);
    });
  });
  
  // Start auto-rotate on page load
  startAutoRotate();
});
