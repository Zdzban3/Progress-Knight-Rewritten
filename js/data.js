const jobCategories = {
    "Common work": {
        jobs: ["Beggar", "Farmer", "Fisherman", "Miner", "Blacksmith", "Merchant"],
        name: "commonWork",
        nameFull: "Common Work"
    },
    "Military": {
        jobs: ["Squire", "Footman", "Veteran footman", "Knight", "Veteran knight", "Elite knight", "Holy knight", "Legendary knight"],
        name: "military",
        nameFull: "Military"
    },
    "T.A.A": {
        jobs: ["Student", "Apprentice mage", "Mage", "Wizard", "Master wizard", "Chairman"],
        name: "theArcaneAssociation",
        nameFull: "The Arcane Association"
    }
}
const skillCategories = {
    "Fundamentals": {
        skills: ["Concentration", "Productivity", "Bargaining", "Meditation"],
        name: "fundamentals",
        nameFull: "Fundamentals"
    },
    "Combat": {
        skills: ["Strength", "Battle tactics", "Muscle memory"],
        name: "combat",
        nameFull: "Combat"
    },
    "Magic": {
        skills: ["Mana control", "Life essence", "Time warping", "Astral body"],
        name: "magic",
        nameFull: "Magic"
    },
    "Dark magic": {
        skills: ["Dark influence", "Evil control", "Intimidation", "Demon training", "Blood meditation", "Demon's wealth"],
        name: "darkMagic",
        nameFull: "Dark magic"
    }
};


const shopCategories = {
    "Properties": {
        items: ["Homeless", "Tent", "Wooden hut", "Cottage", "House", "Large house", "Small palace", "Grand palace"],
        name: "properties",
        nameFull: "Properties"
    },
    "Furniture": {
        items: ["Book", "Dumbbells", "Study desk", "Library"],
        name: "furniture",
        nameFull: "Furniture"
    },
    "Equipment": {
        items: ["Steel longsword", "Sapphire charm"],
        name: "equipment",
        nameFull: "Equipment"
    },
    "Personnel": {
        items: ["Personal squire", "Butler"],
        name: "personnel",
        nameFull: "Personnel"
    }
}

const jobs = {
    //Common work
    "Beggar": { name: "Beggar", class: "beggar", baseMaxXP: 50, income: 5 },
    "Farmer": { name: "Farmer", class: "farmer", baseMaxXP: 100, income: 9 },
    "Fisherman": { name: "Fisherman", class: "fisherman", baseMaxXP: 200, income: 15 },
    "Miner": { name: "Miner", class: "miner", baseMaxXP: 400, income: 40 },
    "Blacksmith": { name: "Blacksmith", class: "blacksmith", baseMaxXP: 800, income: 80 },
    "Merchant": { name: "Merchant", class: "merchant", baseMaxXP: 1600, income: 150 },
    //Military
    "Squire": { name: "Squire", class: "squire", baseMaxXP: 100, income: 5 },
    "Footman": { name: "Footman", class: "footman", baseMaxXP: 1000, income: 50 },
    "Veteran footman": { name: "Veteran footman", class: "veteranFootman", baseMaxXP: 10000, income: 120 },
    "Knight": { name: "Knight", class: "knight", baseMaxXP: 1e5, income: 300 },
    "Veteran knight": { name: "Veteran knight", class: "veteranKnight", baseMaxXP: 1e6, income: 1e3 },
    "Elite knight": { name: "Elite knight", class: "eliteKnight", baseMaxXP: 7.5e6, income: 3e3 },
    "Holy knight": { name: "Holy knight", class: "holyKnight", baseMaxXP: 4e7, income: 1.5e4 },
    "Legendary knight": { name: "Legendary knight", class: "legendaryKnight", baseMaxXP: 1.5e8, income: 5e4 },
    //T.A.A
    "Student": { name: "Student", class: "student", baseMaxXP: 1e5, income: 100 },
    "Apprentice mage": { name: "Apprentice mage", class: "apprenticeMage", baseMaxXP: 1e6, income: 1e3 },
    "Mage": { name: "Mage", class: "mage", baseMaxXP: 1e7, income: 7.5e3 },
    "Wizard": { name: "Wizard", class: "wizard", baseMaxXP: 1e8, income: 5e4 },
    "Master wizard": { name: "Master wizard", class: "masterWizard", baseMaxXP: 1e10, income: 2.5e5 },
    "Chairman": { name: "Chairman", class: "chairman", baseMaxXP: 1e12, income: 1e6 },
}

