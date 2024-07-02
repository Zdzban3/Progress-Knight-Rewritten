function applyMultipliers() {
    data.expenseMult = applySkillEffects("Expenses")
    data.happiness = applySkillEffects("Happiness")
    data.lifespan = data.baseLifespan * applySkillEffects("Lifespan Length")
    data.gameSpeed = data.baseGameSpeed * applySkillEffects("Time Warping") * (data.stats.rebirthOneTimes === 0 ? 0.75 : 1)
    data.allXPMult = applySkillEffects("All XP")
    data.incomeMult = applySkillEffects("Income")
    data.evilGainMult = applySkillEffects("Evil Gain")
    data.jobXPMult = applySkillEffects("Job XP")
    data.skillXPMult = applySkillEffects("Skill XP")
    data.maxJobs = Math.floor(applySkillEffects("Max Jobs"))
    data.maxSkills = Math.floor(applySkillEffects("Max Skills"))

    for (const task in data.job) {
        data.job[task].xpMult = applySkillEffects(task + " XP")
        data.job[task].incomeMult = applySkillEffects(task + " Income")
    }
    for (const task in data.skill) {
        data.skill[task].xpMult = applySkillEffects(task + " XP")
        data.skill[task].effectMult = applySkillEffects(task + " Effect")
    }

    for (const key in data.category.job) {
        const category = data.category.job[key]
        if (category.altName) var categoryName = category.altName
        else var categoryName = category.name

        category.incomeMult = applySkillEffects(categoryName + " Income")
        category.xpMult = applySkillEffects(categoryName + " XP")

        if (key === "Carpenters Guild") {
            category.incomeMult *= applySkillEffects("Carpentry Efficiency")
            category.xpMult *= applySkillEffects("Carpentry Efficiency")
        }
        if (key === "Blacksmithers Guild") {
            category.incomeMult *= applySkillEffects("Blacksmithing Efficiency")
            category.xpMult *= applySkillEffects("Blacksmithing Efficiency")
        }
        if (key === "Merchants Guild") {
            category.incomeMult *= 1 / applySkillEffects("Expenses")
            category.xpMult *= 1 / applySkillEffects("Expenses")
        }
        
        for (const job of jobCategories[key].jobs) {
            data.job[job].incomeMult *= category.incomeMult
            data.job[job].xpMult *= category.xpMult
        }
    }

    for (const key in data.category.skill) {
        const category = data.category.skill[key]
        if (category.altName) {
            category.effectMult = applySkillEffects(category.altName + " Effect")
            category.xpMult = applySkillEffects(category.altName + " XP")
        } else {
            category.effectMult = applySkillEffects(category.name + " Effect")
            category.xpMult = applySkillEffects(category.name + " XP")
        }

        for (const skill of skillCategories[key].skills) {
            data.skill[skill].effectMult *= category.effectMult
            data.skill[skill].xpMult *= category.xpMult
        }
    }
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
                case "log13":
                    effect *= 1 + log(skillLevel + 1, 13)
                    break
                case "log33":
                    effect *= 1 + log(skillLevel + 1, 33)
                    break
                case "squared":
                    effect *= Math.pow(1 + (skillEffect * skillLevel), 2)
                    break
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
        case "log13":
            effect *= 1 + log(skillLevel + 1, 13)
            break
        case "log33":
            effect *= 1 + log(skillLevel + 1, 33)
            break
        case "squared":
            effect *= Math.pow(1 + (skillEffect * skillLevel), 2)
    }
    return effect
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

function getIncomeSpecific(jobName) {
    const job = data.job[jobName]
    if ("income" in job) {
        switch (job.incomeFormula) {
            case "normal":
                var incomeMult = 1 + Math.log10(job.level + 1)
                break
        }
        var income = job.income * incomeMult * job.incomeMult * data.incomeMult
        return income
    } else return 0
}