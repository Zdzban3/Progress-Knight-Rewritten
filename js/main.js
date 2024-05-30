/* function addMultipliers() {
    for (taskName in data.taskData) {
        var task = data.taskData[taskName]

        xpMultipliers = []
        if (task instanceof Job) incomeMultipliers = []

        xpMultipliers.push(getMaxLevelMultiplier.bind(task))
        xpMultipliers.push(getHappiness)
        xpMultipliers.push(getBindedTaskEffect("Dark influence"))
        xpMultipliers.push(getBindedTaskEffect("Demon training"))

        if (task instanceof Job) {
            incomeMultipliers.push(getLevelMultiplier.bind(task))
            incomeMultipliers.push(getBindedTaskEffect("Demon's wealth"))
            xpMultipliers.push(getBindedTaskEffect("Productivity"))
            xpMultipliers.push(getBindedItemEffect("Personal squire"))    
        } else if (task instanceof Skill) {
            xpMultipliers.push(getBindedTaskEffect("Concentration"))
            xpMultipliers.push(getBindedItemEffect("Book"))
            xpMultipliers.push(getBindedItemEffect("Study desk"))
            xpMultipliers.push(getBindedItemEffect("Library"))
        }

        if (jobCategories["Military"].includes(name)) {
            incomeMultipliers.push(getBindedTaskEffect("Strength"))
            xpMultipliers.push(getBindedTaskEffect("Battle tactics"))
            xpMultipliers.push(getBindedItemEffect("Steel longsword"))
        } else if (name == "Strength") {
            xpMultipliers.push(getBindedTaskEffect("Muscle memory"))
            xpMultipliers.push(getBindedItemEffect("Dumbbells"))
        } else if (skillCategories["Magic"].includes(name)) {
            xpMultipliers.push(getBindedItemEffect("Sapphire charm"))
        } else if (jobCategories["The Arcane Association"].includes(name)) {
            xpMultipliers.push(getBindedTaskEffect("Mana control"))
        } else if (skillCategories["Dark magic"].includes(name)) {
            xpMultipliers.push(getEvil)
        }
    }

    for (itemName in data.itemData) {
        var item = data.itemData[itemName]
        item.expenseMultipliers = []
        item.expenseMultipliers.push(getBindedTaskEffect("Bargaining"))
        item.expenseMultipliers.push(getBindedTaskEffect("Intimidation"))
    }
}


function applyMultipliers(value, multipliers) {
    var finalMultiplier = 1
    multipliers.forEach(function(multiplierFunction) {
        var multiplier = multiplierFunction()
        finalMultiplier *= multiplier
    })
    var finalValue = Math.round(value * finalMultiplier)
    return finalValue
}

*/

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
        switch (data.selectedJobs[i].incomeFormula) {
            case "normal":
                var incomeMult = math.log(math.pow(job.level, 0.5)) + ((job.level - 1) / 10) + 1
                break
            case "less penalty":
                var incomeMult = math.log(math.pow(job.level, 0.6)) + ((job.level - 1) / 9) + 1
                break
        }
        income += job.income * incomeMult
    }
    return income
}

function getIncomeSpecific(jobName) {
    var income = 0
    for (i = 0; i < Object.keys(data.job).length; i++) {
        if (Object.values(data.job)[i].name == jobName) {
            const job = Object.values(data.job)[i]
            switch (Object.values(data.job)[i].incomeFormula) {
                case "normal":
                    var incomeMult = math.log(math.pow(job.level, 0.5)) + ((job.level - 1) / 10) + 1
                    break
                case "less penalty":
                    var incomeMult = math.log(math.pow(job.level, 0.6)) + ((job.level - 1) / 9) + 1
                    break
            }
            //income = Object.values(data.job)[i].income
            income += Object.values(data.job)[i].income * incomeMult
        }
    }
    return income
}

