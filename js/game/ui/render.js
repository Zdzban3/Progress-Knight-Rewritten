function renderSidebar() {
    document.getElementById("ageDisplay").textContent = formatAge(data.days)
    document.getElementById("lifespanDisplay").textContent = formatWhole(daysToYears(data.lifespan))
    document.getElementById("realtimeDisplay").textContent = formatTime(data.currentRealtime)

    formatCoins(data.coins, document.getElementById("coinDisplay"))
    setSignDisplay()
    formatCoins(getNet(), document.getElementById("netDisplay"))
    formatCoins(getIncome(), document.getElementById("incomeDisplay"))
    formatCoins(getExpense(), document.getElementById("expenseDisplay"))

    document.getElementById("timeSpeedDisplay").textContent = format(data.gameSpeed / 4, 2)
    document.getElementById("happinessDisplay").textContent = format(data.happiness, 2)
    document.getElementById("evilDisplay").textContent = format(data.evil, 2)
    document.getElementById("evilGainDisplay").textContent = Math.floor(data.evilGainMult * 100) / 100
    
    if (data.evil == 0) document.querySelector(".evilDisplay").classList.add("hidden")
    else document.querySelector(".evilDisplay").classList.remove("hidden")

    if (data.selectedJobs.length >= 1) {
        const job1 = data.selectedJobs.at(-1)
        document.querySelector("#jobDisplay1 .jobProgressBarText").innerText = job1.name + " Lv" + job1.level
        const progressBarPercentage1 = 100 + 100 * (job1.xp - job1.maxXP) / (job1.maxXP - getTaskMaxXP(job1, 1))
        renderProgressBar(progressBarPercentage1, document.querySelector("#jobDisplay1"))
        document.querySelector("#jobDisplay1").removeAttribute("hidden")
        document.querySelector("#currentJobsDisplay").removeAttribute("hidden")

        if (data.selectedJobs.length >= 2) {
            const job2 = data.selectedJobs.at(-2)
            document.querySelector("#jobDisplay2 .jobProgressBarText").innerText = job2.name + " Lv" + job2.level
            const progressBarPercentage2 = 100 + 100 * (job2.xp - job2.maxXP) / (job2.maxXP - getTaskMaxXP(job2, 1))
            renderProgressBar(progressBarPercentage2, document.querySelector("#jobDisplay2"))
            document.querySelector("#jobDisplay2").removeAttribute("hidden")

            if (data.selectedJobs.length >= 3) {
                const job3 = data.selectedJobs.at(-3)
                document.querySelector("#jobDisplay3 .jobProgressBarText").innerText = job3.name + " Lv" + job3.level
                const progressBarPercentage3 = 100 + 100 * (job3.xp - job3.maxXP) / (job3.maxXP - getTaskMaxXP(job3, 1))
                renderProgressBar(progressBarPercentage3, document.querySelector("#jobDisplay3"))
                document.querySelector("#jobDisplay3").removeAttribute("hidden")

            } else document.querySelector("#jobDisplay3").setAttribute("hidden", "")
        } else {
            document.querySelector("#jobDisplay2").setAttribute("hidden", "")
            document.querySelector("#jobDisplay3").setAttribute("hidden", "")
        }
    } else {
        document.querySelector("#jobDisplay1").setAttribute("hidden", "")
        document.querySelector("#jobDisplay2").setAttribute("hidden", "")
        document.querySelector("#jobDisplay3").setAttribute("hidden", "")
        document.querySelector("#currentJobsDisplay").setAttribute("hidden", "")
    }

    if (data.selectedSkills.length >= 1) {
        const skill1 = data.selectedSkills.at(-1)
        document.querySelector("#skillDisplay1 .skillProgressBarText").innerText = skill1.name + " Lv" + skill1.level
        const progressBarPercentage1 = Math.min(100 + 100 * (skill1.xp - skill1.maxXP) / (skill1.maxXP - getTaskMaxXP(skill1, 1)), 100)
        renderProgressBar(progressBarPercentage1, document.querySelector("#skillDisplay1"))
        document.querySelector("#skillDisplay1").removeAttribute("hidden")
        document.querySelector("#currentSkillsDisplay").removeAttribute("hidden")

        if (data.selectedSkills.length >= 2) {
            const skill2 = data.selectedSkills.at(-2)
            document.querySelector("#skillDisplay2 .skillProgressBarText").innerText = skill2.name + " Lv" + skill2.level
            const progressBarPercentage2 = Math.min(100 + 100 * (skill2.xp - skill2.maxXP) / (skill2.maxXP - getTaskMaxXP(skill2, 1)), 100)
            renderProgressBar(progressBarPercentage2, document.querySelector("#skillDisplay2"))
            document.querySelector("#skillDisplay2").removeAttribute("hidden")

            if (data.selectedSkills.length >= 3) {
                const skill3 = data.selectedSkills.at(-3)
                document.querySelector("#skillDisplay3 .skillProgressBarText").innerText = skill3.name + " Lv" + skill3.level
                const progressBarPercentage3 = Math.min(100 + 100 * (skill3.xp - skill3.maxXP) / (skill3.maxXP - getTaskMaxXP(skill3, 1)), 100)
                renderProgressBar(progressBarPercentage3, document.querySelector("#skillDisplay3"))
                document.querySelector("#skillDisplay3").removeAttribute("hidden")

            } else document.querySelector("#skillDisplay3").setAttribute("hidden", "")
        } else {
            document.querySelector("#skillDisplay2").setAttribute("hidden", "")
            document.querySelector("#skillDisplay3").setAttribute("hidden", "")
        }
    } else {
        document.querySelector("#skillDisplay1").setAttribute("hidden", "")
        document.querySelector("#skillDisplay2").setAttribute("hidden", "")
        document.querySelector("#skillDisplay3").setAttribute("hidden", "")
        document.querySelector("#currentSkillsDisplay").setAttribute("hidden", "")
    }
}

