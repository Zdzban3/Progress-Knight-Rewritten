
function format(number, decimals = 1) {
    const units = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "O", "N", "D", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd", "Spd", "Od", "Nd", "V", "Uv", "Dv", "Tv",
        "Qav", "Qiv", "Sxv", "Spv", "Ov", "Nv", "Tr", "Ut", "Dt", "Tt"]

    // what tier? (determines SI symbol)
    const tier = Math.log10(number) / 3 | 0;
    if (tier <= 0) return number.toFixed(decimals)

    if ((data.settings.numberNotation == 0 || tier < 3) && (tier < units.length)) {
        const suffix = units[tier];
        const scale = Math.pow(10, tier * 3);
        const scaled = number / scale;
        return scaled.toFixed(decimals) + suffix;
    } else {
        if (data.settings.numberNotation == 1) {
            const exp = Math.log10(number) | 0;
            const scale = Math.pow(10, exp);
            const scaled = number / scale;
            return scaled.toFixed(decimals) + "e" + exp;
        }
        else {
            const exp = Math.log10(number) / 3 | 0;
            const scale = Math.pow(10, exp * 3);
            const scaled = number / scale;
            return scaled.toFixed(decimals) + "e" + exp * 3;
        }
    }
}

function getCoinsData() {
    switch (data.settings.currencyNotation) {
        case 0: return [
            { "name": "p", "color": "oklch(75% 0.07 215)", "value": 1e6 },
            { "name": "g", "color": "oklch(75% 0.18 95)", "value": 1e4 },
            { "name": "s", "color": "oklch(75% 0 0)", "value": 1e2 },
            { "name": "c", "color": "oklch(55% 0.1 60)", "value": 1 },
        ];
        case 1: return [
            { "name": " 𒀱", "color": "#ffffff", "value": 1e62, "class": "currency-shadow-rainbow" },
            { "name": "  𒀱", "color": "#ffffff", "value": 1e47, "class": "currency-shadow" },
            { "name": " 𒇫", "color": "#66ccff", "value": 1e41, "class": "currency-shadow" },
            { "name": " 🜊", "color": "#00ff00", "value": 1e35, "class": "currency-bold" },
            { "name": "✹", "color": "#ffffcc", "value": 1e30 },
            { "name": "∰", "color": "#ff0083", "value": 1e26 },
            { "name": "Φ", "color": "#27b897", "value": 1e23 },
            { "name": "Ξ", "color": "#cd72ff", "value": 1e20 },
            { "name": "Δ", "color": "#f5c211", "value": 1e17 },
            { "name": "d", "color": "#ffffff", "value": 1e14 },
            { "name": "r", "color": "#ed333b", "value": 1e12 },
            { "name": "S", "color": "#6666ff", "value": 1e10 },
            { "name": "e", "color": "#2ec27e", "value": 1e8 },
            { "name": "p", "color": "oklch(75% 0.07 215)", "value": 1e6 },
            { "name": "g", "color": "oklch(75% 0.18 95)", "value": 1e4 },
            { "name": "s", "color": "oklch(75% 0 0)", "value": 1e2 },
            { "name": "c", "color": "oklch(55% 0.1 60)", "value": 1 },
            { "name": "w", "color": "oklch(60% 0.08 50)", "value": 1e-2 },
        ];
        case 2: return [
            { "name": "∞", "color": "#000000", "value": 1e50, "class": "currency-shadow-rainbow" },
            { "name": " 𒇫", "color": "#66ccff", "value": 1e44, "class": "currency-shadow" },
            { "name": "Ω", "color": "#e3980e", "value": 1e42, "class": "currency-shadow" },
            { "name": " 🜊", "color": "#00ff00", "value": 1e40, "class": "currency-bold" },
            { "name": "❁", "color": "#ed82e4", "value": 1e38, "class": "currency-bold" },
            { "name": "✹", "color": "#ffffcc", "value": 1e36, "class": "currency-bold" },
            { "name": "∰", "color": "#ff0083", "value": 1e34 },
            { "name": "⌬", "color": "#47472d", "value": 1e32 },
            { "name": "❆", "color": "#47fff9", "value": 1e30 },
            { "name": "Φ", "color": "#27b897", "value": 1e28 },
            { "name": "Ξ", "color": "#cd72ff", "value": 1e26 },
            { "name": "Δ", "color": "#f5c211", "value": 1e24 },
            { "name": "d", "color": "#d8f2f2", "value": 1e22 },
            { "name": "o", "color": "#c8eb8f", "value": 1e20 },
            { "name": "r", "color": "#ed333b", "value": 1e18 },
            { "name": "S", "color": "#6666ff", "value": 1e16 },
            { "name": "e", "color": "#2ec27e", "value": 1e14 },
            { "name": "t", "color": "#ff9924", "value": 1e12 },
            { "name": "a", "color": "#b65fe8", "value": 1e10 },
            { "name": "q", "color": "#f2e6d8", "value": 1e8 },
            { "name": "p", "color": "oklch(75% 0.07 215)", "value": 1e6 },
            { "name": "g", "color": "oklch(75% 0.18 95)", "value": 1e4 },
            { "name": "s", "color": "oklch(75% 0 0)", "value": 1e2 },
            { "name": "c", "color": "oklch(55% 0.1 60)", "value": 1 },
            { "name": "w", "color": "oklch(60% 0.08 50)", "value": 1e-2 },
        ];
        case 4: return [
            { "name": "", "color": "oklch(75% 0.18 95)", "value": 4e4, "prefix": "£" },
            { "name": "s", "color": "oklch(75% 0 0)", "value": 2e3 },
            { "name": "d", "color": "oklch(55% 0.1 60)", "value": 500 / 3 },
        ];
        default: throw new Error("Invalid currency notation set");
    }
}

