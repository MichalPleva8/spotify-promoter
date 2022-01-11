class Player {
	constructor(element) {
		this.player = element;
		this.isPlaying = false;
	}

	setSource = (source) => {
		this.player.src = source;
	}

	setVolume = (volume) => {
		this.player.volume = volume;
	}

	getPlaybackPercentage = (current, duration) => {
		return Math.floor(this.player.currentTime / this.player.duration * 100) 
	}

	play = () => {
		this.player.play();
		this.isPlaying = true;
	}

	pause = () => {
		this.player.pause();
		this.isPlaying = false;
	}
}

export default Player;