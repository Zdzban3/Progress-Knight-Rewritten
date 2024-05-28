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
        if (data.selectedJobs[i].incomeFormula == "normal") {
            var incomeMult = math.pow(data.selectedJobs[i].level, 0.5)
        } else if (data.selectedJobs[i].incomeFormula == "less penalty") {
            var incomeMult = math.pow(data.selectedJobs[i].level, 0.9)
        }
        income += data.selectedJobs[i].income * incomeMult
    }
    return income
}

function getIncomeSpecific(jobName) {
    var income = 0
    for (i = 0; i < Object.keys(data.job).length; i++) {
        if (Object.values(data.job)[i].name == jobName) {
            if (Object.values(data.job)[i].incomeFormula == "normal") {
                var incomeMult = math.pow(Object.values(data.job)[i].level, 0.5)
            } else if (Object.values(data.job)[i].incomeFormula == "less penalty") {
                var incomeMult = math.pow(Object.values(data.job)[i].level, 0.9)
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
    } else for (i = 0; i < data.selectedJobs.length; i++) {
        if (data.selectedJobs[i].name == jobName) {
            data.selectedJobs.splice(i, 1)
        }
    }
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
        if (currentJob.xpFormula = "normal") {
            currentJob.maxXp = math.pow(1.2, currentJob.level) * currentJob.level * currentJob.baseMaxXp
        }
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
        if (currentSkill.xpFormula = "normal") {
            currentSkill.maxXp = math.pow(1.2, currentSkill.level) * currentSkill.level * currentSkill.baseMaxXp
        }
    }
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
        jobCategoryElementTitle.appendChild(document.createTextNode(jobCategoriesArray[i][0]))

        var jobCategoryElementSpace = document.createElement("div")
        jobCategoryElementSpace.appendChild(document.createTextNode(""))

        var jobCategoryElementLevel = document.createElement("div")
        jobCategoryElementLevel.appendChild(document.createTextNode("Level"))

        var jobCategoryElementIncome = document.createElement("div")
        jobCategoryElementIncome.appendChild(document.createTextNode("Income"))

        var jobCategoryElementXP = document.createElement("div")
        jobCategoryElementXP.appendChild(document.createTextNode("XP"))

        var jobCategoryElementXPLeft = document.createElement("div")
        jobCategoryElementXPLeft.appendChild(document.createTextNode("XP Left"))

        var jobCategoryElementMaxLevel = document.createElement("div")
        jobCategoryElementMaxLevel.appendChild(document.createTextNode("Max Level"))

        jobCategoryElement.appendChild(jobCategoryElementTitle)
        jobCategoryElement.appendChild(jobCategoryElementSpace)
        jobCategoryElement.appendChild(jobCategoryElementLevel)
        jobCategoryElement.appendChild(jobCategoryElementIncome)
        jobCategoryElement.appendChild(jobCategoryElementXP)
        jobCategoryElement.appendChild(jobCategoryElementXPLeft)
        jobCategoryElement.appendChild(jobCategoryElementMaxLevel)

        for (i2 = 0; i2 < Object.keys(data.job).length; i2++) {
            var jobProgressBar = document.createElement("div")
            jobProgressBar.classList.add("jobProgressBar")
            jobProgressBar.classList.add(Object.values(data.job)[i2].class + "ProgressBar")
            jobProgressBar.setAttribute("onclick", ("selectJob(" + "\"" + Object.values(data.job)[i2].name + "\"" + ")"))

            var jobSpace = document.createElement("div")
            jobSpace.classList.add("jobSpace")
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
            jobType.appendChild(jobSpace)
            jobType.appendChild(jobLevelDisplay)
            jobType.appendChild(jobIncomeDisplay)
            jobType.appendChild(jobXPDisplay)
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

function save() {
    localStorage.setItem("data", JSON.stringify(data));
}

function load() {
    data = JSON.parse(localStorage.getItem("data"));
}

function reset() {
    localStorage.setItem("data", "undefined")
    location.reload()
}

function update() {
    renderSidebar()
    increaseDays()
    //autoPromote()
    //autoLearn()
    doSelectedSkills()
    doSelectedJobs()
    applyExpenses()
    applyIncome()
    updateUI()
}

//init

setupTabs()
setTab("hero")
if (localStorage["data"] !== "undefined") {
    load()
}
switchTheme(false)
pause()
update()
setInterval(update, 1000 / data.settings.updateSpeed)
setInterval(save, data.settings.saveSpeed)