const skills = {
    //Fundamentals
    "Concentration": { name: "Concentration", class: "concentration", baseMaxXP: 100, effect: 0.01, description: "Skill XP" },
    "Productivity": { name: "Productivity", class: "productivity", baseMaxXP: 100, effect: 0.01, description: "Job XP" },
    "Bargaining": { name: "Bargaining", class: "bargaining", baseMaxXP: 100, effect: -0.01, effectFormula: "reductive", description: "Expenses" },
    "Meditation": { name: "Meditation", class: "meditation", baseMaxXP: 100, effect: 0.01, description: "Happiness" },
    //Combat
    "Strength": { name: "Strength", class: "strength", baseMaxXP: 100, effect: 0.01, description: "Military Income" },
    "Battle tactics": { name: "Battle tactics", class: "battleTactics", baseMaxXP: 100, effect: 0.01, description: "Military XP" },
    "Muscle memory": { name: "Muscle memory", class: "muscleMemory", baseMaxXP: 100, effect: 0.01, description: "Strength XP" },
    //Magic
    "Mana control": { name: "Mana control", class: "manaControl", baseMaxXP: 100, effect: 0.01, description: "T.A.A XP" },
    "Life essence": { name: "Life essence", class: "lifeEssence", baseMaxXP: 100, effect: 0.01, effectFormula: "log33", description: "Lifespan Length" },
    "Time warping": { name: "Time warping", class: "timeWarping", baseMaxXP: 100, effect: 0.01, effectFormula: "log13", description: "Time Warping" },
    "Astral body": { name: "Astral body", class: "astralBody", baseMaxXP: 100, effect: 0.01, effectFormula: "log33", description: "Lifespan Length" },
    //Dark magic
    "Dark influence": { name: "Dark influence", class: "darkInfluence", baseMaxXP: 100, effect: 0.01, description: "All XP" },
    "Evil control": { name: "Evil control", class: "evilControl", baseMaxXP: 100, effect: 0.01, description: "Evil Gain" },
    "Intimidation": { name: "Intimidation", class: "intimidation", baseMaxXP: 100, effect: -0.01, effectFormula: "reductive", description: "Expenses" },
    "Demon training": { name: "Demon training", class: "demonTraining", baseMaxXP: 100, effect: 0.01, description: "All XP" },
    "Blood meditation": { name: "Blood meditation", class: "bloodMeditation", baseMaxXP: 100, effect: 0.01, description: "Evil Gain" },
    "Demon's wealth": { name: "Demon's wealth", class: "demonsWealth", baseMaxXP: 100, effect: 0.002, description: "Income" },
}

const specialTasks = {
    "Offline time": { name: "Offline time", class: "offlineTime", xpMult: 0, xp: 0, maxXP: 100, baseMaxXP: 100, level: 0, maxLevel: 0, effect: 0, xpFormula: "offlineTime" }
}

const buyableHomes = {
    "Homeless": { name: "Homeless", class: "homeless", owned: true, price: 0, upkeep: 0, effect: 1, description: "Happiness" },
    "Tent": { name: "Tent", class: "tent", price: 5e3, upkeep: 15, effect: 1.4, description: "Happiness" },
    "Wooden hut": { name: "Wooden hut", class: "woodenHut", price: 1e5, upkeep: 100, effect: 2, description: "Happiness" },
    "Cottage": { name: "Cottage", class: "cottage", price: 1e6, upkeep: 750, effect: 3.5, description: "Happiness" },
    "House": { name: "House", class: "house", price: 1e7, upkeep: 3000, effect: 6, description: "Happiness" },
    "Large house": { name: "Large house", class: "largeHouse", price: 6e7, upkeep: 2.5e4, effect: 12, description: "Happiness" },
    "Small palace": { name: "Small palace", class: "smallPalace", price: 5e8, upkeep: 3e5, effect: 25, description: "Happiness" },
    "Grand palace": { name: "Grand palace", class: "grandPalace", price: 1e10, upkeep: 5e6, effect: 60, description: "Happiness" },
}

