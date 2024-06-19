const playerIds = [7669464];

function getCurrentServer() {
    const url = window.location.href;
    const re = new RegExp("(?<=//).*(?=[\/])");
    let server = re.exec(url);
    return server;
    
}
function getTroopLink(currentServer, playerId) {
  return `https://${currentServer}/game.php?screen=ally&mode=members_defense&player_id=${playerId}`;
}

//https://xs3.tribalwars.cash/game.php?village=7&screen=ally&mode=members_troops

$.getAll = function (
    urls, // array of URLs
    onLoad, // called when any URL is loaded, params (index, data)
    onDone, // called when all URLs successfully loaded, no params
    onError // called when a URL load fails or if onLoad throws an exception, params (error)
) {
    var numDone = 0;
    var lastRequestTime = 0;
    var minWaitTime = 200; // ms between requests
    loadNext();
    function loadNext() {
        if (numDone == urls.length) {
            onDone();
            return;
        }

        let now = Date.now();
        let timeElapsed = now - lastRequestTime;
        if (timeElapsed < minWaitTime) {
            let timeRemaining = minWaitTime - timeElapsed;
            setTimeout(loadNext, timeRemaining);
            return;
        }
        console.log('Getting ', urls[numDone]);
        lastRequestTime = now;
        $.get(urls[numDone])
            .done((data) => {
                try {
                    onLoad(numDone, data);
                    ++numDone;
                    loadNext();
                } catch (e) {
                    onError(e);
                }
            })
            .fail((xhr) => {
                onError(xhr);
            })
    }
};

function main() {
    let currentServer = getCurrentServer();
    let links = [];
    for (let playerId of playerIds) {
        let link = getTroopLink(currentServer, playerId);
        links.push(link);
    }
    $.getAll(links, (i, data) => {
        let table = $(data).find(".vis.w100");
        console.log(table);
        let rows = table.find("tr");
        rows = rows.slice(1);
        console.log(rows);
        for (let i =1; i < rows.length; i+=2) {
            let cells = $(row[i]).find("td");
            
            let village = $(cells[0]).text();
            let spear = $(cells[2]).text();
            let sword = $(cells[3]).text();
            let axe = $(cells[4]).text();
            if(rows.length > 15){
                let archer = $(cells[5]).text();
                let mountedArcher = $(cells[8]).text();
            }
            let spy = $(cells[6]).text();
            let lcav = $(cells[7]).text();
            let heavy = $(cells[9]).text();
            let ram = $(cells[10]).text();
            let cat = $(cells[11]).text();
            let paladin = $(cells[12]).text();
            let noble = $(cells[13]).text();
            let milicia = $(cells[14]).text();
            let incoming = $(cells[15]).text();
            console.log(village, spear, sword, axe, spy, lcav, heavy, ram, cat, paladin, noble, milicia, incoming);
            let incomingCells = $(row[i+1]).find("td");
            let incomingSpear = $(incomingCells[1]).text();
            let incomingSword = $(incomingCells[2]).text();
            let incomingAxe = $(incomingCells[3]).text();
            if(rows.length > 15){
                let incomingArcher = $(incomingCells[4]).text();
                let incomingMountedArcher = $(incomingCells[7]).text();
            }
            let incomingSpy = $(incomingCells[5]).text();
            let incomingLcav = $(incomingCells[6]).text();
            let incomingHeavy = $(incomingCells[8]).text();
            let incomingRam = $(incomingCells[9]).text();
            let incomingCat = $(incomingCells[10]).text();
            let incomingPaladin = $(incomingCells[11]).text();
            let incomingNoble = $(incomingCells[12]).text();
            let incomingMilicia = $(incomingCells[13]).text();

            console.log(incomingVillage, incomingSpear, incomingSword, incomingAxe, incomingSpy, incomingLcav, incomingHeavy, incomingRam, incomingCat, incomingPaladin, incomingNoble, incomingMilicia);
        }

    });
}   

main();