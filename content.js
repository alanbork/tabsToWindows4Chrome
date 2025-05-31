const URL_FLAG = "#ctrl_clicked_tab";

// Listen for 'mousedown' on the whole document in the capture phase
document.addEventListener('mousedown', (event) => {
    // We only care about the primary button (usually left-click)
    if (event.button !== 0) {
        return;
    }

    // Check if Ctrl (or Cmd on Mac) key is pressed
    const modifierPressed = event.ctrlKey || event.metaKey;

    if (modifierPressed) {
        // Find the nearest ancestor anchor tag ('<a>')
        let targetElement = event.target.closest('a');

        // If a link was clicked with Ctrl/Cmd
        if (targetElement && targetElement.href) {
            // Avoid modifying javascript: links or links already containing the flag
            if (targetElement.protocol === 'javascript:' || targetElement.hash === URL_FLAG) {
                return;
            }

            console.log(`Content Script: Ctrl/Cmd+Click detected on: ${targetElement.href}. Adding flag.`);

            const originalHash = targetElement.hash; // Store original hash if it exists

            // Append the flag to the href. The browser will use this modified URL
            // for the navigation when the 'click' event completes. 
            
            targetElement.hash = URL_FLAG + originalHash; 

             // Clean up *after* the navigation likely starts.
             // This is tricky. If we clean too early, the browser might not see the flag.
             // If we clean too late, the user might see it briefly.
             // Let's rely on the background script to clean it upon navigation confirmation.
              setTimeout(() => {
                  if (targetElement.hash === URL_FLAG + originalHash) {
                     targetElement.hash = originalHash; // Restore original hash
                     console.log("Content Script: Attempted cleanup of flag.");
                  }
              }, 1000); // Clean up after a delay
        }
    }
}, true); // Use capture phase to run early

console.log("Content Script (URL Flag Method) loaded.");