function pause() {
    data.paused = true;
    document.getElementById("pauseButton").innerText = "Play"
    document.getElementById("pauseButton").classList.add("paused")
    for (i = 0; i < document.getElementsByClassName("tab").length; i++) {
        document.getElementsByClassName("tab")[i].classList.add("paused")
    }
}

function unpause() {
    data.paused = false;
    document.getElementById("pauseButton").innerText = "Pause"
    document.getElementById("pauseButton").classList.remove("paused")
    for (i = 0; i < document.getElementsByClassName("tab").length; i++) {
        document.getElementsByClassName("tab")[i].classList.remove("paused")
    }
}

function pauseButton() {
    if (isAlive())
        if (data.paused == true) unpause()
        else pause()
}

function toggleAutoPromote(change) {
    if (change) {
        if (data.autopromote) {
            data.autopromote = false
        } else data.autopromote = true
    }
    if (data.autopromote) { document.getElementById("autoPromote").classList.add("toggled") } else document.getElementById("autoPromote").classList.remove("toggled")
}

function toggleAutoSkill(change) {
    if (change) {
        if (data.autoskill) {
            data.autoskill = false
        } else data.autoskill = true
    }
    if (data.autoskill) { document.getElementById("autoSkill").classList.add("toggled") } else document.getElementById("autoSkill").classList.remove("toggled")
}

function toggleAutoBuy(change) {
    if (change) {
        if (data.autobuy) {
            data.autobuy = false
        } else data.autobuy = true
    }
    if (data.autobuy) { document.getElementById("autoBuy").classList.add("toggled") } else document.getElementById("autoBuy").classList.remove("toggled")
}

function switchPrimaryTheme(change) {
    const cap = 2 // amount of themes, start counting from 0
    if (change === true) {
        data.settings.primaryTheme++
    }
    if (data.settings.primaryTheme > cap) {
        data.settings.primaryTheme = 0
    }
    if (data.settings.primaryTheme === 0) {
        themePrimaryStylesheet.setAttribute('href', 'css/themes/primary/dark.css');
        document.getElementById("selectedPrimaryTheme").textContent = "Dark"
    } else if (data.settings.primaryTheme === 1) {
        themePrimaryStylesheet.setAttribute('href', 'css/themes/primary/light.css');
        document.getElementById("selectedPrimaryTheme").textContent = "Light"
    } else if (data.settings.primaryTheme === 2) {
        themePrimaryStylesheet.setAttribute('href', 'css/themes/primary/oled.css');
        document.getElementById("selectedPrimaryTheme").textContent = "OLED"
    }
}

function switchSecondaryTheme(change) {
    const cap = 1 // amount of themes, start counting from 0
    if (change == true) {
        data.settings.secondaryTheme++
    }
    if (data.settings.secondaryTheme > cap) {
        data.settings.secondaryTheme = 0
    }
    if (data.settings.secondaryTheme == 0) {
        themeSecondaryStylesheet.setAttribute('href', 'css/themes/secondary/yellow.css');
        document.getElementById("selectedSecondaryTheme").textContent = "Yellow"
    } else if (data.settings.secondaryTheme == 1) {
        themeSecondaryStylesheet.setAttribute('href', 'css/themes/secondary/blue.css');
        document.getElementById("selectedSecondaryTheme").textContent = "Blue"
    }
}

function switchCoinsAmountDisplayed(change) {
    const cap = 5 // max selected maxCoins
    if (change == true) {
        data.settings.coinsDisplayed++
    }
    if (data.settings.coinsDisplayed > cap) {
        data.settings.coinsDisplayed = 1
    }
    document.getElementById("selectedCoinsAmountDisplayed").textContent = data.settings.coinsDisplayed
}

function switchCurrencyNotation(change) {
    const cap = 4 // amount of notations, start counting from 0
    if (change == true) {
        data.settings.currencyNotation++
    }
    if (data.settings.currencyNotation > cap) {
        data.settings.currencyNotation = 0
    }
    switch (data.settings.currencyNotation) {
        case 0:
            document.getElementById("selectedCurrencyNotation").textContent = "Classic"
            break
        case 1:
            document.getElementById("selectedCurrencyNotation").textContent = "Extended"
            break
        case 2:
            document.getElementById("selectedCurrencyNotation").textContent = "Extended++"
            break
        case 3:
            document.getElementById("selectedCurrencyNotation").textContent = "Modern $"
            break
        case 4:
            document.getElementById("selectedCurrencyNotation").textContent = "British £"
            break
    }
}

