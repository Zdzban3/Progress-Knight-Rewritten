
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

function switchTheme(changeTheme) {
    const themeCap = 1 // amount of themes, start counting from 0
    if (changeTheme == true) {
        data.settings.theme++
    }
    if (data.settings.theme > themeCap) {
        data.settings.theme = 0
    }
    if (data.settings.theme == 0) {
        themeStylesheet.setAttribute('href', 'css/themes/dark.css');
        document.getElementById("selectedTheme").textContent = "Dark"
    } else if (data.settings.theme == 1) {
        themeStylesheet.setAttribute('href', 'css/themes/light.css');
        document.getElementById("selectedTheme").textContent = "Light"
    }
}

function updateUI() {
    if (data.selectedSettings == "stats") {
        renderStats()
    }
    data.stats.realtime += 1 / data.settings.updateSpeed
    if (data.paused == false) {
        data.currentRealtime += 1 / data.settings.updateSpeed
    }
    if (data.selectedTab == "hero") {
        const heroSubpanel = document.getElementById("heroSubpanel")
        const jobCategoryContainers = Object.values(heroSubpanel.getElementsByClassName("jobCategoryContainer"))
        for (i5 = 0; i5 < jobCategoryContainers.length; i5++) {
            const jobTypes = Object.values(jobCategoryContainers[i5].getElementsByClassName("jobType"))
            for (i2 = 0; i2 < jobTypes.length; i2++) { //for each job (jobType)
                const jobName = jobTypes[i2].classList[1].replace("Type", "")
                for (i3 = 0; i3 < Object.keys(data.job).length; i3++) {
                    if (jobName == Object.values(data.job)[i3].class) {
                        const thisJob = Object.values(data.job)[i3]
                        var jobLevelDisplay = thisJob.level
                        var jobIncomeDisplay = getIncomeSpecific(thisJob.name)
                        var jobXPDisplay = thisJob.xp
                        var jobXPLeftDisplay = thisJob.maxXp - thisJob.xp
                        var jobMaxLevelDisplay = thisJob.maxLevel
                    }
                }
                //Object.values(jobTypes[i2].getElementsByClassName("jobProgressBar"))[0].innerText = jobProgressBar
                Object.values(jobTypes[i2].getElementsByClassName("jobLevelDisplay"))[0].innerText = format(jobLevelDisplay, 0)

                formatCoins(jobIncomeDisplay, Object.values(jobTypes[i2].getElementsByClassName("jobIncomeDisplay"))[0])

                Object.values(jobTypes[i2].getElementsByClassName("jobXPDisplay"))[0].innerText = format(jobXPDisplay)
                Object.values(jobTypes[i2].getElementsByClassName("jobXPLeftDisplay"))[0].innerText = format(jobXPLeftDisplay)
                Object.values(jobTypes[i2].getElementsByClassName("jobMaxLevelDisplay"))[0].innerText = format(jobMaxLevelDisplay, 0)
            }
        }
    }
}