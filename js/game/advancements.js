const advancements = { //hide: 0 - never, 1 - rebirth 1, 2 - rebirth 2, etc
    "Skills": {
        maxRequirement: ["skills"],
    },
    "Shop": {
        maxCoins: 1000,
    },
    "Autopromote": {
        maxRequirement: ["meditation"],
    },
    "Autoskill": {
        maxRequirement: ["autoskill", "meditation"],
    },
    "Autobuy": {
        maxRequirement: ["autoskill", "meditation"],
        maxCoins: 1e6,
    },
    "Amulet": {
        maxAge: 25,
    },
    "Rebirth": {
        rebirthOneTimes: 1,
    },
    "TimeWarping": {
        requirement: ["timeWarping"],
    },
    "Milestones": {
        rebirthOneTimes: 1,
    },
    "Evil": {
        rebirthTwoTimes: 1,
    },
    "Transcendence": {
        rebirthThreeTimes: 1,
    },
}

function setupAllAdvancements() {
    for (const key in data.advancements) {
        const adv = data.advancements[key]
        if (adv.reached) window[`advancement${key}`]()
    }
}

function updateAdvancements() {
    for (const key in data.advancements) {
        const adv = data.advancements[key]
        if (!adv.reached) {
            var finished = true
            if (adv.maxAge > data.stats.highestDays / 365) finished = false
            if (adv.maxCoins > data.stats.highestCoins) finished = false
            if (adv.rebirthOneTimes > data.stats.rebirthOneTimes) finished = false
            if (adv.rebirthTwoTimes > data.stats.rebirthTwoTimes) finished = false
            if (adv.rebirthThreeTimes > data.stats.rebirthThreeTimes) finished = false
            if (adv.requirement) for (const key of adv.requirement) if (!isComplete(requirements[key])) finished = false
            if (adv.maxRequirement) for (const key of adv.maxRequirement) if (!isComplete(requirements[key], true)) finished = false
            if (finished) {
                adv.reached = true
                window[`advancement${key}`]()
            }
        }
    }
}

function advancementAutopromote() {document.querySelector(".needAutopromote").removeAttribute("hidden")}
function advancementAutoskill() {
    document.querySelector(".needAutoskill").removeAttribute("hidden")
    document.querySelector(".needAutopromote2").style.margin = "-35px 0 0 0"
}
function advancementAutobuy() {document.querySelector(".needAutobuy").removeAttribute("hidden")}


function advancementSkills() {document.querySelector(".needSkills").removeAttribute("hidden")}
function advancementShop() {document.querySelector(".needShop").removeAttribute("hidden")}

function advancementAmulet() {
    const array = document.querySelectorAll(".needAmulet")
    for (const item of array) {
        item.removeAttribute("hidden")
    }
}

function advancementRebirth() {
    const array = document.querySelectorAll(".needRebirthOne")
    for (const item of array) {
        item.removeAttribute("hidden")
    }
}

function advancementTimeWarping() {
    const array = document.querySelectorAll(".needTimeWarping")
    for (const item of array) {
        item.removeAttribute("hidden")
    }
}

function advancementMilestones() {
    const array = document.querySelectorAll(".needMilestones")
    for (const item of array) {
        item.removeAttribute("hidden")
    }
}

function advancementEvil() {
    const array = document.querySelectorAll(".needRebirthTwo")
    for (const item of array) {
        item.removeAttribute("hidden")
    }
}

function advancementTranscendence() {
    const array = document.querySelectorAll(".needRebirthThree")
    for (const item of array) {
        item.removeAttribute("hidden")
    }
}

function amuletText() {
    if (data.days / 365 < 25) { document.getElementById("amuletText0").removeAttribute("hidden") } else document.getElementById("amuletText0").setAttribute("hidden", "")
    if (data.days / 365 >= 25) { document.getElementById("amuletText1").removeAttribute("hidden") } else document.getElementById("amuletText1").setAttribute("hidden", "")
    if (data.days / 365 >= 45) { document.getElementById("amuletText2").removeAttribute("hidden") } else document.getElementById("amuletText2").setAttribute("hidden", "")
    if (data.days / 365 >= 65) { document.getElementById("amuletText3").removeAttribute("hidden") } else document.getElementById("amuletText3").setAttribute("hidden", "")
    if (data.days / 365 >= 200) { document.getElementById("amuletTextEvil").removeAttribute("hidden") } else document.getElementById("amuletTextEvil").setAttribute("hidden", "")
}