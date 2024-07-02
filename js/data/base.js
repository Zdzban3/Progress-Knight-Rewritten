const jobCategories = {
    "Common work": {
        jobs: ["Beggar", "Farmer", "Fisherman", "Miller", "Lumberjack", "Miner"],
        name: "commonWork",
        nameFull: "Common Work"
    },
    "Carpenters Guild": {
        jobs: ["Novice carpenter", "Apprentice carpenter", "Journeyman carpenter", "Master carpenter"],
        name: "carpentersGuild",
        nameFull: "Carpenters Guild"
    },
    "Blacksmithers Guild": {
        jobs: ["Novice blacksmith", "Apprentice blacksmith", "Journeyman blacksmith", "Master blacksmith"],
        name: "blacksmithersGuild",
        nameFull: "Blacksmithers Guild"
    },
    "Merchants Guild": {
        jobs: ["Novice merchant", "Apprentice merchant", "Journeyman merchant", "Master merchant", "Guild leader"],
        name: "merchantsGuild",
        nameFull: "Merchants Guild"
    },
    "Military": {
        jobs: ["Squire", "Footman", "Veteran footman", "Knight", "Veteran knight", "Elite knight", "Holy knight", "Legendary knight"],
        name: "military",
        nameFull: "Military"
    },
    "The Arcane Association": {
        jobs: ["Student", "Apprentice mage", "Mage", "Wizard", "Master wizard", "Chairman"],
        name: "theArcaneAssociation",
        nameFull: "The Arcane Association",
        altName: "T.A.A"
    }
}

const skillCategories = {
    "Fundamentals": {
        skills: ["Concentration", "Productivity", "Meditation", "Bargaining", "Leadership"],
        name: "fundamentals",
        nameFull: "Fundamentals"
    },
    "Craftsmanship": {
        skills: ["Woodworking", "Metalworking"],
        name: "craftsmanship",
        nameFull: "Craftsmanship"
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
}

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
        items: ["Basic clothing", "Steel longsword", "Sapphire charm"],
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
    "Beggar": { name: "Beggar", class: "beggar", baseMaxXP: 30, income: 5 },
    "Farmer": { name: "Farmer", class: "farmer", baseMaxXP: 100, income: 9 },
    "Fisherman": { name: "Fisherman", class: "fisherman", baseMaxXP: 200, income: 14 },
    "Miller": { name: "Miller", class: "miller", baseMaxXP: 300, income: 25 },
    "Lumberjack": { name: "Lumberjack", class: "lumberjack", baseMaxXP: 500, income: 36 },
    "Miner": { name: "Miner", class: "miner", baseMaxXP: 800, income: 48 },
    //Carpenters guild
    "Novice carpenter": { name: "Novice carpenter", class: "noviceCarpenter", baseMaxXP: 1000, income: 30 },
    "Apprentice carpenter": { name: "Apprentice carpenter", class: "apprenticeCarpenter", baseMaxXP: 2000, income: 80 },
    "Journeyman carpenter": { name: "Journeyman carpenter", class: "journeymanCarpenter", baseMaxXP: 5000, income: 250 },
    "Master carpenter": { name: "Master carpenter", class: "masterCarpenter", baseMaxXP: 15000, income: 1400 },
    //Blacksmithers guild
    "Novice blacksmith": { name: "Novice blacksmith", class: "noviceBlacksmith", baseMaxXP: 1500, income: 50 },
    "Apprentice blacksmith": { name: "Apprentice blacksmith", class: "apprenticeBlacksmith", baseMaxXP: 3000, income: 100 },
    "Journeyman blacksmith": { name: "Journeyman blacksmith", class: "journeymanBlacksmith", baseMaxXP: 7500, income: 340 },
    "Master blacksmith": { name: "Master blacksmith", class: "masterBlacksmith", baseMaxXP: 22500, income: 2000 },
    //Merchants guild
    "Novice merchant": { name: "Novice merchant", class: "noviceMerchant", baseMaxXP: 2500, income: 100 },
    "Apprentice merchant": { name: "Apprentice merchant", class: "apprenticeMerchant", baseMaxXP: 5000, income: 220 },
    "Journeyman merchant": { name: "Journeyman merchant", class: "journeymanMerchant", baseMaxXP: 1.2e4, income: 800 },
    "Master merchant": { name: "Master merchant", class: "masterMerchant", baseMaxXP: 4e4, income: 3500 },
    "Guild leader": { name: "Guild leader", class: "guildLeader", baseMaxXP: 2e5, income: 2e4 },
    //Military
    "Squire": { name: "Squire", class: "squire", baseMaxXP: 100, income: 5 },
    "Footman": { name: "Footman", class: "footman", baseMaxXP: 1000, income: 50 },
    "Veteran footman": { name: "Veteran footman", class: "veteranFootman", baseMaxXP: 10000, income: 120 },
    "Knight": { name: "Knight", class: "knight", baseMaxXP: 1e5, income: 300 },
    "Veteran knight": { name: "Veteran knight", class: "veteranKnight", baseMaxXP: 1e6, income: 1000 },
    "Elite knight": { name: "Elite knight", class: "eliteKnight", baseMaxXP: 7.5e6, income: 3000 },
    "Holy knight": { name: "Holy knight", class: "holyKnight", baseMaxXP: 4e7, income: 1.5e4 },
    "Legendary knight": { name: "Legendary knight", class: "legendaryKnight", baseMaxXP: 1.5e8, income: 5e4 },
    //T.A.A
    "Student": { name: "Student", class: "student", baseMaxXP: 1e5, income: 100 },
    "Apprentice mage": { name: "Apprentice mage", class: "apprenticeMage", baseMaxXP: 1e6, income: 1000 },
    "Mage": { name: "Mage", class: "mage", baseMaxXP: 1e7, income: 7500 },
    "Wizard": { name: "Wizard", class: "wizard", baseMaxXP: 1e8, income: 5e4 },
    "Master wizard": { name: "Master wizard", class: "masterWizard", baseMaxXP: 1e10, income: 2.5e5 },
    "Chairman": { name: "Chairman", class: "chairman", baseMaxXP: 1e12, income: 1e6 },
}

