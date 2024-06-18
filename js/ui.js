
function renderSidebar() {
    document.getElementById("ageDisplay").textContent = formatAge(data.days)
    document.getElementById("lifespanDisplay").textContent = formatWhole(daysToYears(data.lifespan))
    document.getElementById("realtimeDisplay").textContent = formatTime(data.currentRealtime)

    formatCoins(data.coins, document.getElementById("coinDisplay"))
    setSignDisplay()
    formatCoins(getNet(), document.getElementById("netDisplay"))
    formatCoins(getIncome(), document.getElementById("incomeDisplay"))
    formatCoins(getExpense(), document.getElementById("expenseDisplay"))

    document.getElementById("timeSpeedDisplay").textContent = format(data.gameSpeed / 4, 2)
    document.getElementById("happinessDisplay").textContent = format(data.happiness, 2)
    document.getElementById("evilDisplay").textContent = format(data.evil, 2)
    document.getElementById("evilGainDisplay").textContent = format(data.evilGainMult, 2)

    if (data.selectedJobs.length >= 1) {
        const job1 = data.selectedJobs.at(-1)
        document.querySelector("#jobDisplay1 .jobProgressBarText").innerText = job1.name + " Lv" + job1.level
        const progressBarPercentage1 = 100 + 100 * (job1.xp - job1.maxXP) / (job1.maxXP - getTaskMaxXP(job1, 1))
        renderProgressBar(progressBarPercentage1, document.querySelector("#jobDisplay1"))
        document.querySelector("#jobDisplay1").removeAttribute("hidden")
        document.querySelector("#currentJobsDisplay").removeAttribute("hidden")

        if (data.selectedJobs.length >= 2) {
            const job2 = data.selectedJobs.at(-2)
            document.querySelector("#jobDisplay2 .jobProgressBarText").innerText = job2.name + " Lv" + job2.level
            const progressBarPercentage2 = 100 + 100 * (job2.xp - job2.maxXP) / (job2.maxXP - getTaskMaxXP(job2, 1))
            renderProgressBar(progressBarPercentage2, document.querySelector("#jobDisplay2"))
            document.querySelector("#jobDisplay2").removeAttribute("hidden")

            if (data.selectedJobs.length >= 3) {
                const job3 = data.selectedJobs.at(-3)
                document.querySelector("#jobDisplay3 .jobProgressBarText").innerText = job3.name + " Lv" + job3.level
                const progressBarPercentage3 = 100 + 100 * (job3.xp - job3.maxXP) / (job3.maxXP - getTaskMaxXP(job3, 1))
                renderProgressBar(progressBarPercentage3, document.querySelector("#jobDisplay3"))
                document.querySelector("#jobDisplay3").removeAttribute("hidden")

            } else { document.querySelector("#jobDisplay3").setAttribute("hidden", "") }
        } else { document.querySelector("#jobDisplay2").setAttribute("hidden", ""); document.querySelector("#jobDisplay3").setAttribute("hidden", "") }
    } else { document.querySelector("#jobDisplay1").setAttribute("hidden", ""); document.querySelector("#jobDisplay2").setAttribute("hidden", ""); document.querySelector("#jobDisplay3").setAttribute("hidden", ""); document.querySelector("#currentJobsDisplay").setAttribute("hidden", "") }

    if (data.selectedSkills.length >= 1) {
        const skill1 = data.selectedSkills.at(-1)
        document.querySelector("#skillDisplay1 .skillProgressBarText").innerText = skill1.name + " Lv" + skill1.level
        const progressBarPercentage1 = Math.min(100 + 100 * (skill1.xp - skill1.maxXP) / (skill1.maxXP - getTaskMaxXP(skill1, 1)), 100)
        renderProgressBar(progressBarPercentage1, document.querySelector("#skillDisplay1"))
        document.querySelector("#skillDisplay1").removeAttribute("hidden")
        document.querySelector("#currentSkillsDisplay").removeAttribute("hidden")

        if (data.selectedSkills.length >= 2) {
            const skill2 = data.selectedSkills.at(-2)
            document.querySelector("#skillDisplay2 .skillProgressBarText").innerText = skill2.name + " Lv" + skill2.level
            const progressBarPercentage2 = Math.min(100 + 100 * (skill2.xp - skill2.maxXP) / (skill2.maxXP - getTaskMaxXP(skill2, 1)), 100)
            renderProgressBar(progressBarPercentage2, document.querySelector("#skillDisplay2"))
            document.querySelector("#skillDisplay2").removeAttribute("hidden")

            if (data.selectedSkills.length >= 3) {
                const skill3 = data.selectedSkills.at(-3)
                document.querySelector("#skillDisplay3 .skillProgressBarText").innerText = skill3.name + " Lv" + skill3.level
                const progressBarPercentage3 = Math.min(100 + 100 * (skill3.xp - skill3.maxXP) / (skill3.maxXP - getTaskMaxXP(skill3, 1)), 100)
                renderProgressBar(progressBarPercentage3, document.querySelector("#skillDisplay3"))
                document.querySelector("#skillDisplay3").removeAttribute("hidden")

            } else { document.querySelector("#skillDisplay3").setAttribute("hidden", "") }
        } else { document.querySelector("#skillDisplay2").setAttribute("hidden", ""); document.querySelector("#skillDisplay3").setAttribute("hidden", "") }
    } else { document.querySelector("#skillDisplay1").setAttribute("hidden", ""); document.querySelector("#skillDisplay2").setAttribute("hidden", ""); document.querySelector("#skillDisplay3").setAttribute("hidden", ""); document.querySelector("#currentSkillsDisplay").setAttribute("hidden", "") }
}

