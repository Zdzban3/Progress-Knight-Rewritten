function getSkillXP(skillName) {
    var currentSkill = data.skill[skillName]
    var skillXP = currentSkill.xpMult * (1 + currentSkill.maxLevel * 0.1) * data.allXPMult * data.skillXPMult * data.happiness * data.baseXPMult
    if (skillInWhatCategory(skillName) == "darkMagic") skillXP *= data.evil
    return skillXP
}

function getJobXP(jobName) {
    var currentJob = data.job[jobName]
    var jobXP = currentJob.xpMult * (1 + currentJob.maxLevel * 0.1) * data.allXPMult * data.jobXPMult * data.happiness * data.baseXPMult
    return jobXP
}

function getTaskMaxXP(task, levelsBelow = 0) { //task is data.job[jobName] | data.skill[skillName]
    var taskLevel = task.level - levelsBelow
    if (taskLevel == 0) return task.baseMaxXP
    if (taskLevel == -1) return 0
    taskLevel++
    switch (task.xpFormula) {
        case "normalJob":
            return Math.pow(1.05, taskLevel - 1) * taskLevel * task.baseMaxXP
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