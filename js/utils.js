
function format(number, decimals = 1) {
    const units = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "O", "N", "D", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd", "Spd", "Od", "Nd", "V", "Uv", "Dv", "Tv",
    "Qav", "Qiv", "Sxv", "Spv", "Ov", "Nv", "Tr", "Ut", "Dt", "Tt"]

    // what tier? (determines SI symbol)
    const tier = Math.log10(number) / 3 | 0;
    if (tier <= 0) return math.floor(number, decimals).toFixed(decimals);

    if ((gameData.settings.numberNotation == 0 || tier < 3) && (tier < units.length)) {
        const suffix = units[tier];
        const scale = Math.pow(10, tier * 3);
        const scaled = number / scale;
        return math.floor(scaled, decimals).toFixed(decimals) + suffix;
    } else {
        if (gameData.settings.numberNotation == 1) {
            const exp = Math.log10(number) | 0;
            const scale = Math.pow(10, exp);
            const scaled = number / scale;
            return math.floor(scaled, decimals).toFixed(decimals) + "e" + exp;
        }
        else {
            const exp = Math.log10(number) / 3 | 0;
            const scale = Math.pow(10, exp * 3);
            const scaled = number / scale;
            return math.floor(scaled, decimals).toFixed(decimals) + "e" + exp * 3;
        }
    }
}

function getCoinsData() {
    switch (gameData.settings.currencyNotation) {
        case 0: return [
            { "name": "p", "color": "#79b9c7", "value": 1e6 },
            { "name": "g", "color": "#E5C100", "value": 1e4 },
            { "name": "s", "color": "#a8a8a8", "value": 1e2 },
            { "name": "c", "color": "#a15c2f", "value": 1 },
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
            { "name": "p", "color": "#79b9c7", "value": 1e6 },
            { "name": "g", "color": "#E5C100", "value": 10000 },
            { "name": "s", "color": "#a8a8a8", "value": 100 },
            { "name": "c", "color": "#a15c2f", "value": 1 },
            { "name": "w", "color": "#633f24", "value": 1e-2 },
        ];
        case 4: return [
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
            { "name": "p", "color": "#79b9c7", "value": 1e6 },
            { "name": "g", "color": "#E5C100", "value": 1e4 },
            { "name": "s", "color": "#a8a8a8", "value": 1e2 },
            { "name": "c", "color": "#a15c2f", "value": 1 },
            { "name": "w", "color": "#633f24", "value": 1e-2 },
        ];
        case 2: return [
            { "name": "", "color": "#E5C100", "value": 240, "prefix": "£" },
            { "name": "s", "color": "#a8a8a8", "value": 12 },
            { "name": "d", "color": "#a15c2f", "value": 1 },
        ];
        default: throw new Error("Invalid currency notation set");
    }
}

function formatWhole(number, decimals = 1) {
    if (number >= 1e3 || (number <= 0.99 && number != 0)) {
        return format(number, decimals)
    }
    return format(number, 0);
}

function formatCoins(coins, element) {
    for (const c of element.children) {
        c.textContent = "";
    }

    switch (gameData.settings.currencyNotation) {
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
                if ((amount > 0 || (coins < 1 && m.value == 1))) {
                    element.children[coinsUsed].textContent = (m.prefix ?? "") + format(amount, amount < 1000 ? 0 : 2) + m.name
                    element.children[coinsUsed].style.color = m.color
                    element.children[coinsUsed].className = m.class ? m.class : ""
                    coinsUsed++
                }
                if (coinsUsed >= gameData.settings.coinsDisplayed) break;
            }
            break;
        case 3:
            element.children[0].textContent = "$" + format(coins / 100, 2)
            element.children[0].style.color = "#E5C100"
            element.children[0].className = ""
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
    if (level >= 100000)
        return format(level)

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

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
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