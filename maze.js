// JavaScript source code

let mazeLevel = 0;
let mazeObstacles = 0;
let mazeVariables = {

    positionX: courseStartingPosition[mazeLevel][1],
    positionY: courseStartingPosition[mazeLevel][0],
    wallOne: 51,
    wallTwo: 52,
    wallThree: 53,
    startPosition: mazeLayouts[mazeLevel][mazeObstacles].indexOf(22),
    startingAbsolutePosition: courseStartingPosition[mazeLevel],
    currentPositionCount: mazeLayouts[mazeLevel][mazeObstacles].indexOf(22),
    canMove: false,


    moveYIndex: courseValues[mazeLevel][0],
    moveXIndex: courseValues[mazeLevel][1],
    boxSize: courseValues[mazeLevel][2]
}

window.onload = buildMaze;

let worldObject = {
    person: {
        moveUp: function () {
            this.position('up');
        },
        moveRight: function () {
            this.position('right');
        },
        moveDown: function () {
            this.position('down');
        },
        moveLeft: function () {
            this.position('left');
        },
        position: function (stepDirection) {
            var person = document.getElementById('person');
            switch (stepDirection) {
                case 'up':
                    checkPosition('subtract', mazeVariables.moveYIndex);
                    if (mazeVariables.canMove) {
                        person.className += 'moveUp';
                        mazeVariables.positionY -= mazeVariables.boxSize;
                        moveYPosition(mazeVariables.positionY);
                    }
                    break;
                case 'right':
                    checkPosition('add', mazeVariables.moveXIndex);
                    if (mazeVariables.canMove) {
                        person.className += 'moveRight';
                        mazeVariables.positionX += mazeVariables.boxSize;
                        moveXPosition(mazeVariables.positionX);
                    }
                    break;
                case 'down':
                    checkPosition('add', mazeVariables.moveYIndex);
                    if (mazeVariables.canMove) {
                        person.className += 'moveDown';
                        mazeVariables.positionY += mazeVariables.boxSize;
                        moveYPosition(mazeVariables.positionY);
                    }
                    break;
                case 'left':
                    checkPosition('subtract', mazeVariables.moveXIndex);
                    if (mazeVariables.canMove) {
                        person.className += 'moveLeft';
                        mazeVariables.positionX -= mazeVariables.boxSize;
                        moveXPosition(mazeVariables.positionX);
                    }
                    break;
            } //end of cases
            function moveXPosition(positionX) {
                document.getElementById("person").style.left = positionX + 'px';
            }

            function moveYPosition(positionY) {
                document.getElementById("person").style.top = positionY + 'px';
            }
        } //end of worldObject.person.position
    } //end of worldObject.person
} //end of worldObject

function buildMaze() {
    createLayout();
    setAbsolutePosition();
}

function createLayout() {
    let mazeBody = document.getElementById('mazeBody');
    let mazeFragment = document.createDocumentFragment();

    for (let i = 0; i < mazeLayouts[mazeLevel][mazeObstacles].length; i++) {

        let mazeSquare = document.createElement('div');
        mazeSquare.className = 'box ';

        switch (mazeLayouts[mazeLevel][mazeObstacles][i]) {
            case mazeVariables.startPosition:
                mazeSquare.className += 'startPosition walkableBlock ';
                break;

            case 11:
            case 22:
            case 33:
                mazeSquare.className += 'walkableBlock ';
                break;

            case 41:
            case 42:
            case 43:
                mazeSquare.className += 'pressurePlate relative ';
                break;

            case 61:
                let wallOneIndex = mazeLayouts[mazeLevel][mazeObstacles].indexOf(61);
                mazeLayouts[mazeLevel][mazeObstacles][wallOneIndex] = 51;

            case 62:
                let wallTwoIndex = mazeLayouts[mazeLevel][mazeObstacles].indexOf(62);
                mazeLayouts[mazeLevel][mazeObstacles][wallTwoIndex] = 52;

            case 63:
                let wallThreeIndex = mazeLayouts[mazeLevel][mazeObstacles].indexOf(63);
                mazeLayouts[mazeLevel][mazeObstacles][wallThreeIndex] = 53;

            case 51:
            case 52:
            case 53:
                mazeSquare.className += 'wall wall-' + mazeLayouts[mazeLevel][mazeObstacles][i] + ' ';
                break;
        }

        mazeFragment.appendChild(mazeSquare);
    }
    mazeBody.appendChild(mazeFragment);
}

