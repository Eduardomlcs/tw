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
    console.log("Current server: ", currentServer);
    for (let playerId of playerIds) {
        let link = getTroopLink(currentServer, playerId);
        links.push(link);
    }
    $.getAll(links, (i, data) => {
        let troops = $(data).find(".vis.w100");
        console.log(troops);
    });
    console.log(links);
}   

main();