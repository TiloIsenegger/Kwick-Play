//globale variables
var guessingLetters = [], // all guessed letters
    word = "", // cache for random chosen word
    triesLeft = 9, // tries left to guess
    turn = 1, // if player1 or player2 is on the turn
    // score of players
    scorePlayer1 = 0,
    scorePlayer2 = 0;

function changeButtons() { //changes the button to submit the word to the button to submit the letters
    document.getElementById("submitWord").style.display = "none";
    document.getElementById("submitLetter").style.display = "inline-block";
    document.getElementById("letterInput").style.display = "inline-block";
    document.getElementById("wordInput").style.display = "none";
}

function getWord() { //not complete, working so far
    let wordInput = document.getElementById("wordInput").value,
        hangman = ""; //variable for _ _ _ _ version of chosen word


    if (wordInput === "") {
        document.getElementById("outputmessages").innerHTML = "Das ist kein Wort...";
        document.getElementById('wordInput').focus(); //focus on Input field, so player can start writing imediatly
    }
    else {
        wordInput = wordInput.toUpperCase(); //word to upper case
        document.getElementById("wordInput").value = ""; //clear word input
        word += wordInput; //add wordInput to global variable word
        changeButtons();
        document.getElementById("outputmessages").innerHTML = "Spieler " + turn + " beginnt";
        hangman = testWord()[0]; //make word into _ _ _ _

        document.getElementById("outputUsedLetters").style.display = "block";
        document.getElementById("outputHangman").style.display = "block";
        document.getElementById("outputHangman").innerHTML = hangman;
        document.getElementById("hangmanPic").src = "../Pictures/hangman/hm0.png";
        document.getElementById("tries").style.display = "block";
    }
}

function testWord() {  // test if guessed letters are in the word, and put word into _ _ _ form

    let hangman = "", //variable for _ _ _ _ version of chosen word
        index = 0,
        contained = false, // if guesse letter is contained in the word
        lastLetter, // last guesse letter, used to test if contained
        space = [" "],
        punctuation = [",", ".", "-", "_", "?", "!", "'", "=", ":", ";", "+", "\"", "/", "\\", "^", "'", "´", "~", "*", "[", "]", "{", "}", "¨", "|", "¢", "¦", "¬", "&", "%", "#", "ç", "@", "<", ">", "$", "£", "§", "°"],
        numbers = ["1", "2", "3", "4", "4", "5", "6", "7", "8", "9", "0"];

    while (index < word.length) { // go through all letters of word
        letter = word[index];

        lastLetter = guessingLetters[guessingLetters.length - 1]; // last letter of all guesse letter/ latest guessing letter

        if (letter === lastLetter) { // if last guessed letter contained, good
            hangman += letter; // add letter to _ _ A _
            contained = true;

        } else {
            // if curren letter in word is number, space punctuation or got guessed, place instead of _
            if (punctuation.indexOf(letter) >= 0 || numbers.indexOf(letter) >= 0 || guessingLetters.indexOf(letter) >= 0 || space.indexOf(letter) >= 0) {
                if (space.indexOf(letter) >= 0) { // if space, add forced space because of problem 4
                    hangman += "&nbsp;";  // forced space
                } else { // add guessed letters, space, ....
                    hangman += letter;
                }
            } else { // if current letter not guessed, add _ instead
                hangman += "&nbsp;_"; // forced space + _
            }
        }

        index++;
    }
    return [hangman, contained]; // return 2 values
}

