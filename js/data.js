var data = { //formerly gameData
    //player
    coins: 0,
    days: 365 * 14,
    lifespan: 365 * 60,
    currentRealtime: 0,
    happiness: 1,
    evil: 0,
    
    selectedTab: "default tab set in main.js",
    selectedSettings: null,
    baseLifespan: 365 * 60,
    baseGameSpeed: 4,
    paused: false,
    maxJobs: 1,
    maxSkills: 1,
    jobXpMult: 1,
    skillXpMult: 1,
    selectedJobs: [],
    selectedSkills: [],
    selectedHome: { name: "Homeless", owned: true, price: 0, rent: 0, effect: 1 },
    settings: {
        theme: 0,
        currencyNotation: 0,
        numberNotation: 1,
        coinsDisplayed: 2,
        layout: 1,
        fontSize: 3,
        enableKeybinds: false,
        updateSpeed: 20, //use baseGameSpeed
        saveSpeed: 5000,
    },
    stats: {
        startDate: new Date(),
        totalDays: 0,
        realtime: 0,
        highestDays: 365 * 14,
    },
    job: {
        "Beggar": { name: "Beggar", class: "beggar", xpMult: 1, xp: 0, maxXp: 50, baseMaxXp: 50, level: 1, maxLevel:1, income: 5 },
        "Farmer": { name: "Farmer", class: "farmer", xpMult: 1, xp: 0, maxXp: 100, baseMaxXp: 100, level: 1, maxLevel:1, income: 9, incomeFormula: "less penalty" },
        "Fisherman": { name: "Fisherman", class: "fisherman", xpMult: 1, xp: 0, maxXp: 200, baseMaxXp: 200, level: 1, maxLevel:1, income: 15 },
        "Miner": { name: "Miner", class: "miner", xpMult: 1, xp: 0, maxXp: 400, baseMaxXp: 400, level: 1, maxLevel:1, income: 40 },
        "Blacksmith": { name: "Blacksmith", class: "blacksmith", xpMult: 1, xp: 0, maxXp: 800, baseMaxXp: 800, level: 1, maxLevel:1, income: 80 },
        "Merchant": { name: "Merchant", class: "merchant", xpMult: 1, xp: 0, maxXp: 1600, baseMaxXp: 1600, level: 1, maxLevel:1, income: 150 },

        "Squire": { name: "Squire", class: "squire", xpMult: 1, xp: 0, maxXp: 100, baseMaxXp: 100, level: 1, maxLevel:1, income: 5 },
        "Footman": { name: "Footman", class: "footman", xpMult: 1, xp: 0, maxXp: 1000, baseMaxXp: 1000, level: 1, maxLevel:1, income: 50 },
        "Veteran footman": { name: "Veteran footman", class: "veteranFootman", xpMult: 1, xp: 0, maxXp: 10000, baseMaxXp: 10000, level: 1, maxLevel:1, income: 120 },
        "Knight": { name: "Knight", class: "knight", xpMult: 1, xp: 0, maxXp: 1e5, baseMaxXp: 1e5, level: 1, maxLevel:1, income: 300 },
        "Veteran knight": { name: "Veteran knight", class: "veteranKnight", xpMult: 1, xp: 0, maxXp: 1e6, baseMaxXp: 1e6, level: 1, maxLevel:1, income: 1000 },
        "Elite knight": { name: "Elite knight", class: "eliteKnight", xpMult: 1, xp: 0, maxXp: 7.5e6, baseMaxXp: 7.5e6, level: 1, maxLevel:1, income: 3000 },
        "Holy knight": { name: "Holy knight", class: "holyKnight", xpMult: 1, xp: 0, maxXp: 4e7, baseMaxXp: 4e7, level: 1, maxLevel:1, income: 15000 },
        "Legendary knight": { name: "Legendary knight", class: "legendaryKnight", xpMult: 1, xp: 0, maxXp: 1.5e8, baseMaxXp: 1.5e8, level: 1, maxLevel:1, income: 50000 },
    },
    skill: {
        "Concentration": { name: "Concentration", class: "concentration", xpMult: 1, xp: 0, maxXp: 100, baseMaxXp: 100, level: 1, maxLevel:1, effect: 0.01, description: "Skill xp" },
        "Productivity": { name: "Productivity", class: "productivity", xpMult: 1, xp: 0, maxXp: 100, baseMaxXp: 100, level: 1, maxLevel:1, effect: 0.01, description: "Job xp" },
        "Bargaining": { name: "Bargaining", class: "bargaining", xpMult: 1, xp: 0, maxXp: 100, baseMaxXp: 100, level: 1, maxLevel:1, effect: -0.01, description: "Expenses" },
        "Meditation": { name: "Meditation", class: "meditation", xpMult: 1, xp: 0, maxXp: 100, baseMaxXp: 100, level: 1, maxLevel:1, effect: 0.01, description: "Happiness" },
    },
    home: {
        "Homeless": { name: "Homeless", owned: true, price: 0, rent: 0, effect: 1 },
        "Tent": { name: "Tent", owned: false, price: 0, rent: 15, effect: 1.4 },
        "Wooden hut": { name: "Wooden hut", owned: false, price: 0, rent: 100, effect: 2 },
        "Cottage": { name: "Cottage", owned: false, price: 0, rent: 750, effect: 3.5 },
        "House": { name: "House", owned: false, price: 0, rent: 3000, effect: 6 },
        "Large house": { name: "Large house", owned: false, price: 0, rent: 25000, effect: 12 },
        "Small palace": { name: "Small palace", owned: false, price: 0, rent: 300000, effect: 25 },
        "Grand palace": { name: "Grand palace", owned: false, price: 0, rent: 5000000, effect: 60 },
    },
    item: {
        "Book": { name: "Book", owned: false, price: 10, upkeep: 0, effect: 1.5, description: "Skill xp" },
        "Dumbbells": { name: "Dumbbells", owned: false, price: 50, upkeep: 0, effect: 1.5, description: "Strength xp" },
        "Personal squire": { name: "Personal squire", owned: false, price: 200, upkeep: 0, effect: 2, description: "Job xp" },
        "Steel longsword": { name: "Steel longsword", owned: false, price: 1000, upkeep: 0, effect: 2, description: "Military xp" },
        "Butler": { name: "Butler", owned: false, price: 7500, upkeep: 0, effect: 1.5, description: "Happiness" },
        "Sapphire charm": { name: "Sapphire charm", owned: false, price: 50000, upkeep: 0, effect: 3, description: "Magic xp" },
        "Study desk": { name: "Study desk", owned: false, price: 1000000, upkeep: 0, effect: 2, description: "Skill xp" },
        "Library": { name: "Library", owned: false, price: 10000000, upkeep: 0, effect: 1.5, description: "Skill xp" },
    }
}

