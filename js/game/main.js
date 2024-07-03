function updateTime(value = 1) {
    return value * (data.updateTimeDiff / 1000)
}

function getGameSpeed() {
    var gameSpeed = data.gameSpeed * data.devGameSpeed * +!data.paused
    return gameSpeed
}

function applySpeed(value = 1) {
    finalValue = value * getGameSpeed() * updateTime()
    return finalValue
}

function applyExpenses() {
    var coins = applySpeed(getExpense())
    data.coins -= coins
    if (data.coins < 0) {
        goBankrupt()
    }
}

function applyIncome() {
    data.coins += applySpeed(getIncome())
}

function goBankrupt() {
    data.coins = 0

    var buyableArray = Object.keys(data.buyable).sort(function (a, b) { return data.buyable[b].upkeep - data.buyable[a].upkeep }) //sort by upkeep backwards
    for (const key of buyableArray) {
        const buyable = data.buyable[key]
        if (buyable.owned) {
            if (buyable.upkeep >= getNet()) {
                if (shopCategories["Properties"].items.indexOf(key) >= 0) buyItem("Homeless")
                else buyItem(key)
                break
            } else buyItem(key)
        }
    }
    autobuy()
}

function getLifespan() {
    return data.baseLifespan
}

function increaseDays() {
    var increase = applySpeed(1)
    data.days += increase
    data.stats.totalDays += increase
    if (data.days > data.stats.highestDays) data.stats.highestDays = data.days
}

function ifJobSelected(jobName) {
    for (const key in data.selectedJobs) if (jobName === data.selectedJobs[key].name) return true
    return false
}
function ifSkillSelected(skillName) {
    for (const key in data.selectedSkills) if (skillName === data.selectedSkills[key].name) return true
    return false
}

function selectJob(jobName, removeIndex = 0) {
    if (!ifJobSelected(jobName)) {
        if (data.selectedJobs.length >= data.maxJobs) data.selectedJobs.splice(removeIndex, 1)
        data.selectedJobs.push(data.job[jobName])
    } else for (const key in data.selectedJobs) if (data.selectedJobs[key].name == jobName) data.selectedJobs.splice(key, 1)
    updateProgressBars()
}
function selectSkill(skillName) {
    if (!ifSkillSelected(skillName)) {
        if (data.selectedSkills.length >= data.maxSkills) data.selectedSkills.shift()
        data.selectedSkills.push(data.skill[skillName])
    } else for (i = 0; i < data.selectedSkills.length; i++) {
        if (data.selectedSkills[i].name == skillName) {
            data.selectedSkills.splice(i, 1)
        }
    }
    updateProgressBars()
}

function doSelectedJobs() {
    for (const key in data.selectedJobs) {
        data.selectedJobs[key] = data.job[data.selectedJobs[key].name]
        doCurrentJob(data.selectedJobs[key].name)
    }
}

function doCurrentJob(jobName) {
    var currentJob = data.job[jobName]
    var jobXP = applySpeed() * getJobXP(jobName)
    currentJob.xp += jobXP
    while (currentJob.xp >= currentJob.maxXP) {
        currentJob.level++
        currentJob.maxXP = getTaskMaxXP(currentJob)
    }
    while (currentJob.xp < getTaskMaxXP(currentJob, 1)) {
        currentJob.level--
        currentJob.maxXP = getTaskMaxXP(currentJob)
    }
    currentJob.maxXP = getTaskMaxXP(currentJob)
}

function doTask(task) { //task is data.job[jobName] | data.skill[skillName]
    task.xp += applySpeed() * task.xpMult * data.happiness * (1 + task.maxLevel / 10) * data.baseXPMult
    while (task.xp >= task.maxXP) {
        task.level++
        task.maxXP = getTaskMaxXP(task)
    }
    while (task.xp < getTaskMaxXP(task, 1)) {
        task.level--
        task.maxXP = getTaskMaxXP(task)
    }
    task.maxXP = getTaskMaxXP(task)
}

