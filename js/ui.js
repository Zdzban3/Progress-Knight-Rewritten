
function renderSidebar() {
    const task = data.currentJob
    document.getElementById("ageDisplay").textContent = formatAge(data.days)
    document.getElementById("lifespanDisplay").textContent = formatWhole(daysToYears(data.lifespan))
    document.getElementById("realtimeDisplay").textContent = formatTime(data.currentRealtime)

    formatCoins(data.coins, document.getElementById("coinDisplay"))
    setSignDisplay()
    formatCoins(getNet(), document.getElementById("netDisplay"))
    formatCoins(getIncome(), document.getElementById("incomeDisplay"))
    formatCoins(getExpense(), document.getElementById("expenseDisplay"))

    document.getElementById("happinessDisplay").textContent = format(data.happiness)
    document.getElementById("timeSpeedDisplay").textContent = format(data.baseGameSpeed / 4)
}

function setSignDisplay() {
    const signDisplay = document.getElementById("signDisplay")
    if (getNet() > -1 && getNet() < 1) {
        signDisplay.textContent = ""
        signDisplay.style.color = "gray"
    } else if (getNet() >= 1) {
        signDisplay.textContent = "+"
        signDisplay.style.color = "green"
    } else {
        signDisplay.textContent = "-"
        signDisplay.style.color = "red"
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
        renderProgressBar(100 + 100 * (offlineTask.xp - offlineTask.maxXp) / (offlineTask.maxXp - getTaskMaxXp(offlineTask, 1)), document.getElementById("statsOfflineProgressBar"))
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
        themeSecondaryStylesheet.setAttribute('href', 'css/themes/secondary/cyan.css');
        document.getElementById("selectedSecondaryTheme").textContent = "Cyan"
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
    cap = 1
    if (change == true) {
        data.settings.mobile++
    }
    if (data.settings.mobile > cap) {
        data.settings.mobile = 0
    }
    switch (data.settings.mobile) {
        case 0:
            document.getElementById("mobileStylesheet").setAttribute('href', 'unset');
            document.getElementById("selectedMobile").innerText = "false"
            break
        case 1:
            document.getElementById("mobileStylesheet").setAttribute('href', 'css/mobile.css');
            document.getElementById("selectedMobile").innerText = "true"
            break
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
            const jobTypes = Array.from(container.getElementsByClassName("jobType"));

            jobTypes.forEach(jobType => {
                const jobName = jobType.classList[1].replace("Type", "");
                const thisJob = Object.values(data.job).find(job => job.class === jobName);

                if (thisJob) {
                    const jobLevelDisplay = formatLevel(thisJob.level);
                    const jobIncomeDisplay = getIncomeSpecific(thisJob.name);
                    const jobXPDisplay = thisJob.xp;
                    const jobXPRateDisplay = thisJob.xpMult * data.jobXPMult * data.happiness;
                    const jobXPLeftDisplay = thisJob.maxXp - thisJob.xp;
                    const jobMaxLevelDisplay = formatLevel(thisJob.maxLevel);

                    jobType.querySelector(".jobLevelDisplay").innerText = jobLevelDisplay;
                    formatCoins(jobIncomeDisplay, jobType.querySelector(".jobIncomeDisplay"));

                    const progressBarPercentage = 100 + 100 * (thisJob.xp - thisJob.maxXp) / (thisJob.maxXp - getTaskMaxXp(thisJob, 1));
                    renderProgressBar(progressBarPercentage, jobType.querySelector(".jobProgressBar"));

                    jobType.querySelector(".jobXPDisplay").innerText = format(jobXPDisplay);
                    jobType.querySelector(".jobXPRateDisplay").innerText = format(jobXPRateDisplay);
                    jobType.querySelector(".jobXPLeftDisplay").innerText = format(jobXPLeftDisplay);
                    jobType.querySelector(".jobMaxLevelDisplay").innerText = jobMaxLevelDisplay;
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

            skillTypes.forEach(skillType => {
                const skillName = skillType.classList[1].replace("Type", "");
                const thisSkill = Object.values(data.skill).find(skill => skill.class === skillName);

                if (thisSkill) {
                    const skillLevelDisplay = formatLevel(thisSkill.level);
                    const skillEffectDisplay = formatEffect(thisSkill.name);
                    const skillXPDisplay = thisSkill.xp;
                    const skillXPRateDisplay = thisSkill.xpMult * data.skillXPMult * data.happiness;
                    const skillXPLeftDisplay = thisSkill.maxXp - thisSkill.xp;
                    const skillMaxLevelDisplay = formatLevel(thisSkill.maxLevel);

                    skillType.querySelector(".skillLevelDisplay").innerText = skillLevelDisplay;
                    skillType.querySelector(".skillEffectDisplay").innerText = skillEffectDisplay

                    const progressBarPercentage = 100 + 100 * (thisSkill.xp - thisSkill.maxXp) / (thisSkill.maxXp - getTaskMaxXp(thisSkill, 1));
                    renderProgressBar(progressBarPercentage, skillType.querySelector(".skillProgressBar"));

                    skillType.querySelector(".skillXPDisplay").innerText = format(skillXPDisplay);
                    skillType.querySelector(".skillXPRateDisplay").innerText = format(skillXPRateDisplay);
                    skillType.querySelector(".skillXPLeftDisplay").innerText = format(skillXPLeftDisplay);
                    skillType.querySelector(".skillMaxLevelDisplay").innerText = skillMaxLevelDisplay;
                }
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
}