


//globale variables
var guessingLetters = [], // all guesse letters
    word = "", // cache for random chosen word
    triesLeft = 9, // tries left to guess
    words = [], // long word list
    punctuation = [" ", ",", ".", "-", "_", "?", "!", "'", "=", ":", ";", "+", "\"", "/", "\\", "^", "'", "´", "~", "*", "[", "]", "{", "}", "¨", "|", "¢", "¦", "¬", "&", "%", "#", "ç", "@", "<", ">", "$", "£", "§", "°"],
    space = [" "],
    numbers = ["1", "2", "3", "4", "4", "5", "6", "7", "8", "9", "0"],
    easyShortWords = [
        "Auto",
        "Reflektion",
        "Kopfhörer",
        "Wald",
        "Weihnachten",
        "Klavier",
        "Schokolade",
        "Wasser",
        "Kürbis",
        "Computer",
        "Hund",
        "Computerspiel",
        "Haus",
        "Lampe",
        "Schiff",
        "Katastrophe",
        "Strassenbahn",
        "Exkommunikation",
        "Erbstück",
        "Apfel",
        "Berg",
        "Dusche",
        "Elefant",
        "Feuerwerk",
        "Gitarre",
        "Himmel",
        "Insekt",
        "Joghurt",
        "Kaffee",
        "Lampe",
        "Mond",
        "Nudeln",
        "Ozean",
        "Pizza",
        "Quarz",
        "Regenbogen",
        "Sonne",
        "Tiger",
        "Unterwasser",
        "Vulkan",
        "Wald",
        "Zitrone",
        "Bücherregal",
        "Champagner",
        "Drache",
        "Eiscreme",
        "Fotografie",
        "Geige",
        "Insel",
        "Jeans",
        "Kaktus",
        "Laterne",
        "Muschel",
        "Nashorn",
        "Ohr",
        "Papagei",
        "Quelle",
        "Rennwagen",
        "Schokolade",
        "Taschenuhr",
        "Unterhose",
        "Vase",
        "Wasserfall",
        "Zeppelin",
        "Astronaut",
        "Boot",
        "Chili",
        "Diamant",
        "Erdbeere",
        "Fenster",
        "Gorilla",
        "Hai",
        "Igel",
        "Jäger",
        "Kanone",
        "Laptop",
        "Mikrofon",
        "Nebel",
        "Orange",
        "Pirat",
        "Qualle",
        "Rakete",
        "Sanduhr",
        "Tornado",
        "Uhr",
        "Vogel",
        "Wolke",
        "Zahn",
        "Apfelbaum",
        "Ballon",
        "Dinosaurier",
        "Ente",
        "Fahrrad",
        "Garten",
        "Hose",
        "Iglu",
        "Jazz",
        "Käse",
        "Laptop",
        "Massband",
        "Nadel",
        "Olympiade",
        "Paprika",
        "Ritter",
        "Salat",
        "Torte",
        "Unterseeboot",
        "Vampire",
        "Wal",
        "Zelt"
    ]; // wordlist for random chosen word


words = easyShortWords;




// functions

function changeButtons() { //changes the button to submit the word to the button to submit the letters
    document.getElementById("submitWord").style.display = "none";
    document.getElementById("submitLetter").style.display = "inline-block";
    document.getElementById("letterInput").style.display = "inline-block";
    document.getElementById("letterInput").focus(); // not working
}

function getWord() { // choose ranom word from wordlist
    let hangman = "", //variable for _ _ _ _ version of chosen word
        chosenWord = "", // random chosen word
        random = Math.floor(Math.random() * (words.length - 1)); // random number between number of available words in list and 0

    document.getElementById("hangmanPic").src = "../Pictures/hangman/hm0.png";


    chosenWord = words[random]; // choose random word
    chosenWord = chosenWord.toUpperCase(); //word to upper case
    word += chosenWord; //add chosen Word to global variable word
    changeButtons(); // change buttons
    document.getElementById("outputmessages").innerHTML = "Das Spiel beginnt"; // change message
    hangman = testWord()[0]; //make word into _ _ _ _

    // update stuff
    document.getElementById("outputUsedLetters").style.display = "block";
    document.getElementById("outputHangman").style.display = "block";
    document.getElementById("tries").style.display = "block";
    document.getElementById("outputHangman").innerHTML = hangman;

    document.getElementById('letterInput').focus(); //focus on Input field, so player can start writing imediatly

}

