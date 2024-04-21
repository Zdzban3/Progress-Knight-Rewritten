var gameData = {
    taskData: {},
    itemData: {},

    coins: 0,
    days: 365 * 14,
    lifespan: 365 * 60,
    totalDays: 0,
    realtime: 0,
    highestDays: 365 * 14,
    evil: 0,
    currentJob: null,
    currentProperty: null,
    currentMisc: null,

    settings: {
        stickySidebar: true,
        theme: 1,
        currencyNotation: 0,
        numberNotation: 1,
        coinsDisplayed: 2,
        layout: 1,
        fontSize: 3,
        selectedTab: 'jobs',
        enableKeybinds: false,
    }
}

const updateSpeed = 20
const baseLifespan = 365 * 60
const baseGameSpeed = 4


const jobBaseData = {
    "Beggar": { name: "Beggar", maxXp: 50, income: 5, heroxp: 36 },
}