function testInputLetter() {

    let punctuation = [" ", ",", ".", "-", "_", "?", "!", "'", "=", ":", ";", "+", "\"", "/", "\\", "^", "'", "´", "~", "*", "[", "]", "{", "}", "¨", "|", "¢", "¦", "¬", "&", "%", "#", "ç", "@", "<", ">", "$", "£", "§", "°"], // all punctuation marks i could find
        numbers = ["1", "2", "3", "4", "4", "5", "6", "7", "8", "9", "0"], //all numbers
        hangman = "", //variable for _ _ _ _ version of chosen word
        guessingLetterInput = document.getElementById("letterInput").value;

    guessingLetterInput = guessingLetterInput.toUpperCase();

    while (guessingLetters.indexOf(guessingLetterInput) >= 0 || guessingLetterInput === "" || guessingLetterInput.length > 1 || punctuation.indexOf(guessingLetterInput) >= 0
        || numbers.indexOf(guessingLetterInput) >= 0) { //testing if already used, and test if letter input empty

        hangman = testWord(word)[0]; //refresh _ _ _

        if (guessingLetters.indexOf(guessingLetterInput) >= 0) { //if input already used
            document.getElementById("outputmessages").innerHTML = "Dieser Buchstabe wurde schon verwendet";
            document.getElementById("outputmessages").style.color = "red"; //change color to red
            break;
        }

        if (guessingLetterInput === "") { // if input empty
            document.getElementById("outputmessages").innerHTML = "Das ist kein Buchstabe"; //test if Inputletter empty -> New letter input
            document.getElementById("outputmessages").style.color = "red"; //change color to red
            break;
        }

        if (guessingLetterInput.length > 1) { //if you enter more than one letter

            if (guessingLetterInput === word) {
                document.getElementById("outputHangman").innerHTML = word;

                document.getElementById("outputmessages").style.color = "white"; //reset color
                end("guesser"); //guesser has won the point
                //start some win function
                break;
            }
            else {
                document.getElementById("outputmessages").innerHTML = "Nur EIN Buchstabe pro Versuch";
                document.getElementById("outputmessages").style.color = "red"; //change color to red
                break;
            }
        }

        if (punctuation.indexOf(guessingLetterInput) >= 0) {// if input not a letter
            document.getElementById("outputmessages").innerHTML = "Keine Satzzeichen eingeben";
            document.getElementById("outputmessages").style.color = "red"; //change color to red
            break;
        }

        if (numbers.indexOf(guessingLetterInput) >= 0) {
            document.getElementById("outputmessages").innerHTML = "Keine Nummern eingeben";
            document.getElementById("outputmessages").style.color = "red"; //change color to red
            break;
        }

    }
    //if else 
    if (!(guessingLetters.indexOf(guessingLetterInput) >= 0 || guessingLetterInput === "" || guessingLetterInput.length > 1
        || punctuation.indexOf(guessingLetterInput) >= 0 || numbers.indexOf(guessingLetterInput) >= 0)) { // if not any of above, continue, letter input is usable

        guessingLetters.push(guessingLetterInput); // add guessed Letter to global variable
        document.getElementById("outputUsedLetters").innerHTML = guessingLetters;
        ifContained(guessingLetterInput); //start next function
    }
    document.getElementById("letterInput").value = ""; //clear input field
    document.getElementById('letterInput').focus(); //focus on Input field, so player can start writing imediatly
}

function ifContained(guessingLetterInput) { // main function, looks if input letter contained, test for win

    let hangman = ""; //variable for _ _ _ _ version of chosen word

    hangman = testWord()[0]; //builds the word

    document.getElementById("outputHangman").innerHTML = hangman;//actualise hangman

    contained = testWord()[1]; //checkes if last guessed letter is contained in the Word

    if (contained === false) { //informs you if letter is contained or not

        triesLeft -= 1; // remove one try

        // short pulse animation
        document.getElementById("tries").style.animation = "pointTwoPulse 0.5s ease-in-out 1";

        setTimeout(function () { //wait till animation over
            //clear animation
            document.getElementById("tries").style.animation = "none";
        }, 500)

        refreshPic(); // update picture

        document.getElementById("tries").innerHTML = triesLeft;

        //change picture
        document.getElementById("outputmessages").style.color = "white"; //reset color
        document.getElementById("outputmessages").innerHTML = "Der Buchstabe " + guessingLetterInput + " kommt nicht vor." // update message                     
    } else {
        document.getElementById("outputmessages").style.color = "white"; //reset color
        document.getElementById("outputmessages").innerHTML = "Der Buchstabe " + guessingLetterInput + " kommt vor." // update message                      
    }


    if (triesLeft <= 0) { // test if game over

        end("wordinventer"); //other guy has won the point
    }
    if (hangman === word || guessingLetterInput === word) {

        end("guesser"); //guesser has won the point
    }
}