function renderStats() {
    const startDate = new Date(data.stats.startDate)
    const currentDate = new Date()
    document.getElementById("startDateDisplay").textContent = startDate.toLocaleDateString()
    document.getElementById("playedDaysDisplay").textContent = format((currentDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24), 2)
    document.getElementById("playedRealTimeDisplay").textContent = formatTime(data.stats.realtime)

    document.getElementById("playedGameTimeDisplayDays").textContent = format(data.stats.totalDays)
    document.getElementById("playedGameTimeDisplayYears").textContent = format(data.stats.totalDays / 365)

    document.getElementById("playedHighestTimeDisplayDays").textContent = format(data.stats.highestDays)
    document.getElementById("playedHighestTimeDisplayYears").textContent = format(data.stats.highestDays / 365)

    const offlineTask = data.specialTask["Offline time"]
    offlineTask.xp = data.storedOfflineTime / 1000
    doTask(offlineTask)
    renderProgressBar(100 + 100 * (offlineTask.xp - offlineTask.maxXP) / (offlineTask.maxXP - getTaskMaxXP(offlineTask, 1)), document.getElementById("statsOfflineProgressBar"))
    document.getElementById("offlineProgressBarProgress").innerText = offlineTask.level
    document.getElementById("offlineTimeDisplay").innerText = formatTimeAmount(data.storedOfflineTime / 1000)

    document.getElementById("rebirthOneTimes").innerText = data.stats.rebirthOneTimes
    document.getElementById("rebirthOneTimesThisRebirth").innerText = data.stats.rebirthOneTimesThisRebirth
    document.getElementById("rebirthTwoTimes").innerText = data.stats.rebirthTwoTimes
    document.getElementById("rebirthTwoTimesThisRebirth").innerText = data.stats.rebirthTwoTimesThisRebirth
}

function renderProgressBar(percentage, element) {
    element.children[0].setAttribute("style", "width: " + percentage + "%")
}

function renderHero() {
    const heroSubpanel = document.getElementById("heroSubpanel");
    const jobCategoryContainers = Array.from(heroSubpanel.getElementsByClassName("jobCategoryContainer"))

    jobCategoryContainers.forEach(container => {

        const jobTypes = Array.from(container.getElementsByClassName("jobType"))

        formatRequirements(container.classList[1],
            container.querySelector(".categoryRequirementText"),
            container.querySelector(".jobCategoryRequirement"),
            container.querySelector(".jobCategoryRequirement"),
            container.querySelector(".jobCategoryElement"),
            container.querySelector(".jobCategoryBackground"))

        jobTypes.forEach(jobType => {
            const jobName = jobType.classList[1].replace("Type", "")
            const thisJob = Object.values(data.job).find(job => job.class === jobName)

            if (thisJob) {
                const jobLevelDisplay = formatLevel(thisJob.level)
                const jobIncomeDisplay = getIncomeSpecific(thisJob.name)
                const jobXPDisplay = thisJob.xp;
                const jobXPRateDisplay = getJobXP(thisJob.name)
                const jobXPLeftDisplay = thisJob.maxXP - thisJob.xp
                const jobMaxLevelDisplay = formatLevel(thisJob.maxLevel)

                jobType.querySelector(".jobLevelDisplay").innerText = jobLevelDisplay
                formatCoins(jobIncomeDisplay, jobType.querySelector(".jobIncomeDisplay"))

                const progressBarPercentage = Math.min(100 + 100 * (thisJob.xp - thisJob.maxXP) / (thisJob.maxXP - getTaskMaxXP(thisJob, 1)), 100)
                renderProgressBar(progressBarPercentage, jobType.querySelector(".jobProgressBar"))

                jobType.querySelector(".jobXPDisplay").innerText = format(jobXPDisplay)
                jobType.querySelector(".jobXPRateDisplay").innerText = format(jobXPRateDisplay, 2)
                jobType.querySelector(".jobXPLeftDisplay").innerText = format(jobXPLeftDisplay)
                jobType.querySelector(".jobMaxLevelDisplay").innerText = jobMaxLevelDisplay
                formatRequirements(jobName,
                    jobType.querySelector(".requirementText"),
                    jobType.querySelector(".taskReq"),
                    jobType,
                    jobType.querySelector(".jobProgressBar"),
                    jobType.querySelector(".jobXPDisplay"),
                    jobType.querySelector(".jobXPRateDisplay"),
                    jobType.querySelector(".jobXPLeftDisplay"),
                    jobType.querySelector(".jobLevelDisplay"),
                    jobType.querySelector(".jobIncomeDisplay"),
                    jobType.querySelector(".jobMaxLevelDisplay"))
            }
        })
    })

}