function setSignDisplay() {
    const signDisplay = document.getElementById("signDisplay")
    const net = getIncome() - getExpense()
    if (net > -1 && net < 1) {
        signDisplay.textContent = ""
        signDisplay.style.color = "gray"
    } else if (net >= 1) {
        signDisplay.textContent = "+"
        signDisplay.style.color = "var(--greenish)"
    } else {
        signDisplay.textContent = "-"
        signDisplay.style.color = "var(--redish)"
    }
}

function setTab(tab) {
    data.selectedTab = tab
    if (tab == "settings") {
        setSettings("settings")
    } else setSettings("hidden")
    const elements = document.getElementsByClassName("subpanel");
    const buttons = document.getElementsByClassName("tabButton");
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add("hidden");
        buttons[i].classList.remove("currentTab");
    }
    var selectedPanel = tab + "Panel"
    var selectedButton = tab + "Button"
    document.getElementById(selectedPanel).classList.remove("hidden");
    document.getElementById(selectedButton).classList.add("currentTab");
    if (tab == 'hero') {
        renderHero()
    }
    if (tab == 'skills') {
        renderSkills()
    }
}

function setSettings(tab) {
    const elements = document.getElementsByClassName("settingsSubpanel");
    const buttons = document.getElementsByClassName("settingsButton");
    data.selectedSettings = tab
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add("hidden");
        buttons[i].classList.remove("currentTab");
    }
    if (tab !== "hidden") {
        var selectedSubpanel = tab + "Subpanel"
        var selectedSubbutton = tab + "Subbutton"
        document.getElementById(selectedSubpanel).classList.remove("hidden");
        document.getElementById(selectedSubbutton).classList.add("currentTab");
    }

}

function pauseButton() {
    if (data.paused == true) {
        unpause()
    } else pause()
}

function toggleAutoPromote(change) {
    if (change) {
        if (data.autopromote) {
            data.autopromote = false
        } else data.autopromote = true
    }
    if (data.autopromote) { document.getElementById("autoPromote").classList.add("toggled") } else document.getElementById("autoPromote").classList.remove("toggled")
}

function toggleAutoSkill(change) {
    if (change) {
        if (data.autoskill) {
            data.autoskill = false
        } else data.autoskill = true
    }
    if (data.autoskill) { document.getElementById("autoSkill").classList.add("toggled") } else document.getElementById("autoSkill").classList.remove("toggled")
}

function pause() {
    data.paused = true;
    document.getElementById("pauseButton").innerText = "Play"
    document.getElementById("pauseButton").classList.add("paused")
    for (i = 0; i < document.getElementsByClassName("tab").length; i++) {
        document.getElementsByClassName("tab")[i].classList.add("paused")
    }
}

