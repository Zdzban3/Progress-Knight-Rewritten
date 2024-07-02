function setupHeroTab() {
    const heroSubpanel = document.getElementById("heroSubpanel")
    const jobCategoriesArray = Object.entries(jobCategories)
    const jobDataEntries = Object.entries(data.job)
    jobDataEntries.sort(function (a, b) {
        var aValue = 0
        var bValue = 0
        for (const key in jobs) {
            aValue++
            if (a[0] === key) break
        }
        for (const key in jobs) {
            bValue++
            if (b[0] === key) break
        }
        return aValue - bValue
    })

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
    skillDataEntries.sort(function (a, b) {
        var aValue = 0
        var bValue = 0
        for (const key in skills) {
            aValue++
            if (a[0] === key) break
        }
        for (const key in skills) {
            bValue++
            if (b[0] === key) break
        }
        return aValue - bValue
    })

    skillCategoriesArray.forEach(([categoryName, { skills, name }]) => {
        const skillCategoryContainer = document.createElement("div");
        skillCategoryContainer.classList.add("skillCategoryContainer", name);

        const skillCategoryElement = document.createElement("div");
        skillCategoryElement.classList.add(name, "skillCategoryElement");

        const skillCategoryBackground = document.createElement("div");
        skillCategoryBackground.classList.add(name, "skillCategoryBackground");

        const skillCategoryRequirement = document.createElement("div");
        skillCategoryRequirement.classList.add(name, "skillCategoryRequirement");

        const createElementWithText = (tag, text, className, attribute, attributeValue, secondClass) => {
            const element = document.createElement(tag);
            if (className) element.classList.add(className);
            if (secondClass) element.classList.add(secondClass);
            element.appendChild(document.createTextNode(text));
            if (attribute) element.setAttribute(attribute, attributeValue)
            return element;
        }

        skillCategoryRequirement.appendChild(createElementWithText("span", "Required: ", "grayed"))
        skillCategoryRequirement.appendChild(createElementWithText("div", "[placeholder]", "categoryRequirementText", "style", "display: inline"))

        const elementsData = [
            { text: skillCategories[categoryName].nameFull, className: "skillCategoryElementTitle" },
            { text: "Level" },
            { text: "Effect", className: "skillEffectDisplay" },
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

                if ("coins" in requirements[skillData.class]) {
                    const skillReqCoins = createElementWithText("div", "", "requirementCoins", "style", "display: inline")
                    skillReq.appendChild(createElementWithText("div", "Coins: ", "requirementText", "style", "display: inline", "coinReqText"))
                    for (i = 0; i < 8; i++) skillReqCoins.appendChild(document.createElement("span"))
                    skillReqCoins.appendChild(createElementWithText("div", "", "requirementCoinsEnd", "style", "display: inline"))
                    skillReq.appendChild(skillReqCoins)
                    const itemReqCoins2 = createElementWithText("div", "", "requirementCoins2", "style", "display: inline")
                    for (i = 0; i < 8; i++) { itemReqCoins2.appendChild(document.createElement("span")) }
                    skillReq.appendChild(itemReqCoins2)
                }

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

function setupShopTab() {
    const shopSubpanel = document.getElementById("shopSubpanel");
    const shopCategoriesArray = Object.entries(shopCategories);
    const shopDataEntries = Object.entries(data.buyable);
    shopDataEntries.sort(function (a, b) {
        var aValue = 0
        var bValue = 0
        for (const key in buyables) {
            aValue++
            if (a[0] === key) break
        }
        for (const key in buyables) {
            bValue++
            if (b[0] === key) break
        }
        return aValue - bValue
    })

    shopCategoriesArray.forEach(([categoryName, { items, name }]) => {
        const shopCategoryContainer = document.createElement("div");
        shopCategoryContainer.classList.add("shopCategoryContainer", name);

        const shopCategoryElement = document.createElement("div");
        shopCategoryElement.classList.add(name, "shopCategoryElement");

        const shopCategoryBackground = document.createElement("div");
        shopCategoryBackground.classList.add(name, "shopCategoryBackground");

        const shopCategoryRequirement = document.createElement("div");
        shopCategoryRequirement.classList.add(name, "shopCategoryRequirement");

        const createElementWithText = (tag, text, className, attribute, attributeValue, secondClass) => {
            const element = document.createElement(tag);
            if (className) element.classList.add(className);
            if (secondClass) element.classList.add(secondClass);
            element.appendChild(document.createTextNode(text));
            if (attribute) element.setAttribute(attribute, attributeValue)
            return element;
        };

        shopCategoryRequirement.appendChild(createElementWithText("span", "Required: ", "grayed"))
        shopCategoryRequirement.appendChild(createElementWithText("div", "[placeholder]", "categoryRequirementText", "style", "display: inline"))
        const shopCategoryRequirementCoins = createElementWithText("div", "", "requirementCoins", "style", "display: inline")
        shopCategoryRequirement.appendChild(createElementWithText("div", "Coins: ", "categoryRequirementText", "style", "display: inline", "coinReqText"))
        for (i = 0; i < 8; i++) { shopCategoryRequirementCoins.appendChild(document.createElement("span")) }
        shopCategoryRequirementCoins.appendChild(createElementWithText("div", "", "requirementCoinsEnd", "style", "display: inline"))
        const shopCategoryRequirementCoins2 = createElementWithText("div", "", "requirementCoins2", "style", "display: inline")
        for (i = 0; i < 8; i++) { shopCategoryRequirementCoins2.appendChild(document.createElement("span")) }
        shopCategoryRequirement.appendChild(shopCategoryRequirementCoins)
        shopCategoryRequirement.appendChild(shopCategoryRequirementCoins2)

        const elementsData = [
            { text: shopCategories[categoryName].nameFull, className: "shopCategoryElementTitle" },
            { text: "Active" },
            { text: "Effect" },
            { text: "Price" },
            { text: "Upkeep" }
        ];

        elementsData.forEach(({ text, className }) => {
            shopCategoryElement.appendChild(createElementWithText("div", text, className));
        });

        shopDataEntries.forEach(([itemKey, itemData]) => {
            if (items.includes(itemKey)) {
                const itemReq = document.createElement("div");
                itemReq.classList.add("taskReq", itemData.class + "Requirement");

                itemReq.appendChild(createElementWithText("span", "Required: ", "grayed"))
                itemReq.appendChild(createElementWithText("div", "[placeholder]", "requirementText", "style", "display: inline"))
                const itemReqCoins = createElementWithText("div", "", "requirementCoins", "style", "display: inline")
                itemReq.appendChild(createElementWithText("div", "Coins: ", "requirementText", "style", "display: inline", "coinReqText"))
                for (i = 0; i < 8; i++) itemReqCoins.appendChild(document.createElement("span"))
                itemReqCoins.appendChild(createElementWithText("div", "", "requirementCoinsEnd", "style", "display: inline"))
                itemReq.appendChild(itemReqCoins)
                const itemReqCoins2 = createElementWithText("div", "", "requirementCoins2", "style", "display: inline")
                for (i = 0; i < 8; i++) { itemReqCoins2.appendChild(document.createElement("span")) }
                itemReq.appendChild(itemReqCoins2)

                const itemName = document.createElement("div");
                itemName.classList.add("itemName", itemData.class + "itemName", "tooltip");
                itemName.setAttribute("onclick", `buyItem('${itemData.name}')`)
                const itemNameText = createElementWithText("span", itemData.name, "itemNameText", itemData.class + "itemNameText")
                itemName.appendChild(itemNameText)

                const itemTooltip = document.createElement("span");
                itemTooltip.classList.add("tooltiptext", itemData.class + "Tooltiptext");
                itemTooltip.innerText = tooltips[itemKey]
                itemName.appendChild(itemTooltip);

                const itemActiveDiv = document.createElement("div")
                itemActiveDiv.classList.add("itemActiveDisplayDiv", itemData.class + "ActiveDisplayDiv")
                const itemActive = document.createElement("div")
                itemActive.classList.add("itemActiveDisplay", itemData.class + "ActiveDisplay")
                itemActive.setAttribute("data-active", "false")
                itemActiveDiv.appendChild(itemActive)
                const itemEffect = document.createElement("div")
                itemEffect.classList.add("itemEffectDisplay")
                itemEffect.appendChild(document.createTextNode(""))
                const itemPrice = document.createElement("div")
                itemPrice.classList.add("itemPriceDisplay")
                for (let i = 0; i < 8; i++) itemPrice.appendChild(document.createElement("span"));
                const itemUpkeep = document.createElement("div")
                itemUpkeep.classList.add("itemUpkeepDisplay")
                for (let i = 0; i < 8; i++) itemUpkeep.appendChild(document.createElement("span"));

                const itemType = document.createElement("div");
                itemType.classList.add("itemType", itemData.class + "Type");
                [itemReq, itemName, itemActiveDiv, itemEffect, itemPrice, itemUpkeep].forEach(el => itemType.appendChild(el));

                shopCategoryBackground.appendChild(itemType);
            }
        })

        shopCategoryContainer.appendChild(shopCategoryElement);
        shopCategoryContainer.appendChild(shopCategoryBackground);
        shopCategoryContainer.appendChild(shopCategoryRequirement);
        shopSubpanel.appendChild(shopCategoryContainer);
    })
}


function setupTabs() {
    setupHeroTab()
    setupSkillTab()
    setupShopTab()
}

function startSetup() {
    load()
    assignData()
    setupTabs()
    data.maxCoins = Math.max(data.coins, data.maxCoins)
    data.stats.highestCoins = Math.max(data.coins, data.stats.highestCoins)
    for (const key in data.job) { const task = data.job[key]; task.highestLevel = Math.max(task.level, task.highestLevel) }
    for (const key in data.skill) { const task = data.skill[key]; task.highestLevel = Math.max(task.level, task.highestLevel) }
    if (data.job["Beggar"].highestLevel === 0) document.getElementById("beggarProgressBar").classList.add("helpTutorial")
    renderSidebar()
    renderStats()
    renderHero()
    renderSkills()
    renderShop()
    setTab("hero")
    setupAllAdvancements()
    updateAdvancements()
    if (data.settings.mainpanelZoom === 0 || data.settings.sidebarZoom === 0) { data.settings.mainpanelZoom = 1; data.settings.sidebarZoom = 1 }
    if (data.settings.mainpanelZoom > 1.9 || data.settings.sidebarZoom > 1.9) { data.settings.mainpanelZoom = 1; data.settings.sidebarZoom = 1 }
    toggleAutoPromote(false)
    toggleAutoSkill(false)
    toggleAutoBuy(false)
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
    switchSmoothWidth(false)
    updateInterval = setInterval(updateWithTime, 1000 / data.settings.updateSpeed)
    saveInterval = setInterval(save, data.settings.saveSpeed)
    twoSecondInterval = setInterval(twoSecondUpdate, 2000)
    switchUpdateSpeed(false)
    updateProgressBars()
    if (data.paused === true) pause()
}
