# tabsToWindows4Chrome
Chrome (v3) extension: New tabs become new windows - the return of TABless browsing 

This minimalistic extension makes Chrome (mostly) tabless by default; to open a link with a tab now requires holding down **ctrl**. There already exist a few extensions on the Chrome store that attempt something similar, but with much added complexity to cover all edge cases, making them a pain to inspect manually before installing. Given the constant dribble of news about malicious extensions I'm not installing anything I can't read first and understand. The code for this extension was about 20 lines before comments were added, and is extremely straightforward. I suggest you inspect it before installing it!
 
Implementation: Any new tab is moved to it's own window immediately (unless control is held down when the tab is made).

Downsides: flicker as the tab is briefly loaded into the current window and then moved (looking for a fix but have tried easy options)

Upsides: never mistakenly opens a new link as a new window when it would have just been a navigation target, unlike my other extension, NewWindowDefault.

# Installation 
This is distributed as an unpacked extension to ensure it is easy to see all the code before installing it. Click the most recent release on the right-hand side of the screen; download and extract the source to a separate folder.
To install an unpacked extension go to chrome://extensions/ and click the "load unpacked" button (you may need to enable developer mode) and select the folder. If you delete the folder later the extension will be rudely uninstalled. 

I'm happy to take any suggested "simple" fixes for these as long as the total code remains less than a page long.