function doSelectedSkills() {
    for (i2 = 0; i2 < data.selectedSkills.length; i2++) {
        for (i3 = 0; i3 < Object.keys(data.skill).length; i3++) {
            if (data.selectedSkills[i2].name == Object.keys(data.skill)[i3]) {
                data.selectedSkills[i2] = Object.values(data.skill)[i3]
            }
        }
    }
    for (i = 0; i < data.selectedSkills.length; i++) {
        doSkill(data.selectedSkills[i].name)
    }
}

function doSkill(key) {
    const skill = data.skill[key]
    const skillXP = applySpeed() * getSkillXP(key)
    skill.xp += skillXP
    while (skill.xp >= skill.maxXP) {
        skill.level++
        skill.maxXP = getTaskMaxXP(skill)
    }
    while (skill.xp < getTaskMaxXP(skill, 1)) {
        skill.level--
        skill.maxXP = getTaskMaxXP(skill)
    }
    skill.maxXP = getTaskMaxXP(skill)
}

function isAlive() {
    if (data.days < data.lifespan) {
        document.getElementById("info").classList.add("hidden")
        return true
    }
    data.days = data.lifespan
    document.getElementById("info").classList.remove("hidden")
    pause()
    return false
}

function jobInWhatCategory(task, property = "name") {
    for (const key in jobCategories) {
        const category = jobCategories[key]
        if (category.jobs.find((element) => element == task))
            if (property === "altName")
                if (category.altName) return category.altName
                else return category.nameFull
            else return category[property]
    }
}

function skillInWhatCategory(task, property = "name") {
    for (const key in skillCategories) {
        const category = skillCategories[key]
        if (category.skills.find((element) => element == task))
            if (property === "altName")
                if (category.altName) return category.altName
                else return category.nameFull
            else return category[property]
    }
}

function jobIndexInCategory(task) {
    for (const category in jobCategories)
        if (jobCategories[category].jobs.find((element) => element == task))
            return jobCategories[category].jobs.indexOf(task)
}

function autopromote() {
    if (data.selectedJobs[0] === undefined) selectJob("Beggar")
    if (data.selectedJobs.length < data.maxJobs) for (const selectedJob in data.selectedJobs) for (const key in data.job) {
        const job = data.job[key]
        var isSelected = false
        if (isComplete(requirements[data.job[key].class])) {
            for (const selectedJob in data.selectedJobs) if (data.selectedJobs[selectedJob].name == job.name) isSelected = true
            if (!isSelected) selectJob(key)
        }
    }
    for (const selectedJob in data.selectedJobs) {
        var nextSelectedJob = undefined
        for (const key in data.job) {
            const job = data.job[key]
            var isSelected = false
            if (isComplete(requirements[data.job[key].class])) {
                for (const selectedJob in data.selectedJobs) if (data.selectedJobs[selectedJob].name === job.name) isSelected = true
                if (!isSelected && jobInWhatCategory(key) === jobInWhatCategory(data.selectedJobs[selectedJob].name)) nextSelectedJob = key
            }
        }
        if (isComplete(requirements[data.selectedJobs[selectedJob].class])) {
            if (nextSelectedJob !== undefined && jobIndexInCategory(data.selectedJobs[selectedJob].name) < jobIndexInCategory(nextSelectedJob))
                selectJob(nextSelectedJob, selectedJob)
        } else if (nextSelectedJob !== undefined) selectJob(nextSelectedJob, selectedJob)
    }
}

function autoskill() {
    if (data.selectedSkills[0] == undefined) selectSkill("Concentration")
    else {
        var xpDict = {}
        for (const key in data.skill) {
            const skill = data.skill[key]
            if (isComplete(requirements[data.skill[key].class])) xpDict[key] = -1 * (skill.xp - skill.maxXP) * Math.pow(skill.level, 2) / (getSkillXP(key) * skill.importance)
        }
        const entries = getSortedKeysFromDict(xpDict)
        for (let i = 0; i < data.maxSkills; i++) if (entries[i] && !ifSkillSelected(entries[i])) selectSkill(entries[i])
    }
}

