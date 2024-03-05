class Crawler {
    constructor(skills, jobDescriptionClass, targetDivClass) {
        this.skills = skills.map(skill => skill.toLowerCase().replace(/"/g, ''));
        this.descriptionClass = jobDescriptionClass;
        this.jobDescription = document.querySelector(this.descriptionClass).textContent;
        this.jobSkills = [];
        this.matchedSkills = [];
        this.unmatchedSkills = [];
        this.sponsorship = null;
        this.clearance = null;
        this.targetDiv = document.querySelector(targetDivClass);
    }

    async getJobSkills() {
        this.jobDescription = this.jobDescription.toLowerCase();
        this.jobSkills = new Set(this.jobDescription.match(/\b(\w+)\b/g));
    }

    async getJobMatchedSkills() {
        this.matchedSkills = this.skills.filter(skill => this.jobSkills.has(skill));
    }

    async getJobUnmatchedSkills() {
        this.unmatchedSkills = this.skills.filter(skill => this.jobSkills.has(skill));
    }

    async checkFields(variable, keyword) {
        const regex = new RegExp(keyword, 'gi');
        const matchCount = (this.jobDescription.match(regex) || []).length;
        if (matchCount > 0) {
            variable = true;
        }
        variable = false;
    }

    async waitForElement(selector, parent = document.body) {
        return new Promise((resolve, reject) => {
            const observer = new MutationObserver((mutations, observer) => {
                const element = parent.querySelector(selector);
                if (element) {
                    resolve(element);
                    observer.disconnect();
                }
            });
    
            observer.observe(parent, {
                childList: true,
                subtree: true
            });
        });
    }

    async crawl() {
        console.log('Crawling Started. . .');
        await this.getJobSkills();
        await this.getJobMatchedSkills();
        await this.getJobUnmatchedSkills();
        await this.checkFields(this.sponsorship, "sponsorship");
        await this.checkFields(this.clearance, "clearance");
        (async () => {
            const CardModule = await import('./utils/common.js');
            let createcard = new CardModule.Card(this.targetDiv, this.matchedSkills, this.unmatchedSkills, this.skills, this.sponsorship, this.clearance);
            createcard.run();
          })();
    }
}

export { Crawler };