const skills = {
    //Fundamentals
    "Concentration": { name: "Concentration", class: "concentration", baseMaxXP: 100, effect: 0.01, description: "Skill XP" },
    "Productivity": { name: "Productivity", class: "productivity", baseMaxXP: 100, effect: 0.01, description: "Job XP" },
    "Meditation": { name: "Meditation", class: "meditation", baseMaxXP: 100, effect: 0.01, description: "Happiness", importance: 2 },
    "Bargaining": { name: "Bargaining", class: "bargaining", baseMaxXP: 100, effect: -0.01, effectFormula: "reductive", description: "Expenses", importance: 0.2 },
    "Leadership": { name: "Leadership", class: "leadership", baseMaxXP: 100, effect: 0.01, description: "Personnel Effect" },
    //Craftsmanship
    "Woodworking": { name: "Woodworking", class: "woodworking", baseMaxXP: 100, effect: 0.01, description: "Carpentry Efficiency" },
    "Metalworking": { name: "Metalworking", class: "metalworking", baseMaxXP: 100, effect: 0.01, description: "Blacksmithing Efficiency" },
    //Combat
    "Strength": { name: "Strength", class: "strength", baseMaxXP: 100, effect: 0.01, description: "Military Income", importance: 0.8 },
    "Battle tactics": { name: "Battle tactics", class: "battleTactics", baseMaxXP: 100, effect: 0.01, description: "Military XP", importance: 0.8 },
    "Muscle memory": { name: "Muscle memory", class: "muscleMemory", baseMaxXP: 100, effect: 0.01, description: "Strength XP", importance: 0.2 },
    //Magic
    "Mana control": { name: "Mana control", class: "manaControl", baseMaxXP: 100, effect: 0.01, description: "T.A.A XP", importance: 0.8 },
    "Life essence": { name: "Life essence", class: "lifeEssence", baseMaxXP: 100, effect: 0.01, effectFormula: "log33", description: "Lifespan Length", importance: 0.2 },
    "Time warping": { name: "Time warping", class: "timeWarping", baseMaxXP: 100, effect: 0.01, effectFormula: "log13", description: "Time Warping", importance: 0.5 },
    "Astral body": { name: "Astral body", class: "astralBody", baseMaxXP: 100, effect: 0.01, effectFormula: "log33", description: "Lifespan Length", importance: 0.2 },
    //Dark magic
    "Dark influence": { name: "Dark influence", class: "darkInfluence", baseMaxXP: 100, effect: 0.01, description: "All XP", importance: 2 },
    "Evil control": { name: "Evil control", class: "evilControl", baseMaxXP: 100, effect: 0.01, description: "Evil Gain" },
    "Intimidation": { name: "Intimidation", class: "intimidation", baseMaxXP: 100, effect: -0.01, effectFormula: "reductive", description: "Expenses", importance: 0.2 },
    "Demon training": { name: "Demon training", class: "demonTraining", baseMaxXP: 100, effect: 0.01, description: "All XP", importance: 2 },
    "Blood meditation": { name: "Blood meditation", class: "bloodMeditation", baseMaxXP: 100, effect: 0.01, description: "Evil Gain" },
    "Demon's wealth": { name: "Demon's wealth", class: "demonsWealth", baseMaxXP: 100, effect: 0.002, description: "Income" },
}

