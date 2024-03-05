async function executeScript(website) {
    
    // Get the keywords from the storage
    chrome.storage.sync.get('keywords', async (data) => {
        let skills = data.keywords || [];
        if (website === 'linkedin') {
            (async () => {
                let jobDescriptionClass = '.jobs-description-content__text';
                let targetDivClass = '.job-details-jobs-unified-top-card__content--two-pane';
                const CrawlerModule = await import('./crawler.js');
                let linkedinCrawler = new CrawlerModule.Crawler(skills, jobDescriptionClass, targetDivClass);
                linkedinCrawler.crawl();
              })();
        }
        else if (website === 'indeed'){
            (async () => {
                let jobDescriptionClass = '#jobDescriptionText';
                let targetDivClass = ".css-1toufe4";
                const CrawlerModule = await import('./crawler.js');
                let indeedCrawler = new CrawlerModule.LinkedinCrawler(skills, jobDescriptionClass, targetDivClass);
                indeedCrawler.waitForElement(targetDivClass).then(element => {
                }).catch(error => {
                    console.error('Element did not load:', error);
                });
                indeedCrawler.crawl();
              })();
        }
    });
}

async function getData(website){
    if (website === 'linkedin') {
        console.log(document.querySelector('.job-details-jobs-unified-top-card__job-title-link'));
        return document.querySelector('.job-details-jobs-unified-top-card__job-title-link');
    }
}

async function applicationTrack(elementclicked) {
    let jobTitle = getData('linkedin');
    if (elementclicked.textContent === "Apply") {
        console.log('Apply button clicked');
        localStorage.setItem('jobTitle', jobTitle.textContent.trim());
        console.log('Job title in storage:', localStorage.getItem('jobTitle'));
        document.getElementById('applyButton').hidden = false;
        document.getElementById('applyButton').textContent = 'Applied! 🎉';
    }else if (elementclicked.textContent === "Applied! 🎉"){
        localStorage.removeItem('jobTitle');
        document.getElementById('applyButton').textContent = 'UnApplied! 😔';
    }else if(elementclicked.textContent === "UnApplied! 😔"){
        localStorage.setItem('jobTitle', jobTitle.textContent.trim());
        document.getElementById('applyButton').textContent = 'Applied! 🎉';
    }else{
        localStorage.setItem('jobTitle', jobTitle.textContent.trim());
    }
}

// Listener for the storage change

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "keywordsUpdated") {
        console.log('Keywords updated');
        executeScript(request.url.includes('linkedin') ? 'linkedin' : 'indeed');
    }
});

// document.addEventListener('DOMContentLoaded', async () => {
    
//     // Define target elements
//     let linkedinTarget = document.querySelector('.jobs-description-content__text');
//     let indeedTarget = document.querySelector('.target-div-2');
//     try {
//         if (linkedinTarget) {
//             executeScript('linkedin');
//         }
//         if (indeedTarget) {
//             executeScript('indeed');
//         }
//     } catch (error) {
//         console.error('Failed to execute script:', error);
//     }
// });


async function setUpObserver() {

        // Define target elements
    let linkedinTarget = document.querySelector('.jobs-description-content__text');
    let indeedTarget = document.querySelector('.jcs-JobTitle');

    // Callback for the Linkedin target
    const linkedinCallback = (mutationsList, observer) => {
        executeScript('linkedin')
    };

    // Callback for the Indeed target
    const indeedCallback = (mutationsList, observer) => {
        executeScript('indeed')
    };

    // Create observers with respective callbacks
    const linkedinObserver = new MutationObserver(linkedinCallback);
    const indeedObserver = new MutationObserver(indeedCallback);

    // Start observing with specified configurations
    if (linkedinTarget) {
        linkedinObserver.observe(linkedinTarget, {
            childList: true,
            subtree: true,
            attributes: true
        });
    }

    if (indeedTarget) {
        indeedObserver.observe(indeedTarget, {
            childList: false,
            subtree: true,
            characterData: true
        });
    }
}

// setUpObserver();

function setupClickListener() {
    // Select the tab(s) you're interested in
    const tabs = document.querySelectorAll('.jcs-JobTitle'); // Update '.your-tab-selector' to the actual selector for your tabs

    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            // You might want to add a small delay to allow any dynamic content to load as a result of the tab click
            setTimeout(() => {
                executeScript('indeed');
            }, 1000); // Adjust the delay as necessary
        });
    });
}

// Execute setupClickListener to attach the event listeners
setupClickListener();
executeScript('indeed');
executeScript('linkedin');

// Add a click event listener to the document
document.addEventListener('click', function(event) {
    let clickedElement = event.target;
    console.log(clickedElement); // Logs the clicked element to the console
    executeScript('indeed');
    executeScript('linkedin');
    applicationTrack(clickedElement);
});
