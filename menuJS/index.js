if (sessionStorage.getItem('master_volume') === null
|| sessionStorage.getItem('music_volume') === null
|| sessionStorage.getItem('gameplay_volume') === null
|| sessionStorage.getItem('fps') === null) {
    sessionStorage.clear();
    sessionStorage.setItem('master_volume', '21');
    sessionStorage.setItem('music_volume', '32.5');
    sessionStorage.setItem('gameplay_volume', '100');
    sessionStorage.setItem('fps', '60');
    console.log("Initiated session storage.");
}

function story() {
    sessionStorage.setItem('level', '1');
    sessionStorage.setItem('npcs', 'BlackMage');
    // sessionStorage.setItem('level', 'Test');
    // sessionStorage.setItem('npcs', 'BlackMage Lancer Ninja');
    window.location.href = './game/index.html';
}

function endless() {
    sessionStorage.setItem('level', 'endless');
    sessionStorage.setItem('npcs', 'BlackMage Lancer Ninja King');
    window.location.href = './game/index.html';
}

console.log(`MASTER VOLUME: ${sessionStorage.getItem('master_volume')}\nMUSIC VOLUME: ${sessionStorage.getItem('music_volume')}\nGAMEPLAY VOLUME: ${sessionStorage.getItem('gameplay_volume')}\nFPS: ${sessionStorage.getItem('fps')}`);