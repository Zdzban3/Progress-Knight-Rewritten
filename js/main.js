function applyMultipliers() {
    data.happiness = getHappiness()
    data.jobXPMult = getJobXPMult()
    data.skillXPMult = getSkillXPMult()
}

function applySkillEffects(effectName) {
    var effect = 1
    for (const skillName in data.skill) {
        const skill = data.skill[skillName]
        const skillDescription = skill.description
        if (skillDescription == effectName) {
            const effectFormula = skill.effectFormula
            const skillEffect = skill.effect
            const skillLevel = skill.level
            switch (effectFormula) {
                case "normal":
                    effect *= 1 + (skillEffect * skillLevel)
                    break
                case "reductive":
                    effect *= math.pow(1 + skillEffect, math.log(skillLevel + 1, 1.2))
                    break
                case "squared":
                    effect *= math.pow(1 + (skillEffect * skillLevel), 2)
            }
        }
    }
    return effect
}

function getEffectSpecific(skillName) {
    var effect = 1
    const skillLevel = data.skill[skillName].level
    const effectFormula = data.skill[skillName].effectFormula
    const skillEffect = data.skill[skillName].effect
    switch (effectFormula) {
        case "normal":
            effect *= 1 + (skillEffect * skillLevel)
            break
        case "reductive":
            effect *= math.pow(1 + skillEffect, math.log(skillLevel + 1, 1.2))
            break
        case "squared":
            effect *= math.pow(1 + (skillEffect * skillLevel), 2)
    }
    return effect
}

function getHappiness() {
    return applySkillEffects("Happiness")
}

function getJobXPMult() {
    return applySkillEffects("Job XP")
}

function getSkillXPMult() {
    return applySkillEffects("Skill XP")
}

function getTaskMaxXp(task, levelsBelow = 0) { //task is data.job[jobName] | data.skill[skillName]
    var taskLevel = task.level - levelsBelow
    if (taskLevel == 0) {
        return task.baseMaxXp
    } else if (taskLevel == -1) {
        return 0
    }
    taskLevel++
    switch (task.xpFormula) {
        case "normalJob":
            return math.pow(1.01, taskLevel) * taskLevel * task.baseMaxXp
            break
        case "normalSkill":
            return math.pow(1.005, taskLevel) * taskLevel * task.baseMaxXp
            break
        case "squaredSkill":
            return math.pow(1.01, taskLevel) * taskLevel * task.baseMaxXp
            break
        case "offlineTime":
            return math.pow(taskLevel, 1.25) * task.baseMaxXp
            break
    }
}

function sellItem(itemName) {
    if (data.item[itemName].owned == true) {
        data.item[itemName].owned = false
        data.coins += data.item[itemName].price / 2
    }
}

function buyItem(itemName) {
    if (data.item[itemName].owned == false, data.coins >= data.item[itemName].price) {
        data.item[itemName].owned = true
        data.coins -= data.item[itemName].price
    }
}

function selectHome(homeName) {
    if (data.selectedHome.name !== homeName) {
        data.selectedHome = data.home[homeName]
    }
}

function getNet() {
    return Math.abs(getIncome() - getExpense())
}

function getIncome() {
    var income = 0
    for (i = 0; i < data.selectedJobs.length; i++) {
        const job = data.selectedJobs[i]
        if (job.hasOwnProperty("income")) {
            switch (data.selectedJobs[i].incomeFormula) {
                case "normal":
                    var incomeMult = math.log(1 + math.pow(job.level, 0.5)) + ((job.level) / 10) + 1
                    break
                case "less penalty":
                    var incomeMult = math.log(1 + math.pow(job.level, 0.6)) + ((job.level) / 9) + 1
                    break
            }
            income += job.income * incomeMult
        } else income += 0
    }
    return income
}

function getIncomeSpecific(jobName) {
    const job = data.job[jobName]
    if (job.hasOwnProperty("income")) {
        switch (data.job[jobName].incomeFormula) {
            case "normal":
                var incomeMult = math.log(1 + math.pow(job.level, 0.5)) + ((job.level) / 10) + 1
                break
            case "less penalty":
                var incomeMult = math.log(1 + math.pow(job.level, 0.6)) + ((job.level) / 9) + 1
                break
        }
        var income = data.job[jobName].income * incomeMult
        return income
    } else return 0
}

function getExpense() {
    var expense = 0
    var itemArray = Object.values(data.buyable.normal)
    for (i = 0; i < itemArray.length; i++) {
        if (itemArray[i].owned == true) {
            expense += itemArray[i].upkeep
        }
    }
    expense += data.buyable.home[data.selectedHome].upkeep
    return expense
}

function updateTime(value = 1) {
    return value * (data.updateTimeDiff / 1000)
}

function getGameSpeed() {
    var gameSpeed = data.baseGameSpeed * +!data.paused
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
    data.currentHome = data.home["Homeless"] //set it to the best bought house
}

function getLifespan() {
    return data.baseLifespan
}

function increaseDays() {
    var increase = applySpeed(1)
    data.days += increase
    data.stats.totalDays += increase
    if (data.days > data.stats.highestDays) {
        data.stats.highestDays = data.days
    }
}

function checkIfJobIsNotSelected(jobName) {
    var boolean = true
    for (i = 0; i < data.selectedJobs.length; i++) {
        if (jobName !== data.selectedJobs[i].name) {
            boolean *= true
        } else boolean *= false
    }
    return boolean
}

