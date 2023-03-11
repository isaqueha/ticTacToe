const gameBoard = document.querySelector('#gameboard')
const infoDisplay = document.querySelector('#info')

const startCells = [
    "","","",
    "","","",
    "","",""
]

let player = 'circle'
infoDisplay.textContent = 'Circle goes first'

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click', addElement)
        gameBoard.append(cellElement)
    })
}

createBoard()

function addElement(event) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(player)
    event.target.append(goDisplay)
    player = player === 'circle' ? 'cross' : 'circle'
    infoDisplay.textContent = 'it is now ' + player + "'s go."
    event.target.removeEventListener('click', addElement)
    checkScore()
}

function checkScore() {
    const allSquares = document.querySelectorAll('.square')
    console.log(allSquares)
    const winningSituations = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7] ,[2,5,8],
        [0,4,8], [2,4,6]
    ]

    winningSituations.forEach(situation => {
        const circleWins = situation.every(cell => allSquares[cell].firstChild?.classList.contains('circle'))
        
        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!"
            allSquares.forEach(square => {
                square.replaceWith(square.cloneNode(true))
            })
            return
        }
    })

    winningSituations.forEach(situation => {
        const crossWins = situation.every(cell => allSquares[cell].firstChild?.classList.contains('cross'))
        
        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!"
            allSquares.forEach(square => {
                square.replaceWith(square.cloneNode(true))
            })
            return
        }
    })

}