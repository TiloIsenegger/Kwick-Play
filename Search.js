var GamesList = [["hangman", "galgenmännchen", "henker"], ["tictactoe", "tic tac toe", "drei gewinnt"], ["unscramble", "entschlüsseln", "entwirren"]],
    SearchInputField,
    SearchInputFieldValue,
    SearchInputFieldDisplay = "none";



function searchForGames() {
    SearchInputField = document.getElementById("searchInputField");

    SearchInputFieldValue = SearchInputField.value
    SearchInputFieldValue = SearchInputFieldValue.toLowerCase();


    for (let amountOfGames = GamesList.length - 1; amountOfGames >= 0; amountOfGames--) {

        document.getElementById(GamesList[amountOfGames][0]).style.display = "none";
    }

    // check if input part of any existing game in GamesList
    // go throuh every game
    for (let amountOfGames = GamesList.length - 1; amountOfGames >= 0; amountOfGames--) {

        // go throuh every different name per Game
        for (let amountOfNamesPerGame = GamesList[amountOfGames].length - 1; amountOfNamesPerGame >= 0; amountOfNamesPerGame--) {

            // hide every game which does not include the inputvalue
            if (GamesList[amountOfGames][amountOfNamesPerGame].indexOf(SearchInputFieldValue) >= 0) {

                document.getElementById(GamesList[amountOfGames][0]).style.display = "flex";

            }
        }

    }

}

function changeSearchInputFieldDisplay() {

    document.getElementById("searchInputField").value = "";

    for (let amountOfGames = GamesList.length - 1; amountOfGames >= 0; amountOfGames--) {

        document.getElementById(GamesList[amountOfGames][0]).style.display = "flex";

    }

    console.log(screen.width)

    if (SearchInputFieldDisplay === "none") {
        document.getElementById("searchInputField").style.display = "inline-block";

        SearchInputFieldDisplay = "inline-block";
        document.getElementById("searchInputField").focus();

        if (screen.width < 700) {

            console.log("1")
            document.getElementById("navBarMain").style.justifyContent = "left";
        }
    }
    else {
        if (SearchInputFieldDisplay === "inline-block") {
            document.getElementById("searchInputField").style.display = "none";
            SearchInputFieldDisplay = "none";

            if (screen.width < 700) {

                document.getElementById("navBarMain").style.justifyContent = "";
            }
        }
    }

}