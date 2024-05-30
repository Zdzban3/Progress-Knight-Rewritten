
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
    document.getElementById("timeSpeedDisplay").textContent = format(data.baseGameSpeed)
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
    document.getElementById("selectedUpdateSpeed").textContent = data.settings.updateSpeed
}

function renderProgressBar(percentage, element) {
    element.children[0].setAttribute("style", "width: " + percentage + "%")
}

function renderHero() {
    if (data.selectedTab == "hero") {
        const heroSubpanel = document.getElementById("heroSubpanel")
        const jobCategoryContainers = Object.values(heroSubpanel.getElementsByClassName("jobCategoryContainer"))
        for (i5 = 0; i5 < jobCategoryContainers.length; i5++) {
            const jobTypes = Object.values(jobCategoryContainers[i5].getElementsByClassName("jobType"))
            for (i2 = 0; i2 < jobTypes.length; i2++) { //for each job (jobType)
                const jobName = jobTypes[i2].classList[1].replace("Type", "")
                for (i3 = 0; i3 < Object.keys(data.job).length; i3++) {
                    if (jobName == Object.values(data.job)[i3].class) {
                        var thisJob = Object.values(data.job)[i3]
                        var jobLevelDisplay = thisJob.level
                        var jobIncomeDisplay = getIncomeSpecific(thisJob.name)
                        var jobXPDisplay = thisJob.xp
                        var jobXPRateDisplay = thisJob.xpMult * data.jobXpMult * data.happiness
                        var jobXPLeftDisplay = thisJob.maxXp - thisJob.xp
                        var jobMaxLevelDisplay = thisJob.maxLevel
                    }
                }
                Object.values(jobTypes[i2].getElementsByClassName("jobLevelDisplay"))[0].innerText = formatLevel(jobLevelDisplay)

                formatCoins(jobIncomeDisplay, Object.values(jobTypes[i2].getElementsByClassName("jobIncomeDisplay"))[0])

                const progressBarPercentage = 100 + 100 * (thisJob.xp - thisJob.maxXp) / (thisJob.maxXp - getTaskMaxXp(data.job[thisJob.name], 1))
                renderProgressBar(progressBarPercentage, Object.values(jobTypes[i2].getElementsByClassName("jobProgressBar"))[0])

                Object.values(jobTypes[i2].getElementsByClassName("jobXPDisplay"))[0].innerText = format(jobXPDisplay)
                Object.values(jobTypes[i2].getElementsByClassName("jobXPRateDisplay"))[0].innerText = format(jobXPRateDisplay)
                Object.values(jobTypes[i2].getElementsByClassName("jobXPLeftDisplay"))[0].innerText = format(jobXPLeftDisplay)
                Object.values(jobTypes[i2].getElementsByClassName("jobMaxLevelDisplay"))[0].innerText = formatLevel(jobMaxLevelDisplay)
            }
        }
    }
}

function updateProgressBars() {
    for (var anyJob in Object.values(data.job)) {
        document.getElementsByClassName(Object.values(data.job)[anyJob].class + "ProgressBarProgress")[0].classList.remove("selected")
        document.getElementsByClassName(Object.values(data.job)[anyJob].class + "ProgressBar")[0].classList.remove("selected")
    }
    for (var selectedJob in data.selectedJobs) {
        document.getElementsByClassName(data.selectedJobs[selectedJob].class + "ProgressBarProgress")[0].classList.add("selected")
        document.getElementsByClassName(data.selectedJobs[selectedJob].class + "ProgressBar")[0].classList.add("selected")
    }
}

function addRealtime() {
    data.stats.realtime += 1 / data.settings.updateSpeed
    if (data.paused == false) {
        data.currentRealtime += 1 / data.settings.updateSpeed
    }
}

function updateUI() {
    addRealtime()
    renderSidebar()
    renderStats()
    renderHero()
}