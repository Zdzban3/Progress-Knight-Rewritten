function applyMultipliers() {
    data.happiness = applySkillEffects("Happiness")
    data.jobXPMult = applySkillEffects("Job XP")
    data.skillXPMult = applySkillEffects("Skill XP")
    for (const task in data.job) {
        data.job[task].xpMult = 1
        data.job[task].incomeMult = 1
        data.job[task].xpMult *= applySkillEffects(task + " XP")
        data.job[task].incomeMult *= applySkillEffects(task + " Income")
    }
    for (const task in data.skill) {
        data.skill[task].xpMult = 1
        data.skill[task].effectMult = 1
        data.skill[task].xpMult *= applySkillEffects(task + " XP")
        data.skill[task].effectMult *= applySkillEffects(task + " Effect")
    }
    for (const category in data.category.job) {
        data.category.job[category].incomeMult = applySkillEffects(data.category.job[category].name + " Income")
        for (const job of jobCategories[category].jobs) {
            data.job[job].incomeMult *= data.category.job[category].incomeMult
        }
    }
    for (const category in data.category.job) {
        data.category.job[category].xpMult = applySkillEffects(data.category.job[category].name + " XP")
        for (const job of jobCategories[category].jobs) {
            data.job[job].xpMult *= data.category.job[category].xpMult
        }
    }
    for (const category in data.category.skill) {
        data.category.skill[category].effectMult = applySkillEffects(data.category.skill[category].name + " Effect")
        for (const skill of skillCategories[category].skills) {
            data.skill[skill].effectMult *= data.category.skill[category].effectMult
        }
    }
    for (const category in data.category.skill) {
        data.category.skill[category].xpMult = applySkillEffects(data.category.skill[category].name + " XP")
        for (const skill of skillCategories[category].skills) {
            data.skill[skill].xpMult *= data.category.skill[category].xpMult
        }
    }
    data.expenseMult = 1
    data.expenseMult *= applySkillEffects("Expenses")
}

