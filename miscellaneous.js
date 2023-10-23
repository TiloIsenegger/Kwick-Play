var DropdownContentDisplay = "none";

function changeInfoDropdownVisibility(DropdownId) {

    if (screen.width < 700) {

        if (DropdownContentDisplay === "none") {
            document.getElementById(DropdownId).style.display = "block";

            DropdownContentDisplay = "block";
        }
        else {
            if (DropdownContentDisplay === "block") {
                document.getElementById(DropdownId).style.display = "none";
                DropdownContentDisplay = "none";

            }
        }
    }
}