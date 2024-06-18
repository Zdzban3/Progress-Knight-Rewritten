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
    if (data.days / 365 >= 25) { document.getElementById("amuletText1").removeAttribute("hidden") } else document.getElementById("amuletText1").setAttribute("hidden", "")
    if (data.days / 365 >= 45) { document.getElementById("amuletText2").removeAttribute("hidden") } else document.getElementById("amuletText2").setAttribute("hidden", "")
    if (data.days / 365 >= 65) { document.getElementById("amuletText3").removeAttribute("hidden") } else document.getElementById("amuletText3").setAttribute("hidden", "")
    if (data.days / 365 >= 200) { document.getElementById("amuletTextEvil").removeAttribute("hidden") } else document.getElementById("amuletTextEvil").setAttribute("hidden", "")
}