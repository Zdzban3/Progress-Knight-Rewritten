
function renderSideBar() {
    const task = data.currentJob
    document.getElementById("ageDisplay").textContent = formatAge(data.days)
    document.getElementById("lifespanDisplay").textContent = formatWhole(daysToYears(getLifespan()))
    document.getElementById("realtimeDisplay").textContent = formatTime(data.stats.realtime)

    formatCoins(data.coins, document.getElementById("coinDisplay"))
    setSignDisplay()
    formatCoins(getNet(), document.getElementById("netDisplay"))
    formatCoins(getIncome(), document.getElementById("incomeDisplay"))
    formatCoins(getExpense(), document.getElementById("expenseDisplay"))

    document.getElementById("happinessDisplay").textContent = format(getHappiness())

    // Change sidebar when paused
    if (gameData.paused) {
        document.getElementById("info").classList.add("game-paused")
    } else {
        document.getElementById("info").classList.remove("game-paused")
    }
}

function setSignDisplay() {
    const signDisplay = document.getElementById("signDisplay")

    if (getNet() > -1 && getNet() < 1) {
        signDisplay.textContent = ""
        signDisplay.style.color = "gray"
    } else if (getIncome() > getExpense()) {
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
    document.getElementById("startDateDisplay").textContent = data.stats.startDate.toLocaleDateString()
    const currentDate = new Date()
    document.getElementById("playedDaysDisplay").textContent = format((currentDate.getTime() - data.stats.startDate.getTime()) / (1000 * 3600 * 24), 2)
    document.getElementById("playedRealTimeDisplay").textContent = formatTime(data.stats.realtime)

    document.getElementById("playedGameTimeDisplayDays").textContent = format(data.stats.totalDays)
    document.getElementById("playedGameTimeDisplayYears").textContent = format(daysToYears(data.stats.totalDays))

    document.getElementById("playedHighestTimeDisplayDays").textContent = format(data.stats.highestDays)
    document.getElementById("playedHighestTimeDisplayYears").textContent = format(daysToYears(data.stats.highestDays))
}

function switchTheme() {
    var themeCap = 2 // amount of themes, start counting from 0
    data.settings.theme++
    if (data.settings.theme > themeCap) {
        data.settings.theme = 0
    }
}

function updateUI() {
    if (data.selectedSettings == "stats") {
        renderStats()
    }
    data.stats.realtime += 1 / data.settings.updateSpeed
}