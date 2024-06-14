var data = { //formerly gameData
    //player
    coins: 0,
    days: 365 * 14,
    lifespan: 365 * 60,
    currentRealtime: 0,
    happiness: 1,
    evil: 0,
    storedOfflineTime: 0,

    selectedTab: "default tab set in main.js",
    selectedSettings: null,
    baseLifespan: 365 * 60,
    baseGameSpeed: 4,
    paused: true,
    autopromote: false,
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
    settings: {
        primaryTheme: 0,
        secondaryTheme: 0,
        currencyNotation: 0,
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
    },
    stats: {
        startDate: new Date(),
        totalDays: 0,
        realtime: 0,
        highestDays: 365 * 14,
    },
    job: {
        "Beggar": { name: "Beggar", class: "beggar", xp: 0, maxXp: 50, baseMaxXp: 50, level: 0, maxLevel: 0, income: 5 },
        "Farmer": { name: "Farmer", class: "farmer", xp: 0, maxXp: 100, baseMaxXp: 100, level: 0, maxLevel: 0, income: 9 },
        "Fisherman": { name: "Fisherman", class: "fisherman", xp: 0, maxXp: 200, baseMaxXp: 200, level: 0, maxLevel: 0, income: 15 },
        "Miner": { name: "Miner", class: "miner", xp: 0, maxXp: 400, baseMaxXp: 400, level: 0, maxLevel: 0, income: 40 },
        "Blacksmith": { name: "Blacksmith", class: "blacksmith", xp: 0, maxXp: 800, baseMaxXp: 800, level: 0, maxLevel: 0, income: 80 },
        "Merchant": { name: "Merchant", class: "merchant", xp: 0, maxXp: 1600, baseMaxXp: 1600, level: 0, maxLevel: 0, income: 150 },

        "Squire": { name: "Squire", class: "squire", xp: 0, maxXp: 100, baseMaxXp: 100, level: 0, maxLevel: 0, income: 5 },
        "Footman": { name: "Footman", class: "footman", xp: 0, maxXp: 1000, baseMaxXp: 1000, level: 0, maxLevel: 0, income: 50 },
        "Veteran footman": { name: "Veteran footman", class: "veteranFootman", xp: 0, maxXp: 10000, baseMaxXp: 10000, level: 0, maxLevel: 0, income: 120 },
        "Knight": { name: "Knight", class: "knight", xp: 0, maxXp: 1e5, baseMaxXp: 1e5, level: 0, maxLevel: 0, income: 300 },
        "Veteran knight": { name: "Veteran knight", class: "veteranKnight", xp: 0, maxXp: 1e6, baseMaxXp: 1e6, level: 0, maxLevel: 0, income: 1000 },
        "Elite knight": { name: "Elite knight", class: "eliteKnight", xp: 0, maxXp: 7.5e6, baseMaxXp: 7.5e6, level: 0, maxLevel: 0, income: 3000 },
        "Holy knight": { name: "Holy knight", class: "holyKnight", xp: 0, maxXp: 4e7, baseMaxXp: 4e7, level: 0, maxLevel: 0, income: 15000 },
        "Legendary knight": { name: "Legendary knight", class: "legendaryKnight", xp: 0, maxXp: 1.5e8, baseMaxXp: 1.5e8, level: 0, maxLevel: 0, income: 50000 },

        "Student": { name: "Student", class: "student", xp: 0, maxXp: 50, baseMaxXp: 50, level: 0, maxLevel: 0, income: 5 },
    },
    skill: {
        "Concentration": { name: "Concentration", class: "concentration", xp: 0, maxXp: 100, baseMaxXp: 100, level: 0, maxLevel: 0, effect: 0.01, description: "Skill XP" },
        "Productivity": { name: "Productivity", class: "productivity", xp: 0, maxXp: 100, baseMaxXp: 100, level: 0, maxLevel: 0, effect: 0.01, description: "Job XP" },
        "Bargaining": { name: "Bargaining", class: "bargaining", xp: 0, maxXp: 100, baseMaxXp: 100, level: 0, maxLevel: 0, effect: -0.01, effectFormula: "reductive", description: "Expenses" },
        "Meditation": { name: "Meditation", class: "meditation", xp: 0, maxXp: 100, baseMaxXp: 100, level: 0, maxLevel: 0, effect: 0.01, description: "Happiness" },
        
        "Strength": { name: "Strength", class: "strength", xp: 0, maxXp: 100, baseMaxXp: 100, level: 0, maxLevel: 0, effect: 0.01, description: "Military Income" },
        "Battle tactics": { name: "Battle tactics", class: "battleTactics", xp: 0, maxXp: 100, baseMaxXp: 100, level: 0, maxLevel: 0, effect: 0.01, description: "Military XP" },
        "Muscle memory": { name: "Muscle memory", class: "muscleMemory", xp: 0, maxXp: 100, baseMaxXp: 100, level: 0, maxLevel: 0, effect: 0.01, description: "Strength XP" },

        "Mana control": { name: "Mana control", class: "manaControl", xp: 0, maxXp: 100, baseMaxXp: 100, level: 0, maxLevel: 0, effect: 0.01, description: "T.A.A XP" },
    },
    specialTask: {
        "Offline time": { name: "Offline time", class: "offlineTime", xpMult: 0, xp: 0, maxXp: 100, baseMaxXp: 100, level: 0, maxLevel: 0, effect: 0, xpFormula: "offlineTime" },
    },
    category: {
        job: {
            "Common work": { name: "Common work", xpMult: 1, incomeMult: 1 },
            "Military": { name: "Military", xpMult: 1, incomeMult: 1 },
            "T.A.A": { name: "The Arcane Association", xpMult: 1, incomeMult: 1 },
        },
        skill: {
            "Fundamentals": { name: "Fundamentals", xpMult: 1 },
            "Combat": { name: "Combat", xpMult: 1 },
            "Magic": { name: "Magic", xpMult: 1 },
            "Dark magic": { name: "Dark magic", xpMult: 1 }
        }
    },
    buyable: {
        home: {
            //properties
            "Homeless": { name: "Homeless", owned: true, price: 0, upkeep: 0, effect: 1, description: "Happiness" },
            "Tent": { name: "Tent", owned: false, price: 0, upkeep: 15, effect: 1.4, description: "Happiness" },
            "Wooden hut": { name: "Wooden hut", owned: false, price: 0, upkeep: 100, effect: 2, description: "Happiness" },
            "Cottage": { name: "Cottage", owned: false, price: 0, upkeep: 750, effect: 3.5, description: "Happiness" },
            "House": { name: "House", owned: false, price: 0, upkeep: 3000, effect: 6, description: "Happiness" },
            "Large house": { name: "Large house", owned: false, price: 0, upkeep: 25000, effect: 12, description: "Happiness" },
            "Small palace": { name: "Small palace", owned: false, price: 0, upkeep: 300000, effect: 25, description: "Happiness" },
            "Grand palace": { name: "Grand palace", owned: false, price: 0, upkeep: 5000000, effect: 60, description: "Happiness" },
        },
        normal: {
            //items
            "Book": { name: "Book", owned: false, price: 10, upkeep: 0, effect: 1.5, description: "Skill XP" },
            "Dumbbells": { name: "Dumbbells", owned: false, price: 50, upkeep: 0, effect: 1.5, description: "Strength XP" },
            "Steel longsword": { name: "Steel longsword", owned: false, price: 1000, upkeep: 0, effect: 2, description: "Military XP" },
            "Sapphire charm": { name: "Sapphire charm", owned: false, price: 50000, upkeep: 0, effect: 3, description: "Magic XP" },
            "Study desk": { name: "Study desk", owned: false, price: 1000000, upkeep: 0, effect: 2, description: "Skill XP" },
            "Library": { name: "Library", owned: false, price: 10000000, upkeep: 0, effect: 1.5, description: "Skill XP" },
            //helpers
            "Personal squire": { name: "Personal squire", owned: false, price: 200, upkeep: 0, effect: 2, description: "Job XP" },
            "Butler": { name: "Butler", owned: false, price: 7500, upkeep: 0, effect: 1.5, description: "Happiness" },
        }
    }
}


