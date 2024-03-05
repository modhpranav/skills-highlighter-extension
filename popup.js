document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('button-add');
    const keywordInput = document.getElementById('keywordInput');
    const keywordsContainer = document.getElementById('keywordsContainer');

    function addKeywordToDisplay(keyword) {
        // Prevent adding empty or duplicate keywords
        if (!keyword || Array.from(keywordsContainer.children).some(badge => badge.textContent.replace('×', '').trim() === keyword)) {
            return;
        }

        const badge = document.createElement('span');
        badge.className = 'btn btn-outline-danger btn-sm keyword-badge';
        badge.textContent = keyword;

        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '&times;';
        removeBtn.className = 'remove-keyword';
        removeBtn.onclick = function () {
            badge.remove();
            saveKeywords();
        };

        badge.appendChild(removeBtn);
        keywordsContainer.appendChild(badge);

        saveKeywords();
    }

    function saveKeywords() {
        const keywords = Array.from(keywordsContainer.children).map(badge => badge.textContent.replace('×', '').trim());
        chrome.storage.sync.set({ 'keywords': keywords });
        chrome.tabs.query({}, function(tabs) {
            for (let tab of tabs) {
                chrome.tabs.sendMessage(tab.id, {action: "keywordsUpdated", url: tab.url});
            }
        });
    }

    function loadKeywords() {
        chrome.storage.sync.get('keywords', function (data) {
            if (data.keywords) {
                data.keywords.forEach(addKeywordToDisplay);
            }
        });
    }

    addButton.addEventListener('click', function () {
        const inputKeywords = keywordInput.value.split(',').map(kw => kw.trim()).filter(kw => kw);
        inputKeywords.forEach(keyword => {
            addKeywordToDisplay(keyword);
        });
        keywordInput.value = ''; // Clear input field after adding
    });

    loadKeywords();
});

document.getElementById('keywordInput').addEventListener('keydown', function(event) {
    // Check if the key pressed is 'Enter'
    if (event.key === 'Enter' || event.keyCode === 13) {
        // Prevent the default action to avoid submitting a form if the input is inside one
        event.preventDefault();
        
        // Trigger the click event on the Add button
        document.getElementById('button-add').click();
    }
});