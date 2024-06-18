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

function main() {
    let currentServer = getCurrentServer();
    let links = [];
    console.log("Current server: ", currentServer);
    for (let playerId of playerIds) {
        let link = getTroopLink(currentServer, playerId);
        links.push(link);
    }
    $.getAll(links, (i, data) => {
        let troops = $(data).find("td");
        console.log(troops);
    });
    console.log(links);
}   

main();



        $.getAll(linksODSTotal, (i, data) => {
            if ($(data).find(".lit-item")[3] != undefined) {
                temp = $(data).find(".lit-item")
                x = temp[3].innerText;
                console.log(x);
                if (x.indexOf(" Mil.") > -1) {
                    x = x.replace(" Mil.", "");
                    x = x.replace(",", "");
                    x = parseInt(x) * 10000;
                    x=x.toString();
                }
                ODSTotalperPlayer.push(x.replace(/\./g, ','));
            }
            else {
                ODSTotalperPlayer.push("0");
            }

        },
            (error) => {
                console.error(error);
            });