function formatWhole(number, decimals = 1) {
    if (number >= 1e3 || (number <= 0.99 && number != 0)) {
        return format(number, decimals)
    } else return format(number, 0);
}

function formatCoins(coins, element, showFree = false) {
    for (const c of element.children) {
        c.textContent = "";
        c.classList.remove("usedCoin")
    }
    if (coins === 0 && showFree) {
        element.children[0].textContent = "Free"
        element.children[0].style.color = "oklch(70% 0.14 145)"
        element.children[0].className = "usedCoin"
        return
    }

    switch (data.settings.currencyNotation) {
        case 0:
        case 1:
        case 2:
        case 4:
            const money2 = getCoinsData()

            let coinsUsed = 0
            for (let i = 0; i < money2.length; i++) {
                const m = money2[i];
                const prev = money2[i - 1];
                const diff = prev ? prev.value / m.value : Infinity;
                const amount = Math.floor(coins / m.value) % diff;
                if (amount > 0) {
                    element.children[coinsUsed].textContent = (m.prefix ?? "") + format(amount, amount < 1000 ? 0 : 2) + m.name
                    element.children[coinsUsed].style.color = m.color
                    element.children[coinsUsed].className = m.class ? m.class : ""
                    element.children[coinsUsed].className = "usedCoin"
                    coinsUsed++
                }
                if ((m.value > coins && i === money2.length - 1)) {
                    if (coins !== 0) element.children[coinsUsed].textContent = (m.prefix ?? "") + format(coins / m.value, 2) + m.name
                    if (coins === 0) element.children[coinsUsed].textContent = (m.prefix ?? "") + "0" + m.name
                    element.children[coinsUsed].style.color = m.color
                    element.children[coinsUsed].className = m.class ? m.class : ""
                    element.children[coinsUsed].className = "usedCoin"
                    coinsUsed++
                }
                if (coinsUsed >= data.settings.coinsDisplayed) break;
            }
            break;
        case 3:
            element.children[0].textContent = "$" + format(coins / 100, 2)
            element.children[0].style.color = "oklch(70% 0.14 145)"
            element.children[0].className = "usedCoin"
            break;
        default:
            throw new Error("Invalid currency notation set");
    }
}