function refreshPic() {
    if (triesLeft === 8) {
        document.getElementById("hangmanPic").src = "../Pictures/hangman/hm1.png"
    }
    if (triesLeft === 7) {
        document.getElementById("hangmanPic").src = "../Pictures/hangman/hm2.png"
    }
    if (triesLeft === 6) {
        document.getElementById("hangmanPic").src = "../Pictures/hangman/hm3.png"
    }
    if (triesLeft === 5) {
        document.getElementById("hangmanPic").src = "../Pictures/hangman/hm4.png"
    }
    if (triesLeft === 4) {
        document.getElementById("hangmanPic").src = "../Pictures/hangman/hm5.png"
    }
    if (triesLeft === 3) {
        document.getElementById("hangmanPic").src = "../Pictures/hangman/hm6.png"
    }
    if (triesLeft === 2) {
        document.getElementById("hangmanPic").src = "../Pictures/hangman/hm7.png"
    }
    if (triesLeft === 1) {
        document.getElementById("hangmanPic").src = "../Pictures/hangman/hm8.png"
    }
    if (triesLeft === 0) {
        document.getElementById("hangmanPic").src = "../Pictures/hangman/hm9.png"
        // pulse animation if lose
        document.getElementById("hangmanPic").style.animation = "pointOnePulse 1s ease-in-out infinite";
    }
}

function end(type) { // end function, 2 types of ending

    document.getElementById("letterInput").disabled = true; // make input unclickable

    //award points
    if (type === "guesser") { // if guesser has guessed the word

        if (turn === 1) { // distribute points

            scorePlayer1 += 1;
        } else {

            scorePlayer2 += 1;
        }
        document.getElementById("outputmessages").innerHTML = "Spieler " + turn + " hat das Wort erraten, das Wort war " + word + "<br> Er brauchte " + (9 - triesLeft) + " Versuche"; //reveal solution
        //animation
        document.getElementById("player" + turn).style.animation = "pulse 1.5s ease-in-out 1";
    }
    else { // if guesser hasn't guessed the word

        //change color
        document.getElementById("tries").style.color = "red";

        if (turn === 1) { // distribute points

            scorePlayer2 += 1;
            //animation
            document.getElementById("player2").style.animation = "pulse 1.5s ease-in-out 1";
        } else {

            scorePlayer1 += 1;
            //animation
            document.getElementById("player1").style.animation = "pulse 1.5s ease-in-out 1";
        }
        document.getElementById("outputmessages").innerHTML = "Spieler " + turn + " hat keine Versuche mehr, das Wort war " + word; //reveal solution

    }

    //update score
    document.getElementById("player1").innerHTML = "Spieler 1<br>" + scorePlayer1;
    document.getElementById("player2").innerHTML = "Spieler 2<br>" + scorePlayer2;


    if (scorePlayer1 === 5 || scorePlayer2 === 5) { //test if someone has score of 5 -> win whole game
        // delay, so messages above can be displayed first
        setTimeout(function () {
            document.getElementById("hangmanPic").style.animation = "idle"; // remove pulsing animation for win animation
            if (scorePlayer1 === 5) { // if player 1 has won
                // change messages, colors and animations
                document.getElementById("outputmessages").innerHTML = "Spieler 1 hat gewonnen!";
                document.getElementById("player1").style.animation = "pointOnePulse 1.5s ease-in-out infinite";
                /*document.getElementById("player1").style.border = "0.208vw solid rgb(0, 191, 16)";*/
                document.getElementById("player1").style.backgroundColor = "rgb(0, 191, 16)";
            } else { // if player 2 has won
                // change messages, colors and animations
                document.getElementById("outputmessages").innerHTML = "Spieler 2 hat gewonnen!";
                document.getElementById("player2").style.animation = "pulse 1.5s ease-in-out infinite";
                /*document.getElementById("player2").style.border = "0.208vw solid rgb(0, 191, 16)";*/
                document.getElementById("player2").style.backgroundColor = "rgb(0, 191, 16)";
            }
            // complete restart preparation
            document.getElementById("submitLetter").style.display = "none"; // make submit button disappear
            document.getElementById("restart").style.display = "inline-block"; // make restart button appear
        }, 2000)

    } else {
        // continue with next round
        document.getElementById("submitLetter").style.display = "none"; // make submit button disappear
        document.getElementById("nextRound").style.display = "inline-block"; // make nextRound button appear
    }


}

