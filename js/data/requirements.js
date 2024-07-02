const requirements = {
    //Categories
    //jobs
    "commonWork": {},
    "carpentersGuild": {
        job: [{ name: "Lumberjack", value: 10 }],
        skill: [{ name: "Strength", value: 30 }, { name: "Concentration", value: 30 }, { name: "Woodworking", value: 5 }],
        show: {
            job: [{ name: "Lumberjack", value: 5 }],
        }
    },
    "blacksmithersGuild": {
        job: [{ name: "Miner", value: 10 }],
        skill: [{ name: "Strength", value: 40 }, { name: "Concentration", value: 35 }, { name: "Metalworking", value: 5 }],
        show: {
            job: [{ name: "Miner", value: 5 }],
        }
    },
    "merchantsGuild": {
        skill: [{ name: "Concentration", value: 40 }, { name: "Bargaining", value: 60 }],
        show: {
            skill: [{ name: "Bargaining", value: 30 }],
        }
    },
    "military": {
        skill: [{ name: "Strength", value: 5 }],
        show: {
            skill: [{ name: "Productivity", value: 10 }]
        }
    },
    "theArcaneAssociation": {
        skill: [{ name: "Concentration", value: 200 }, { name: "Meditation", value: 200 }],
        show: {
            skill: [{ name: "Concentration", value: 30 }, { name: "Productivity", value: 20 }]
        }
    },
    //skills
    "fundamentals": {},
    "craftsmanship": {
        job: [{ name: "Lumberjack", value: 5 }],
        skill: [{ name: "Concentration", value: 30 }],
        show: {
            job: [{ name: "Farmer", value: 10 }],
            skill: [{ name: "Strength", value: 20 }],
        }
    },
    "combat": {
        skill: [{ name: "Productivity", value: 10 }]
    },
    "magic": {
        job: [{ name: "Student", value: 1 }],
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
        coins: 0
    },
    "personnel": {
        coins: 4e4,
        show: {
            coins: 5e3
        }
    },
    //Tasks
    //jobs
    //common work
    "beggar": {},
    "farmer": {
        job: [{ name: "Beggar", value: 10 }],
    },
    "fisherman": {
        job: [{ name: "Farmer", value: 10 }],
        show: {
            job: [{ name: "Beggar", value: 10 }],
        }
    },
    "miller": {
        job: [{ name: "Farmer", value: 10 }],
        skill: [{ name: "Concentration", value: 25 }],
        show: {
            job: [{ name: "Beggar", value: 10 }],
        }
    },
    "lumberjack": {
        job: [{ name: "Farmer", value: 10 }],
        skill: [{ name: "Strength", value: 20 }],
        show: {
            job: [{ name: "Farmer", value: 10 }],
            skill: [{ name: "Productivity", value: 10 }]
        }
    },
    "miner": {
        job: [{ name: "Lumberjack", value: 10 }],
        skill: [{ name: "Strength", value: 30 }],
        show: {
            job: [{ name: "Farmer", value: 10 }],
            skill: [{ name: "Strength", value: 20 }, { name: "Productivity", value: 10 }],
        }
    },
    //Carpenters guild
    "noviceCarpenter": {
        job: [{ name: "Lumberjack", value: 10 }],
        skill: [{ name: "Strength", value: 30 }, { name: "Concentration", value: 30 }, { name: "Woodworking", value: 5 }],
        show: {
            job: [{ name: "Lumberjack", value: 5 }],
            skill: [{ name: "Strength", value: 20 }, { name: "Concentration", value: 30 }],
        }
    },
    "apprenticeCarpenter": {
        job: [{ name: "Novice carpenter", value: 10 }],
        skill: [{ name: "Productivity", value: 40 }, { name: "Woodworking", value: 15 }],
        show: {
            job: [{ name: "Lumberjack", value: 10 }],
            skill: [{ name: "Strength", value: 30 }, { name: "Concentration", value: 30 }, { name: "Woodworking", value: 5 }],
        }
    },
    "journeymanCarpenter": {
        job: [{ name: "Apprentice carpenter", value: 10 }],
        skill: [{ name: "Concentration", value: 60 }, { name: "Woodworking", value: 80 }],
        show: {
            job: [{ name: "Novice carpenter", value: 10 }],
            skill: [{ name: "Productivity", value: 40 }, { name: "Woodworking", value: 15 }],
        }
    },
    "masterCarpenter": {
        job: [{ name: "Journeyman carpenter", value: 20 }],
        skill: [{ name: "Productivity", value: 160 }, { name: "Concentration", value: 200 }, { name: "Woodworking", value: 250 }],
        show: {
            job: [{ name: "Apprentice carpenter", value: 10 }],
            skill: [{ name: "Concentration", value: 60 }, { name: "Woodworking", value: 80 }],
        }
    },
    //Blacksmithers guild
    "noviceBlacksmith": {
        job: [{ name: "Miner", value: 10 }],
        skill: [{ name: "Strength", value: 40 }, { name: "Concentration", value: 35 }, { name: "Metalworking", value: 5 }],
        show: {
            job: [{ name: "Miner", value: 5 }],
            skill: [{ name: "Strength", value: 20 }, { name: "Concentration", value: 30 }],
        }
    },
    "apprenticeBlacksmith": {
        job: [{ name: "Novice blacksmith", value: 10 }],
        skill: [{ name: "Productivity", value: 60 }, { name: "Metalworking", value: 15 }],
        show: {
            job: [{ name: "Miner", value: 10 }],
            skill: [{ name: "Strength", value: 40 }, { name: "Concentration", value: 35 }, { name: "Metalworking", value: 5 }],
        }
    },
    "journeymanBlacksmith": {
        job: [{ name: "Apprentice blacksmith", value: 10 }],
        skill: [{ name: "Concentration", value: 100 }, { name: "Metalworking", value: 80 }],
        show: {
            job: [{ name: "Novice blacksmith", value: 10 }],
            skill: [{ name: "Productivity", value: 60 }, { name: "Metalworking", value: 15 }],
        }
    },
    "masterBlacksmith": {
        job: [{ name: "Journeyman blacksmith", value: 20 }],
        skill: [{ name: "Productivity", value: 260 }, { name: "Concentration", value: 200 }, { name: "Metalworking", value: 250 }],
        show: {
            job: [{ name: "Apprentice blacksmith", value: 10 }],
            skill: [{ name: "Concentration", value: 100 }, { name: "Metalworking", value: 80 }],
        }
    },
    //Merchants guild
    "noviceMerchant": {
        skill: [{ name: "Concentration", value: 40 }, { name: "Bargaining", value: 60 }],
        show: {
            job: [{ name: "Farmer", value: 10 }],
            skill: [{ name: "Bargaining", value: 20 }]
        }
    },
    "apprenticeMerchant": {
        job: [{ name: "Novice merchant", value: 10 }],
        skill: [{ name: "Productivity", value: 80 }, { name: "Bargaining", value: 120 }],
        show: {
            job: [{ name: "Farmer", value: 10 }],
            skill: [{ name: "Concentration", value: 40 }, { name: "Bargaining", value: 60 }],
        }
    },
    "journeymanMerchant": {
        job: [{ name: "Apprentice merchant", value: 10 }],
        skill: [{ name: "Productivity", value: 160 }, { name: "Bargaining", value: 200 }],
        show: {
            job: [{ name: "Novice merchant", value: 10 }],
            skill: [{ name: "Productivity", value: 80 }, { name: "Bargaining", value: 120 }],
        }
    },
    "masterMerchant": {
        job: [{ name: "Journeyman merchant", value: 20 }],
        skill: [{ name: "Productivity", value: 300 }, { name: "Bargaining", value: 400 }],
        show: {
            job: [{ name: "Apprentice merchant", value: 10 }],
            skill: [{ name: "Productivity", value: 160 }, { name: "Bargaining", value: 200 }],
        }
    },
    "guildLeader": {
        job: [{ name: "Master merchant", value: 100 }],
        skill: [{ name: "Productivity", value: 500 }, { name: "Bargaining", value: 1000 }],
        show: {
            job: [{ name: "Master merchant", value: 25 }],
            skill: [{ name: "Productivity", value: 300 }, { name: "Bargaining", value: 400 }],
        }
    },
    //military
    "squire": {
        skill: [{ name: "Strength", value: 5 }],
    },
    "footman": {
        job: [{ name: "Squire", value: 10 }],
        skill: [{ name: "Strength", value: 20 }],
    },
    "veteranFootman": {
        job: [{ name: "Footman", value: 10 }],
        skill: [{ name: "Strength", value: 30 }, { name: "Battle tactics", value: 40 }],
        show: {
            job: [{ name: "Squire", value: 10 }],
            skill: [{ name: "Strength", value: 20 }],
        }
    },
    "knight": {
        job: [{ name: "Veteran footman", value: 10 }],
        skill: [{ name: "Strength", value: 100 }, { name: "Battle tactics", value: 60 }],
        show: {
            job: [{ name: "Footman", value: 10 }],
            skill: [{ name: "Strength", value: 30 }, { name: "Battle tactics", value: 40 }],
        }
    },
    "veteranKnight": {
        job: [{ name: "Knight", value: 10 }],
        skill: [{ name: "Strength", value: 120 }, { name: "Battle tactics", value: 150 }],
        show: {
            job: [{ name: "Veteran footman", value: 10 }],
            skill: [{ name: "Strength", value: 100 }, { name: "Battle tactics", value: 60 }],
        }
    },
    "eliteKnight": {
        job: [{ name: "Veteran knight", value: 10 }],
        skill: [{ name: "Strength", value: 300 }, { name: "Battle tactics", value: 200 }],
        show: {
            job: [{ name: "Knight", value: 10 }],
            skill: [{ name: "Strength", value: 120 }, { name: "Battle tactics", value: 150 }],
        }
    },
    "holyKnight": {
        job: [{ name: "Elite knight", value: 10 }],
        skill: [{ name: "Strength", value: 500 }, { name: "Battle tactics", value: 400 }, { name: "Mana control", value: 500 }],
        show: {
            job: [{ name: "Veteran knight", value: 10 }],
            skill: [{ name: "Strength", value: 300 }, { name: "Battle tactics", value: 200 }],

        }
    },
    "legendaryKnight": {
        job: [{ name: "Holy knight", value: 10 }],
        skill: [{ name: "Strength", value: 1000 }, { name: "Battle tactics", value: 1000 }, { name: "Mana control", value: 1000 }],
        show: {
            job: [{ name: "Elite knight", value: 10 }],
            skill: [{ name: "Strength", value: 500 }, { name: "Battle tactics", value: 400 }, { name: "Mana control", value: 500 }],
        }
    },
    //t.a.a.
    "student": {
        skill: [{ name: "Concentration", value: 200 }, { name: "Meditation", value: 200 }],
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
    "concentration": {},
    "productivity": {
        skill: [{ name: "Concentration", value: 5 }]
    },
    "meditation": {
        skill: [{ name: "Concentration", value: 30 }, { name: "Productivity", value: 20 }],
        show: {
            skill: [{ name: "Concentration", value: 5 }]
        }
    },
    "bargaining": {
        skill: [{ name: "Concentration", value: 30 }, { name: "Productivity", value: 35 }],
        show: {
            skill: [{ name: "Concentration", value: 10 }, { name: "Productivity", value: 10 }]
        }
    },
    "leadership": {
        skill: [{ name: "Concentration", value: 80 }, { name: "Bargaining", value: 60 }],
        show: {
            skill: [{ name: "Bargaining", value: 10 }],
            coins: 4e4
        }
    },
    //craftsmanship
    "woodworking": {
        job: [{ name: "Lumberjack", value: 5 }],
        skill: [{ name: "Concentration", value: 30 }],
        show: {
            job: [{ name: "Lumberjack", value: 5 }],
            skill: [{ name: "Concentration", value: 30 }],
        }
    },
    "metalworking": {
        job: [{ name: "Miner", value: 5 }],
        skill: [{ name: "Productivity", value: 40 }],
        show: {
            job: [{ name: "Lumberjack", value: 5 }],
            skill: [{ name: "Concentration", value: 30 }],
        }
    },
    //combat
    "strength": {
        skill: [{ name: "Productivity", value: 10 }]
    },
    "battleTactics": {
        skill: [{ name: "Productivity", value: 10 }, { name: "Concentration", value: 20 }]
    },
    "muscleMemory": {
        skill: [{ name: "Concentration", value: 30 }, { name: "Strength", value: 30 }],
        show: {
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
        skill: [{ name: "Meditation", value: 100 }],
        evil: 1,
    },
    "intimidation": {
        skill: [{ name: "Bargaining", value: 5 }],
        evil: 1,
    },
    "demonTraining": {
        skill: [{ name: "Dark influence", value: 20 }],
        evil: 25,
    },
    "bloodMeditation": {
        evil: 75,
        skill: [{ name: "Meditation", value: 500 }, { name: "Dark influence", value: 500 }],
        show: {
            evil: 25
        }
    },
    "demonsWealth": {
        evil: 500,
        skill: [{ name: "Intimidation", value: 20 }, { name: "Evil control", value: 20 }],
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
        coins: 100
    },
    "woodenHut": {
        coins: 1000
    },
    "cottage": {
        coins: 4e4,
        show: {
            coins: 1000
        }
    },
    "house": {
        coins: 2e5,
        show: {
            coins: 4e4
        }
    },
    "largeHouse": {
        coins: 8e5,
        show: {
            coins: 2e5
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
        coins: 4000,
        skill: [{ name: "Strength", value: 5 }],
        show: {
            skill: [{ name: "Strength", value: 1 }]
        }
    },
    "studyDesk": {
        coins: 1e5,
        skill: [{ name: "Concentration", value: 100 }],
        show: {
            coins: 1e4
        }
    },
    "library": {
        coins: 1e8,
        show: {
            coins: 1e7
        }
    },
    //equipment
    "basicClothing": {
        coins: 1000
    },
    "steelLongsword": {
        coins: 2e4,
        job: [{ name: "Footman", value: 10 }],
        show: {
            job: [{ name: "Squire", value: 10 }],
        }
    },
    "sapphireCharm": {
        coins: 5e6,
        skill: [{ name: "Mana control", value: 100 }],
        show: {
            coins: 5e5,
            skill: [{ name: "Concentration", value: 200 }, { name: "Meditation", value: 200 }],
        }
    },
    //personnel
    "personalSquire": {
        coins: 2e5,
        job: [{ name: "Veteran footman", value: 5 }],
        show: {
            coins: 2e4,
            job: [{ name: "Footman", value: 10 }],
            skill: [{ name: "Strength", value: 30 }, { name: "Battle tactics", value: 40 }],
        }
    },
    "butler": {
        coins: 5e6,
        show: {
            coins: 4e4
        }
    },
    //custom - advancements
    "skills": {
        job: [{ name: "Beggar", value: 3 }]
    },
    "autoskill": {
        skill: [{ name: "Concentration", value: 50 }]
    }
}