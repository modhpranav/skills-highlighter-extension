(async () => {
    try {
      let customstyles = await import('./customstyles.js');
      customstyles.injectCustomStyles();
    } catch (error) {
      console.error('Failed to import customstyles:', error);
    }
  })();

class Card{
    constructor(targetDiv, matchedSkills, unmatchedSkills, skills, sponsorship, clearance){
        this.targetDiv = targetDiv;
        this.skills = skills;
        this.matchedSkills = matchedSkills;
        this.unmatchedSkills = unmatchedSkills;
        this.sponsorship = sponsorship ? "Sponsorship Information Given" : null;
        this.clearance = clearance ? "Clearance Required" : null;
        this.cardContainer = null;
        this.totalSkills = this.skills.length;
        this.totalMatchedSkills = this.matchedSkills.length;
        this.totalUnmatchedSkills = this.unmatchedSkills.length;
    }

    async checkTargetDivOrSkills(){
        if (!this.targetDiv|| this.totalSkills === 0) {
            console.log('Target div not found. OR No keywords to match.');
            return false;
        }
        return true;
    }

    createCardContainer(){
        this.cardContainer = document.createElement('div');
        this.cardContainer.className = 'card-container';
    }

    createCard(className){
        let card = document.createElement('div');
        card.className = className;
        return card;
    
    }

    createCardHeader(className, cardBody, SkillType){
        let cardHeader = document.createElement('div');
        let iconSpan = this.createHeaderIcon(); // Create iconSpan here
        let headerText = this.createHeaderText(SkillType, cardBody);
        cardHeader.appendChild(headerText);

        cardHeader.className = className;
        cardHeader.appendChild(iconSpan); // Append iconSpan to cardHeader

        // Define onclick event handler for cardHeader
        cardHeader.onclick = () => {
            const isHidden = cardBody.style.display === 'none';
            cardBody.style.display = isHidden ? 'block' : 'none';
            iconSpan.textContent = isHidden ? '➖' : '➕'; // Toggle the icon
        };
        return cardHeader;
    }

    createHeaderIcon(){
        let iconSpan = document.createElement('span');
        iconSpan.className = 'card-icon';
        iconSpan.textContent = '➕'; // Default icon
        return iconSpan;
    }

    createHeaderText(SkillType, cardBody){
        let headerText = document.createElement('span');
        if (SkillType === 'matched') {
            if (this.totalMatchedSkills === 0 && this.sponsorship === null && this.clearance === null) {
                cardBody.textContent = 'No Skills matched with the job description 😔';
                headerText.textContent = 'Look for other jobs!!';
            }else {
                headerText.textContent = 'Total Matched Skills: ' + this.totalMatchedSkills + '/' + this.totalSkills;
            }
        }else {
            headerText.textContent = 'Total Unmatched Skills: ' + this.totalUnmatchedSkills + '/' + this.totalSkills;
        }
        return headerText;
    }

    createCardBody(className, SkillType){
        let cardBody = document.createElement('div');
        cardBody.className = className;
        if (SkillType === 'unmatched') {
            cardBody.style.display = 'none';
        }
        return cardBody;
    }

    createCloseButtonContainer(className){
        let closeButtonContainer = document.createElement('div');
        closeButtonContainer.className = className;
        return closeButtonContainer;
    }

    createCloseButton(){
        let closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'btn-close';
        closeButton.setAttribute('aria-label', 'Close');
        closeButton.textContent = '×';
        closeButton.onclick = () => {
            this.cardContainer.remove();
        };
        return closeButton;
    }

    createOl(){
        let ol = document.createElement('ol');
        ol.className = 'list-group list-group-numbered';
        ol.style.maxHeight = '8rem'; // Adjust this value based on your actual item height
        ol.style.overflowY = 'auto'; 
        return ol;
    }

    createLi(items, ol){
        items = Array.isArray(items) ? items : (items ? [items] : []);
        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = '- ' + item;
            li.style.padding = "0.5rem 0";
            ol.appendChild(li);
        });
        return ol
    }
    
    CustomappendChild(card, cardHeader, cardBody, ol){
        card.appendChild(cardHeader); // Ensure the header is added first
        cardBody.appendChild(ol); // Append the ordered list to the card body
        card.appendChild(cardBody); // Then, append the card body
        this.cardContainer.appendChild(card);
    }
    
    createMatchedSkillsCard(){
        let card = this.createCard('my-extension-card');
        let cardBody = this.createCardBody('my-extension-card-body', 'matched');
        let cardHeader = this.createCardHeader('my-extension-card-header', cardBody, 'matched');
        let ol = this.createOl();
        ol = this.createLi(this.matchedSkills, ol);
        ol = this.createLi(this.sponsorship, ol); // Add sponsorship
        ol = this.createLi(this.clearance, ol); // Add clearance
        this.CustomappendChild(card, cardHeader, cardBody, ol);
    }

    createUnmatchedSkillsCard(){
        let card = this.createCard('my-extension-card');
        let cardBody = this.createCardBody('my-extension-card-body', 'unmatched');
        let cardHeader = this.createCardHeader('my-extension-card-header', cardBody, 'unmatched');
        let ol = this.createOl();
        ol = this.createLi(this.unmatchedSkills, ol);
        this.CustomappendChild(card, cardHeader, cardBody, ol);
    }
        
    removeCardContainer(){
        let existingCardContainer = this.targetDiv.querySelector('.card-container');
        if (existingCardContainer) {
            existingCardContainer.remove();
        }
    }

    async run(){
        try {
            if (await this.checkTargetDivOrSkills() === false) return;
            this.removeCardContainer();
            this.createCardContainer();
            let closeButton = this.createCloseButton();
            let closeButtonContainer = this.createCloseButtonContainer('closeButtonContainer');
            closeButtonContainer.appendChild(closeButton);
            let newDiv = document.createElement('div');
            newDiv.appendChild(closeButtonContainer);
            this.cardContainer.appendChild(newDiv); // Append at the desired location in the container
            this.createMatchedSkillsCard();
            this.createUnmatchedSkillsCard();
            this.targetDiv.appendChild(this.cardContainer);
            console.log('Card created successfully.');
            return "Card created successfully."
        } catch (error) {
            console.error(error);
            return "Error creating card."
        }
    }
}

export { Card };