function selectJob(jobName) {
    if (checkIfJobIsNotSelected(jobName)) {
        if (data.selectedJobs.length >= data.maxJobs) {
            data.selectedJobs.shift()
        }
        data.selectedJobs.push(data.job[jobName])
        //document.getElementsByClassName(jobName.replace(" ", "")).classList.add("progressBarProgressSelected")
    } else for (i = 0; i < data.selectedJobs.length; i++) {
        if (data.selectedJobs[i].name == jobName) {
            data.selectedJobs.splice(i, 1)
        }
    }
    updateProgressBars()
}

function checkIfSkillIsNotSelected(skillName) {
    var boolean = true
    for (i = 0; i < data.selectedSkills.length; i++) {
        if (skillName !== data.selectedSkills[i].name) {
            boolean *= true
        } else boolean *= false
    }
    return boolean
}

function selectSkill(skillName) {
    if (checkIfSkillIsNotSelected(skillName)) {
        if (data.selectedSkills.length >= data.maxSkills) {
            data.selectedSkills.shift()
        }
        data.selectedSkills.push(data.skill[skillName])
    } else for (i = 0; i < data.selectedSkills.length; i++) {
        if (data.selectedSkills[i].name == skillName) {
            data.selectedSkills.splice(i, 1)
        }
    }
    updateProgressBars()
}

function doSelectedJobs() {
    for (i2 = 0; i2 < data.selectedJobs.length; i2++) {
        for (i3 = 0; i3 < Object.keys(data.job).length; i3++) {
            if (data.selectedJobs[i2].name == Object.keys(data.job)[i3]) {
                data.selectedJobs[i2] = Object.values(data.job)[i3]
            }
        }
    }
    for (i = 0; i < data.selectedJobs.length; i++) {
        doCurrentJob(data.selectedJobs[i].name)
    }
}

function doCurrentJob(jobName) {
    var currentJob = data.job[jobName]
    var jobXp = applySpeed() * currentJob.xpMult * data.jobXPMult * data.happiness
    currentJob.xp += jobXp
    while (currentJob.xp >= currentJob.maxXp) {
        currentJob.level++
        currentJob.maxXp = getTaskMaxXp(currentJob)
    }
    while (currentJob.xp < getTaskMaxXp(currentJob, 1)) {
        currentJob.level--
        currentJob.maxXp = getTaskMaxXp(currentJob)
    }
    currentJob.maxXp = getTaskMaxXp(currentJob)
}

function doTask(task) { //task is data.job[jobName] | data.skill[skillName]
    task.xp += applySpeed() * task.xpMult * data.happiness
    while (task.xp >= task.maxXp) {
        task.level++
        task.maxXp = getTaskMaxXp(task)
    }
    while (task.xp < getTaskMaxXp(task, 1)) {
        task.level--
        task.maxXp = getTaskMaxXp(task)
    }
    task.maxXp = getTaskMaxXp(task)
}

function doSelectedSkills() {
    for (i = 0; i < data.selectedSkills.length; i++) {
        doCurrentSkill(data.selectedSkills[i].name)
    }
}

function doCurrentSkill(skillName) {
    var currentSkill = data.skill[skillName]
    var skillXp = applySpeed() * currentSkill.xpMult * data.skillXPMult * data.happiness
    currentSkill.xp += skillXp
    while (currentSkill.xp >= currentSkill.maxXp) {
        currentSkill.level++
        currentSkill.maxXp = getTaskMaxXp(currentSkill)
    }
    while (currentSkill.xp < getTaskMaxXp(currentSkill, 1)) {
        currentSkill.level--
        currentSkill.maxXp = getTaskMaxXp(currentSkill)
    }
    currentSkill.maxXp = getTaskMaxXp(currentSkill)
}

function showInfo() {
    const element = document.getElementById("info");
    element.classList.remove("hidden");
}

function hideInfo() {
    const element = document.getElementById("info");
    element.classList.add("hidden");
}

function isAlive() {
    if (data.days < data.lifespan) {
        hideInfo()
        return true
    } else {
        showInfo()
        pause()
        return false
    }
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
    if (localStorage["data"] !== "undefined") {
        data = JSON.parse(localStorage.getItem("data"))
    }
    if (localStorage["settings"] !== "undefined") {
        data.settings = JSON.parse(localStorage.getItem("settings"))
    }
}

function reset(resetSettings = false) {
    localStorage.setItem("data", "undefined")
    if (resetSettings == true) {
        localStorage.setItem("settings", "undefined")
    }
    location.reload()
}

function everySecondUpdate() {
    data.stats.realtime += 1
    data.currentRealtime += 1 * +!data.paused
}

function update() {
    isAlive()
    applyMultipliers()
    increaseDays()
    //autoPromote()
    //autoLearn()
    doSelectedSkills()
    doSelectedJobs()
    applyExpenses()
    applyIncome()
    updateUI()
    //getOfflineTime()
}

function updateWithTime() {
    var thisUpdate = new Date().getTime();
    data.updateTimeDiff = Math.round(thisUpdate - data.lastUpdate);
    if (data.updateTimeDiff > 1000) {
        data.storedOfflineTime += data.updateTimeDiff
        data.updateTimeDiff = 0
    }
    update();
    data.lastUpdate = thisUpdate;
}

//init
startSetup()