function unpause() {
    data.paused = false;
    document.getElementById("pauseButton").innerText = "Pause"
    document.getElementById("pauseButton").classList.remove("paused")
    for (i = 0; i < document.getElementsByClassName("tab").length; i++) {
        document.getElementsByClassName("tab")[i].classList.remove("paused")
    }
}

async function downloadFile() {
    let response = await fetch("./changelog.txt");

    if (response.status != 200) {
        throw new Error("Server Error");
    }

    // read response stream as text
    let text_data = await response.text();

    return text_data;
}

document.querySelector("#changelogSubbutton").addEventListener('click', async function () {
    try {
        let text_data = await downloadFile();
        document.querySelector("#changelog-pre").textContent = text_data;
    }
    catch (e) {
        alert(e.message);
    }
});

function renderStats() {
    if (data.selectedSettings == "stats") {
        const startDate = new Date(data.stats.startDate)
        const currentDate = new Date()
        document.getElementById("startDateDisplay").textContent = startDate.toLocaleDateString()
        document.getElementById("playedDaysDisplay").textContent = format((currentDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24), 2)
        document.getElementById("playedRealTimeDisplay").textContent = formatTime(data.stats.realtime)

        document.getElementById("playedGameTimeDisplayDays").textContent = format(data.stats.totalDays)
        document.getElementById("playedGameTimeDisplayYears").textContent = format(data.stats.totalDays / 365)

        document.getElementById("playedHighestTimeDisplayDays").textContent = format(data.stats.highestDays)
        document.getElementById("playedHighestTimeDisplayYears").textContent = format(data.stats.highestDays / 365)

        const offlineTask = data.specialTask["Offline time"]
        offlineTask.xp = data.storedOfflineTime / 1000
        doTask(offlineTask)
        renderProgressBar(100 + 100 * (offlineTask.xp - offlineTask.maxXP) / (offlineTask.maxXP - getTaskMaxXP(offlineTask, 1)), document.getElementById("statsOfflineProgressBar"))
        document.getElementById("offlineProgressBarProgress").innerText = offlineTask.level
        document.getElementById("offlineTimeDisplay").innerText = formatTimeAmount(data.storedOfflineTime / 1000)
    }
}

function switchPrimaryTheme(change) {
    const cap = 1 // amount of themes, start counting from 0
    if (change == true) {
        data.settings.primaryTheme++
    }
    if (data.settings.primaryTheme > cap) {
        data.settings.primaryTheme = 0
    }
    if (data.settings.primaryTheme == 0) {
        themePrimaryStylesheet.setAttribute('href', 'css/themes/primary/dark.css');
        document.getElementById("selectedPrimaryTheme").textContent = "Dark"
    } else if (data.settings.primaryTheme == 1) {
        themePrimaryStylesheet.setAttribute('href', 'css/themes/primary/light.css');
        document.getElementById("selectedPrimaryTheme").textContent = "Light"
    }
}

function switchSecondaryTheme(change) {
    const cap = 1 // amount of themes, start counting from 0
    if (change == true) {
        data.settings.secondaryTheme++
    }
    if (data.settings.secondaryTheme > cap) {
        data.settings.secondaryTheme = 0
    }
    if (data.settings.secondaryTheme == 0) {
        themeSecondaryStylesheet.setAttribute('href', 'css/themes/secondary/yellow.css');
        document.getElementById("selectedSecondaryTheme").textContent = "Yellow"
    } else if (data.settings.secondaryTheme == 1) {
        themeSecondaryStylesheet.setAttribute('href', 'css/themes/secondary/blue.css');
        document.getElementById("selectedSecondaryTheme").textContent = "Blue"
    }
}

function switchCoinsAmountDisplayed(change) {
    const cap = 5 // max selected maxCoins
    if (change == true) {
        data.settings.coinsDisplayed++
    }
    if (data.settings.coinsDisplayed > cap) {
        data.settings.coinsDisplayed = 1
    }
    document.getElementById("selectedCoinsAmountDisplayed").textContent = data.settings.coinsDisplayed
}