function switchUpdateSpeed(change) {
    const cap = 5
    if (change == true) {
        data.settings.updateSpeedSetting++
    }
    if (data.settings.updateSpeedSetting > cap) {
        data.settings.updateSpeedSetting = 0
    }
    switch (data.settings.updateSpeedSetting) {
        case 0:
            setUpdateSpeed(5)
            break
        case 1:
            setUpdateSpeed(10)
            break
        case 2:
            setUpdateSpeed(20)
            break
        case 3:
            setUpdateSpeed(30)
            break
        case 4:
            setUpdateSpeed(60)
            break
        case 5:
            setUpdateSpeed(120)
            break
    }
}

function switchSidebarZoom(change = 0) {
    const capMax = 1.5
    const capMin = 0.5
    data.settings.sidebarZoom += change
    if (data.settings.sidebarZoom > capMax) data.settings.sidebarZoom = 1.5
    if (data.settings.sidebarZoom < capMin) data.settings.sidebarZoom = 0.5
    document.getElementById("selectedSidebarZoom").textContent = format(data.settings.sidebarZoom, 2) + "x"
    document.getElementById("sidebar").setAttribute("style", `zoom: ${data.settings.sidebarZoom}`)
}

function switchMainpanelZoom(change = 0) {
    const capMax = 1.5
    const capMin = 0.5
    data.settings.mainpanelZoom += change
    if (data.settings.mainpanelZoom > capMax) data.settings.mainpanelZoom = 1.5
    if (data.settings.mainpanelZoom < capMin) data.settings.mainpanelZoom = 0.5
    document.getElementById("selectedMainpanelZoom").textContent = format(data.settings.mainpanelZoom, 2) + "x"
    document.getElementById("mainpanels").setAttribute("style", `zoom: ${data.settings.mainpanelZoom}`)
}

function switchMobile(change = true) {
    if (change == true) {
        if (data.settings.mobile) { data.settings.mobile = false } else data.settings.mobile = true
    }
    if (data.settings.mobile) {
        document.getElementById("mobileStylesheet").setAttribute('href', 'css/mobile.css');
        document.getElementById("selectedMobile").innerText = "true"
    } else {
        document.getElementById("mobileStylesheet").setAttribute('href', 'unset');
        document.getElementById("selectedMobile").innerText = "false"
    }
}

function switchExperimentalSettings(change) {
    const cap = 1 // amount of themes, start counting from 0
    if (change == true) {
        data.settings.experimentalSettings++
    }
    if (data.settings.experimentalSettings > cap) {
        data.settings.experimentalSettings = 0
    }
    if (data.settings.experimentalSettings == 0) {
        document.getElementById("experimentalSettings").setAttribute("hidden", "")
    } else if (data.settings.experimentalSettings == 1) {
        document.getElementById("experimentalSettings").removeAttribute("hidden")
    }
}

function switchTextShadow(change) {
    const cap = 3
    if (change == true) {
        data.settings.textShadow++
    }
    if (data.settings.textShadow > cap) {
        data.settings.textShadow = 0
    }
    if (data.settings.textShadow == 0) {
        document.getElementById("themeTextShadowStylesheet").setAttribute("href", "unset")
        document.getElementById("textShadow").textContent = "None"
    } else if (data.settings.textShadow == 1) {
        document.getElementById("themeTextShadowStylesheet").setAttribute("href", "css/themes/text-shadow/small.css")
        document.getElementById("textShadow").textContent = "Small"
    } else if (data.settings.textShadow == 2) {
        document.getElementById("themeTextShadowStylesheet").setAttribute("href", "css/themes/text-shadow/medium.css")
        document.getElementById("textShadow").textContent = "Medium"
    } else if (data.settings.textShadow == 3) {
        document.getElementById("themeTextShadowStylesheet").setAttribute("href", "css/themes/text-shadow/large.css")
        document.getElementById("textShadow").textContent = "Large"
    }
}

function switchHideTitle(change = true) {
    if (change)
        if (data.settings.hideTitle) data.settings.hideTitle = false
        else data.settings.hideTitle = true
    if (data.settings.hideTitle) {
        document.getElementById("hideTitle").innerText = "true"
        document.getElementById("title").setAttribute("hidden", "")
        document.querySelector(".all-panels").setAttribute("style", "margin-top: 16px")
    } else {
        document.getElementById("hideTitle").innerText = "false"
        document.getElementById("title").removeAttribute("hidden")
        document.querySelector(".all-panels").setAttribute("style", "margin-top: 10px")
    }
}

function switchSmoothWidth(change = true) {
    if (change)
        if (data.settings.smoothWidth) data.settings.smoothWidth = false
        else data.settings.smoothWidth = true
    if (data.settings.smoothWidth) {
        document.getElementById("smoothWidthStylesheet").setAttribute("href", "css/smoothWidth.css")
        document.getElementById("smoothWidth").innerText = true
    } else {
        document.getElementById("smoothWidthStylesheet").setAttribute("href", "unset")
        document.getElementById("smoothWidth").innerText = false
    }
}