function assignBaseTaskFormula() {
    for (jobName in data.job) {
        const task = data.job[jobName]
        if (!task.hasOwnProperty("xpFormula")) {
            task.xpFormula = "normalJob"
        }
        if (!task.hasOwnProperty("incomeFormula")) {
            task.incomeFormula = "normal"
        }
        if (!task.hasOwnProperty("description")) {
            task.description = "Income"
        }
        if (!task.hasOwnProperty("incomeMult")) {
            task.incomeMult = 1
        }
        if (!task.hasOwnProperty("xpMult")) {
            task.xpMult = 1
        }
    }
    for (skillName in data.skill) {
        const task = data.skill[skillName]
        if (!task.hasOwnProperty("xpFormula")) {
            task.xpFormula = "normalSkill"
        }
        if (!task.hasOwnProperty("effectFormula")) {
            task.effectFormula = "normal"
        }
        if (!task.hasOwnProperty("effectMult")) {
            task.effectMult = 1
        }
        if (!task.hasOwnProperty("xpMult")) {
            task.xpMult = 1
        }
    }
}

assignBaseTaskFormula()

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
    "The Arcane Association": {
        jobs: ["Student"],
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
        skills: ["Mana control"],
        name: "magic",
        nameFull: "Magic"
    },
    "Dark magic": {
        skills: [],
        name: "darkMagic",
        nameFull: "Dark magic"
    }
};