const specialTasks = {
    "Offline time": { name: "Offline time", class: "offlineTime", xpMult: 0, xp: 0, maxXP: 100, baseMaxXP: 100, level: 0, maxLevel: 0, effect: 0, xpFormula: "offlineTime" }
}

const buyableHomes = {
    "Homeless": { name: "Homeless", class: "homeless", owned: true, price: 0, upkeep: 0, effect: 1, description: "Happiness" },
    "Tent": { name: "Tent", class: "tent", price: 2e3, upkeep: 10, effect: 1.4, description: "Happiness" },
    "Wooden hut": { name: "Wooden hut", class: "woodenHut", price: 2e4, upkeep: 60, effect: 2, description: "Happiness" },
    "Cottage": { name: "Cottage", class: "cottage", price: 2e5, upkeep: 350, effect: 3.5, description: "Happiness" },
    "House": { name: "House", class: "house", price: 1e6, upkeep: 1000, effect: 6, description: "Happiness" },
    "Large house": { name: "Large house", class: "largeHouse", price: 4e6, upkeep: 3000, effect: 12, description: "Happiness" },
    "Small palace": { name: "Small palace", class: "smallPalace", price: 2e8, upkeep: 3e5, effect: 25, description: "Happiness" },
    "Grand palace": { name: "Grand palace", class: "grandPalace", price: 5e9, upkeep: 5e6, effect: 60, description: "Happiness" },
}

const buyableOther = {
    //furniture
    "Book": { name: "Book", class: "book", price: 2000, upkeep: 0, effect: 1.5, description: "Skill XP" },
    "Dumbbells": { name: "Dumbbells", class: "dumbbells", price: 5e3, upkeep: 0, effect: 1.5, description: "Strength XP" },
    "Study desk": { name: "Study desk", class: "studyDesk", price: 6e5, upkeep: 300, effect: 2, description: "Skill XP" },
    "Library": { name: "Library", class: "library", price: 2e9, upkeep: 5e6, effect: 1.5, description: "Skill XP" },
    //equipment
    "Basic clothing": { name: "Basic clothing", class: "basicClothing", price: 1000, upkeep: 2, effect: 1.5, description: "Happiness" },
    "Steel longsword": { name: "Steel longsword", class: "steelLongsword", price: 1e5, upkeep: 20, effect: 2, description: "Military XP" },
    "Sapphire charm": { name: "Sapphire charm", class: "sapphireCharm", price: 2e7, upkeep: 200, effect: 3, description: "Magic XP" },
    //personnel
    "Personal squire": { name: "Personal squire", class: "personalSquire", price: 0, upkeep: 1000, effect: 2, description: "Military XP" },
    "Butler": { name: "Butler", class: "butler", price: 0, upkeep: 2e4, effect: 1.5, description: "Happiness" },
}

const baseCurrency = {
    "coins": 0,
    "days": 14 * 365,
    "lifespan": 70 * 365,
    "maxCoins": 0,
    "happiness": 1,
    "evil": 0,
    "essence": 0,
    "currentRealtime": 0,
    "storedOfflineTime": 0,
}

const baseData = {
    "devGameSpeed": 1,

    "maxJobs": 1,
    "maxSkills": 1,

    "gameSpeed": 1,
    "jobXPMult": 1,
    "incomeMult": 1,
    "skillXPMult": 1,
    "expenseMult": 1,
    "evilGainMult": 1,
    "allXPMult": 1,
    
    "selectedTab": "default tab set in main.js",
    "selectedSettings": "hidden",
    "paused": true,
    "autopromote": false,
    "autoskill": false,
    "autobuy": false,

    "lastUpdate": new Date().getTime(),
    "updateTimeDiff": 100,

    selectedHome: "Homeless",
    selectedJobs: [],
    selectedSkills: [],
    advancements: {},
    settings: {},
    stats: {},
    job: {},
    skill: {},
    specialTask: {},
    category: {
        job: {},
        skill: {},
        shop: {}
    },
    buyable: {
        home: {},
        other: {}
    }
}

const constChangableData = {
    "baseGameSpeed": 4,
    "baseXPMult": 1,
    "baseLifespan": 70 * 365,
}