function nextRound() { // start next round, reset buttons, input fields and messages
    //reset pic
    document.getElementById("hangmanPic").src = "../Pictures/hangman/hm.png";

    // reset animation
    document.getElementById("player" + turn).style.animation = "none 1.5s ease-in-out 1";
    document.getElementById("hangmanPic").style.animation = "none";

    //reset color
    document.getElementById("tries").style.color = "white";

    //reset text
    document.getElementById("letterInput").disabled = false; //make it usable again
    document.getElementById("outputmessages").innerHTML = "Spieler " + turn + ": Wort eingeben";
    document.getElementById("outputHangman").innerHTML = "&nbsp;";
    document.getElementById("outputUsedLetters").innerHTML = "&nbsp;";
    document.getElementById("tries").innerHTML = "9";

    //reset variables
    guessingLetters = [];
    triesLeft = 9;
    word = "";

    //change turn
    if (turn === 1) {

        turn = 2;
    } else {

        turn = 1;
    }

    //change input field and buttons
    document.getElementById("letterInput").style.display = "none";
    document.getElementById("wordInput").style.display = "inline-block";
    document.getElementById('wordInput').focus(); //focus on Input field, so player can start writing imediatly
    document.getElementById("nextRound").style.display = "none";
    document.getElementById("submitWord").style.display = "inline-block";
}

function StartRestartAnimation() { // start restart animation in css

    document.getElementById("restartButtonImg").style.animation = "restartAnimation  0.5s 1"; // add animation to restart button
    setTimeout(function () { // delay so animation can finish
        restart()
    }, 550)
}

function restart() { // complete restart, also reset scores 
    // reset pic
    document.getElementById("hangmanPic").src = "../Pictures/hangman/hm.png";

    // reset animations
    document.getElementById("player1").style.animation = "none 1.5s ease-in-out infinite";
    document.getElementById("player2").style.animation = "none 1.5s ease-in-out infinite";
    document.getElementById("restartButtonImg").style.animation = "none";

    // reset text
    document.getElementById("letterInput").disabled = false; //make it usable again
    document.getElementById("outputmessages").innerHTML = "Spieler 2: Wort eingeben";
    document.getElementById("outputHangman").innerHTML = "&nbsp;";
    document.getElementById("outputUsedLetters").innerHTML = "&nbsp;";
    document.getElementById("tries").innerHTML = "9";

    // reset colors
    document.getElementById("player1").style.backgroundColor = "rgb(99, 124, 249)";
    document.getElementById("player2").style.backgroundColor = "rgb(99, 124, 249)";
    document.getElementById("player1").style.border = "none";
    document.getElementById("player2").style.border = "none";

    // reset variables
    guessingLetters = [];
    triesLeft = 9;
    word = "";
    turn = 1;
    scorePlayer1 = 0;
    scorePlayer2 = 0;

    // change input field an buttons
    document.getElementById("letterInput").style.display = "none";
    document.getElementById("wordInput").style.display = "inline-block";
    document.getElementById("restart").style.display = "none";
    document.getElementById("submitWord").style.display = "inline-block";

    // update/reset score
    document.getElementById("player1").innerHTML = "Spieler 1<br>" + scorePlayer1;
    document.getElementById("player2").innerHTML = "Spieler 2<br>" + scorePlayer2;
}