function setAbsolutePosition() {

    let personElement = document.getElementById('person');

    personElement.style.top = mazeVariables.startingAbsolutePosition[0] + 'px';
    personElement.style.left = mazeVariables.startingAbsolutePosition[1] + 'px';
}

function checkPosition(addOrSub, amount) {

    let person = document.getElementById('person');
    let potentialPosition;
    let mazeEnd = false;

    mazeVariables.canMove = false;

    if (addOrSub === 'add') {

        potentialPosition = mazeVariables.currentPositionCount + amount;

    } else if (addOrSub === 'subtract') {

        potentialPosition = mazeVariables.currentPositionCount - amount;

    }

    switch (mazeLayouts[mazeLevel][mazeObstacles][potentialPosition]) {

        case 11:
        case 22:
        case 61:
        case 62:
        case 63:
            mazeVariables.canMove = true;
            break;

        case 33:
            mazeVariables.canMove = true;
            mazeEnd = true;
            break;

        case 41:
            if (mazeVariables.wallOne === 51) {
                mazeVariables.wallOne = 61;
                document.querySelector('.wall-51').classList.add('wall--down');
                let wallOneIndex = mazeLayouts[mazeLevel][mazeObstacles].indexOf(51);
                mazeLayouts[mazeLevel][mazeObstacles][wallOneIndex] = 61;
            } else {
                mazeVariables.wallOne = 51;
                document.querySelector('.wall-51').classList.remove('wall--down');
                let wallOneIndex = mazeLayouts[mazeLevel][mazeObstacles].indexOf(61);
                mazeLayouts[mazeLevel][mazeObstacles][wallOneIndex] = 51;
            }
            mazeVariables.canMove = true;
            break;
        case 42:
            if (mazeVariables.wallTwo === 52) {
                mazeVariables.wallTwo = 62;
                document.querySelector('.wall-52').classList.add('wall--down');
                let wallTwoIndex = mazeLayouts[mazeLevel][mazeObstacles].indexOf(52);
                mazeLayouts[mazeLevel][mazeObstacles][wallTwoIndex] = 62;
            } else {
                mazeVariables.wallTwo = 52;
                document.querySelector('.wall-52').classList.remove('wall--down');
                let wallTwoIndex = mazeLayouts[mazeLevel][mazeObstacles].indexOf(62);
                mazeLayouts[mazeLevel][mazeObstacles][wallTwoIndex] = 52;
            }
            mazeVariables.canMove = true;
            break;
        case 43:
            if (mazeVariables.wallThree === 53) {
                mazeVariables.wallThree = 63;
                document.querySelector('.wall-53').classList.add('wall--down');
                let wallThreeIndex = mazeLayouts[mazeLevel][mazeObstacles].indexOf(53);
                mazeLayouts[mazeLevel][mazeObstacles][wallThreeIndex] = 63;
            } else {
                mazeVariables.wallThree = 53;
                document.querySelector('.wall-53').classList.remove('wall--down');
                let wallThreeIndex = mazeLayouts[mazeLevel][mazeObstacles].indexOf(63);
                mazeLayouts[mazeLevel][mazeObstacles][wallThreeIndex] = 53;
            }
            mazeVariables.canMove = true;
            break;

        case 00:
        case 51:
        case 52:
        case 53:
            mazeVariables.canMove = false;
    }

    if (mazeVariables.canMove === true) {
        mazeVariables.currentPositionCount = potentialPosition;
        person.classList.remove('startingPos', 'moveUp', 'moveRight', 'moveDown', 'moveLeft');

        if (mazeEnd) {

            let toast = document.getElementById('toast');
            toast.classList.remove('d--hidden');

            setTimeout(function () {
                toast.classList.add('show');
            }, 300);
        }
    }

}

//level changes
function levelChange(levelDirection) {

    let currentLevel = mazeLevel;
    let mazeBody = document.getElementById('mazeBody');

    if (levelDirection === 'down' && currentLevel !== 0) {

        mazeLevel = currentLevel - 1;
    }

    if (levelDirection === 'up' && currentLevel !== 2) {

        mazeLevel = currentLevel + 1;

    }

    if (currentLevel !== mazeLevel) {
        mazeBody.innerHTML = "";

        resetValues();
        buildMaze();
        updateLevelButton(mazeLevel, currentLevel);
    }

}