function testWord() {  // test if guessed letters are in the word, and put word into _ _ _ form

    let hangman = "", //variable for _ _ _ _ version of chosen word
        contained = false, // if guesse letter is contained in the word
        lastLetter; // last guesse letter, used to test if contained


    for (let index = 0; index < word.length; index++) { // go through all letters of word
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
    }

    return [hangman, contained]; // return 2 values
}

function testInputLetter() {

    let hangman = "", //variable for _ _ _ _ version of chosen word
        guessingLetterInput = document.getElementById("letterInput").value; // get input letter

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
                end("guessed"); //guesser has won
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
            document.getElementById("outputmessages").innerHTML = "Keine Numbern eingeben";
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

    document.getElementById("outputHangman").innerHTML = hangman; //update hangman

    contained = testWord()[1]; //checkes if last guessed letter is contained in the Word

    document.getElementById("letterInput").value = ""; //clear input field

    if (contained === false) { //informs you if letter is contained or not

        triesLeft -= 1; // remove one try

        // short pulse animation
        document.getElementById("tries").style.animation = "pointTwoPulse 0.5s ease-in-out 1";

        setTimeout(function () { //wait till animation over
            //clear animation
            document.getElementById("tries").style.animation = "none";
        }, 500)

        refreshPic(); // update picture

        document.getElementById("tries").innerHTML = triesLeft; // update triesLeft on website

        document.getElementById("outputmessages").style.color = "white";//reset color
        document.getElementById("outputmessages").innerHTML = "Der Buchstabe " + guessingLetterInput + " kommt nicht vor"; // update message

    } else {
        document.getElementById("outputmessages").style.color = "white"; //reset color
        document.getElementById("outputmessages").innerHTML = "Der Buchstabe " + guessingLetterInput + " kommt vor" // update message
    }


    if (triesLeft <= 0) {

        end("f"); //guesser has lost

    }
    if (hangman === word || guessingLetterInput === word) {

        end("guessed"); //guesser has won

    }
}

function refreshPic() { // change picture, when tries left changes
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
        // pulse animation if lose, -> not in use right now
        document.getElementById("hangmanPic").style.animation = "pointOnePulse 1s ease-in-out infinite";
    }
}

function end(type) { // end function, 2 types of ending

    document.getElementById("letterInput").disabled = true; // make input unclickable/unusable
    // maby change pic

    // add animation
    /*setTimeout(function () { //wait till other animation over
        //clear animation
        document.getElementById("tries").style.animation = "bigPulse 2s ease-in-out infinite";
    }, 500)*/

    if (type === "guessed") { // player guessed the word
        document.getElementById("outputmessages").innerHTML = "Du hast das Wort erraten, das Wort war " + word + "<br> Du hast " + (9 - triesLeft) + " Versuche gebraucht";
    } else { // player didn't guess the word
        //change color
        document.getElementById("tries").style.color = "red";
        document.getElementById("outputmessages").innerHTML = "Du hast keine Versuche mehr, das Wort war " + word;
    }


    document.getElementById("submitLetter").style.display = "none";
    document.getElementById("restart").style.display = "inline-block";

}

function StartRestartAnimation() { // start restart animation in css, -> not in use right now

    document.getElementById("restartButtonImg").style.animation = "restartAnimation  0.5s 1"; // add animation to restart button
    setTimeout(function () { // delay so animation can finish
        restart()
    }, 550)
}

function restart() { // start new game

    document.getElementById("letterInput").style.display = "none";
    document.getElementById("outputHangman").style.display = "none";
    document.getElementById("outputUsedLetters").style.display = "none";

    //reset pic
    document.getElementById("hangmanPic").src = "../Pictures/hangman/hm.png";

    //reset animation
    document.getElementById("tries").style.animation = "none";
    document.getElementById("restartButtonImg").style.animation = "none";
    document.getElementById("hangmanPic").style.animation = "none"; // remove pulsing animation from picture

    //reset variables
    guessingLetters = [];
    triesLeft = 9;
    word = "";

    //reset text
    document.getElementById("letterInput").disabled = false; //make it usable again
    document.getElementById("outputmessages").innerHTML = "Ein neues Wort wird ausgewählt";
    document.getElementById("outputHangman").innerHTML = "&nbsp;";
    document.getElementById("outputUsedLetters").innerHTML = "&nbsp;";
    document.getElementById("tries").innerHTML = "9";
    document.getElementById("tries").style.color = "white";

    // change buttons
    document.getElementById("restart").style.display = "none";
    document.getElementById("submitWord").style.display = "inline-block";

    document.getElementById("submitWord").click();
}
