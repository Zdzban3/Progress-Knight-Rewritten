var data = {}

function assignData() {
    for (const key in baseData) if (!(key in data)) data[key] = baseData[key]
    data.category.shop = data.category.shop ?? {}
    for (const key in baseCurrency) if (!(key in data)) data[key] = baseCurrency[key]
    for (const key in settings) if (!(key in data.settings)) data.settings[key] = settings[key]
    for (const key in stats) if (!(key in data.stats)) data.stats[key] = stats[key]

    for (const key in constChangableData) data[key] = constChangableData[key]
    for (const key in advancements) data.advancements[key] = advancements[key]

    for (const key in jobCategories) data.category.job[key] = { name: jobCategories[key].nameFull, altName: (jobCategories[key].altName ?? jobCategories[key].nameFull), xpMult: 1, incomeMult: 1 }
    for (const key in data.category.job) if (!(key in jobCategories)) delete data.category.job[key]
    for (const key in skillCategories) data.category.skill[key] = { name: skillCategories[key].nameFull, altName: (skillCategories[key].altName ?? skillCategories[key].nameFull), xpMult: 1, effectMult: 1 }
    for (const key in data.category.skill) if (!(key in skillCategories)) delete data.category.skill[key]
    for (const key in shopCategories) data.category.shop[key] = { name: shopCategories[key].nameFull, altName: (shopCategories[key].altName ?? shopCategories[key].nameFull), effectMult: 1 }
    for (const key in data.category.shop) if (!(key in shopCategories)) delete data.category.shop[key]

    for (const key in jobs) if (!(key in data.job)) data.job[key] = jobs[key]
    for (const key in skills) if (!(key in data.skill)) data.skill[key] = skills[key]
    for (const key in specialTasks) if (!(key in data.specialTask)) data.specialTask[key] = specialTasks[key]
    for (const key in buyables) if (!(key in data.buyable)) data.buyable[key] = buyables[key]


    for (const key in data.job) {
        if (!(key in jobs)) {
            delete data.job[key]
            continue
        }
        const task = data.job[key]
        if (!("xp" in task)) {
            task.xp = 0
            task.maxXP = task.baseMaxXP
            task.level = 0
            task.maxLevel = 0
            task.xpMult = 1
            task.incomeMult = 1
        }
        task.highestLevel = task.highestLevel ?? 0
        if (!("xpFormula" in task)) task.xpFormula = "normalJob"
        if (!("incomeFormula" in task)) task.incomeFormula = "normal"
        if (!("description" in task)) task.description = "Income"
        task.baseMaxXP = jobs[key].baseMaxXP
        task.income = jobs[key].income
        if (jobs[key].incomeFormula) task.incomeFormula = jobs[key].incomeFormula
        if (jobs[key].xpFormula) task.xpFormula = jobs[key].xpFormula
    }

    for (const key in data.selectedJobs) {
        const name = data.selectedJobs[key].name
        if (!(name in jobs)) {
            data.selectedJobs.splice(key, 1)
            continue
        }
    }

    for (const key in data.skill) {
        if (!(key in skills)) {
            delete data.skill[key]
            continue
        }
        const task = data.skill[key]
        if (!("xp" in task)) {
            task.xp = 0
            task.maxXP = task.baseMaxXP
            task.level = 0
            task.maxLevel = 0
            task.xpMult = 1
            task.effectMult = 1
        }
        task.highestLevel = task.highestLevel ?? 0
        if (!("xpFormula" in task)) task.xpFormula = "normalSkill"
        if (!("effectFormula" in task)) task.effectFormula = "normal"
        task.baseMaxXP = skills[key].baseMaxXP
        task.effect = skills[key].effect
        task.description = skills[key].description
        if (skills[key].effectFormula) task.effectFormula = skills[key].effectFormula
        if (skills[key].xpFormula) task.xpFormula = skills[key].xpFormula
        if (skills[key].importance) { task.importance = skills[key].importance } else task.importance = 1
    }

    for (const key in data.selectedSkills) {
        const name = data.selectedSkills[key].name
        if (!(name in skills)) {
            data.selectedSkills.splice(key, 1)
            continue
        }
    }

    for (const key in data.buyable) {
        if (key === "home" || key === "other") {
            delete data.buyable[key]
            continue
        }
        const item = data.buyable[key]

        if (!("owned" in item)) item.owned = false
        item.price = buyables[key].price
        item.upkeep = buyables[key].upkeep
        item.class = buyables[key].class
        item.effectMult = 1
        
        if (item.owned && shopCategories["Properties"].items.indexOf(key) >= 0 && item.name !== data.selectedHome) {
            data.selectedHome = "Homeless"
            data.buyable["Homeless"].owned = true
            item.owned = false
        }
    }
}
