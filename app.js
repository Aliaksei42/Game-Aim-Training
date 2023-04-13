const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#f6433f', '#1ba90b', '#8813f3', '#d3ee14', '#02bcc9', '#26fa49', '#f29848', '#1155d1', '#be0bb2']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    //cancel the default behavior - when you press START, so that # is not added to the hash
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => 
{
    if (event.target.classList.contains('time-btn')){
        //get the attribute date value (10,20 or 30) as a string
        //parseInt - convert the string to a number and put it in the variable time
        time = parseInt(event.target.getAttribute('data-time'))
        //because second screen game - index 1
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})


function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
        current = `0${current}`  
        }
        setTime(current)
    }  
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    //Need delete parent - h3: timeEl.parentNode.remove()
    //Better to add class - will be smoother 
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement ('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()

    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    circle.style.background = getRandomColor()
    board.append(circle)
}

//random number from min to max
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() { 
    return colors[Math.floor(Math.random() * colors.length)]
}

function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle')
        if (circle) {
            circle.click()
        }
    }
    setInterval(kill, 50)
}