function applySkillEffects(effectName) {
    var effect = 1
    for (const skillName in data.skill) {
        const skill = data.skill[skillName]
        const skillDescription = skill.description
        if (skillDescription == effectName) {
            const effectFormula = skill.effectFormula
            const skillEffect = skill.effect * skill.effectMult
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
    const skillEffect = data.skill[skillName].effect * data.skill[skillName].effectMult
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

function getTaskMaxXp(task, levelsBelow = 0) { //task is data.job[jobName] | data.skill[skillName]
    var taskLevel = task.level - levelsBelow
    if (taskLevel == 0) {
        return task.baseMaxXP
    } else if (taskLevel == -1) {
        return 0
    }
    taskLevel++
    switch (task.xpFormula) {
        case "normalJob":
            return math.pow(1.01, taskLevel) * taskLevel * task.baseMaxXP
            break
        case "normalSkill":
            return math.pow(1.005, taskLevel) * taskLevel * task.baseMaxXP
            break
        case "squaredSkill":
            return math.pow(1.01, taskLevel) * taskLevel * task.baseMaxXP
            break
        case "offlineTime":
            return math.pow(taskLevel, 1.25) * task.baseMaxXP
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
                    var incomeMult = ((job.level) / 10) + 1
                    break
                case "less penalty":
                    var incomeMult = ((job.level) / 9) + 1
                    break
            }
            income += job.income * incomeMult * job.incomeMult
        } else income += 0
    }
    return income
}

function getIncomeSpecific(jobName) {
    const job = data.job[jobName]
    if (job.hasOwnProperty("income")) {
        switch (data.job[jobName].incomeFormula) {
            case "normal":
                var incomeMult = ((job.level) / 10) + 1
                break
            case "less penalty":
                var incomeMult = ((job.level) / 9) + 1
                break
        }
        var income = data.job[jobName].income * incomeMult * data.job[jobName].incomeMult
        return income
    } else return 0
}

function getExpense() {
    var expense = 0
    var itemArray = Object.values(data.buyable.other)
    for (i = 0; i < itemArray.length; i++) {
        if (itemArray[i].owned == true) {
            expense += itemArray[i].upkeep
        }
    }
    expense += data.buyable.home[data.selectedHome].upkeep
    expense *= data.expenseMult
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

function selectJob(jobName, removeIndex = 0) {
    if (checkIfJobIsNotSelected(jobName)) {
        if (data.selectedJobs.length >= data.maxJobs) {
            data.selectedJobs.splice(removeIndex, 1)
        }
        data.selectedJobs.push(data.job[jobName])
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
    var jobXP = applySpeed() * currentJob.xpMult * (1 + currentJob.maxLevel / 10) * data.jobXPMult * data.happiness 
    currentJob.xp += jobXP
    while (currentJob.xp >= currentJob.maxXP) {
        currentJob.level++
        currentJob.maxXP = getTaskMaxXp(currentJob)
    }
    while (currentJob.xp < getTaskMaxXp(currentJob, 1)) {
        currentJob.level--
        currentJob.maxXP = getTaskMaxXp(currentJob)
    }
    currentJob.maxXP = getTaskMaxXp(currentJob)
}

function doTask(task) { //task is data.job[jobName] | data.skill[skillName]
    task.xp += applySpeed() * task.xpMult * data.happiness * (1 + task.maxLevel / 10)
    while (task.xp >= task.maxXP) {
        task.level++
        task.maxXP = getTaskMaxXp(task)
    }
    while (task.xp < getTaskMaxXp(task, 1)) {
        task.level--
        task.maxXP = getTaskMaxXp(task)
    }
    task.maxXP = getTaskMaxXp(task)
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
        doCurrentSkill(data.selectedSkills[i].name)
    }
}

function doCurrentSkill(skillName) {
    var currentSkill = data.skill[skillName]
    var skillXP = applySpeed() * currentSkill.xpMult * (1 + currentSkill.maxLevel / 10) * data.skillXPMult * data.happiness
    currentSkill.xp += skillXP
    while (currentSkill.xp >= currentSkill.maxXP) {
        currentSkill.level++
        currentSkill.maxXP = getTaskMaxXp(currentSkill)
    }
    while (currentSkill.xp < getTaskMaxXp(currentSkill, 1)) {
        currentSkill.level--
        currentSkill.maxXP = getTaskMaxXp(currentSkill)
    }
    currentSkill.maxXP = getTaskMaxXp(currentSkill)
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

function jobInWhatCategory(task) {
    for (const category in jobCategories) {
        if (jobCategories[category].jobs.find((element) => element == task)) return jobCategories[category].name
    }
}

function skillInWhatCategory(task) {
    for (const category in skillCategories) {
        if (skillCategories[category].skills.find((element) => element == task)) return skillCategories[category].name
    }
}

function jobIndexInCategory(task) {
    for (const category in jobCategories) {
        if (jobCategories[category].jobs.find((element) => element == task)) return jobCategories[category].jobs.indexOf(task)
    }
}

function autopromote() {
    if (data.selectedJobs[0] == undefined) selectJob("Beggar")
    if (data.selectedJobs.length < data.maxJobs) {
        for (const selectedJob in data.selectedJobs) {
            for (const key in data.job) {
                const job = data.job[key]
                var isSelected = false
                if (isComplete(requirements[data.job[key].class])) {
                    for (const selectedJob in data.selectedJobs) {
                        if (data.selectedJobs[selectedJob].name == job.name) isSelected = true
                    }
                    if (!isSelected) {
                        selectJob(key)
                    }
                }
            }
        }
    }
    for (const selectedJob in data.selectedJobs) {
        var nextSelectedJob = undefined
        for (const key in data.job) {
            const job = data.job[key]
            var isSelected = false
            if (isComplete(requirements[data.job[key].class])) {
                for (const selectedJob in data.selectedJobs) {
                    if (data.selectedJobs[selectedJob].name == job.name) isSelected = true
                }
                if (!isSelected && jobInWhatCategory(key) == jobInWhatCategory(data.selectedJobs[selectedJob].name)) {
                    nextSelectedJob = key
                }
            }
        }
        var selectJobBool = false
        for (const selectedJob2 in data.selectedJobs) {
            if (nextSelectedJob !== undefined && data.selectedJobs[selectedJob2].name !== nextSelectedJob && jobIndexInCategory(data.selectedJobs[selectedJob].name) < jobIndexInCategory(nextSelectedJob)) {
                selectJobBool = true
            }
        }
        if (selectJobBool) selectJob(nextSelectedJob, selectedJob)
    }
}

function autoskill() {
    if (data.selectedSkills[0] == undefined) {
        selectSkill("Concentration")
    } else {
        var xpDict = {}
        for (const key in data.skill) {
            const skill = data.skill[key]
            if (isComplete(requirements[data.skill[key].class])) xpDict[key] = skill.level
        }
        const entries = getSortedKeysFromDict(xpDict)
        for (let i = 0; i < data.maxSkills; i++) {
            if (entries[i] && checkIfSkillIsNotSelected(entries[i])) {
                selectSkill(entries[i])
            }
        }
    }
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

function updateAdvancements() {
    for (const adv in data.advancements) {
        if (data.advancements[adv].reached == false) {
            var finished = true
            if (data.advancements[adv].age) {
                if (data.advancements[adv].age > data.days / 365) finished = false
            }

            if (finished) {
                data.advancements[adv].reached = true
                window[`advancement${adv}`]()
            }
        }
    }
}

function rebirthTask(task, rebirthStage) {
    if (rebirthStage == 1) {
        task.level = 0
        task.xp = 0
    }
}

function rebirth(rebirthStage) {
    if (rebirthStage == 1) {
        for (const key in data.job) {
            const task = data.job[key]
            task.maxLevel = math.max(task.level, task.maxLevel)
            rebirthTask(task, 1)
        }
        for (const key in data.skill) {
            const task = data.skill[key]
            task.maxLevel = math.max(task.level, task.maxLevel)
            rebirthTask(task, 1)
        }
        data.days = 365 * 14
        setTab('hero')
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
    updateAdvancements()
    if (data.autopromote == true) autopromote()
    if (data.autoskill == true) autoskill()
    doSelectedSkills()
    doSelectedJobs()
    if (data.selectedJobs.length > data.maxJobs) selectJob(data.selectedJobs[0].name)
    if (data.selectedSkills.length > data.maxSkills) selectSkill(data.selectedSkills[0].name)
    applyExpenses()
    applyIncome()
    updateUI()
    amuletText()
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