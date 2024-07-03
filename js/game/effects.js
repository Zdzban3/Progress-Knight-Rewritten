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
        data.job[task].xpMult = applySkillEffects(task + " XP") * applySkillEffects(task + " Efficiency")
        data.job[task].incomeMult = applySkillEffects(task + " Income") * applySkillEffects(task + " Efficiency")
    }
    for (const key in data.category.job) {
        const category = data.category.job[key]
        if (category.altName) var categoryName = category.altName
        else var categoryName = category.nameFull

        category.incomeMult = applySkillEffects(categoryName + " Income") * applySkillEffects(categoryName + " Efficiency")
        category.xpMult = applySkillEffects(categoryName + " XP") * applySkillEffects(categoryName + " Efficiency")

        for (const job of jobCategories[key].jobs) {
            data.job[job].incomeMult *= category.incomeMult
            data.job[job].xpMult *= category.xpMult
        }
    }

    for (const task in data.skill) {
        data.skill[task].xpMult = applySkillEffects(task + " XP") * applySkillEffects(task + " Efficiency")
        data.skill[task].effectMult = applySkillEffects(task + " Effect") * applySkillEffects(task + " Efficiency")
    }
    for (const key in data.category.skill) {
        const category = data.category.skill[key]
        if (category.altName) var categoryName = category.altName
        else var categoryName = category.nameFull

        category.effectMult = applySkillEffects(categoryName + " Effect") * applySkillEffects(categoryName + " Efficiency")
        category.xpMult = applySkillEffects(categoryName + " XP") * applySkillEffects(categoryName + " Efficiency")

        for (const skill of skillCategories[key].skills) {
            data.skill[skill].effectMult *= category.effectMult
            data.skill[skill].xpMult *= category.xpMult
        }
    }

    for (const item in data.buyable) {
        data.buyable[item].effectMult = applySkillEffects(item + " Effect")
    }
    for (const key in data.category.shop) {
        const category = data.category.shop[key]
        if (category.altName) var categoryName = category.altName
        else var categoryName = category.nameFull
        
        category.effectMult = applySkillEffects(categoryName + " Effect")

        for (const item of shopCategories[key].items) data.buyable[item].effectMult *= category.effectMult
    }
}

function applySkillEffects(effectName) {
    var effect = 1
    for (const key in data.skill) {
        const skill = data.skill[key]
        if (skill.description === effectName) effect *= getEffectSpecific(key)
    }
    for (const key in data.buyable) {
        const item = data.buyable[key]
        if (item.owned && item.description === effectName) effect *= getEffectSpecific(key)
    }
    return effect
}

function getEffectSpecific(key) {
    var multiplier = 1
    if (key in data.skill) {
        var level = data.skill[key].level
        var formula = data.skill[key].effectFormula
        var effect = data.skill[key].effect * data.skill[key].effectMult
    } else if (key in data.buyable) {
        var level = 1
        var formula = "buyable"
        var effect = data.buyable[key].effect * data.buyable[key].effectMult
    }
    switch (formula) {
        case "normal":
            multiplier *= 1 + (effect * level)
            break
        case "buyable":
            multiplier *= effect * level
            break
        case "reductive":
            multiplier *= 1 - log(level + 1, 6) / 10
            break
        case "log13":
            multiplier *= 1 + log(level + 1, 13)
            break
        case "log33":
            multiplier *= 1 + log(level + 1, 33)
            break
    }
    return multiplier
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
    for (const key in data.buyable) if (data.buyable[key].owned) expense += data.buyable[key].upkeep
    expense *= data.expenseMult
    return expense
}

function getIncomeSpecific(key) {
    const job = data.job[key]
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