function applyMultipliers() {
    data.happiness = applySkillEffects("Happiness")
    data.lifespan = data.baseLifespan * applySkillEffects("Lifespan Length")
    data.gameSpeed = 4 * applySkillEffects("Time Warping")
    data.allXPMult = applySkillEffects("All XP")
    data.incomeMult = applySkillEffects("Income")
    data.evilGainMult = applySkillEffects("Evil Gain")
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
        if (skill.description == effectName) {
            const effectFormula = skill.effectFormula
            const skillEffect = skill.effect * skill.effectMult
            const skillLevel = skill.level
            switch (effectFormula) {
                case "normal":
                    effect *= 1 + (skillEffect * skillLevel)
                    break
                case "reductive":
                    effect *= 1 - log(skillLevel + 1, 6) / 10
                    break
                case "squared":
                    effect *= Math.pow(1 + (skillEffect * skillLevel), 2)
            }
        }
    }
    for (const itemName in data.buyable.other) {
        const item = data.buyable.other[itemName]
        if (item.owned && item.description == effectName) effect *= item.effect
    }
    if (data.buyable.home[data.selectedHome].description == effectName) effect *= data.buyable.home[data.selectedHome].effect
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
            effect *= 1 - log(skillLevel + 1, 6) / 10
            break
        case "squared":
            effect *= Math.pow(1 + (skillEffect * skillLevel), 2)
    }
    return effect
}

function getTaskMaxXP(task, levelsBelow = 0) { //task is data.job[jobName] | data.skill[skillName]
    var taskLevel = task.level - levelsBelow
    if (taskLevel == 0) return task.baseMaxXP
    if (taskLevel == -1) return 0
    taskLevel++
    switch (task.xpFormula) {
        case "normalJob":
            return Math.pow(1.01, taskLevel - 1) * taskLevel * task.baseMaxXP
            break
        case "normalSkill":
            return Math.pow(1.01, taskLevel - 1) * taskLevel * task.baseMaxXP
            break
        case "squaredSkill":
            return Math.pow(1.04, taskLevel - 1) * taskLevel * task.baseMaxXP
            break
        case "offlineTime":
            return Math.pow(1.01, taskLevel - 1) * taskLevel * task.baseMaxXP
            break
    }
}

function buyItem(itemName) {
    if (itemName in data.buyable.other) {
        const item = data.buyable.other[itemName]
        if (item.owned == false && data.coins >= item.price) {
            item.owned = true
            data.coins -= item.price
        } else if (item.owned == true) {
            item.owned = false
            data.coins += item.price / 2
        }
    }
    if (itemName in data.buyable.home) {
        const item = data.buyable.home[itemName]
        if (item.name !== data.selectedHome && data.coins >= item.price) {
            data.coins += data.buyable.home[data.selectedHome].price / 1.2
            data.buyable.home[data.selectedHome].owned = false
            data.selectedHome = item.name
            item.owned = true
            data.coins -= item.price
        }
    }
}

function getNet() {
    return Math.abs(getIncome() - getExpense())
}

function getIncome() {
    var income = 0
    for (const key in data.selectedJobs) { //key is a number
        const jobName = data.selectedJobs[key].name
        income += getIncomeSpecific(jobName)
    }
    return income
}

function getIncomeSpecific(jobName) {
    const job = data.job[jobName]
    if ("income" in job) {
        switch (job.incomeFormula) {
            case "normal":
                var incomeMult = 1 + Math.log10(job.level + 1)
                break
            case "less penalty":
                var incomeMult = 1 + log(job.level + 1, 9)
                break
        }
        var income = job.income * incomeMult * job.incomeMult * data.incomeMult
        return income
    } else return 0
}

function getExpense() {
    var expense = 0
    for (const key in data.buyable.other) {
        const item = data.buyable.other[key]
        if (item.owned) expense += item.upkeep
    }
    expense += data.buyable.home[data.selectedHome].upkeep
    expense *= data.expenseMult
    return expense
}

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

    if (data.buyable.home[data.selectedHome].upkeep >= getIncome()) {
        buyItem("Homeless")
    }
    var buyableArray = Object.keys(data.buyable.other).sort(function (a, b) { return data.buyable.other[b].upkeep - data.buyable.other[a].upkeep }) //sort by upkeep backwards
    for (const key of buyableArray) {
        const buyable = data.buyable.other[key]
        if (buyable.owned) {
            if (buyable.upkeep >= getNet()) {
                buyItem(buyable)
                break
            } else buyItem(buyable)
        }
    }
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
    var jobXP = applySpeed() * currentJob.xpMult * (1 + currentJob.maxLevel / 10) * data.allXPMult * data.jobXPMult * data.happiness
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
    task.xp += applySpeed() * task.xpMult * data.happiness * (1 + task.maxLevel / 10)
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
        doCurrentSkill(data.selectedSkills[i].name)
    }
}

function doCurrentSkill(skillName) {
    var currentSkill = data.skill[skillName]
    var skillXP = applySpeed() * currentSkill.xpMult * (1 + currentSkill.maxLevel / 10) * data.allXPMult * data.skillXPMult * data.happiness
    currentSkill.xp += skillXP
    while (currentSkill.xp >= currentSkill.maxXP) {
        currentSkill.level++
        currentSkill.maxXP = getTaskMaxXP(currentSkill)
    }
    while (currentSkill.xp < getTaskMaxXP(currentSkill, 1)) {
        currentSkill.level--
        currentSkill.maxXP = getTaskMaxXP(currentSkill)
    }
    currentSkill.maxXP = getTaskMaxXP(currentSkill)
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
        data.days = data.lifespan
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
                if (!isSelected && jobInWhatCategory(key) == jobInWhatCategory(data.selectedJobs[selectedJob].name)) nextSelectedJob = key
            }
        }
        if (isComplete(requirements[data.selectedJobs[selectedJob].class])) {
            if (nextSelectedJob !== undefined && jobIndexInCategory(data.selectedJobs[selectedJob].name) < jobIndexInCategory(nextSelectedJob)) selectJob(nextSelectedJob, selectedJob)
        } else if (nextSelectedJob !== undefined) selectJob(nextSelectedJob, selectedJob)
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
            task.maxLevel = Math.max(task.level, task.maxLevel)
            rebirthTask(task, 1)
        }
        for (const key in data.skill) {
            const task = data.skill[key]
            task.maxLevel = Math.max(task.level, task.maxLevel)
            rebirthTask(task, 1)
        }
        buyItem("Homeless")
        data.maxCoins = 0
        data.coins = 0
        for (const key in data.buyable.other) data.buyable.other[key].owned = false
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
    data.maxCoins = Math.max(data.coins, data.maxCoins)
    for (const key in data.selectedJobs) {
        const job = data.selectedJobs[key]
        if (!(isComplete(requirements[job.class]))) selectJob(job.name, key)
    }
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