var priority = new Map(); // prioritysystem for computer, so if X and O have both 2 in a row and just one is missing to win, computer chooses to finish his line and win instead of blocking his opponent from winning

function OpponentLevel2BasicIfRules() {

    for (let id = 0; id <= 2; id++) { //check vertical rows

        //check for all 3 possible configurations
        if ((fields[id] === fields[id + 3]) && (fields[id + 6].length === 0)) {

            // check if configuration X or O, if O(computer) then priority 1
            if (fields[id] === oImg && fields[id + 3] === oImg) {

                //console.log("1, id + 7")
                priority.set([id + 7, "vert.Ty1"], 1); // (key, value) -> ([field, type], priority) -> field where to place O, type so there won't be the same key twice, priority to sort for best option
                //console.log(priority)
            }
            else {

                //console.log("2, id + 7")
                priority.set([id + 7, "vert.Ty1"], 2);
                //console.log(priority)
            }          
        }

        if ((fields[id + 3] === fields[id + 6]) && (fields[id].length === 0)) {

            if (fields[id + 3] === oImg && fields[id + 6] === oImg) {
                //console.log("1, id + 1")
                priority.set([id + 1, "vert.Ty2"], 1);
                //console.log(priority)
            }
            else {
                //console.log("2, id + 1")
                priority.set([id + 1, "vert.Ty2"], 2);
                //console.log(priority)
            }            
        }

        if ((fields[id] === fields[id + 6]) && (fields[id + 3].length === 0)) {

            if (fields[id] === oImg && fields[id + 6] === oImg) {
                //console.log("1, id + 4")
                priority.set([id + 4, "vert.Ty3"], 1);
                //console.log(priority)
            }
            else {
                //console.log("2, id + 4")
                priority.set([id + 4, "vert.Ty3"], 2);
                //console.log(priority)
            }
        }
    }

    for (let id = 0; id <= 6; id += 3) { //check horizontal rows

        if ((fields[id] === fields[id + 1]) && (fields[id + 2].length === 0)) {

            if (fields[id] === oImg && fields[id + 1] === oImg) {
                
                priority.set([id + 3, "hor.Ty1"], 1);
            }
            else {
                
                priority.set([id + 3, "hor.Ty1"], 2);
            }
        }

        if ((fields[id + 1] === fields[id + 2]) && (fields[id].length === 0)) {

            if (fields[id + 1] === oImg && fields[id + 2] === oImg) {
                
                priority.set([id + 1, "hor.Ty2"], 1);
            }
            else {
                
                priority.set([id + 1, "hor.Ty2"], 2);
            } 
        }

        if ((fields[id] === fields[id + 2]) && (fields[id + 1].length === 0)) {

            if (fields[id] === oImg && fields[id+ 2] === oImg) {
                
                priority.set([id + 2, "hor.Ty3"], 1);
            }
            else {
                
                priority.set([id + 2, "hor.Ty3"], 2);
            }  
        }
    }

    //check diagonal row 1
    if ((fields[0] === fields[4]) && (fields[8].length === 0)) {

        if (fields[0] === oImg && fields[4] === oImg) {
            //console.log("1, 9")
            priority.set([9, "diag1.Ty1"], 1);
                //console.log(priority)
        }
        else {
            //console.log("2, 9")
            priority.set([9, "diag1.Ty1"], 2);
                //console.log(priority)
        }
    }

    if ((fields[0] === fields[8]) && (fields[4].length === 0)) {

        if (fields[0] === oImg && fields[8] === oImg) {
            //console.log("1, 5")
            priority.set([5, "diag1.Ty2"], 1);
                //console.log(priority)
        }
        else {
            //console.log("2, 5")
            priority.set([5, "diag1.Ty2"], 2);
                //console.log(priority)
        }
    }

    if ((fields[4] === fields[8]) && (fields[0].length === 0)) {

        if (fields[4] === oImg && fields[8] === oImg) {
            //console.log("1, 1")
            priority.set([1, "diag1.Ty3"], 1);
                //console.log(priority)
        }
        else {
            //console.log("2, 1")
            priority.set([1, "diag1.Ty3"], 2);
                //console.log(priority)
        }
    }

    //check diagonal row 2
    if ((fields[2] === fields[4]) && (fields[6].length === 0)) {

        if (fields[2] === oImg && fields[4] === oImg) {
            //console.log("1, 7")
            priority.set([7, "diag2.Ty1"], 1);
            //console.log(priority)
        }
        else {
            //console.log("2, 7")
            priority.set([7, "diag2.Ty1"], 2);
            //console.log(priority)
        }
}
    if ((fields[2] === fields[6]) && (fields[4].length === 0)) {

        if (fields[2] === oImg && fields[6] === oImg) {
            //console.log("1, 5")
            priority.set([5, "diag2.Ty2"], 1);
            //console.log(priority)
        }
        else {
            //console.log("2, 5")
            priority.set([5, "diag2.Ty2"], 2);
            //console.log(priority)
        }
    }

    if ((fields[4] === fields[6]) && (fields[2].length === 0)) {

        if (fields[4] === oImg && fields[6] === oImg) {
            //console.log("1, 3")
            priority.set([3, "diag2.Ty3"], 1);
            //console.log(priority)
        }
        else {
            //console.log("2, 3")
            priority.set([3, "diag2.Ty3"], 2);
            //console.log(priority)
        }
    }

    if (move === 2 && turn === oImg && fields[4].length === 0) { // if opponent started and didn't place in middle, place in middle -> harder to defeat
        priority.set([5, "mid"], 1);
    }

    let prioritySort = new Map([...priority.entries()].sort((a, b) => a[1] - b[1]));
    let list_keys = Array.from(prioritySort.keys());

    //console.log(prioritySort)

    if (list_keys.length !== 0) {
        console.log(list_keys)
        console.log(list_keys[0])
        console.log(list_keys[0][0])
        claimField(list_keys[0][0]);
    }
    else {

        OpponentLevel1Random();
    }


    priority.clear();

}