const buyableOther = {
    //furniture
    "Book": { name: "Book", class: "book", price: 1e4, upkeep: 10, effect: 1.5, description: "Skill XP" },
    "Dumbbells": { name: "Dumbbells", class: "dumbbells", price: 4e4, upkeep: 50, effect: 1.5, description: "Strength XP" },
    "Study desk": { name: "Study desk", class: "studyDesk", price: 4e7, upkeep: 1e6, effect: 2, description: "Skill XP" },
    "Library": { name: "Library", class: "library", price: 1e9, upkeep: 1e7, effect: 1.5, description: "Skill XP" },
    //equipment
    "Steel longsword": { name: "Steel longsword", class: "steelLongsword", price: 1e5, upkeep: 1000, effect: 2, description: "Military XP" },
    "Sapphire charm": { name: "Sapphire charm", class: "sapphireCharm", price: 2.5e7, upkeep: 5e4, effect: 3, description: "Magic XP" },
    //personnel
    "Personal squire": { name: "Personal squire", class: "personalSquire", price: 0, upkeep: 200, effect: 2, description: "Job XP" },
    "Butler": { name: "Butler", class: "butler", price: 0, upkeep: 7.5e3, effect: 1.5, description: "Happiness" },
}

const baseCurrency = {
    "days": 14 * 365,
    "lifespan": 70 * 365,
    "coins": 0,
    "maxCoins": 0,
    "evil": 0,
}

const baseData = {
    "gameSpeed": 1,
    "devGameSpeed": 1,
    "evilGainMult": 1,
    "allXPMult": 1,
}

const constChangableData = {
    "baseLifespan": 70 * 365,
}

const settings = {
    primaryTheme: 0,
    secondaryTheme: 0,
    currencyNotation: 2,
    numberNotation: 1,
    coinsDisplayed: 2,
    sidebarZoom: 3,
    mainpanelZoom: 3,
    textShadow: 2,
    experimentalSettings: 0,
    hideTitle: false,
    mobile: false,
    updateSpeed: 20,
    updateSpeedSetting: 2,
    saveSpeed: 5000,

}