function renderSkills() {
    const skillSubpanel = document.getElementById("skillSubpanel")
    const skillCategoryContainers = Array.from(skillSubpanel.getElementsByClassName("skillCategoryContainer"))

    skillCategoryContainers.forEach(container => {
        const skillTypes = Array.from(container.getElementsByClassName("skillType"));

        formatRequirements(container.classList[1],
            container.querySelector(".categoryRequirementText"),
            container.querySelector(".skillCategoryRequirement"),
            container.querySelector(".skillCategoryRequirement"),
            container.querySelector(".skillCategoryElement"),
            container.querySelector(".skillCategoryBackground"))

        skillTypes.forEach(skillType => {
            const skillName = skillType.classList[1].replace("Type", "")
            const thisSkill = Object.values(data.skill).find(skill => skill.class === skillName)

            if (thisSkill) {
                const skillLevelDisplay = formatLevel(thisSkill.level)
                let skillEffectDisplay = formatEffect(thisSkill.name)
                if (thisSkill.description === "Expenses" && isComplete(requirements["noviceMerchant"])) skillEffectDisplay += ("\n" + format(1 / getEffectSpecific(thisSkill.name), 2) + "x Merchant Efficiency")
                const skillXPDisplay = thisSkill.xp
                const skillXPRateDisplay = getSkillXP(thisSkill.name)
                const skillXPLeftDisplay = thisSkill.maxXP - thisSkill.xp
                const skillMaxLevelDisplay = formatLevel(thisSkill.maxLevel)

                skillType.querySelector(".skillLevelDisplay").innerText = skillLevelDisplay;
                skillType.querySelector(".skillEffectDisplay").innerText = skillEffectDisplay

                const progressBarPercentage = Math.min(100 + 100 * (thisSkill.xp - thisSkill.maxXP) / (thisSkill.maxXP - getTaskMaxXP(thisSkill, 1)), 100)
                renderProgressBar(progressBarPercentage, skillType.querySelector(".skillProgressBar"))

                skillType.querySelector(".skillXPDisplay").innerText = format(skillXPDisplay);
                skillType.querySelector(".skillXPRateDisplay").innerText = format(skillXPRateDisplay, 2);
                skillType.querySelector(".skillXPLeftDisplay").innerText = format(skillXPLeftDisplay);
                skillType.querySelector(".skillMaxLevelDisplay").innerText = skillMaxLevelDisplay;
                formatRequirements(skillName,
                    skillType.querySelector(".requirementText"),
                    skillType.querySelector(".taskReq"),
                    skillType,
                    skillType.querySelector(".skillProgressBar"),
                    skillType.querySelector(".skillXPDisplay"),
                    skillType.querySelector(".skillXPRateDisplay"),
                    skillType.querySelector(".skillXPLeftDisplay"),
                    skillType.querySelector(".skillLevelDisplay"),
                    skillType.querySelector(".skillEffectDisplay"),
                    skillType.querySelector(".skillMaxLevelDisplay"))
            }
        })
    })
}

function renderShop() {
    const shopSubpanel = document.getElementById("shopSubpanel")
    const shopCategoryContainers = Array.from(shopSubpanel.getElementsByClassName("shopCategoryContainer"))

    shopCategoryContainers.forEach(container => {
        const itemTypes = Array.from(container.getElementsByClassName("itemType"))

        formatRequirements(container.classList[1],
            container.querySelector(".categoryRequirementText"),
            container.querySelector(".shopCategoryRequirement"),
            container.querySelector(".shopCategoryRequirement"),
            container.querySelector(".shopCategoryElement"),
            container.querySelector(".shopCategoryBackground"))

        itemTypes.forEach(itemType => {
            const itemName = itemType.classList[1].replace("Type", "")
            let thisItem = Object.values(data.buyable).find(item => item.class === itemName)

            itemType.querySelector(".itemEffectDisplay").innerText = formatItemEffect(thisItem)
            formatCoins(thisItem.price, itemType.querySelector(".itemPriceDisplay"), true)
            formatCoins(thisItem.upkeep * data.expenseMult, itemType.querySelector(".itemUpkeepDisplay"), true)
            itemType.querySelector(".itemActiveDisplay").setAttribute("data-active", thisItem.owned)
            itemType.querySelector(".itemName").setAttribute("data-active", thisItem.owned)

            formatRequirements(itemName,
                itemType.querySelector(".requirementText"),
                itemType.querySelector(".taskReq"),
                itemType,
                itemType.querySelector(".itemName"),
                itemType.querySelector(".itemActiveDisplayDiv"),
                itemType.querySelector(".itemEffectDisplay"),
                itemType.querySelector(".itemPriceDisplay"),
                itemType.querySelector(".itemUpkeepDisplay"))

        })
    })
}