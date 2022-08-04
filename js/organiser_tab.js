let tabdefGame = [];
let tabdefUserGame = [];

for (let index = 0; index < gameTab.length; index++) {
    const element = gameTab[index];
    tabdefGame[element.id-1] = element;
}
for (let index = 0; index < gameUserTab.length; index++) {
    const element = gameUserTab[index];
    tabdefUserGame[element.id-1] = element;
}

gameTab = tabdefGame;
gameUserTab = tabdefUserGame;
saveLocalSGBD();