function updateLevelButton(mazeLevel, currentLevel) {

    let reduceLevelButton = document.getElementById('reduceLevel');
    let increaseLevelButton = document.getElementById('increaseLevel');
    let oldLevel = document.querySelector('.level-' + currentLevel);
    let newLevel = document.querySelector('.level-' + mazeLevel);

    if (mazeLevel === 0) {
        reduceLevelButton.setAttribute('disabled', 'disabled');
        increaseLevelButton.removeAttribute('disabled');
    } else if (mazeLevel === 2) {
        reduceLevelButton.removeAttribute('disabled');
        increaseLevelButton.setAttribute('disabled', 'disabled');
    } else {
        reduceLevelButton.removeAttribute('disabled');
        increaseLevelButton.removeAttribute('disabled');
    }

    oldLevel.classList.remove('active');
    newLevel.classList.add('active');
}

//Obstacle changes
function obstacleChange(obstacleDirection) {

    let currentObstacles = mazeObstacles;
    let mazeBody = document.getElementById('mazeBody');

    if (obstacleDirection === 'down' && currentObstacles !== 0) {

        //console.log(obstacleDirection, 'obstacle change');
        mazeObstacles = currentObstacles - 1;
    }

    if (obstacleDirection === 'up' && currentObstacles !== 3) {

        //console.log(obstacleDirection, 'obstacle change');
        mazeObstacles = currentObstacles + 1;
    }

    if (currentObstacles !== mazeObstacles) {
        mazeBody.innerHTML = "";

        resetValues();
        buildMaze();
        updateObstaclesButton(mazeObstacles);
    }

}

function updateObstaclesButton(mazeObstacles) {

    let reduceObstaclesButton = document.getElementById('reduceObstacles');
    let increaseObstaclesButton = document.getElementById('increaseObstacles');
    let newObstaclesValue = document.querySelector('.mazeObstacles');

    if (mazeObstacles === 0) {
        reduceObstaclesButton.setAttribute('disabled', 'disabled');
        increaseObstaclesButton.removeAttribute('disabled');
    } else if (mazeObstacles === 3) {
        reduceObstaclesButton.removeAttribute('disabled');
        increaseObstaclesButton.setAttribute('disabled', 'disabled');
    } else {
        reduceObstaclesButton.removeAttribute('disabled');
        increaseObstaclesButton.removeAttribute('disabled');
    }

    newObstaclesValue.innerHTML = mazeObstacles;
}

function restartGame() {
    document.getElementById('mazeBody').innerHTML = '';
    resetValues();
    buildMaze();
}

function resetValues() {

    mazeVariables.positionX = courseStartingPosition[mazeLevel][1];
    mazeVariables.positionY = courseStartingPosition[mazeLevel][0];
    mazeVariables.wallOne = 51;
    mazeVariables.wallTwo = 52;
    mazeVariables.wallThree = 53;
    mazeVariables.startPosition = mazeLayouts[mazeLevel][mazeObstacles].indexOf(22);
    mazeVariables.startingAbsolutePosition = courseStartingPosition[mazeLevel];
    mazeVariables.currentPositionCount = mazeVariables.startPosition;
    mazeVariables.canMove = false;
    mazeVariables.moveYIndex = courseValues[mazeLevel][0];
    mazeVariables.moveXIndex = courseValues[mazeLevel][1];
    mazeVariables.boxSize = courseValues[mazeLevel][2];
    document.getElementById('toast').classList.add('d--hidden');
    document.getElementById('toast').classList.remove('show');
    document.getElementById('mazeContainer').classList.remove('level-1', 'level-2', 'level-3');
    document.getElementById('mazeContainer').classList.add('level-' + (mazeLevel + 1));
    document.getElementById('person').classList.remove('startingPos', 'moveUp', 'moveRight', 'moveDown', 'moveLeft');
    document.getElementById('person').classList.add('startingPos');
}

//buttons for moving
function movePerson(direction) {
    switch (direction) {
        case 'left':
            worldObject.person.moveLeft();
            break;

        case 'up':
            worldObject.person.moveUp();
            break;

        case 'right':
            worldObject.person.moveRight();
            break;

        case 'down':
            worldObject.person.moveDown();
            break;
    }
}

//bind arrows to movements
document.onkeydown = function (e) {
    e = e || window.event;
    switch (e.which || e.keyCode) {
        case 37:
            worldObject.person.moveLeft();
            break;

        case 38:
            worldObject.person.moveUp();
            break;

        case 39:
            worldObject.person.moveRight();
            break;

        case 40:
            worldObject.person.moveDown();
            break;

        default:
            return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
};