function autobuy() {
    var netIncome = getNet() / data.expenseMult
    for (const key in data.buyable) {
        const item = data.buyable[key]
        if (isComplete(requirements[item.class])) {
            if (shopCategories["Properties"].items.indexOf(key) >= 0) { //for homes
                if (item.effect > data.buyable[data.selectedHome].effect) {
                    if (item.price < data.coins && item.upkeep < netIncome || data.coins - item.price > (item.upkeep - netIncome) * data.gameSpeed * 200) {
                        buyItem(key)
                        netIncome -= item.upkeep
                    }
                }
            } else {
                let pass = true
                for (const key2 in jobCategories) {
                    if (jobCategories[key2].altName) var categoryName = jobCategories[key2].altName
                    else var categoryName = jobCategories[key2].nameFull
                    if (item.description.replace(" XP", "").replace(" Income", "").replace(" Efficiency", "") === categoryName)
                        for (const key3 in data.selectedJobs) {
                            if (jobInWhatCategory(data.selectedJobs[key3].name, "altName") !== categoryName) pass = false
                            else pass = true
                        }
                }
                for (const key2 in data.job) {
                    if (item.description.replace(" XP", "").replace(" Income", "").replace(" Efficiency", "") === data.job[key2].name)
                        for (const key3 in data.selectedJobs) {
                            if (item.description.replace(" XP", "").replace(" Income", "").replace(" Efficiency", "") !== data.selectedJobs[key3].name) pass = false
                            else pass = true
                        }
                }
                for (const key2 in skillCategories) {
                    if (skillCategories[key2].altName) var categoryName = skillCategories[key2].altName
                    else var categoryName = skillCategories[key2].nameFull
                    if (item.description.replace(" XP", "").replace(" Income", "").replace(" Efficiency", "") === categoryName)
                        for (const key3 in data.selectedSkills) {
                            if (skillInWhatCategory(data.selectedSkills[key3].name, "altName") !== categoryName) pass = false
                            else pass = true
                        }
                }
                for (const key2 in data.skill) {
                    if (item.description.replace(" XP", "").replace(" Income", "").replace(" Efficiency", "") === data.skill[key2].name)
                        for (const key3 in data.selectedSkills) {
                            if (item.description.replace(" XP", "").replace(" Income", "").replace(" Efficiency", "") !== data.selectedSkills[key3].name) pass = false
                            else pass = true
                        }
                }
                if (pass && !item.owned && item.price < data.coins) {
                    if (item.upkeep < netIncome || data.coins - item.price > (item.upkeep - netIncome) * data.gameSpeed * 200) {
                        buyItem(key)
                        netIncome -= item.upkeep
                    }
                }
            }
        }
    }
}

function cantBuy(key) {
    const element = document.getElementById("shopSubpanel").querySelector(`.${data.buyable[key].class}itemName`)
    element.setAttribute("style", "background-color: var(--shopItemFlash)")
    setTimeout(function () {
        element.removeAttribute("style")
    }, 200)
}

function buyItem(key) {
    const item = data.buyable[key]
    if (shopCategories["Properties"].items.indexOf(key) >= 0) {
        if (item.owned === false && data.coins >= item.price) {
            data.coins += data.buyable[data.selectedHome].price / 1.2
            data.buyable[data.selectedHome].owned = false
            data.selectedHome = key
            item.owned = true
            data.coins -= item.price
        } else cantBuy(key)
    } else if (item.owned === false && data.coins >= item.price) {
        item.owned = true
        data.coins -= item.price
    } else if (item.owned === true) {
        item.owned = false
        data.coins += item.price / 1.2
    } else cantBuy(key)
}