const itemCategories = {
    "Properties": ["Homeless", "Tent", "Wooden hut", "Cottage", "House", "Large house", "Small palace", "Grand palace"],
    "Misc": ["Book", "Dumbbells", "Personal squire", "Steel longsword", "Butler", "Sapphire charm", "Study desk", "Library"]
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
        skill: [{ name: "Productivity", value: 10}]
    },
    "magic": {
        job: [{ name: "Student", value: 1}],
        skill: [],
        show: {
            job: [{ name: "Student", value: 1}],
            skill: []
        }
    },
    "darkMagic": {
        job: [],
        skill: [],
        evil: 1,
        show: {
            job: [],
            skill: [],
            evil: 1
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
        skill: [{ name: "Strength", value: 5 }]
    },
    "footman": {
        job: [{ name: "Squire", value: 10 }],
        skill: [{ name: "Strength", value: 20 }]
    },
    "veteranFootman": {
        job: [{ name: "Footman", value: 10 }],
        skill: [{ name: "Strength", value: 30 }, { name: "Battle tactics", value: 10 }],
        show: {
            job: [{ name: "Footman", value: 1 }],
            skill: []
        }
    },
    "knight": {
        job: [{ name: "Veteran footman", value: 10 }],
        skill: [{ name: "Strength", value: 100 }, { name: "Battle tactics", value: 40 }],
        show: {
            job: [{ name: "Veteran footman", value: 1 }],
            skill: []
        }
    },
    "veteranKnight": {
        job: [{ name: "Knight", value: 10 }],
        skill: [{ name: "Strength", value: 120 }, { name: "Battle tactics", value: 150 }],
        show: {
            job: [{ name: "Knight", value: 1 }],
            skill: []
        }
    },
    "eliteKnight": {
        job: [{ name: "Veteran knight", value: 10 }],
        skill: [{ name: "Strength", value: 200 }, { name: "Battle tactics", value: 300 }],
        show: {
            job: [{ name: "Veteran knight", value: 1 }],
            skill: []
        }
    },
    "holyKnight": {
        job: [{ name: "Elite knight", value: 10 }],
        skill: [{ name: "Strength", value: 400 }, { name: "Battle tactics", value: 400 }, { name: "Mana control", value: 500 }],
        show: {
            job: [{ name: "Elite knight", value: 1 }],
            skill: []
        }
    },
    "legendaryKnight": {
        job: [{ name: "Holy knight", value: 10 }],
        skill: [{ name: "Strength", value: 1000 }, { name: "Battle tactics", value: 1000 }, { name: "Mana control", value: 1000 }],
        show: {
            job: [{ name: "Holy knight", value: 1 }],
            skill: []
        }
    },
    //t.a.a.
    "student": {
        job: [],
        skill: [{ name: "Concentration", value: 200 }, { name: "Meditation", value: 200 }]
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
        skill: []
    },
    "battleTactics": {
        job: [],
        skill: [{ name: "Concentration", value: 20 }]
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
        skill: []
    },

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
    "Immortality": "Lengthen your lifespan through the means of magic. However, is this truly the immortality you have tried seeking for...?",
    "Time warping": "Bend space and time through forbidden techniques, resulting in a faster gamespeed.",
    "Super immortality": "Through harnessing ancient, forbidden techniques, lengthen your lifespan drastically beyond comprehension.",

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