function switchCurrencyNotation(change) {
    const cap = 4 // amount of notations, start counting from 0
    if (change == true) {
        data.settings.currencyNotation++
    }
    if (data.settings.currencyNotation > cap) {
        data.settings.currencyNotation = 0
    }
    switch (data.settings.currencyNotation) {
        case 0:
            document.getElementById("selectedCurrencyNotation").textContent = "Classic"
            break
        case 1:
            document.getElementById("selectedCurrencyNotation").textContent = "Extended"
            break
        case 2:
            document.getElementById("selectedCurrencyNotation").textContent = "Extended++"
            break
        case 3:
            document.getElementById("selectedCurrencyNotation").textContent = "Modern $"
            break
        case 4:
            document.getElementById("selectedCurrencyNotation").textContent = "British £"
            break
    }
}

function switchUpdateSpeed(change) {
    const cap = 5
    if (change == true) {
        data.settings.updateSpeedSetting++
    }
    if (data.settings.updateSpeedSetting > cap) {
        data.settings.updateSpeedSetting = 0
    }
    switch (data.settings.updateSpeedSetting) {
        case 0:
            setUpdateSpeed(5)
            break
        case 1:
            setUpdateSpeed(10)
            break
        case 2:
            setUpdateSpeed(20)
            break
        case 3:
            setUpdateSpeed(30)
            break
        case 4:
            setUpdateSpeed(60)
            break
        case 5:
            setUpdateSpeed(120)
            break
    }
}

function switchSidebarZoom(change) {
    const cap = 6
    if (change == true) {
        data.settings.sidebarZoom++
    }
    if (data.settings.sidebarZoom > cap) {
        data.settings.sidebarZoom = 0
    }
    document.getElementById("sidebar").classList.remove("zoom07")
    document.getElementById("sidebar").classList.remove("zoom08")
    document.getElementById("sidebar").classList.remove("zoom09")
    document.getElementById("sidebar").classList.remove("zoom11")
    document.getElementById("sidebar").classList.remove("zoom12")
    document.getElementById("sidebar").classList.remove("zoom13")
    switch (data.settings.sidebarZoom) {
        case 0:
            document.getElementById("selectedSidebarZoom").textContent = "0.7x"
            document.getElementById("sidebar").classList.add("zoom07")
            break
        case 1:
            document.getElementById("selectedSidebarZoom").textContent = "0.8x"
            document.getElementById("sidebar").classList.add("zoom08")
            break
        case 2:
            document.getElementById("selectedSidebarZoom").textContent = "0.9x"
            document.getElementById("sidebar").classList.add("zoom09")
            break
        case 3:
            document.getElementById("selectedSidebarZoom").textContent = "normal"
            break
        case 4:
            document.getElementById("selectedSidebarZoom").textContent = "1.1x"
            document.getElementById("sidebar").classList.add("zoom11")
            break
        case 5:
            document.getElementById("selectedSidebarZoom").textContent = "1.2x"
            document.getElementById("sidebar").classList.add("zoom12")
            break
        case 6:
            document.getElementById("selectedSidebarZoom").textContent = "1.3x"
            document.getElementById("sidebar").classList.add("zoom13")
            break
    }
}

function switchMainpanelZoom(change) {
    const cap = 6
    if (change == true) {
        data.settings.mainpanelZoom++
    }
    if (data.settings.mainpanelZoom > cap) {
        data.settings.mainpanelZoom = 0
    }
    document.getElementById("mainpanels").classList.remove("zoom07")
    document.getElementById("mainpanels").classList.remove("zoom08")
    document.getElementById("mainpanels").classList.remove("zoom09")
    document.getElementById("mainpanels").classList.remove("zoom11")
    document.getElementById("mainpanels").classList.remove("zoom12")
    document.getElementById("mainpanels").classList.remove("zoom13")
    switch (data.settings.mainpanelZoom) {
        case 0:
            document.getElementById("selectedMainpanelZoom").textContent = "0.7x"
            document.getElementById("mainpanels").classList.add("zoom07")
            break
        case 1:
            document.getElementById("selectedMainpanelZoom").textContent = "0.8x"
            document.getElementById("mainpanels").classList.add("zoom08")
            break
        case 2:
            document.getElementById("selectedMainpanelZoom").textContent = "0.9x"
            document.getElementById("mainpanels").classList.add("zoom09")
            break
        case 3:
            document.getElementById("selectedMainpanelZoom").textContent = "normal"
            break
        case 4:
            document.getElementById("selectedMainpanelZoom").textContent = "1.1x"
            document.getElementById("mainpanels").classList.add("zoom11")
            break
        case 5:
            document.getElementById("selectedMainpanelZoom").textContent = "1.2x"
            document.getElementById("mainpanels").classList.add("zoom12")
            break
        case 6:
            document.getElementById("selectedMainpanelZoom").textContent = "1.3x"
            document.getElementById("mainpanels").classList.add("zoom13")
            break
    }
}

