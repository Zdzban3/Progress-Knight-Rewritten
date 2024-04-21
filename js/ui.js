
function renderSideBar() {
    const task = gameData.currentJob
    document.getElementById("ageDisplay").textContent = formatAge(gameData.days)
    document.getElementById("lifespanDisplay").textContent = formatWhole(daysToYears(getLifespan()))
    document.getElementById("realtimeDisplay").textContent = formatTime(gameData.realtime)

    formatCoins(gameData.coins, document.getElementById("coinDisplay"))
    setSignDisplay()
    formatCoins(getNet(), document.getElementById("netDisplay"))
    formatCoins(getIncome(), document.getElementById("incomeDisplay"))
    formatCoins(getExpense(), document.getElementById("expenseDisplay"))

    document.getElementById("happinessDisplay").textContent = format(getHappiness())

    document.getElementById("evilDisplay").textContent = format(gameData.evil)
    document.getElementById("evilGainDisplay").textContent = format(getEvilGain())
    document.getElementById("evilGainButtonDisplay").textContent = "+" + format(getEvilGain())

    document.getElementById("timeWarping").hidden = (getUnpausedGameSpeed() / baseGameSpeed) <= 1
    document.getElementById("timeWarpingDisplay").textContent = "x" + format(getUnpausedGameSpeed() / baseGameSpeed, 2)

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
    const elements = document.getElementsByClassName("subpanel");
    const buttons = document.getElementsByClassName("tabButton");
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add("hidden");
        buttons[i].classList.remove("currentTab");
    }
    elements[tab].classList.remove("hidden");
    buttons[tab].classList.add("currentTab");
}

function setSettings(tab) {
    const elements = document.getElementsByClassName("settingsSubpanel");
    const buttons = document.getElementsByClassName("settingsButton");
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add("hidden");
        buttons[i].classList.remove("currentTab");
    }
    elements[tab].classList.remove("hidden");
    buttons[tab].classList.add("currentTab");
}

function showInfo() {
    const element = document.getElementById("info");
    element.classList.remove("hidden");
}

function hideInfo() {
    const element = document.getElementById("info");
    element.classList.add("hidden");
}

function loadChangelog() {
    const element = document.getElementById("changelog");
    element.innerHTML += "version 0.0.0 / 21/04/2024<br>* hello<br>* added changelog<br>* added main panels<br>* added Hero, Skills, Shop, Amulet, Settings tabs (empty)<br>* added Settings, Stats (empty) and Changelog subtabs to Settings tab"
}
loadChangelog()