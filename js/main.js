
function getLifespan() {
    lifespan = 365 * 60
    return lifespan
}

function getNet() {
    return Math.abs(getIncome() - getExpense())
}

function getIncome() {
    return gameData.currentJob.getIncome() 
}

function getExpense() {
    var expense = 0
    expense += gameData.currentProperty.getExpense()
    for (misc of gameData.currentMisc) {
        expense += misc.getExpense()
    }
    return expense
}

function increaseCoins() {
    gameData.coins += applySpeed(getIncome())
}
