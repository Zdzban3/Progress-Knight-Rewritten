function setupAllAdvancements() {
    for (const key in data.advancements) {
        const adv = data.advancements[key]
        if (adv.reached) {
            window[`advancement${key}`]()
        }
    }
}

function advancementAmulet() {
    document.getElementById("amuletButton").removeAttribute("hidden")
}

function amuletText() {
    if (data.days / 365 > 25) { document.getElementById("amuletText25").removeAttribute("hidden") } else document.getElementById("amuletText25").setAttribute("hidden", "")
    if (data.days / 365 > 40) { document.getElementById("amuletText40").removeAttribute("hidden") } else document.getElementById("amuletText40").setAttribute("hidden", "")
    if (data.days / 365 > 55) { document.getElementById("amuletText55").removeAttribute("hidden") } else document.getElementById("amuletText55").setAttribute("hidden", "")
}