const settings = {
    "primaryTheme": 0,
    "secondaryTheme": 0,
    "currencyNotation": 2,
    "numberNotation": 1,
    "coinsDisplayed": 2,
    "sidebarZoom": 1,
    "mainpanelZoom": 1,
    "textShadow": 2,
    "experimentalSettings": 0,
    "hideTitle": false,
    "smoothWidth": false,
    "mobile": false,
    "updateSpeed": 20,
    "updateSpeedSetting": 2,
    "saveSpeed": 5000,
}

const stats = {
    "startDate": new Date(),
    "totalDays": 0,
    "realtime": 0,
    "highestDays": 365 * 14,
    "highestCoins": 0,
    "rebirthOneTimes": 0,
    "rebirthOneTimesThisRebirth": 0,
    "rebirthTwoTimes": 0,
    "rebirthTwoTimesThisRebirth": 0,
    "rebirthThreeTimes": 0,
    "rebirthThreeTimesThisRebirth": 0,
}

const tooltips = {
    "Beggar": "Struggle day and night for a couple of copper coins. It feels like you are at the brink of death each day.",
    "Farmer": "Plow the fields and grow the crops. It's not much but it's honest work.",
    "Miller": "Grind grains into flour using a mill. A necessary but underappreciated job.",
    "Fisherman": "Reel in various fish and sell them for a handful of coins. A relaxing but still a poor paying job.",
    "Lumberjack": "Chop down trees and process wood. Hard physical labor, but pays moderately well.",
    "Miner": "Delve into dangerous caverns and mine valuable ores. The pay is quite meager compared to the risk involved.",

    "Novice carpenter": "Learn the basics of carpentry, focusing on simple wooden structures and repairs. A humble beginning in woodworking.",
    "Apprentice carpenter": "Assist experienced carpenters and refine your skills in woodworking. Gain hands-on experience with more complex projects.",
    "Journeyman carpenter": "Work independently on a variety of carpentry tasks, from furniture making to building construction. An intermediate step in your career.",
    "Master carpenter": "Oversee large carpentry projects and mentor apprentices. A prestigious position with good income.",

    "Novice blacksmith": "Learn the fundamentals of blacksmithing, starting with simple metalworking tasks. A critical first step in metal craftsmanship.",
    "Apprentice blacksmith": "Work under the guidance of a master blacksmith, honing your skills in forging and metal shaping. Progress to more intricate tasks.",
    "Journeyman blacksmith": "Operate independently to create a variety of metal goods, from tools to decorative items. An essential phase in your professional growth.",
    "Master blacksmith": "Create high-quality weapons and armor, and train new blacksmiths. A well-respected and high-paying job.",

    "Novice merchant": "Start your journey in trade by handling small-scale transactions and learning the basics of commerce. A crucial step in the trade profession.",
    "Apprentice merchant": "Work with experienced merchants to develop your trading skills and expand your market knowledge. Gain exposure to larger deals.",
    "Journeyman merchant": "Manage your own trade ventures and negotiate larger contracts. A significant advancement in your mercantile career.",
    "Master merchant": "Manage a large network of trade routes and employ multiple merchants. Highly lucrative and prestigious.",
    "Guild leader": "Oversee the entire merchant guild, make high-level decisions, and ensure the prosperity of all members. An elite and influential position.",

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
    "Meditation": "Fill your mind with peace and tranquility to tap into greater happiness from within.",
    "Bargaining": "Study the tricks of the trade and persuasive skills to lower any type of expense.",
    "Leadership": "Improve your ability to inspire and guide others, increasing overall team productivity and morale.",

    "Woodworking": "Shape and craft objects from wood. Essential for creating furniture, tools, and more. Affects both the XP gain and the income of carpentry jobs.",
    "Metalworking": "Forge and shape metal to create tools, weapons, and other items. Affects both the XP gain and the income of blacksmithing jobs.",

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
    "Dumbbells": "Heavy tools used in strenuous exercise to toughen up and accumulate strength even faster than before.",
    "Study desk": "A dedicated area which provides many fine stationary and equipment designed for furthering your progress in research.",
    "Library": "Stores a collection of books, each containing vast amounts of information from basic life skills to complex magic spells.",

    "Basic clothing": "Simple and modest attire that provides basic comfort and decency.",
    "Sapphire charm": "Embedded with a rare sapphire, this charm activates more mana channels within your body, providing a much easier time learning magic.",
    "Steel longsword": "A fine blade used to slay enemies even quicker in combat and therefore gain more experience.",

    "Personal squire": "Assists you in completing activities in the military, giving you more time to be productive.",
    "Butler": "Keeps your household clean at all times and also prepares three delicious meals per day, leaving you in a happier, stress-free mood.",
}