function switchMobile(change = true) {
    if (change == true) {
        if (data.settings.mobile) { data.settings.mobile = false } else data.settings.mobile = true
    }
    if (data.settings.mobile) {
        document.getElementById("mobileStylesheet").setAttribute('href', 'css/mobile.css');
        document.getElementById("selectedMobile").innerText = "true"
    } else {
        document.getElementById("mobileStylesheet").setAttribute('href', 'unset');
        document.getElementById("selectedMobile").innerText = "false"
    }
}

function switchExperimentalSettings(change) {
    const cap = 1 // amount of themes, start counting from 0
    if (change == true) {
        data.settings.experimentalSettings++
    }
    if (data.settings.experimentalSettings > cap) {
        data.settings.experimentalSettings = 0
    }
    if (data.settings.experimentalSettings == 0) {
        document.getElementById("experimentalSettings").setAttribute("hidden", "")
    } else if (data.settings.experimentalSettings == 1) {
        document.getElementById("experimentalSettings").removeAttribute("hidden")
    }
}

function switchTextShadow(change) {
    const cap = 3
    if (change == true) {
        data.settings.textShadow++
    }
    if (data.settings.textShadow > cap) {
        data.settings.textShadow = 0
    }
    if (data.settings.textShadow == 0) {
        document.getElementById("themeTextShadowStylesheet").setAttribute("href", "unset")
        document.getElementById("textShadow").textContent = "None"
    } else if (data.settings.textShadow == 1) {
        document.getElementById("themeTextShadowStylesheet").setAttribute("href", "css/themes/text-shadow/small.css")
        document.getElementById("textShadow").textContent = "Small"
    } else if (data.settings.textShadow == 2) {
        document.getElementById("themeTextShadowStylesheet").setAttribute("href", "css/themes/text-shadow/medium.css")
        document.getElementById("textShadow").textContent = "Medium"
    } else if (data.settings.textShadow == 3) {
        document.getElementById("themeTextShadowStylesheet").setAttribute("href", "css/themes/text-shadow/large.css")
        document.getElementById("textShadow").textContent = "Large"
    }
}

function switchHideTitle(change = true) {
    if (change == true) {
        if (data.settings.hideTitle) { data.settings.hideTitle = false } else data.settings.hideTitle = true
    }
    if (data.settings.hideTitle) {
        document.getElementById("hideTitle").innerText = "true"
        document.getElementById("title").setAttribute("hidden", "")
    } else {
        document.getElementById("hideTitle").innerText = "false"
        document.getElementById("title").removeAttribute("hidden")
    }
}

var questMode = false
function switchQuestMode() {
    if (questMode) { questMode = false } else questMode = true
    if (questMode) {
        data.maxJobs = 30
        data.maxSkills = 30
        document.getElementById("questMode").innerText = "true"
    } else {
        data.maxJobs = 1
        data.maxSkills = 1
        document.getElementById("questMode").innerText = "false"
    }
}

function renderProgressBar(percentage, element) {
    element.children[0].setAttribute("style", "width: " + percentage + "%")
}

