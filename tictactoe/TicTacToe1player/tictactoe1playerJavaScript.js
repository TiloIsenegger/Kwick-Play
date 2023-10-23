// global variables below

var turn = "X", // if X or O am zug
    freeFields = [1, 2, 3, 4, 5, 6, 7, 8, 9], // free fields, numbers get removed during game
    fields = [[], [], [], [], [], [], [], [], []], // array of fields, gets filled during game: [[X], [], [O], [], [O], [X], [], [], [X]]
    over = false, // if some one has 3 in a row, game over
    lastlose, // loser of last game begins in new game
    xImg = "<img id='X' class='XorO' src='../../Pictures/TicTacToe/X.png' alt='X'>",
    oImg = "<img id='O' class='XorO' src='../../Pictures/TicTacToe/O.png' alt='X'>",
    xImgRed = "<img class='XorO' src='../../Pictures/TicTacToe/X rot.png' alt='X'>",
    oImgRed = "<img class='XorO' src='../../Pictures/TicTacToe/O rot.png' alt='X'>",
    winTurn = xImgRed, // red version of X and O
    turn = xImg, // if X or O am zug
    move = 1, // indicates which move it is
    playing = false, // while playing -> true -> level is no longer changable
    level = 2; // difficulty level of the Opponent(computerprogramm)



// functions below

function onload() { // so at beginning no onhover effect before game gets started
    for (let id = 1; id <= 9; id++) { // disable buttons
        document.getElementById(id).style.pointerEvents = "none";
    }
}

function changeTicTacToeOpponentLevel(type) { // change the level

    if (playing === false) { // if game has started, you can no longer change the level

        if (type === "add") {
            level++;
            document.getElementById("TicTacToeOpponentLevelButtonDeduct").disabled = false;

            document.getElementById("TicTacToeOpponentLevel").innerHTML = "Aktuelle Schwierigkeit: " + level;

            if (level >= 3) {
                document.getElementById("TicTacToeOpponentLevelButtonAdd").disabled = true;
                document.getElementById("TicTacToeOpponentLevel").innerHTML = "Schwierigkeit 3 noch nicht vorhanden";
            }
        }

        if (type === "deduct") {
            level--;
            document.getElementById("TicTacToeOpponentLevelButtonAdd").disabled = false;

            document.getElementById("TicTacToeOpponentLevel").innerHTML = "Aktuelle Schwierigkeit: " + level;

            if (level <= 1) {
                document.getElementById("TicTacToeOpponentLevelButtonDeduct").disabled = true;
            }
        }

    }
}

function StartTicTacToe() {

    playing = true;
    //playing)
    document.getElementById("StartButton").style.visibility = "hidden";
    DisableEnableOnHover("enable")

    if (turn === xImg) {
        document.getElementById("outputmessages").innerHTML = "X beginnt"; 
    }
    else {
        document.getElementById("outputmessages").innerHTML  = "Der Computer beginnt";
    }

    if (lastlose === oImg) {
        setTimeout(OpponentsTurn, 1000)//computers turn/ delay, so you can see the message, before it continues
    }

}

function claimField(field) { // start when putton in pressen, field = id of pressed field
    let location = freeFields.indexOf(field); // look where in freeFields the current field id is

    if (playing === true) {

        //"move: " + move)

        if (freeFields.indexOf(field) >= 0) {

            for (let index = 0; index < (freeFields.length); index++) { // turn left fields to black HERE!

                document.getElementById(freeFields[index]).style.pointerEvents = "auto"; // make X or O appear
            }

            document.getElementById(field).style = "opacity: 1;"; //make button visable for ever
            document.getElementById(field).innerHTML = turn; //add X or O 
            //document.getElementById(field).disabled = true; // (disable button) no longer button so nolonger needed

            freeFields.splice(location, 1); // remove the current field id from freeFields
            fields[field - 1] = turn; // add turn to fields array at right location

            checkforWin(); // check if someone has won
            if (over === true) { // if win -> end 1
                end("win"); //1 -> win
            }
            if (freeFields.length === 0) { // if all fields used -> end 2
                if (over === true) { // safety 
                    over = true;
                }
                else {
                    over = true;
                    end("tie"); // 2 -> tie
                }
            }
            if (over === false) { // if no win, continue normal
                changeTurn();
            }
        }
    }
}

function OpponentsTurn() { //check which level has been selected and start the corresponding function

    if (level === 1) {

        OpponentLevel1Random();
    }
    if (level === 2) {

        OpponentLevel2BasicIfRules();
    }
    if (level === 3) {

        OpponentLevel3UnbeatableCommingSoon();
    }
}

function OpponentLevel1Random() { //computer chooses random free field, Tier 1 "AI" HERE! redo random 

    let randomField = Math.floor(Math.random() * (freeFields.length - 1 - 0 + 1)) + 0; // random number Math.floor(Math.random() * (max - min + 1) + min)

    //"random: " + randomField)
    //"field: " + freeFields[randomField])

    claimField(freeFields[randomField]); // claimfield function with random chosen field

}

function changeTurn() { // change turns
    //"changeTurn")
    //"from " + turn)
    move++;
    if (turn === xImg) {

        for (let index = 0; index < (freeFields.length); index++) { // change all freeFields from X to O for hover effect

            document.getElementById(freeFields[index]).innerHTML = oImg;
        }

        turn = oImg; // change turn to O

        document.getElementById("outputmessages").innerHTML = "Der Computer ist am Zug";

        DisableEnableOnHover("disable"); // disable onhover effect during the computers turn

        setTimeout(OpponentsTurn, 500); //computers turn/ delay, so you can see the message, before it continues

    } else {

        for (let index = 0; index < (freeFields.length); index++) { // change all freeFields from O to X for hover effect

            document.getElementById(freeFields[index]).innerHTML = xImg;// X = &#x1D4E7;;
        }

        turn = xImg; // change turn to X
        document.getElementById("outputmessages").innerHTML = "X ist am Zug";
    }
    //"to " + turn)
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

    document.getElementById("restart").style.display = "inline-block"; //reveal restartbutton
    document.getElementById("StartButton").style.display = "none";
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

function restart() { // restart game

    // reset variables
    freeFields = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    fields = [[], [], [], [], [], [], [], [], []];
    turn = lastlose;
    over = false;
    playing = false;
    move = 1;

    document.getElementById("restart").style.display = "none"; // makes restartbutton disappear again
    document.getElementById("StartButton").style.display = "inline-block"; // makes StartButton appear again
    document.getElementById("StartButton").style.visibility = "visible"; // makes StartButton visible

    document.getElementById("restartButtonImg").style.animation = "none"; // reset restartButton animation

    for (let id = 1; id <= 9; id++) { // reset all fields and enable them again + reset animation

        document.getElementById(id).innerHTML = turn;
        document.getElementById(id).style.animation = "none";
    }

    document.getElementById("outputmessages").innerHTML = "Starte das Spiel"; //reset the Startmessage

    /*
    if (lastlose === xImg) {
        document.getElementById("outputmessages").innerHTML = "X beginnt"; //loser starts new game

        //DisableEnableOnHover("enable"); // reenable onhover effect for the human player -> happens in function StartTicTacToe()

    } else {
        document.getElementById("outputmessages").innerHTML = "Der Computer beginnt"; //loser starts new game
        // not reenabling onhover effect for computer

    }
*/


}
