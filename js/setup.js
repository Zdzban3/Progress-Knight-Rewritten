function setupHeroTab() {
    const heroSubpanel = document.getElementById("heroSubpanel");
    const jobCategoriesArray = Object.entries(jobCategories);
    const jobDataEntries = Object.entries(data.job);

    jobCategoriesArray.forEach(([categoryName, { jobs, name }]) => {
        const jobCategoryContainer = document.createElement("div");
        jobCategoryContainer.classList.add("jobCategoryContainer", name);

        const jobCategoryElement = document.createElement("div");
        jobCategoryElement.classList.add(name, "jobCategoryElement");

        const jobCategoryBackground = document.createElement("div");
        jobCategoryBackground.classList.add(name, "jobCategoryBackground");

        const jobCategoryRequirement = document.createElement("div");
        jobCategoryRequirement.classList.add(name, "jobCategoryRequirement");

        const createElementWithText = (tag, text, className, attribute, attributeValue) => {
            const element = document.createElement(tag);
            if (className) element.classList.add(className);
            element.appendChild(document.createTextNode(text));
            if (attribute) element.setAttribute(attribute, attributeValue)
            return element;
        };

        jobCategoryRequirement.appendChild(createElementWithText("span", "Required: ", "grayed"))
        jobCategoryRequirement.appendChild(createElementWithText("div", "[placeholder]", "categoryRequirementText", "style", "display: inline"))

        const elementsData = [
            { text: jobCategories[categoryName].nameFull, className: "jobCategoryElementTitle" },
            { text: "Level" },
            { text: "Income" },
            { text: "XP" },
            { text: "XP/day" },
            { text: "XP Left" },
            { text: "Max Level" }
        ];

        elementsData.forEach(({ text, className }) => {
            jobCategoryElement.appendChild(createElementWithText("div", text, className));
        });

        jobDataEntries.forEach(([jobKey, jobData]) => {
            if (jobs.includes(jobKey)) {
                const jobReq = document.createElement("div");
                jobReq.classList.add("taskReq", jobData.class + "Requirement");

                jobReq.appendChild(createElementWithText("span", "Required: ", "grayed"))
                jobReq.appendChild(createElementWithText("div", "[placeholder]", "requirementText", "style", "display: inline"))

                const jobProgressBar = document.createElement("div");
                jobProgressBar.classList.add("jobProgressBar", jobData.class + "ProgressBar", "tooltip");
                jobProgressBar.id = (jobData.class + "ProgressBar");
                jobProgressBar.setAttribute("onclick", "selectJob('" + jobData.name + "')");

                const jobProgressBarProgress = document.createElement("div");
                jobProgressBarProgress.classList.add("jobProgressBarProgress", jobData.class + "ProgressBarProgress");
                jobProgressBarProgress.setAttribute("style", "width: 20%");
                jobProgressBar.appendChild(jobProgressBarProgress);

                const jobTooltip = document.createElement("span");
                jobTooltip.classList.add("tooltiptext", jobData.class + "Tooltiptext");
                jobTooltip.innerText = tooltips[jobKey]
                jobProgressBar.appendChild(jobTooltip);

                const jobProgressBarText = createElementWithText("span", jobData.name, "jobProgressBarText", jobData.class + "ProgressBarText");
                jobProgressBar.appendChild(jobProgressBarText);

                const jobLevelDisplay = createElementWithText("div", jobData.level, "jobLevelDisplay");

                const jobIncomeDisplay = document.createElement("div");
                jobIncomeDisplay.classList.add("jobIncomeDisplay");
                for (let i = 0; i < 8; i++) jobIncomeDisplay.appendChild(document.createElement("span"));

                const jobXPDisplay = createElementWithText("div", jobData.xp, "jobXPDisplay");
                const jobXPRateDisplay = createElementWithText("div", jobData.xpMult, "jobXPRateDisplay");
                const jobXPLeftDisplay = createElementWithText("div", jobData.maxXp - jobData.xp, "jobXPLeftDisplay");
                const jobMaxLevelDisplay = createElementWithText("div", jobData.maxLevel, "jobMaxLevelDisplay");

                const jobType = document.createElement("div");
                jobType.classList.add("jobType", jobData.class + "Type");
                [jobReq, jobProgressBar, jobLevelDisplay, jobIncomeDisplay, jobXPDisplay, jobXPRateDisplay, jobXPLeftDisplay, jobMaxLevelDisplay].forEach(el => jobType.appendChild(el));

                jobCategoryBackground.appendChild(jobType);
            }
        });

        jobCategoryContainer.appendChild(jobCategoryElement);
        jobCategoryContainer.appendChild(jobCategoryBackground);
        jobCategoryContainer.appendChild(jobCategoryRequirement);
        heroSubpanel.appendChild(jobCategoryContainer);
    });
}
function setupSkillTab() {
    const skillSubpanel = document.getElementById("skillSubpanel");
    const skillCategoriesArray = Object.entries(skillCategories);
    const skillDataEntries = Object.entries(data.skill);

    skillCategoriesArray.forEach(([categoryName, { skills, name }]) => {
        const skillCategoryContainer = document.createElement("div");
        skillCategoryContainer.classList.add("skillCategoryContainer", name);

        const skillCategoryElement = document.createElement("div");
        skillCategoryElement.classList.add(name, "skillCategoryElement");

        const skillCategoryBackground = document.createElement("div");
        skillCategoryBackground.classList.add(name, "skillCategoryBackground");

        const skillCategoryRequirement = document.createElement("div");
        skillCategoryRequirement.classList.add(name, "skillCategoryRequirement");

        const createElementWithText = (tag, text, className, attribute, attributeValue) => {
            const element = document.createElement(tag);
            if (className) element.classList.add(className);
            element.appendChild(document.createTextNode(text));
            if (attribute) element.setAttribute(attribute, attributeValue)
            return element;
        };

        skillCategoryRequirement.appendChild(createElementWithText("span", "Required: ", "grayed"))
        skillCategoryRequirement.appendChild(createElementWithText("div", "[placeholder]", "categoryRequirementText", "style", "display: inline"))

        const elementsData = [
            { text: skillCategories[categoryName].nameFull, className: "skillCategoryElementTitle" },
            { text: "Level" },
            { text: "Effect" },
            { text: "XP" },
            { text: "XP/day" },
            { text: "XP Left" },
            { text: "Max Level" }
        ];

        elementsData.forEach(({ text, className }) => {
            skillCategoryElement.appendChild(createElementWithText("div", text, className));
        });

        skillDataEntries.forEach(([skillKey, skillData]) => {
            if (skills.includes(skillKey)) {
                const skillReq = document.createElement("div");
                skillReq.classList.add("taskReq", skillData.class + "Requirement");

                skillReq.appendChild(createElementWithText("span", "Required: ", "grayed"))
                skillReq.appendChild(createElementWithText("div", "[placeholder]", "requirementText", "style", "display: inline"))

                const skillProgressBar = document.createElement("div");
                skillProgressBar.classList.add("skillProgressBar", skillData.class + "ProgressBar", "tooltip");
                skillProgressBar.setAttribute("onclick", "selectSkill('" + skillData.name + "')");

                const skillProgressBarProgress = document.createElement("div");
                skillProgressBarProgress.classList.add("skillProgressBarProgress", skillData.class + "ProgressBarProgress");
                skillProgressBarProgress.setAttribute("style", `width: ${skillData.xp / skillData.maxXp * 100}%`);
                skillProgressBar.appendChild(skillProgressBarProgress);

                const skillTooltip = document.createElement("span");
                skillTooltip.classList.add("tooltiptext", skillData.class + "Tooltiptext");
                skillTooltip.innerText = tooltips[skillKey]
                skillProgressBar.appendChild(skillTooltip);

                const skillProgressBarText = createElementWithText("span", skillData.name, "skillProgressBarText", skillData.class + "ProgressBarText");
                skillProgressBar.appendChild(skillProgressBarText);
                
                const skillEffectDisplay = document.createElement("div");
                skillEffectDisplay.classList.add("skillEffectDisplay");
                for (let i = 0; i < 8; i++) skillEffectDisplay.appendChild(document.createElement("span"));

                const skillLevelDisplay = createElementWithText("div", skillData.level, "skillLevelDisplay");
                const skillXPDisplay = createElementWithText("div", skillData.xp, "skillXPDisplay");
                const skillXPRateDisplay = createElementWithText("div", skillData.xpMult, "skillXPRateDisplay");
                const skillXPLeftDisplay = createElementWithText("div", skillData.maxXp - skillData.xp, "skillXPLeftDisplay");
                const skillMaxLevelDisplay = createElementWithText("div", skillData.maxLevel, "skillMaxLevelDisplay");

                const skillType = document.createElement("div");
                skillType.classList.add("skillType", skillData.class + "Type");
                [skillReq, skillProgressBar, skillLevelDisplay, skillEffectDisplay, skillXPDisplay, skillXPRateDisplay, skillXPLeftDisplay, skillMaxLevelDisplay].forEach(el => skillType.appendChild(el));

                skillCategoryBackground.appendChild(skillType);
            }
        });

        skillCategoryContainer.appendChild(skillCategoryElement);
        skillCategoryContainer.appendChild(skillCategoryBackground);
        skillCategoryContainer.appendChild(skillCategoryRequirement);
        skillSubpanel.appendChild(skillCategoryContainer);
    });
}


function setupTabs() {
    setupHeroTab()
    setupSkillTab()
}

function startSetup() {
    if (localStorage.data == undefined) {
        save()
    }
    setupTabs()
    load()
    renderHero()
    renderSkills()
    setTab("hero")
    toggleAutoPromote(false)
    toggleAutoSkill(false)
    switchPrimaryTheme(false)
    switchSecondaryTheme(false)
    switchCoinsAmountDisplayed(false)
    switchCurrencyNotation(false)
    switchSidebarZoom(false)
    switchMainpanelZoom(false)
    switchMobile(false)
    switchTextShadow(false)
    switchExperimentalSettings(false)
    switchHideTitle(false)
    everySecondInterval = setInterval(everySecondUpdate, 1000);
    updateInterval = setInterval(updateWithTime, 1000 / data.settings.updateSpeed)
    saveInterval = setInterval(save, data.settings.saveSpeed)
    switchUpdateSpeed(false)
    updateProgressBars()
    if (data.paused === true) {
        pause()
    }
}