const requirements = {
    //Categories
    //jobs
    "commonWork": {
        job: [],
        skill: [],
    },
    "military": {
        job: [],
        skill: [{ name: "Strength", value: 5 }],
        age: 16,
        show: {
            job: [],
            skill: [{ name: "Productivity", value: 10 }]
        }
    },
    "theArcaneAssociation": {
        job: [],
        skill: [{ name: "Concentration", value: 200 }, { name: "Meditation", value: 200 }],
        age: 20,
        show: {
            job: [],
            skill: [{ name: "Concentration", value: 30 }, { name: "Productivity", value: 20 }]
        }
    },
    //skills
    "fundamentals": {
        job: [],
        skill: []
    },
    "combat": {
        job: [],
        skill: [{ name: "Productivity", value: 10 }]
    },
    "magic": {
        job: [{ name: "Student", value: 1 }],
        skill: [],
        show: {
            skill: [{ name: "Concentration", value: 200 }, { name: "Meditation", value: 200 }]
        }
    },
    "darkMagic": {
        evil: 1,
        show: {
            evil: 1
        }
    },
    //shop
    "properties": {
        coins: 0
    },
    "furniture": {
        coins: 0
    },
    "equipment": {
        coins: 1e4,
        job: [{ name: "Footman", value: 10 }],
        skill: [{ name: "Strength", value: 50 }, { name: "Battle tactics", value: 10 }],
        show: {
            coins: 1e3,
            job: [{ name: "Squire", value: 10 }],
            skill: [{ name: "Strength", value: 30 }, { name: "Battle tactics", value: 10 }],
        }
    },
    "personnel": {
        coins: 1e5,
        job: [{ name: "Veteran footman", value: 10 }],
        show: {
            coins: 1e4,
            job: [{ name: "Footman", value: 10 }],
        }
    },
    //Tasks
    //jobs
    //common work
    "beggar": {
        job: [],
        skill: []
    },
    "farmer": {
        job: [{ name: "Beggar", value: 10 }],
        skill: []
    },
    "fisherman": {
        job: [{ name: "Farmer", value: 10 }],
        skill: [],
        show: {
            job: [{ name: "Beggar", value: 10 }],
            skill: []
        }
    },
    "miner": {
        job: [{ name: "Fisherman", value: 10 }],
        skill: [],
        show: {
            job: [{ name: "Farmer", value: 10 }],
            skill: []
        }
    },
    "blacksmith": {
        job: [{ name: "Miner", value: 10 }],
        skill: [],
        show: {
            job: [{ name: "Fisherman", value: 10 }],
            skill: []
        }
    },
    "merchant": {
        job: [{ name: "Blacksmith", value: 10 }],
        skill: [{ name: "Bargaining", value: 20 }],
        show: {
            job: [{ name: "Miner", value: 10 }],
            skill: []
        }
    },
    //military
    "squire": {
        job: [],
        skill: [{ name: "Strength", value: 5 }],
        age: 16
    },
    "footman": {
        job: [{ name: "Squire", value: 10 }],
        skill: [{ name: "Strength", value: 20 }],
        age: 16
    },
    "veteranFootman": {
        job: [{ name: "Footman", value: 10 }],
        skill: [{ name: "Strength", value: 30 }, { name: "Battle tactics", value: 10 }],
        age: 16,
        show: {
            job: [{ name: "Squire", value: 10 }],
            skill: []
        }
    },
    "knight": {
        job: [{ name: "Veteran footman", value: 10 }],
        skill: [{ name: "Strength", value: 100 }, { name: "Battle tactics", value: 40 }],
        age: 16,
        show: {
            job: [{ name: "Footman", value: 10 }],
            skill: []
        }
    },
    "veteranKnight": {
        job: [{ name: "Knight", value: 10 }],
        skill: [{ name: "Strength", value: 120 }, { name: "Battle tactics", value: 150 }],
        age: 16,
        show: {
            job: [{ name: "Veteran footman", value: 10 }],
            skill: []
        }
    },
    "eliteKnight": {
        job: [{ name: "Veteran knight", value: 10 }],
        skill: [{ name: "Strength", value: 200 }, { name: "Battle tactics", value: 300 }],
        age: 16,
        show: {
            job: [{ name: "Knight", value: 10 }],
            skill: []
        }
    },
    "holyKnight": {
        job: [{ name: "Elite knight", value: 10 }],
        skill: [{ name: "Strength", value: 400 }, { name: "Battle tactics", value: 400 }, { name: "Mana control", value: 500 }],
        age: 16,
        show: {
            job: [{ name: "Veteran knight", value: 10 }],
            skill: []
        }
    },
    "legendaryKnight": {
        job: [{ name: "Holy knight", value: 10 }],
        skill: [{ name: "Strength", value: 1000 }, { name: "Battle tactics", value: 1000 }, { name: "Mana control", value: 1000 }],
        age: 16,
        show: {
            job: [{ name: "Elite knight", value: 10 }],
            skill: []
        }
    },
    //t.a.a.
    "student": {
        job: [],
        skill: [{ name: "Concentration", value: 200 }, { name: "Meditation", value: 200 }],
        age: 20
    },
    "apprenticeMage": {
        job: [{ name: "Student", value: 10 }],
        skill: [{ name: "Mana control", value: 400 }],
        show: {
            skill: [{ name: "Concentration", value: 200 }, { name: "Meditation", value: 200 }]
        }
    },
    "mage": {
        job: [{ name: "Apprentice mage", value: 10 }],
        skill: [{ name: "Mana control", value: 700 }],
        show: {
            job: [{ name: "Student", value: 10 }],
            skill: [{ name: "Mana control", value: 400 }],
        }
    },
    "wizard": {
        job: [{ name: "Mage", value: 10 }],
        skill: [{ name: "Mana control", value: 1000 }],
        show: {
            job: [{ name: "Apprentice mage", value: 10 }],
            skill: [{ name: "Mana control", value: 700 }],
        }
    },
    "masterWizard": {
        job: [{ name: "Wizard", value: 10 }],
        skill: [{ name: "Mana control", value: 1500 }],
        show: {
            job: [{ name: "Mage", value: 10 }],
            skill: [{ name: "Mana control", value: 1000 }],
        }
    },
    "chairman": {
        job: [{ name: "Master wizard", value: 10 }],
        skill: [{ name: "Mana control", value: 2000 }],
        show: {
            job: [{ name: "Wizard", value: 10 }],
            skill: [{ name: "Mana control", value: 1500 }],
        }
    },
    //skills
    //fundamentals
    "concentration": {
        job: [],
        skill: []
    },
    "productivity": {
        job: [],
        skill: [{ name: "Concentration", value: 5 }]
    },
    "bargaining": {
        job: [],
        skill: [{ name: "Concentration", value: 20 }]
    },
    "meditation": {
        job: [],
        skill: [{ name: "Concentration", value: 30 }, { name: "Productivity", value: 20 }],
        show: {
            job: [],
            skill: [{ name: "Concentration", value: 5 }]
        }
    },
    //combat
    "strength": {
        job: [],
        skill: [{ name: "Productivity", value: 10 }]
    },
    "battleTactics": {
        job: [],
        skill: [{ name: "Productivity", value: 10 }, { name: "Concentration", value: 20 }]
    },
    "muscleMemory": {
        job: [],
        skill: [{ name: "Concentration", value: 30 }, { name: "Strength", value: 30 }],
        show: {
            job: [],
            skill: [{ name: "Concentration", value: 20 }]
        }
    },
    //magic
    "manaControl": {
        job: [{ name: "Student", value: 1 }],
        skill: [{ name: "Concentration", value: 200 }, { name: "Meditation", value: 200 }],
        show: {
            skill: [{ name: "Concentration", value: 200 }, { name: "Meditation", value: 200 }]
        }
    },
    "lifeEssence": {
        job: [{ name: "Apprentice mage", value: 10 }],
        show: {
            skill: [{ name: "Mana control", value: 400 }],
            job: [{ name: "Student", value: 10 }]
        }
    },
    "timeWarping": {
        job: [{ name: "Mage", value: 10 }],
        show: {
            skill: [{ name: "Mana control", value: 700 }],
            job: [{ name: "Apprentice mage", value: 10 }]
        }
    },
    "astralBody": {
        job: [{ name: "Chairman", value: 25 }],
        show: {
            skill: [{ name: "Mana control", value: 1200 }],
            job: [{ name: "Master wizard", value: 10 }]
        }
    },
    //dark magic
    "darkInfluence": {
        evil: 1,
    },
    "evilControl": {
        evil: 1,
    },
    "intimidation": {
        evil: 1,
    },
    "demonTraining": {
        evil: 25,
    },
    "bloodMeditation": {
        evil: 75,
        show: {
            evil: 25
        }
    },
    "demonsWealth": {
        evil: 500,
        show: {
            evil: 75
        }
    },
    //shop
    //homes
    "homeless": {
        coins: -1e308
    },
    "tent": {
        coins: 1
    },
    "woodenHut": {
        coins: 1e3
    },
    "cottage": {
        coins: 1e4,
        show: {
            coins: 1e3
        }
    },
    "house": {
        coins: 1e5,
        show: {
            coins: 1e4
        }
    },
    "largeHouse": {
        coins: 1e6,
        show: {
            coins: 1e5
        }
    },
    "smallPalace": {
        coins: 1e7,
        show: {
            coins: 1e6
        }
    },
    "grandPalace": {
        coins: 1e8,
        show: {
            coins: 1e7
        }
    },
    //other
    //furniture
    "book": {
        coins: 0,
    },
    "dumbbells": {
        coins: 5e3,
        skill: [{ name: "Strength", value: 10 }],
        show: {
            skill: [{ name: "Strength", value: 1 }]
        }
    },
    "studyDesk": {
        coins: 5e6,
        skill: [{ name: "Concentration", value: 100 }],
        show: {
            coins: 5e4
        }
    },
    "library": {
        coins: 1e8,
        show: {
            coins: 1e7
        }
    },
    //equipment
    "steelLongsword": {
        coins: 2e4,
        job: [{ name: "Footman", value: 10 }],
        skill: [{ name: "Strength", value: 30 }, { name: "Battle tactics", value: 10 }],
        age: 16

    },
    "sapphireCharm": {
        coins: 5e6,
        skill: [{ name: "Mana control", value: 100 }],
        show: {
            coins: 5e6,
            skill: [{ name: "Concentration", value: 200 }, { name: "Meditation", value: 200 }],
            age: 20
        }
    },
    //personnel
    "personalSquire": {
        coins: 1e6,
        job: [{ name: "Veteran footman", value: 10 }],
        age: 16,
        show: {
            coins: 1e5,
            job: [{ name: "Veteran footman", value: 10 }],
            age: 16
        }
    },
    "butler": {
        coins: 2e7,
        show: {
            coins: 1e6
        }
    },
}

