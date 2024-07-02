function rebirthTask(task, rebirthStage) {
    if (rebirthStage == 1) {
        task.level = 0
        task.xp = 0
    }
    if (rebirthStage == 2) {
        task.level = 0
        task.xp = 0
        task.maxLevel = 0
    }
}

function rebirth(rebirthStage) {
    data.currentRealtime = 0
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
        for (const key in data.buyable) data.buyable[key].owned = false
        buyItem("Homeless")
        data.maxCoins = 0
        data.coins = 0
        data.days = 365 * 14
        setTab('hero')
        data.selectedJobs = []
        data.selectedSkills = []
        data.stats.rebirthOneTimes++
        data.stats.rebirthOneTimesThisRebirth++
    }
    if (rebirthStage == 2) {
        for (const key in data.job) rebirthTask(data.job[key], 2)
        for (const key in data.skill) rebirthTask(data.skill[key], 2)
        buyItem("Homeless")
        data.maxCoins = 0
        data.coins = 0
        for (const key in data.buyable) data.buyable[key].owned = false
        data.days = 365 * 14
        setTab('hero')
        data.selectedJobs = []
        data.selectedSkills = []
        data.evil += data.evilGainMult
        data.stats.rebirthTwoTimes++
        data.stats.rebirthTwoTimesThisRebirth++
        data.stats.rebirthOneTimesThisRebirth = 0
    }
    for (const key in data.advancements) if (data.advancements[key].hide === rebirthStage) data.advancements[key].reached = false
    updateAdvancements()
}