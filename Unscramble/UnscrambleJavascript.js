
// global variables below

var word = "", // random chosen word
    wordLetters = [], // chosen word devided into single letters
    scrambledWordLetters = [], // single letters mixed
    scrambledWord = "", // mixed single letters back together in one word
    wordCounter = 0, // counter for correctly guessed words
    newScrambleTries = 0, // counts how often the word got rescrambled, if to hight -> error
    wordsBackup = [], // backupwordlist, to reset wordlist for new use
    words = [],// wordlist
    seconds = 120, // time in seconds for countdown, 1-2 sec less because of delay;
    CountdownTime = "2:00", // for final points message, same as seconds, but seconds get changed in countdown()
    skiped = false, // if word got skipped, other message
    difficulty = 2, // 1 -> first and last letter of word at correct pos, 2 -> only first letter at correct pos, 3 -> no letter at correct pos (at least on purpose)
    playing = false, // if game has starte or not
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
wordsBackup = easyShortWords;



// functions below

function changeUnscrambleDifficulty(type) { // change the difficulty

    if (playing === false) { // if game has started, you can no longer change the difficulty

        if (type === "add") {
            difficulty++;
            document.getElementById("UnscrambleDifficultyButtonDeduct").disabled = false;

            if (difficulty >= 3) {
                document.getElementById("UnscrambleDifficultyButtonAdd").disabled = true;
            }
            document.getElementById("UnscrambleDifficulty").innerHTML = "Aktuelle Schwierigkeit: " + difficulty;
        }

        if (type === "deduct") {
            difficulty--;
            document.getElementById("UnscrambleDifficultyButtonAdd").disabled = false;

            if (difficulty <= 1) {
                document.getElementById("UnscrambleDifficultyButtonDeduct").disabled = true;
            }
            document.getElementById("UnscrambleDifficulty").innerHTML = "Aktuelle Schwierigkeit: " + difficulty;
        }

    }
}

function changeUnscrambleCountdown(type) { //change the countdown duration


    if (playing === false) {

        if (type === "add") {

            seconds += 30;
            document.getElementById("UnscrambleCountdownButtonDeduct").disabled = false;

            if (seconds >= 180) {
                document.getElementById("UnscrambleCountdownButtonAdd").disabled = true;
            }

            let minutes = Math.floor(seconds / 60),
                remainingSeconds = seconds % 60,
                timeString = minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;

            CountdownTime = timeString;

            document.getElementById("UnscrambleCountdown").innerHTML = "Aktueller Timer: " + timeString;
            document.getElementById("countdown").innerHTML = "Verbleibende Zeit:<br>" + timeString;
        }

        if (type === "deduct") {

            seconds -= 30;
            document.getElementById("UnscrambleCountdownButtonAdd").disabled = false;

            if (seconds <= 60) {
                document.getElementById("UnscrambleCountdownButtonDeduct").disabled = true;
            }

            let minutes = Math.floor(seconds / 60),
                remainingSeconds = seconds % 60,
                timeString = minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;

            CountdownTime = timeString;

            document.getElementById("UnscrambleCountdown").innerHTML = "Aktueller Timer: " + timeString;
            document.getElementById("countdown").innerHTML = "Verbleibende Zeit:<br>" + timeString;
        }

    }
}

function fisherYatesShuffle(arr) { // used to shuffle the letters from the chosen word, from https://www.delftstack.com/de/howto/javascript/shuffle-array-javascript/
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)); //random index
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
}

function getWord() { // choose random word from wordlist for scrambling

    newScrambleTries = 0; // reset tries

    document.getElementById('WordInput').focus(); //focus on Input field, so player can start writing imediatly

    word = words[Math.floor(Math.random() * (words.length - 1))];

    words.splice(words.indexOf(word), 1); // remove chosen word from list, as not to get chosen twice
    word = word.toUpperCase();

    //console.log("wort: " + word)

    // start next functions
    wordDismantle();
    wordScramble();
}

function wordDismantle() { // dismantle word into single letters
    wordLetters = []; // clear array before use

    for (let i = 0; i < word.length; i++) {
        wordLetters.push(word[i]);
    }
}

