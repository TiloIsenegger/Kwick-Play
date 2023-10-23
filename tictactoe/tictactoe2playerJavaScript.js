var freeFields = [1, 2, 3, 4, 5, 6, 7, 8, 9], // free fields, numbers get removed during game
    fields = [[], [], [], [], [], [], [], [], []], // array of fields, gets filled during game: [[X], [], [O], [], [O], [X], [], [], [X]]
    over = false, // if some one has 3 in a row, game over
    lastlose = oImg, // loser of last game begins in new game
    xImg = "<img class='XorO' src='../Pictures/TicTacToe/X.png' alt='X'>",
    oImg = "<img class='XorO' src='../Pictures/TicTacToe/O.png' alt='X'>",
    xImgRed = "<img class='XorO' src='../Pictures/TicTacToe/X rot.png' alt='X'>",
    oImgRed = "<img class='XorO' src='../Pictures/TicTacToe/O rot.png' alt='X'>",
    winTurn = xImgRed,
    turn = xImg; // if X or O am zug


function claimField(field) { // start when putton in pressen, field = id of pressed field
    let location = freeFields.indexOf(field); // look where in freeFields the current field id is

    if (freeFields.indexOf(field) >= 0) {

        document.getElementById(field).style = "opacity: 1;"; //make button visable for ever
        document.getElementById(field).innerHTML = turn; //add X or O 
        //document.getElementById(field).disabled = true; // (disable button) no longer button so nolonger needed

        freeFields.splice(location, 1); // remove the current field id from freeFields
        fields[field - 1] = turn; // add turn to fields array at right location

        checkforWin(); // check if someone has won
        if (over === true) { // if win -> end 1
            end("win"); // win
        }
        if (freeFields.length === 0) { // if all fields used -> end 2, tie
            if (over === true) { // safety 
                over = true;
            }
            else {
                over = true;
                end("tie"); // tie
            }
        }
        if (over === false) { // if no win continue normal
            changeTurn();
        }
    }
}

function changeTurn() { // change turns

    if (turn === xImg) {

        for (let index = 0; index < (freeFields.length); index++) { // change all freeFields from X to O for hover effect

            document.getElementById(freeFields[index]).innerHTML = oImg;
        }

        turn = oImg; // change turn to O
        document.getElementById("outputmessages").innerHTML = "O ist am Zug";

    } else {

        for (let index = 0; index < (freeFields.length); index++) { // change all freeFields from O to X for hover effect 

            document.getElementById(freeFields[index]).innerHTML = xImg;
        }

        turn = xImg; // change turn to X
        document.getElementById("outputmessages").innerHTML = "X ist am Zug";
    }
}

function checkforWin() { // check if someone has won
    if (turn === xImg) {
        winTurn = xImgRed;
    } else {
        winTurn = oImgRed;
    }

    for (let id = 0; id <= 2; id++) { //check vertical rows
        if ((fields[id] === turn) && (fields[id + 3] === turn) && (fields[id + 6] === turn)) {

            for (let id2 = id + 1; id2 <= 9; id2 += 3) { //makes winning row red and pulse
                document.getElementById(id2).innerHTML = winTurn;
                document.getElementById(id2).style.animation = "letterPulse 1.5s infinite";
            }
            over = true; //game over
            break;
        }
    }
    for (let id = 0; id <= 9; id += 3) { //check horizontal rows
        if ((fields[id] === turn) && (fields[id + 1] === turn) && (fields[id + 2] === turn)) {

            for (let id2 = id + 1; id2 <= id + 3; id2 += 1) { //makes winning row red and pulse
                document.getElementById(id2).innerHTML = winTurn;
                document.getElementById(id2).style.animation = "letterPulse 1.5s infinite";
            }
            over = true; //game over
            break;
        }
    }
    if ((fields[0] === turn) && (fields[4] === turn) && (fields[8] === turn)) { //check diagonal row 1

        for (let id2 = 0 + 1; id2 <= 9; id2 += 4) { //makes winning row red and pulse
            document.getElementById(id2).innerHTML = winTurn;
            document.getElementById(id2).style.animation = "letterPulse 1.5s infinite";
        }
        over = true; //game over
    }
    if ((fields[2] === turn) && (fields[4] === turn) && (fields[6] === turn)) { //check diagonal row 2

        for (let id2 = 2 + 1; id2 <= 7; id2 += 2) { //makes winning row red and pulse
            document.getElementById(id2).innerHTML = winTurn;
            document.getElementById(id2).style.animation = "letterPulse 1.5s infinite";
        }
        over = true; //game over
    }
}

function end(type) { // end function, 2 types
    DisableEnableOnHover("disable"); // disable onhover function

    if (type === "win") { // someone has won

        if (turn === xImg) {

            document.getElementById("outputmessages").innerHTML = "X hat gewonnen!"
        } else {

            document.getElementById("outputmessages").innerHTML = "O hat gewonnen!"
        }

        freeFields = []; // "disable" clicking on all fields
    }

    if (type === "tie") { // tie

        document.getElementById("outputmessages").innerHTML = "Unentschieden!";
    }
    // change lastlose for new game
    if (turn === xImg) {
        lastlose = oImg;
    }
    else {
        lastlose = xImg;
    }

    document.getElementById("restart").style.visibility = "visible"; //reveal restartbutton
}

function DisableEnableOnHover(type) { // disable onhover

    if (type === "disable") { // disable
        for (let id = 1; id <= 9; id++) { // disable buttons
            document.getElementById(id).style.pointerEvents = "none";
        }
    }

    if (type === "enable") { // enable
        for (let id = 1; id <= 9; id++) { // disable buttons
            document.getElementById(id).style.pointerEvents = "auto";
        }
    }

}

function opacity() { //make all field "buttons" with id 1-9 disappear
    for (let id = 1; id <= 9; id++) {

        document.getElementById(id).style.opacity = "0";
    }
}

function StartRestartAnimation() { // start restart animation in css, -> not in use right now
    opacity() // make buttons disappear during animation

    document.getElementById("restartButtonImg").style.animation = "restartAnimation  0.5s 1"; // add animation to restart button
    setTimeout(function () { // delay so animation can finish + delay needed because of transitioin-duration: 0.2s;, so X ans O can disapear before all get changed to lastlose
        restart()
    }, 550)
}

function restart() { // start new game

    // reset variables
    freeFields = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    fields = [[], [], [], [], [], [], [], [], []];
    turn = lastlose;
    over = false;

    document.getElementById("restart").style.visibility = "hidden"; // makes restartbutton disappear again

    document.getElementById("restartButtonImg").style.animation = "none"; // reset restartButton animation

    for (let id = 1; id <= 9; id++) { // reset all fields and enable them again + reset animation

        document.getElementById(id).innerHTML = turn;
        document.getElementById(id).style.animation = "none";
    }
    if (lastlose === xImg) {
        document.getElementById("outputmessages").innerHTML = "X beginnt"; //loser starts new game
    } else {
        document.getElementById("outputmessages").innerHTML = "O beginnt"; //loser starts new game
    }

    DisableEnableOnHover("enable"); // reenable onhover effect
}