function assignBaseTaskFormula() {
    jobArray = Object.values(data.job)
    for (i = 0; i < jobArray.length; i++) {
        if (!jobArray[i].hasOwnProperty("xpFormula")) {
            jobName = jobArray[i].name
            data.job[jobName].xpFormula = "normal"
        }
    }
    for (i = 0; i < jobArray.length; i++) {
        if (!jobArray[i].hasOwnProperty("incomeFormula")) {
            jobName = jobArray[i].name
            data.job[jobName].incomeFormula = "normal"
        }
    }
    skillArray = Object.values(data.skill)
    for (i = 0; i < skillArray.length; i++) {
        if (!skillArray[i].hasOwnProperty("xpFormula")) {
            skillName = skillArray[i].name
            data.skill[skillName].xpFormula = "normal"
        }
    }
    for (i = 0; i < skillArray.length; i++) {
        if (!skillArray[i].hasOwnProperty("effectFormula")) {
            skillName = skillArray[i].name
            data.skill[skillName].effectFormula = "normal"
        }
    }
}

assignBaseTaskFormula()
/*
const jobBaseData = {
    "Beggar": { name: "Beggar", maxXp: 50, income: 5 },
    "Farmer": { name: "Farmer", maxXp: 100, income: 9 },
    "Fisherman": { name: "Fisherman", maxXp: 200, income: 15 },
    "Miner": { name: "Miner", maxXp: 400, income: 40 },
    "Blacksmith": { name: "Blacksmith", maxXp: 800, income: 80 },
    "Merchant": { name: "Merchant", maxXp: 1600, income: 150 },

    "Squire": { name: "Squire", maxXp: 100, income: 5 },
    "Footman": { name: "Footman", maxXp: 1000, income: 50 },
    "Veteran footman": { name: "Veteran footman", maxXp: 10000, income: 120 },
    "Knight": { name: "Knight", maxXp: 100000, income: 300 },
    "Veteran knight": { name: "Veteran knight", maxXp: 1000000, income: 1000 },
    "Elite knight": { name: "Elite knight", maxXp: 7500000, income: 3000 },
    "Holy knight": { name: "Holy knight", maxXp: 40000000, income: 15000 },
    "Legendary knight": { name: "Legendary knight", maxXp: 150000000, income: 50000 },

    "Student": { name: "Student", maxXp: 100000, income: 100 },
    "Apprentice mage": { name: "Apprentice mage", maxXp: 1000000, income: 1000 },
    "Mage": { name: "Mage", maxXp: 10000000, income: 7500 },
    "Wizard": { name: "Wizard", maxXp: 100000000, income: 50000 },
    "Master wizard": { name: "Master wizard", maxXp: 10000000000, income: 250000 },
    "Chairman": { name: "Chairman", maxXp: 1000000000000, income: 1000000 },
}

const skillBaseData = {
    "Concentration": { name: "Concentration", maxXp: 100, effect: 0.01, description: "Skill xp" },
    "Productivity": { name: "Productivity", maxXp: 100, effect: 0.01, description: "Job xp" },
    "Bargaining": { name: "Bargaining", maxXp: 100, effect: -0.01, description: "Expenses" },
    "Meditation": { name: "Meditation", maxXp: 100, effect: 0.01, description: "Happiness" },

    "Strength": { name: "Strength", maxXp: 100, effect: 0.01, description: "Military pay" },
    "Battle tactics": { name: "Battle tactics", maxXp: 100, effect: 0.01, description: "Military xp" },
    "Muscle memory": { name: "Muscle memory", maxXp: 100, effect: 0.01, description: "Strength xp" },

    "Mana control": { name: "Mana control", maxXp: 100, effect: 0.01, description: "T.A.A. xp" },
    "Immortality": { name: "Immortality", maxXp: 100, effect: 0.01, description: "Longer lifespan" },
    "Time warping": { name: "Time warping", maxXp: 100, effect: 0.01, description: "Gamespeed" },
    "Super immortality": { name: "Super immortality", maxXp: 100, effect: 0.01, description: "Longer lifespan" },

    "Dark influence": { name: "Dark influence", maxXp: 100, effect: 0.01, description: "All xp" },
    "Evil control": { name: "Evil control", maxXp: 100, effect: 0.01, description: "Evil gain" },
    "Intimidation": { name: "Intimidation", maxXp: 100, effect: -0.01, description: "Expenses" },
    "Demon training": { name: "Demon training", maxXp: 100, effect: 0.01, description: "All xp" },
    "Blood meditation": { name: "Blood meditation", maxXp: 100, effect: 0.01, description: "Evil gain" },
    "Demon's wealth": { name: "Demon's wealth", maxXp: 100, effect: 0.002, description: "Job pay" },

}

const itemBaseData = {
    "Homeless": { name: "Homeless", expense: 0, effect: 1 },
    "Tent": { name: "Tent", expense: 15, effect: 1.4 },
    "Wooden hut": { name: "Wooden hut", expense: 100, effect: 2 },
    "Cottage": { name: "Cottage", expense: 750, effect: 3.5 },
    "House": { name: "House", expense: 3000, effect: 6 },
    "Large house": { name: "Large house", expense: 25000, effect: 12 },
    "Small palace": { name: "Small palace", expense: 300000, effect: 25 },
    "Grand palace": { name: "Grand palace", expense: 5000000, effect: 60 },

    "Book": { name: "Book", expense: 10, effect: 1.5, description: "Skill xp" },
    "Dumbbells": { name: "Dumbbells", expense: 50, effect: 1.5, description: "Strength xp" },
    "Personal squire": { name: "Personal squire", expense: 200, effect: 2, description: "Job xp" },
    "Steel longsword": { name: "Steel longsword", expense: 1000, effect: 2, description: "Military xp" },
    "Butler": { name: "Butler", expense: 7500, effect: 1.5, description: "Happiness" },
    "Sapphire charm": { name: "Sapphire charm", expense: 50000, effect: 3, description: "Magic xp" },
    "Study desk": { name: "Study desk", expense: 1000000, effect: 2, description: "Skill xp" },
    "Library": { name: "Library", expense: 10000000, effect: 1.5, description: "Skill xp" },
}
*/
const jobCategories = {
    "Common work": {
        jobs: ["Beggar", "Farmer", "Fisherman", "Miner", "Blacksmith", "Merchant"],
        name: "commonWork"
    },
    "Military": {
        jobs: ["Squire", "Footman", "Veteran footman", "Knight", "Veteran knight", "Elite knight", "Holy knight", "Legendary knight"],
        name: "military"
    },
    "The Arcane Association": {
        jobs: ["Student", "Apprentice mage", "Mage", "Wizard", "Master wizard", "Chairman"],
        name: "theArcaneAssociation"
    }
}

const skillCategories = {
    "Fundamentals": ["Concentration", "Productivity", "Bargaining", "Meditation"],
    "Combat": ["Strength", "Battle tactics", "Muscle memory"],
    "Magic": ["Mana control", "Immortality", "Time warping", "Super immortality"],
    "Dark magic": ["Dark influence", "Evil control", "Intimidation", "Demon training", "Blood meditation", "Demon's wealth"]
}

const itemCategories = {
    "Properties": ["Homeless", "Tent", "Wooden hut", "Cottage", "House", "Large house", "Small palace", "Grand palace"],
    "Misc": ["Book", "Dumbbells", "Personal squire", "Steel longsword", "Butler", "Sapphire charm", "Study desk", "Library"]
}

const headerRowColors = {
    "Common work": "#55a630",
    "Military": "#e63946",
    "The Arcane Association": "#C71585",
    "Fundamentals": "#4a4e69",
    "Combat": "#ff704d",
    "Magic": "#875F9A",
    "Dark magic": "#73000f",
    "Properties": "#219ebc",
    "Misc": "#b56576",
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