const advancements = {
    "Amulet": {
        age: 25,
        reached: false
    }
}

const tooltips = {
    "Beggar": "Struggle day and night for a couple of copper coins. It feels like you are at the brink of death each day.",
    "Farmer": "Plow the fields and grow the crops. It's not much but it's honest work.",
    "Fisherman": "Reel in various fish and sell them for a handful of coins. A relaxing but still a poor paying job.",
    "Miner": "Delve into dangerous caverns and mine valuable ores. The pay is quite meager compared to the risk involved.",
    "Blacksmith": "Smelt ores and carefully forge weapons for the military. A respectable and OK paying commoner job.",
    "Merchant": "Travel from town to town, bartering fine goods. The job pays decently well and is a lot less manually-intensive.",

    "Squire": "Carry around your knight's shield and sword along the battlefield. Very meager pay but the work experience is quite valuable.",
    "Footman": "Put down your life to battle with enemy soldiers. A courageous, respectable job but you are still worthless in the grand scheme of things.",
    "Veteran footman": "More experienced and useful than the average footman, take out the enemy forces in battle with your might. The pay is not that bad.",
    "Knight": "Slash and pierce through enemy soldiers with ease, while covered in steel from head to toe. A decently paying and very respectable job.",
    "Veteran knight": "Utilising your unmatched combat ability, slaugher enemies effortlessly. Most footmen in the military would never be able to acquire such a well paying job like this.",
    "Elite knight": "Obliterate squadrons of enemy soldiers in one go with extraordinary proficiency, while equipped with the finest gear. Such a feared unit on the battlefield is paid extremely well.",
    "Holy knight": "Collapse entire armies in mere seconds with your magically imbued blade. The handful of elite knights who attain this level of power are showered with coins.",
    "Legendary knight": "Feared worldwide, obliterate entire nations in a blink of an eye. Roughly every century, only one holy knight is worthy of receiving such an esteemed title.",

    "Student": "Study the theory of mana and practice basic spells. There is minor pay to cover living costs, however, this is a necessary stage in becoming a mage.",
    "Apprentice mage": "Under the supervision of a mage, perform basic spells against enemies in battle. Generous pay will be provided to cover living costs.",
    "Mage": "Turn the tides of battle through casting intermediate spells and mentor other apprentices. The pay for this particular job is extremely high.",
    "Wizard": "Utilise advanced spells to ravage and destroy entire legions of enemy soldiers. Only a small percentage of mages deserve to attain this role and are rewarded with an insanely high pay.",
    "Master wizard": "Blessed with unparalleled talent, perform unbelievable feats with magic at will. It is said that a master wizard has enough destructive power to wipe an empire off the map.",
    "Chairman": "Spend your days administrating The Arcane Association and investigate the concepts of true immortality. The chairman receives ludicrous amounts of pay daily.",

    "Concentration": "Improve your learning speed through practising intense concentration activities.",
    "Productivity": "Learn to procrastinate less at work and receive more job experience per day.",
    "Bargaining": "Study the tricks of the trade and persuasive skills to lower any type of expense.",
    "Meditation": "Fill your mind with peace and tranquility to tap into greater happiness from within.",

    "Strength": "Condition your body and strength through harsh training. Stronger individuals are paid more in the military.",
    "Battle tactics": "Create and revise battle strategies, improving experience gained in the military.",
    "Muscle memory": "Strengthen your neurons through habit and repetition, improving strength gains throughout the body.",

    "Mana control": "Strengthen your mana channels throughout your body, aiding you in becoming a more powerful magical user.",
    "Life essence": "Lengthen your lifespan through the means of magic. However, is this truly the immortality you have tried seeking for...?",
    "Time warping": "Bend space and time through forbidden techniques, resulting in a faster gamespeed.",
    "Astral body": "Through harnessing ancient, forbidden techniques, lengthen your lifespan drastically beyond comprehension.",

    "Dark influence": "Encompass yourself with formidable power bestowed upon you by evil, allowing you to pick up and absorb any job or skill with ease.",
    "Evil control": "Tame the raging and growing evil within you, improving evil gain in-between rebirths.",
    "Intimidation": "Learn to emit a devilish aura which strikes extreme fear into other merchants, forcing them to give you heavy discounts.",
    "Demon training": "A mere human body is too feeble and weak to withstand evil. Train with forbidden methods to slowly manifest into a demon, capable of absorbing knowledge rapidly.",
    "Blood meditation": "Grow and culture the evil within you through the sacrifise of other living beings, drastically increasing evil gain.",
    "Demon's wealth": "Through the means of dark magic, multiply the raw matter of the coins you receive from your job.",

    "Homeless": "Sleep on the uncomfortable, filthy streets while almost freezing to death every night. It cannot get any worse than this.",
    "Tent": "A thin sheet of tattered cloth held up by a couple of feeble, wooden sticks. Horrible living conditions but at least you have a roof over your head.",
    "Wooden hut": "Shabby logs and dirty hay glued together with horse manure. Much more sturdy than a tent, however, the stench isn't very pleasant.",
    "Cottage": "Structured with a timber frame and a thatched roof. Provides decent living conditions for a fair price.",
    "House": "A building formed from stone bricks and sturdy timber, which contains a few rooms. Although quite expensive, it is a comfortable abode.",
    "Large house": "Much larger than a regular house, which boasts even more rooms and multiple floors. The building is quite spacious but comes with a hefty price tag.",
    "Small palace": "A very rich and meticulously built structure rimmed with fine metals such as silver. Extremely high expenses to maintain for a lavish lifestyle.",
    "Grand palace": "A grand residence completely composed of gold and silver. Provides the utmost luxurious and comfortable living conditions possible for a ludicrous price.",

    "Book": "A place to write down all your thoughts and discoveries, allowing you to learn a lot more quickly.",
    "Dumbbells": "Heavy tools used in strenuous exercise to toughen up and accumulate strength even faster than before. ",
    "Personal squire": "Assists you in completing day to day activities, giving you more time to be productive at work.",
    "Steel longsword": "A fine blade used to slay enemies even quicker in combat and therefore gain more experience.",
    "Butler": "Keeps your household clean at all times and also prepares three delicious meals per day, leaving you in a happier, stress-free mood.",
    "Sapphire charm": "Embedded with a rare sapphire, this charm activates more mana channels within your body, providing a much easier time learning magic.",
    "Study desk": "A dedicated area which provides many fine stationary and equipment designed for furthering your progress in research.",
    "Library": "Stores a collection of books, each containing vast amounts of information from basic life skills to complex magic spells.",
}