function wordScramble() { // arranges the dismantled letters in random order
    scrambledWord = ""; // reset variable

    var lastLetter = "";

    //console.log(wordLetters)

    if (difficulty === 1) { // 1 -> first and last letter of word at correct pos

        //console.log("d1")
        scrambledWord += wordLetters[0]; // add first letter to scrambled word
        wordLetters.splice(0, 1); // remove used letter from array as not to get used twice

        //console.log(wordLetters)

        if (wordLetters.length >= 6) { // the last letter is only at corr. pos. if the word is long enough

            //console.log("long enough")
            lastLetter = wordLetters[wordLetters.length - 1]; // assign last letter to variable for later use
            wordLetters.splice(wordLetters.length - 1, 1); // remove first letter from array
        }
        //console.log(wordLetters)

        fisherYatesShuffle(wordLetters); // shuffle array
        //console.log("after: " + wordLetters)

        for (let i = 0; i < wordLetters.length; i++) { // add shuffled letters to final word

            scrambledWord += wordLetters[i];


        }

        scrambledWord += lastLetter; // add last letter to final word, if empty, "" get's added
        //console.log(scrambledWord)
    }

    if (difficulty === 2) { // 2 -> only first letter at correct pos

        //console.log("d2")
        scrambledWord += wordLetters[0]; // add first letter to scrambled word
        wordLetters.splice(0, 1); // remove used letter from array as not to get used twice


        fisherYatesShuffle(wordLetters); // shuffle array

        for (let i = 0; i < wordLetters.length; i++) { // add shuffled letters to final word

            scrambledWord += wordLetters[i];


        }
    }

    if (difficulty === 3) { //  3 -> all letters get random pos

        //console.log("d3")
        fisherYatesShuffle(wordLetters); // shuffle array

        for (let i = 0; i < wordLetters.length; i++) { // add shuffled letters to final word

            scrambledWord += wordLetters[i];


        }
    }


    // start next function
    checkScrambledWord();
}

function checkScrambledWord() { // make sure, that scrambled word realy got scrambled

    if (scrambledWord === word) {

        if (newScrambleTries <= 10) {

            // resrcamble word
            newScrambleTries++;
            wordDismantle();
            wordScramble();
        }
        if (newScrambleTries > 10) {

            // if not, get new word
            getWord()
        }
    }
    else {

        // if it got scrambled correctly, continue
        document.getElementById("outputScrambledWord").style.display = "block";
        document.getElementById("outputScrambledWord").innerHTML = scrambledWord;


        if (wordCounter === 0) {
            document.getElementById("outputmessages").style.color = "inherit"
            if (skiped !== true) { // when skiped, don't show this message    
                document.getElementById("outputmessages").innerHTML = "Versuche das Wort zu erraten";
            }
        }

        // show skipbutton
        document.getElementById("skipButton").style.display = "inline-block";

        changeButtons("generateWord", "submitWord", false); // change buttons, first diappear, second appear, enable disable fields/buttons
        //continue
    }

}

function skip() { // skip current word, deduct one point, get new word
    if (wordCounter !== 0) {
        // deduct point
        wordCounter -= 1;
        document.getElementById("points").innerHTML = "Punkte:<br><span id='number'>" + wordCounter + "</span>";

        // animation
        document.getElementById("points").style.animation = "none";
        document.getElementById("points").style.animation = "letterPulseRed 1s ease-in-out 1";

        setTimeout(function () { // delay, so animation above can finish
            document.getElementById("points").style.animation = "none";
        }, 1000)

        //text
        document.getElementById("outputmessages").innerHTML = "Wort " + word + " übersprungen, ein neues wurde generiert"
        skiped = true; // for skipping other message in getWord()

        //get new word
        getWord()
    } else {

        // show skipbutton
        document.getElementById("skipButton").style.animation = "SkipFailedRed .25s ease-in-out 1";

        //text, style
        document.getElementById("outputmessages").style.color = "red"
        document.getElementById("outputmessages").innerHTML = "Du hast keine Punkte"

        setTimeout(function () { // after animation over, remove animation
            document.getElementById("skipButton").style.animation = "none";
        }, 250);
    }
}

function changeButtons(id1, id2, boolean) { //changes the button id1 with id2

    document.getElementById(id1).style.display = "none"; // make button id1 disappear
    document.getElementById(id2).style.display = "inline-block"; // make button id2 appear
    document.getElementById("WordInput").disabled = boolean; // enable input field
    document.getElementById("submitWord").disabled = boolean; // enable button
}

function testInputWord() { // test input word from player

    let input = document.getElementById("WordInput").value; // get input value
    document.getElementById("WordInput").value = ""; // reset inputfield

    input = input.toUpperCase();

    if (input === word) { // if guessed correct..
        document.getElementById("outputmessages").style.color = "inherit"
        document.getElementById("outputmessages").innerHTML = "Richtig! Das Word war " + word; // change message, not happy
        wordCounter++; // add point to points counter
        document.getElementById("points").innerHTML = "Punkte:<br>" + wordCounter; // refresh word counter
        document.getElementById("points").style.animation = "letterPulseGreen 1s ease-in-out 1"; // short pulse animation
        skiped = false; // so message not get skipped
        setTimeout(function () { // delay, so animation above can finish
            document.getElementById("points").style.animation = "none";
        }, 1000)
        //next word
        getWord(); // generate new word

    } else { // if guess is not correct
        document.getElementById("outputmessages").style.color = "red"
        document.getElementById("outputmessages").innerHTML = "Falsch! Versuche es noch einmal"; // change message, not happy

    }
}

