if (sessionStorage.getItem('master_volume') === null
|| sessionStorage.getItem('music_volume') === null
|| sessionStorage.getItem('gameplay_volume') === null
|| sessionStorage.getItem('fps') === null) {
    sessionStorage.clear();
    sessionStorage.setItem('master_volume', '100');
    sessionStorage.setItem('music_volume', '100');
    sessionStorage.setItem('gameplay_volume', '100');
    sessionStorage.setItem('fps', '60');
}

window.onload = () => {
    const fps30 = document.getElementById("fps30");
    fps30.onclick = () => {
        setFPS30();
    };

    const fps60 = document.getElementById("fps60");
    fps60.onclick = () => {
        setFPS60();
    };

    if (sessionStorage.getItem('fps') === '60') {
        setFPS60();
    } else {
        setFPS30();
    }
};

function setFPS30() {
    fps60.style.display = "inline";
    fps30.style.display = "none";
    sessionStorage.setItem('fps', '30');
}

function setFPS60() {
    fps30.style.display = "inline";
    fps60.style.display = "none";
    sessionStorage.setItem('fps', '60');
}