function getExpense() {
    var expense = 0
    var itemArray = Object.values(data.item)
    for (i = 0; i < itemArray.length; i++) {
        if (itemArray[i].owned == true) {
            expense += itemArray[i].upkeep
        }
    }
    if (data.selectedHome.owned == false) {
        expense += data.selectedHome.rent
    }
    return expense
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

function getLifespan() {
    return data.baseLifespan
}

function goBankrupt() {
    data.coins = 0
    data.currentHome = data.home["Homeless"] //set it to the best bought house
}

function getGameSpeed() {
    var gameSpeed = data.baseGameSpeed * +!data.paused
    return gameSpeed
}

function applySpeed(value) {
    finalValue = value * getGameSpeed() / data.settings.updateSpeed
    return finalValue
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
        if (data.selectedSkills.length >= data.maxJobs) {
            data.selectedSkills.shift()
        }
        data.selectedSkills.push(data.skill[skillName])
    } else for (i = 0; i < data.selectedSkills.length; i++) {
        if (data.selectedSkills[i].name == skillName) {
            data.selectedSkills.splice(i, 1)
        }
    }
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
    var jobXp = getGameSpeed() * currentJob.xpMult * data.jobXpMult * data.happiness / data.settings.updateSpeed
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

function getTaskMaxXp(task, levelsBelow = 0) { //task is data.job[jobName] | data.skill[skillName]
    const taskLevel = task.level - levelsBelow
    if (taskLevel == 1) {
        return task.baseMaxXp
    }
    switch (task.xpFormula) {
        case "normal":
            return math.pow(1.05, taskLevel) * taskLevel * task.baseMaxXp
            break
        case "decreased":
            return math.pow(1.03, taskLevel) * taskLevel * task.baseMaxXp
            break
    }
}

function doSelectedSkills() {
    for (i = 0; i < data.selectedSkills.length; i++) {
        doCurrentSkill(data.selectedSkills[i].name)
    }
}

function doCurrentSkill(skillName) {
    var currentSkill = data.skill[skillName]
    var skillXp = getGameSpeed() * currentSkill.xpMult * data.skillXpMult * data.happiness / data.settings.updateSpeed
    currentSkill.xp += skillXp
    while (currentSkill.xp >= currentSkill.maxXp) {
        currentSkill.level++
        currentSkill.maxXp = getTaskMaxXp(currentSkill)
    }
    while (currentSkill.xp < getTaskMaxXp(currentSkill.maxXp, 1)) {
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

function setupTabs() {
    const heroSubpanel = document.getElementById("heroSubpanel")
    const jobCategoriesArray = Object.entries(jobCategories)
    var jobCategoriesContainers = []
    for (i = 0; i < jobCategoriesArray.length; i++) {
        jobCategoriesContainers[i] = document.createElement("div")
        jobCategoriesContainers[i].classList.add("jobCategoryContainer")

        var jobCategoryElement = document.createElement("div")
        var jobCategoryBackground = document.createElement("div")
        var jobCategoryArrayElements = Object.values(jobCategoriesArray[i][1])

        jobCategoriesContainers[i].classList.add(jobCategoryArrayElements[1])
        jobCategoryElement.classList.add(jobCategoryArrayElements[1])
        jobCategoryElement.classList.add("jobCategoryElement")
        jobCategoryBackground.classList.add(jobCategoryArrayElements[1])
        jobCategoryBackground.classList.add("jobCategoryBackground")

        var jobCategoryElementTitle = document.createElement("div")
        jobCategoryElementTitle.classList.add("jobCategoryElementTitle")
        jobCategoryElementTitle.appendChild(document.createTextNode(jobCategoriesArray[i][0]))

        var jobCategoryElementLevel = document.createElement("div")
        jobCategoryElementLevel.appendChild(document.createTextNode("Level"))

        var jobCategoryElementIncome = document.createElement("div")
        jobCategoryElementIncome.appendChild(document.createTextNode("Income"))

        var jobCategoryElementXP = document.createElement("div")
        jobCategoryElementXP.appendChild(document.createTextNode("XP"))

        var jobCategoryElementXPRate = document.createElement("div")
        jobCategoryElementXPRate.appendChild(document.createTextNode("XP/day"))

        var jobCategoryElementXPLeft = document.createElement("div")
        jobCategoryElementXPLeft.appendChild(document.createTextNode("XP Left"))

        var jobCategoryElementMaxLevel = document.createElement("div")
        jobCategoryElementMaxLevel.appendChild(document.createTextNode("Max Level"))

        jobCategoryElement.appendChild(jobCategoryElementTitle)
        jobCategoryElement.appendChild(jobCategoryElementLevel)
        jobCategoryElement.appendChild(jobCategoryElementIncome)
        jobCategoryElement.appendChild(jobCategoryElementXP)
        jobCategoryElement.appendChild(jobCategoryElementXPRate)
        jobCategoryElement.appendChild(jobCategoryElementXPLeft)
        jobCategoryElement.appendChild(jobCategoryElementMaxLevel)

        for (i2 = 0; i2 < Object.keys(data.job).length; i2++) {
            var jobProgressBar = document.createElement("div")
            jobProgressBar.classList.add("jobProgressBar")
            jobProgressBar.classList.add(Object.values(data.job)[i2].class + "ProgressBar")
            jobProgressBar.setAttribute("onclick", ("selectJob(" + "\"" + Object.values(data.job)[i2].name + "\"" + ")"))
            var jobProgressBarProgress = document.createElement("div")
            jobProgressBarProgress.classList.add("jobProgressBarProgress")
            jobProgressBarProgress.classList.add(Object.values(data.job)[i2].class + "ProgressBarProgress")
            //jobProgressBarProgress.classList.add(Object.values(data.job)[i2].name.replace(" ", ""))
            jobProgressBarProgress.setAttribute("style", "width: 20%")
            jobProgressBar.appendChild(jobProgressBarProgress)
            var jobProgressBarText = document.createElement("span")
            jobProgressBarText.classList.add("jobProgressBarText")
            jobProgressBarText.classList.add(Object.values(data.job)[i2].class + "ProgressBarText")
            jobProgressBarText.innerText = Object.values(data.job)[i2].name
            jobProgressBar.appendChild(jobProgressBarText)

            var jobLevelDisplay = document.createElement("div")
            jobLevelDisplay.classList.add("jobLevelDisplay")
            jobLevelDisplay.appendChild(document.createTextNode(Object.values(data.job)[i2].level))
            var jobIncomeDisplay = document.createElement("div")
            jobIncomeDisplay.classList.add("jobIncomeDisplay")
            jobIncomeDisplay.appendChild(document.createElement("span"))
            jobIncomeDisplay.appendChild(document.createElement("span"))
            jobIncomeDisplay.appendChild(document.createElement("span"))
            jobIncomeDisplay.appendChild(document.createElement("span"))
            jobIncomeDisplay.appendChild(document.createElement("span"))
            jobIncomeDisplay.appendChild(document.createElement("span"))
            jobIncomeDisplay.appendChild(document.createElement("span"))
            jobIncomeDisplay.appendChild(document.createElement("span"))
            var jobXPDisplay = document.createElement("div")
            jobXPDisplay.classList.add("jobXPDisplay")
            jobXPDisplay.appendChild(document.createTextNode(Object.values(data.job)[i2].xp))
            var jobXPRateDisplay = document.createElement("div")
            jobXPRateDisplay.classList.add("jobXPRateDisplay")
            jobXPRateDisplay.appendChild(document.createTextNode("1"))
            var jobXPLeftDisplay = document.createElement("div")
            jobXPLeftDisplay.classList.add("jobXPLeftDisplay")
            jobXPLeftDisplay.appendChild(document.createTextNode(Object.values(data.job)[i2].maxXp - Object.values(data.job)[i2].xp))
            var jobMaxLevelDisplay = document.createElement("div")
            jobMaxLevelDisplay.classList.add("jobMaxLevelDisplay")
            jobMaxLevelDisplay.appendChild(document.createTextNode(Object.values(data.job)[i2].maxLevel))

            var jobType = document.createElement("div")
            jobType.classList.add("jobType")
            jobType.classList.add(Object.values(data.job)[i2].class + "Type")

            jobType.appendChild(jobProgressBar)
            jobType.appendChild(jobLevelDisplay)
            jobType.appendChild(jobIncomeDisplay)
            jobType.appendChild(jobXPDisplay)
            jobType.appendChild(jobXPRateDisplay)
            jobType.appendChild(jobXPLeftDisplay)
            jobType.appendChild(jobMaxLevelDisplay)

            for (i3 = 0; i3 < jobCategoryArrayElements[0].length; i3++)
                if (jobCategoryArrayElements[0][i3] == (Object.keys(data.job)[i2])) {
                    jobCategoryBackground.appendChild(jobType)
                }
        }

        jobCategoriesContainers[i].appendChild(jobCategoryElement)
        jobCategoriesContainers[i].appendChild(jobCategoryBackground)
        heroSubpanel.appendChild(jobCategoriesContainers[i])
    }
    return jobCategoriesContainers
}

function setMenuWidth(width) {
    var root = document.querySelector(':root');
    root.style.setProperty('--menuWidth', width);
}

function setUpdateSpeed(Hz) {
    data.settings.updateSpeed = Hz
    clearInterval(updateInterval)
    updateInterval = setInterval(update, 1000 / data.settings.updateSpeed)
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

function update() {
    increaseDays()
    //autoPromote()
    //autoLearn()
    doSelectedSkills()
    doSelectedJobs()
    applyExpenses()
    applyIncome()
    updateUI()
}

function startSetup() {
    setupTabs()
    setTab("hero")
    if (data == null || data == "undefined") {
        reset(true)
    }
    load()
    switchPrimaryTheme(false)
    switchSecondaryTheme(false)
    switchCoinsAmountDisplayed(false)
    switchCurrencyNotation(false)
    updateInterval = setInterval(update, 1000 / data.settings.updateSpeed)
    saveInterval = setInterval(save, data.settings.saveSpeed)
    switchUpdateSpeed(false)
    pause()
    updateProgressBars()
    update()
}

//init
startSetup()