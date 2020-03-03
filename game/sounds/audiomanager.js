class AudioManager {
    constructor() {
        this.masterVolume = 100;
        this.musicVolume = 100; // 0.0 - 1.0
        this.sfxVolume = 100;
    }

    playMusic() {
        this.music.play();
    }

    pauseMusic() {
        this.music.pause();
    }

    setMusic(musicId) {
        this.music = document.getElementById(musicId);
        this.music.muted = false;
    }
    
    playSound(soundId) {
        let audioFile = document.getElementById(soundId).cloneNode(true);
        audioFile.volume = this.masterVolume * this.sfxVolume / 100 / 100;
        audioFile.play();
    }
    
    setMasterVolume(volume)
    {
      this.masterVolume = volume;
      if(this.music)
      {
        this.music.volume = this.musicVolume * this.masterVolume / 100 / 100;
      }
    }
    
    setMusicVolume(volume)
    {
      this.musicVolume = volume;
      if(this.music)
      {
        this.music.volume = this.musicVolume * this.masterVolume / 100 / 100;
      }
    }

    setSFXVolume(volume)
    {
      this.sfxVolume = volume;
    }

    restartMusic() {
        this.music.currentTime = 0;
    }
}

// function playSound(soundId) {
//     document.getElementById(soundId).cloneNode(true).play();
//     //audioFile.play();
// }
//
// function pauseSound(soundId) {
//
// }