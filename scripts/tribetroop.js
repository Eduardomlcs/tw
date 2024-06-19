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
        let player = $(data).find(".input-nicer").find(":selected").text().trim();
        console.log(player);
        let table = $(data).find(".vis.w100");
        console.log(table);
        let rows = table.find("tr");
        rows = rows.slice(1);
        console.log(rows);

        let isArcher = 0;
        for (let i =0; i < rows.length; i+=2) {
            let cells = $(rows[i]).find("td");
            
            let village = $(cells[0]).text().trim();
            let spear = $(cells[2]).text().trim();
            let sword = $(cells[3]).text().trim();
            let axe = $(cells[4]).text().trim();
            if(rows.length > 15){
                let archer = $(cells[5]).text().trim();
                let mountedArcher = $(cells[8]).text().trim();
                isArcher = 1;
            }
            let spy = $(cells[6-isArcher]).text().trim();
            let lcav = $(cells[7-isArcher]).text().trim();
            let heavy = $(cells[9-isArcher*2]).text().trim();
            let ram = $(cells[10-isArcher*2]).text().trim();
            let cat = $(cells[11-isArcher*2]).text().trim();
            let paladin = $(cells[12-isArcher*2]).text().trim();
            let noble = $(cells[13-isArcher*2]).text().trim();
            let milicia = $(cells[14-isArcher*2]).text().trim();
            let incoming = $(cells[15-isArcher*2]).text().trim();
            console.log(village, spear, sword, axe, spy, lcav, heavy, ram, cat, paladin, noble, milicia, incoming);
            let incomingCells = $(rows[i+1]).find("td");
            let incomingSpear = $(incomingCells[1]).text().trim();
            let incomingSword = $(incomingCells[2]).text().trim();
            let incomingAxe = $(incomingCells[3]).text().trim();
            if(rows.length > 15){
                let incomingArcher = $(incomingCells[4]).text().trim();
                let incomingMountedArcher = $(incomingCells[7]).text().trim();
            }
            let incomingSpy = $(incomingCells[5-isArcher]).text().trim();
            let incomingLcav = $(incomingCells[6-isArcher]).text().trim();
            let incomingHeavy = $(incomingCells[8-isArcher*2]).text().trim();
            let incomingRam = $(incomingCells[9-isArcher*2]).text().trim();
            let incomingCat = $(incomingCells[10-isArcher*2]).text().trim();
            let incomingPaladin = $(incomingCells[11-isArcher*2]).text().trim();
            let incomingNoble = $(incomingCells[12-isArcher*2]).text().trim();
            let incomingMilicia = $(incomingCells[13-isArcher*2]).text().trim();

            console.log(incomingSpear, incomingSword, incomingAxe, incomingSpy, incomingLcav, incomingHeavy, incomingRam, incomingCat, incomingPaladin, incomingNoble, incomingMilicia);
        }
        let json = [
            {
                "player": player,
                "village": village,
                "spear": spear,
                "sword": sword,
                "axe": axe,
                "spy": spy,
                "lcav": lcav,
                "heavy": heavy,
                "ram": ram,
                "cat": cat,
                "paladin": paladin,
                "noble": noble,
                "milicia": milicia,
                "incoming": incoming,
                "incomingSpear": incomingSpear,
                "incomingSword": incomingSword,
                "incomingAxe": incomingAxe,
                "incomingSpy": incomingSpy,
                "incomingLcav": incomingLcav,
                "incomingHeavy": incomingHeavy,
                "incomingRam": incomingRam,
                "incomingCat": incomingCat,
                "incomingPaladin": incomingPaladin,
                "incomingNoble": incomingNoble,
                "incomingMilicia": incomingMilicia
            }
        ];
        json = JSON.parse(json);
        console.log(json);
    });
}   

main();