function getSortedKeysFromDict(dict) {
    var values = []
    var entries = []
    for (const key in dict) {
        var value = dict[key]
        values.push(value)
    }
    values.sort(function (a, b) { return a - b })
    for (const key in dict) {
        var value = dict[key]
        for (const num in values) {
            if (value == values[num]) {
                entries[num] = key
            }
        }
    }
    return entries

}

function setMenuWidth(width) {
    var root = document.querySelector(':root');
    root.style.setProperty('--menuWidth', width);
}

function setUpdateSpeed(Hz) {
    data.settings.updateSpeed = Hz
    clearInterval(updateInterval)
    updateInterval = setInterval(updateWithTime, 1000 / data.settings.updateSpeed)
    document.getElementById("selectedUpdateSpeed").textContent = data.settings.updateSpeed
}

function setSaveSpeed(ms) {
    data.settings.saveSpeed = ms
    clearInterval(saveInterval)
    saveInterval = setInterval(save, data.settings.saveSpeed)
}

function save() {
    localStorage.setItem("data", JSON.stringify(data))
    localStorage.setItem("settings", JSON.stringify(data.settings))
}

function load() {
    if (localStorage["data"] != undefined) data = JSON.parse(localStorage.getItem("data"))
    if (localStorage["settings"] != undefined) data.settings = JSON.parse(localStorage.getItem("settings"))
}

function importGameData() {
    try {
        const importExportBox = document.getElementById("importExportBox")
        if (importExportBox.value == "") {
            alert("It looks like you tried to load an empty save... Paste save data into the box, then click \"Import Save\" again.")
            return
        }
        data = JSON.parse(window.atob(importExportBox.value))
        save()
        location.reload()
    } catch (error) {
        alert("It looks like you tried to load a corrupted save... If this issue persists, feel free to contact the developers!")
    }
}

function exportGameData() {
    const importExportBox = document.getElementById("importExportBox")
    const saveString = window.btoa(JSON.stringify(data))
    importExportBox.value = saveString
}

function reset(resetSettings = false) {
    localStorage.removeItem("data")
    if (resetSettings == true) {
        localStorage.removeItem("settings")
    }
    location.reload()
}

function update() {
    isAlive()
    applyMultipliers()
    increaseDays()
    updateAdvancements()
    if (data.autopromote === true) autopromote()
    if (data.autoskill === true) autoskill()
    if (data.autobuy === true) autobuy()
    doSelectedSkills()
    doSelectedJobs()
    if (data.selectedJobs.length > data.maxJobs) selectJob(data.selectedJobs[0].name)
    if (data.selectedSkills.length > data.maxSkills) selectSkill(data.selectedSkills[0].name)
    for (const key in data.selectedJobs) {
        const job = data.selectedJobs[key]
        if (!(isComplete(requirements[job.class]))) selectJob(job.name, key)
    }
    applyIncome()
    applyExpenses()
    data.maxCoins = Math.max(data.coins, data.maxCoins)
    data.stats.highestCoins = Math.max(data.coins, data.stats.highestCoins)
    for (const key in data.job) { const task = data.job[key]; task.highestLevel = Math.max(task.level, task.highestLevel) }
    for (const key in data.skill) { const task = data.skill[key]; task.highestLevel = Math.max(task.level, task.highestLevel) }
    updateUI()
    amuletText()
    if (document.getElementById("beggarProgressBar").classList.contains("helpTutorial") && data.job["Beggar"].highestLevel !== 0) document.getElementById("beggarProgressBar").classList.remove("helpTutorial")
}

function updateWithTime() {
    var thisUpdate = new Date().getTime();
    data.updateTimeDiff = Math.round(thisUpdate - data.lastUpdate);
    if (data.updateTimeDiff > 1000) {
        data.storedOfflineTime += data.updateTimeDiff
        data.updateTimeDiff = 0
    }
    data.stats.realtime += data.updateTimeDiff / 1000
    data.currentRealtime += data.updateTimeDiff / 1000 * +!data.paused
    update();
    data.lastUpdate = thisUpdate;
}

//init
startSetup()