function countdown() { // countdown, mithilfe von Internet und Chatgpt   
    playing = true; // game has started    
    seconds -= 2; // 1-2 sec less because of delay;

    let countdownInterval = setInterval(function () {
        if (seconds <= 0) {
            clearInterval(countdownInterval); // stop timer if over

            document.getElementById("countdown").style.animation = "idle";
            //console.log("here")
            document.getElementById("countdown").style.backgroundColor = "rgb(99, 124, 249)"
            document.getElementById("countdown").style.color = "red";

            // change messages
            document.getElementById("outputmessages").innerHTML = "Zeit abgelaufen!";
            document.getElementById("countdown").innerHTML = "Verbleibende Zeit:<br>0:00";

            // disable input field and button
            document.getElementById("submitWord").disabled = true;
            document.getElementById("WordInput").disabled = true;

            // changes with delay + final points "show"

            document.getElementById("points").innerHTML = "Finale<br>Punktzahl:<br><p class='finalPoints'>" + wordCounter + "</p><br><p class='EndresultInfos'>Schwierigkeit: " + difficulty + "<br>Zeit: " + CountdownTime + "</p>"; //"Finale<br>Punktzahl:<br><p class='finalPoints'>" + wordCounter + "</p>"

            document.getElementById("points").style.animation = "finalPointsGrowAnimation 1s ease 1";
            setTimeout(function () {
                document.getElementById("points").style.animation = "finalPointsGrow 1s infinite";
            }, 990)

            if (screen.width < 700) {

                document.getElementById("points").classList.remove("points");
                document.getElementById("points").classList.add("endresult");
                console.log(document.getElementById("points").classList)

                /*
                document.getElementById("points").style.width = "80% !important";
                document.getElementById("points").style.margin = "auto";
                document.getElementById("points").style.fontSize = "15.0012vw !important";
                document.getElementById("points").style.marginTop = "3.7512vw !important";
                */
            }

            document.getElementById("outputScrambledWord").style.display = "none";
            points
            // show restartButton, hide skip button
            document.getElementById("restartButton").style.display = "inline-block";
            document.getElementById("skipButton").style.display = "none"

        } else {
            // update variables
            let minutes = Math.floor(seconds / 60);
            let remainingSeconds = seconds % 60;
            let timeString = "Verbleibende Zeit:<br>" + minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
            // refresh countdown on website
            document.getElementById("countdown").innerHTML = timeString;
            seconds--;
        }

        if (seconds < 10 && seconds >= 0) {
            // Add the warning class to the countdown element
            document.getElementById("countdown").style.animation = "warnsignal 1s linear 10";
        }

    }, 1000); // Update alle 1 Sekunde
}

function StartRestartAnimation() { // start animation in css
    document.getElementById("restartButtonImg").style.animation = "restartAnimation  0.5s 1"; // add animation to restart button
    setTimeout(function () { // delay so animation can finish
        restart()
    }, 550)
}

function restart() { // restart function

    // reset variables
    //console.log("reset")
    words = wordsBackup;
    seconds = 178;
    playing = false;

    document.getElementById("countdown").classList.remove("warning") // remove warning class

    // reset buttons, animations, colors and inputfields

    document.getElementById("outputmessages").style.color = "inherit"
    document.getElementById("restartButton").style.display = "none";
    document.getElementById("restartButtonImg").style.animation = "none";
    changeButtons("submitWord", "generateWord", true); // change buttons, first diappear, second appear, enable disable fields/buttons
    document.getElementById("outputScrambledWord").style.display = "none";
    document.getElementById("points").innerHTML = "Punkte:<br><span id='number'>0</span>";
    document.getElementById("countdown").style.animation = "none";
    document.getElementById("points").style.animation = "none";

    // reset text
    document.getElementById("number").innerHTML = "0";
    document.getElementById("countdown").innerHTML = "Verbleibende Zeit:<br>2:00";
    document.getElementById("countdown").style.color = "inherit";
    document.getElementById("outputmessages").innerHTML = "Starte das Spiel";

    document.getElementById("points").style.width = "30%";
    document.getElementById("points").style.fontSize = "1.3vw";
    document.getElementById("points").style.marginLeft = "35%";

    if (screen.width < 700) {
        document.getElementById("points").classList.add("points");
        document.getElementById("points").classList.remove("endresult");
        console.log(document.getElementById("points").classList)
        /*
        document.getElementById("points").style.width = "30%";
        document.getElementById("points").style.fontSize = "4.68vw";
        document.getElementById("points").style.marginTop = "3.7512vw";
        */
    }

}