function formatTime(sec_num, show_ms = false) {
    if (sec_num == null) {
        return "00:00"
    }
    if (sec_num < 0) {
        return '-' + formatTime(-sec_num, show_ms)
    }

    if (sec_num >= 31536000) {
        let years = Math.floor(sec_num / 31536000)
        if (years >= 1000) {
            return formatWhole(years) + ' years'
        }
        return years + 'y ' + formatTime(sec_num % 31536000, show_ms)
    }
    if (sec_num >= 86400) {
        let days = Math.floor(sec_num / 86400)
        return days + 'd ' + formatTime(sec_num % 86400, show_ms)
    }

    let hours = Math.floor(sec_num / 3600)
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
    let seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60))
    let ms = Math.floor((sec_num - Math.floor(sec_num)) * 1000)
    let mss = (show_ms ? "." + ms.toString().padStart(3, "0") : "")

    if (hours < 10) hours = "0" + hours
    if (minutes < 10) minutes = "0" + minutes
    if (seconds < 10) seconds = "0" + seconds
    return (sec_num > 3600 ? hours + ':' : "") + minutes + ':' + seconds + mss
}

function formatTreshold(number, decimals = 1, treshold = 100000) {
    if (number < treshold)
        return Math.floor(number)
    else
        return format(number, decimals)
}

function formatLevel(level) {
    if (level >= 100000) {
        return format(level)
    }
    return level.toLocaleString()
}

function formatAge(days) {
    const years = daysToYears(days)
    const day = getCurrentDay(days)
    if (years > 10000)
        return "Age " + format(years)
    else
        return "Age " + years + " Day " + day
}

function log(x, base) {
    return Math.log(x) / Math.log(base)
}

function yearsToDays(years) {
    return years * 365
}

function daysToYears(days) {
    return Math.floor(days / 365)
}

function getCurrentDay(days) {
    return Math.floor(days - daysToYears(days) * 365)
}

function formatTimeAmount(seconds) {
    if (seconds >= 3600) {
        return format(seconds / 3600) + " hours"
    } else if (seconds >= 60) {
        return format(seconds / 60) + " minutes"
    } else return format(seconds) + " seconds"
}

function formatEffect(skillName) {
    return format(getEffectSpecific(skillName), 2) + "x " + data.skill[skillName].description
}

function formatItemEffect(item, decimals = 2) { //item = data.buyable.home[item] or data.buyable.other[item]
    return format(getEffectSpecific(item.name), decimals) + "x " + item.description
}

