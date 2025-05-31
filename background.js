const URL_FLAG = "#ctrl_clicked_tab"; // we add this to the URL so that the browswer knows to leave it a tab

chrome.tabs.onCreated.addListener((tab) => {tab.active=false}); // attempt to minimize flicker, doesn't really help.

// Listen for when a new tab is created specifically for navigation
chrome.webNavigation.onCreatedNavigationTarget.addListener((details) => {
  const newTabId = details.tabId;
  let originalUrl = details.url; // URL the new tab is trying to load

   chrome.tabs.update(newTabId, { active: false });

  console.log(`webNavigation.onCreatedNavigationTarget: Tab ID ${newTabId}, URL: ${originalUrl}`);

  // Check if the URL contains our specific flag
  if (originalUrl && originalUrl.includes(URL_FLAG)) {
    console.log(`  Flag '${URL_FLAG}' detected in URL. Leaving tab and cleaning URL.`);

    // Calculate the URL without the flag and any original hash kept after it
    let cleanedUrl = originalUrl.replace(URL_FLAG, '');
    // If removing the flag left the URL ending only with '#', remove that too.
    if (cleanedUrl.endsWith('#')) {
        cleanedUrl = cleanedUrl.slice(0, -1);
    }

    // Update the tab to navigate to the cleaned URL
    // Use 'chrome.tabs.update' which should happen very quickly
    chrome.tabs.update(newTabId, { url: cleanedUrl }, () => {
        if (chrome.runtime.lastError) {
             console.error(`  Error updating tab ${newTabId} URL: ${chrome.runtime.lastError.message}`);
        } else {
             console.log(`  Successfully updated tab ${newTabId} to cleaned URL: ${cleanedUrl}`);
        }
    });

    // --- DO NOT MOVE THE TAB ---

  } else {
    // --- Flag NOT detected, proceed with moving the tab ---
    console.log(`  Flag not detected. Attempting to move tab ${newTabId} to new window.`);

    chrome.windows.create({
      tabId: newTabId,
      focused: true // Make the new window focused
    }).then(newWindow => {
      if (newWindow) {
          console.log(`  Successfully moved tab ${newTabId} to new window ${newWindow.id}`);
      }
    }).catch(error => {
      // Catch errors if the tab was closed before moving, etc.
      if (error.message.includes("No tab with id") || error.message.includes("Invalid tab ID")) {
           console.warn(`  Failed to move tab ${newTabId} (likely closed): ${error.message}`);
      } else {
           console.error(`  Failed to move tab ${newTabId} to new window:`, error);
      }
    });
  }
});

console.log("Tabs to Windows extension (v1.7 - URL Flag Method) loaded.");