function renderHero() {
    if (data.selectedTab === "hero") {
        const heroSubpanel = document.getElementById("heroSubpanel");
        const jobCategoryContainers = Array.from(heroSubpanel.getElementsByClassName("jobCategoryContainer"));

        jobCategoryContainers.forEach(container => {

            const jobTypes = Array.from(container.getElementsByClassName("jobType"))

            formatRequirements(container.classList[1],
                container.querySelector(".categoryRequirementText"),
                container.querySelector(".jobCategoryRequirement"),
                container.querySelector(".jobCategoryRequirement"),
                container.querySelector(".jobCategoryElement"),
                container.querySelector(".jobCategoryBackground"))

            jobTypes.forEach(jobType => {
                const jobName = jobType.classList[1].replace("Type", "");
                const thisJob = Object.values(data.job).find(job => job.class === jobName);

                if (thisJob) {
                    const jobLevelDisplay = formatLevel(thisJob.level);
                    const jobIncomeDisplay = getIncomeSpecific(thisJob.name);
                    const jobXPDisplay = thisJob.xp;
                    const jobXPRateDisplay = thisJob.xpMult * (1 + thisJob.maxLevel / 10) * data.allXPMult * data.jobXPMult * data.happiness;
                    const jobXPLeftDisplay = thisJob.maxXP - thisJob.xp;
                    const jobMaxLevelDisplay = formatLevel(thisJob.maxLevel);

                    jobType.querySelector(".jobLevelDisplay").innerText = jobLevelDisplay;
                    formatCoins(jobIncomeDisplay, jobType.querySelector(".jobIncomeDisplay"));

                    const progressBarPercentage = Math.min(100 + 100 * (thisJob.xp - thisJob.maxXP) / (thisJob.maxXP - getTaskMaxXP(thisJob, 1)), 100);
                    renderProgressBar(progressBarPercentage, jobType.querySelector(".jobProgressBar"));

                    jobType.querySelector(".jobXPDisplay").innerText = format(jobXPDisplay);
                    jobType.querySelector(".jobXPRateDisplay").innerText = format(jobXPRateDisplay, 2);
                    jobType.querySelector(".jobXPLeftDisplay").innerText = format(jobXPLeftDisplay);
                    jobType.querySelector(".jobMaxLevelDisplay").innerText = jobMaxLevelDisplay;
                    formatRequirements(jobName,
                        jobType.querySelector(".requirementText"),
                        jobType.querySelector(".taskReq"),
                        jobType,
                        jobType.querySelector(".jobProgressBar"),
                        jobType.querySelector(".jobXPDisplay"),
                        jobType.querySelector(".jobXPRateDisplay"),
                        jobType.querySelector(".jobXPLeftDisplay"),
                        jobType.querySelector(".jobLevelDisplay"),
                        jobType.querySelector(".jobIncomeDisplay"),
                        jobType.querySelector(".jobMaxLevelDisplay"))
                }
            });
        });
    }
}

function renderSkills() {
    if (data.selectedTab === "skills") {
        const skillSubpanel = document.getElementById("skillSubpanel");
        const skillCategoryContainers = Array.from(skillSubpanel.getElementsByClassName("skillCategoryContainer"));

        skillCategoryContainers.forEach(container => {
            const skillTypes = Array.from(container.getElementsByClassName("skillType"));

            formatRequirements(container.classList[1],
                container.querySelector(".categoryRequirementText"),
                container.querySelector(".skillCategoryRequirement"),
                container.querySelector(".skillCategoryRequirement"),
                container.querySelector(".skillCategoryElement"),
                container.querySelector(".skillCategoryBackground"))

            skillTypes.forEach(skillType => {
                const skillName = skillType.classList[1].replace("Type", "");
                const thisSkill = Object.values(data.skill).find(skill => skill.class === skillName);

                if (thisSkill) {
                    const skillLevelDisplay = formatLevel(thisSkill.level);
                    const skillEffectDisplay = formatEffect(thisSkill.name);
                    const skillXPDisplay = thisSkill.xp;
                    const skillXPRateDisplay = getSkillXP(thisSkill.name)
                    const skillXPLeftDisplay = thisSkill.maxXP - thisSkill.xp;
                    const skillMaxLevelDisplay = formatLevel(thisSkill.maxLevel);

                    skillType.querySelector(".skillLevelDisplay").innerText = skillLevelDisplay;
                    skillType.querySelector(".skillEffectDisplay").innerText = skillEffectDisplay

                    const progressBarPercentage = Math.min(100 + 100 * (thisSkill.xp - thisSkill.maxXP) / (thisSkill.maxXP - getTaskMaxXP(thisSkill, 1)), 100);
                    renderProgressBar(progressBarPercentage, skillType.querySelector(".skillProgressBar"));

                    skillType.querySelector(".skillXPDisplay").innerText = format(skillXPDisplay);
                    skillType.querySelector(".skillXPRateDisplay").innerText = format(skillXPRateDisplay, 2);
                    skillType.querySelector(".skillXPLeftDisplay").innerText = format(skillXPLeftDisplay);
                    skillType.querySelector(".skillMaxLevelDisplay").innerText = skillMaxLevelDisplay;
                    formatRequirements(skillName,
                        skillType.querySelector(".requirementText"),
                        skillType.querySelector(".taskReq"),
                        skillType,
                        skillType.querySelector(".skillProgressBar"),
                        skillType.querySelector(".skillXPDisplay"),
                        skillType.querySelector(".skillXPRateDisplay"),
                        skillType.querySelector(".skillXPLeftDisplay"),
                        skillType.querySelector(".skillLevelDisplay"),
                        skillType.querySelector(".skillEffectDisplay"),
                        skillType.querySelector(".skillMaxLevelDisplay"))
                }
            });
        });
    }
}