function formatRequirements(name, element, parentElement, taskElement, el1, el2, el3, el4, el5, el6, el7, el8) {
    var text = ""
    var exception = false
    if (requirements[name].job) {
        const jobReqs = requirements[name].job
        for (var req in jobReqs) {
            const jobName = jobReqs[req].name
            const jobValue = jobReqs[req].value
            if (jobValue > data.job[jobName].level) text += jobName + ": " + data.job[jobName].level + "/" + jobValue + "\xa0\xa0"
        }
    }
    if (requirements[name].skill) {
        const skillReqs = requirements[name].skill
        for (var req in skillReqs) {
            const skillName = skillReqs[req].name
            const skillValue = skillReqs[req].value
            if (skillValue > data.skill[skillName].level) text += skillName + ": " + data.skill[skillName].level + "/" + skillValue + "\xa0\xa0"
        }
    }
    if (requirements[name].age) {
        const ageReq = requirements[name].age
        if (ageReq > data.days / 365) text += "Age: " + format(data.days / 365, 1) + "/" + format(ageReq, 0) + "\xa0\xa0"
    }
    if (requirements[name].evil) {
        const evilReq = requirements[name].evil
        if (evilReq > data.evil) text += "Evil: " + format(data.evil, 0) + "/" + format(evilReq, 0) + "\xa0\xa0"
    }
    if (requirements[name].coins) {
        const coinsReq = requirements[name].coins
        if (coinsReq > data.maxCoins) {
            formatCoins(data.coins, parentElement.querySelector(".requirementCoins"))
            parentElement.querySelector(".requirementCoinsEnd").innerText = "/\xa0"
            formatCoins(coinsReq, parentElement.querySelector(".requirementCoins2"))
            exception = true
            parentElement.querySelector(".coinReqText").innerText = "Coins: "
        } else {
            parentElement.querySelector(".coinReqText").innerText = ""
            for (const span of parentElement.querySelector(".requirementCoins").children) span.innerText = ""
            for (const span of parentElement.querySelector(".requirementCoins2").children) span.innerText = ""
        }
    }

    if (requirements[name].show) {
        const showJobReqs = requirements[name].show.job
        const showSkillReqs = requirements[name].show.skill
        var show = true
        for (var req in showJobReqs) {
            const jobName = showJobReqs[req].name
            const jobValue = showJobReqs[req].value
            if (jobValue > data.job[jobName].level) show = false
        }
        for (var req in showSkillReqs) {
            const skillName = showSkillReqs[req].name
            const skillValue = showSkillReqs[req].value
            if (skillValue > data.skill[skillName].level) show = false
        }
        if (requirements[name].show.age) {
            const showAgeReq = requirements[name].show.age
            if (showAgeReq > data.days / 365) show = false
        }
        if (requirements[name].show.evil) {
            const showEvilReq = requirements[name].show.evil
            if (showEvilReq > data.evil) show = false
        }
        if (requirements[name].show.coins) {
            const coinsReq = requirements[name].show.coins
            if (coinsReq > data.maxCoins) show = false
        }
        if (show) {
            parentElement.classList.remove("hidden")
            taskElement.classList.remove("hidden")
        } else {
            parentElement.classList.add("hidden")
            taskElement.classList.add("hidden")
        }
    }

    if (text == "" && !exception) {
        element.setAttribute("hidden", "")
        parentElement.setAttribute("hidden", "")

        if (el1) el1.removeAttribute("hidden")
        if (el2) el2.removeAttribute("hidden")
        if (el3) el3.removeAttribute("hidden")
        if (el4) el4.removeAttribute("hidden")
        if (el5) el5.removeAttribute("hidden")
        if (el6) el6.removeAttribute("hidden")
        if (el7) el7.removeAttribute("hidden")
        if (el8) el8.removeAttribute("hidden")
    } else {
        element.removeAttribute("hidden")
        parentElement.removeAttribute("hidden")

        if (el1) el1.setAttribute("hidden", "")
        if (el2) el2.setAttribute("hidden", "")
        if (el3) el3.setAttribute("hidden", "")
        if (el4) el4.setAttribute("hidden", "")
        if (el5) el5.setAttribute("hidden", "")
        if (el6) el6.setAttribute("hidden", "")
        if (el7) el7.setAttribute("hidden", "")
        if (el8) el8.setAttribute("hidden", "")
    }
    element.textContent = text
}

function isComplete(requirement, useMaxLevels = false) { //requirement = requirements[key]
    var isComplete = true
    const jobReqs = requirement.job
    const skillReqs = requirement.skill
    for (const req in jobReqs) {
        const job = data.job[jobReqs[req].name]
        if (jobReqs[req].value > (useMaxLevels ? job.highestLevel : job.level)) isComplete = false
    }
    for (var req in skillReqs) {
        const skill = data.skill[skillReqs[req].name]
        if (skillReqs[req].value > (useMaxLevels ? skill.highestLevel : skill.level)) isComplete = false
    }
    if (requirement.age > data.days / 365) isComplete = false
    if (requirement.evil > data.evil) isComplete = false
    return isComplete
}