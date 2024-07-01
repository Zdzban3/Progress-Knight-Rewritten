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
    } else {
        setSettings("hidden")
        document.getElementById("settingsPanel").classList.add("hidden")
        document.getElementById("settingsButton").classList.remove("currentTab")
    }
    const elements = document.getElementsByClassName("subpanel")
    const buttons = document.getElementsByClassName("tabButton")
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add("hidden")
        buttons[i].classList.remove("currentTab")
    }
    var selectedPanel = tab + "Panel"
    var selectedButton = tab + "Button"
    document.getElementById(selectedPanel).classList.remove("hidden")
    document.getElementById(selectedButton).classList.add("currentTab")
}

function setSettings(tab) {
    const elements = document.getElementsByClassName("settingsSubpanel")
    const buttons = document.getElementsByClassName("settingsButton")
    data.selectedSettings = tab
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add("hidden")
        buttons[i].classList.remove("currentTab")
    }
    if (tab !== "hidden") {
        var selectedSubpanel = tab + "Subpanel"
        var selectedSubbutton = tab + "Subbutton"
        document.getElementById(selectedSubpanel).classList.remove("hidden")
        document.getElementById(selectedSubbutton).classList.add("currentTab")
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
})

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
    if (data.selectedSettings === "stats") renderStats()
    if (data.selectedTab === "hero") renderHero()
    if (data.selectedTab === "skills") renderSkills()
    if (data.selectedTab === "shop") renderShop()
}

function twoSecondUpdate() {
    renderStats()
    renderHero()
    renderSkills()
    renderShop()
}