function renderShop() {
    if (data.selectedTab === "shop") {
        const shopSubpanel = document.getElementById("shopSubpanel")
        const shopCategoryContainers = Array.from(shopSubpanel.getElementsByClassName("shopCategoryContainer"))

        shopCategoryContainers.forEach(container => {
            const itemTypes = Array.from(container.getElementsByClassName("itemType"))

            formatRequirements(container.classList[1],
                container.querySelector(".categoryRequirementText"),
                container.querySelector(".shopCategoryRequirement"),
                container.querySelector(".shopCategoryRequirement"),
                container.querySelector(".shopCategoryElement"),
                container.querySelector(".shopCategoryBackground"))

            itemTypes.forEach(itemType => { //not homes
                const itemName = itemType.classList[1].replace("Type", "")
                let thisItem = Object.values(data.buyable.other).find(item => item.class === itemName)
                if (thisItem == null) thisItem = Object.values(data.buyable.home).find(item => item.class === itemName)

                itemType.querySelector(".itemEffectDisplay").innerText = formatItemEffect(thisItem, 1)
                formatCoins(thisItem.price, itemType.querySelector(".itemPriceDisplay"), true)
                formatCoins(thisItem.upkeep * data.expenseMult, itemType.querySelector(".itemUpkeepDisplay"), true)
                itemType.querySelector(".itemActiveDisplay").setAttribute("data-active", thisItem.owned)
                itemType.querySelector(".itemName").setAttribute("data-active", thisItem.owned)

                formatRequirements(itemName,
                    itemType.querySelector(".requirementText"),
                    itemType.querySelector(".taskReq"),
                    itemType,
                    itemType.querySelector(".itemName"),
                    itemType.querySelector(".itemActiveDisplayDiv"),
                    itemType.querySelector(".itemEffectDisplay"),
                    itemType.querySelector(".itemPriceDisplay"),
                    itemType.querySelector(".itemUpkeepDisplay"))

            });
        });
    }
}

function updateProgressBars() {
    for (var anyJob in data.job) {
        document.getElementsByClassName(data.job[anyJob].class + "ProgressBarProgress")[0].classList.remove("selected")
        document.getElementsByClassName(data.job[anyJob].class + "ProgressBar")[0].classList.remove("selected")
    }
    for (var selectedJob in data.selectedJobs) {
        document.getElementsByClassName(data.selectedJobs[selectedJob].class + "ProgressBarProgress")[0].classList.add("selected")
        document.getElementsByClassName(data.selectedJobs[selectedJob].class + "ProgressBar")[0].classList.add("selected")
    }
    for (var anySkill in data.skill) {
        document.getElementsByClassName((data.skill)[anySkill].class + "ProgressBarProgress")[0].classList.remove("selected")
        document.getElementsByClassName((data.skill)[anySkill].class + "ProgressBar")[0].classList.remove("selected")
    }
    for (var selectedSkill in data.selectedSkills) {
        document.getElementsByClassName(data.selectedSkills[selectedSkill].class + "ProgressBarProgress")[0].classList.add("selected")
        document.getElementsByClassName(data.selectedSkills[selectedSkill].class + "ProgressBar")[0].classList.add("selected")
    }
}

function updateUI() {
    renderSidebar()
    renderStats()
    renderHero()
    renderSkills()
    renderShop()
}