var data = { //formerly gameData
    //player
    coins: 0,
    days: 365 * 14,
    lifespan: 365 * 60,
    currentRealtime: 0,
    happiness: 1,
    evil: 0,
    storedOfflineTime: 0,
    advancements: {},

    selectedTab: "default tab set in main.js",
    selectedSettings: null,
    baseLifespan: 365 * 70,
    baseGameSpeed: 4,
    paused: true,
    autopromote: false,
    autoskill: false,
    maxJobs: 1,
    maxSkills: 1,
    jobXPMult: 1,
    incomeMult: 1,
    skillXPMult: 1,
    expenseMult: 1,
    selectedJobs: [],
    selectedSkills: [],
    selectedHome: "Homeless",

    lastUpdate: new Date().getTime(),
    updateTimeDiff: 100,
    settings: {},
    stats: {
        startDate: new Date(),
        totalDays: 0,
        realtime: 0,
        highestDays: 365 * 14,
    },
    job: {},
    skill: {},
    specialTask: {},
    category: {
        job: {},
        skill: {}
    },
    buyable: {
        home: {},
        other: {}
    }
}

function assignBaseTasks() {
    if (!(advancements in data)) data.advancements = {}
    for (const jobName in jobs) {
        if (!(jobName in data.job)) {
            data.job[jobName] = jobs[jobName]
        }
    }
    for (const skillName in skills) {
        if (!(skillName in data.skill)) {
            data.skill[skillName] = skills[skillName]
        }
    }
    for (const taskName in specialTasks) {
        if (!(taskName in data.specialTask)) {
            data.specialTask[taskName] = specialTasks[taskName]
        }
    }
    for (const category in jobCategories) {
        if (!(category in data.category.job)) {
            data.category.job[category] = { name: jobCategories[category].nameFull, xpMult: 1, incomeMult: 1 }
        }
    }
    for (const category in skillCategories) {
        if (!(category in data.category.skill)) {
            data.category.skill[category] = { name: skillCategories[category].nameFull, xpMult: 1, effectMult: 1 }
        }
    }
    for (const buyable in buyableHomes) {
        if (!(buyable in data.buyable.home)) {
            data.buyable.home[buyable] = buyableHomes[buyable]
        }
    }
    for (const buyable in buyableOther) {
        if (!(buyable in data.buyable.other)) {
            data.buyable.other[buyable] = buyableOther[buyable]
        }
    }
    for (const setting in settings) {
        if (!(setting in data.settings)) {
            data.settings[setting] = settings[setting]
        }
    }
    for (const currency in baseCurrency) {
        if (!(currency in data)) {
            data[currency] = baseCurrency[currency]
        }
    }
    for (const key in baseData) {
        if (!(key in data)) {
            data[key] = baseData[key]
        }
    }
    for (const key in constChangableData) data[key] = constChangableData[key]
    for (const adv in advancements) data.advancements[adv] = advancements[adv]
    for (const key in data.job) {
        const task = data.job[key]
        if (!("xp" in task)) {
            task.xp = 0
            task.maxXP = task.baseMaxXP
            task.level = 0
            task.maxLevel = 0
            task.xpMult = 1
            task.incomeMult = 1
        }
        if (!("xpFormula" in task)) {
            task.xpFormula = "normalJob"
        }
        if (!("incomeFormula" in task)) {
            task.incomeFormula = "normal"
        }
        if (!("description" in task)) {
            task.description = "Income"
        }
        task.baseMaxXP = jobs[key].baseMaxXP
        task.income = jobs[key].income
        if (jobs[key].incomeFormula) task.incomeFormula = jobs[key].incomeFormula
        if (jobs[key].xpFormula) task.xpFormula = jobs[key].xpFormula
    }
    for (const key in data.skill) {
        const task = data.skill[key]
        if (!("xp" in task)) {
            task.xp = 0
            task.maxXP = task.baseMaxXP
            task.level = 0
            task.maxLevel = 0
            task.xpMult = 1
            task.effectMult = 1
        }
        if (!("xpFormula" in task)) {
            task.xpFormula = "normalSkill"
        }
        if (!("effectFormula" in task)) {
            task.effectFormula = "normal"
        }
        task.baseMaxXP = skills[key].baseMaxXP
        task.effect = skills[key].effect
        if (skills[key].effectFormula) task.effectFormula = skills[key].effectFormula
        if (skills[key].xpFormula) task.xpFormula = skills[key].xpFormula
    }
    for (const key in data.buyable.home) {
        const home = data.buyable.home[key]
        if (!("owned" in home)) {
            home.owned = false
        }
        home.price = buyableHomes[key].price
        home.upkeep = buyableHomes[key].upkeep
        home.class = buyableHomes[key].class //temp
    }
    for (const key in data.buyable.other) {
        const buyable = data.buyable.other[key]
        if (!("owned" in buyable)) {
            buyable.owned = false
        }
        if (!("owned" in buyable)) {
            console.log(key)
            buyable.owned = false
        }
        buyable.price = buyableOther[key].price
        buyable.upkeep = buyableOther[key].upkeep
        buyable.class = buyableOther[key].class //temp
    }
}
