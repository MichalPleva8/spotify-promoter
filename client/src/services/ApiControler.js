class ApiControler {
	constructor() {
		this.accessToken = '';
		this.refreshToken = '';
		this.origin = window.location.origin;

		this.setOrigin(); // Sets right url for api requests
	}

	setOrigin = () => {
		if (process.env.NODE_ENV === "development") {
			this.origin = "http://localhost:5000";
		}
	}

	setAccessToken = (token) => {
		this.accessToken = token;
	} 

	setRefreshToken = (token) => {
		this.refreshToken = token;
	} 

	logout = () => {
		this.setAccessToken('');
		this.setRefreshToken('');
		localStorage.clear();
	}

	getToken = () => {
		let ls = localStorage;
		let urlSearch = new URLSearchParams(window.location.search);

		if (urlSearch.has('token')) {
			this.setAccessToken(urlSearch.get('token'));
			this.setRefreshToken(urlSearch.get('refresh'));

			ls.setItem('token', urlSearch.get('token'));
			ls.setItem('refresh', urlSearch.get('refresh'));

			// Clear Url in the browser window
			window.history.pushState({}, document.title, window.location.pathname);
		} else {
			let storedToken = ls.getItem('token');
			if (storedToken != null) {
				this.setAccessToken(storedToken);
				this.setRefreshToken(ls.getItem('refresh'));
			}
		}

	}

	getMe = async () => {
		let options = { headers: { "key": this.accessToken } };
		const response = await fetch(`${this.origin}/api/me`, options);
		const json = await response.json();

		return json;
	} 

	getMySongs = async (limit, offset) => {
		let requestLimit = limit || 20;
		let requestOffset = offset || 0;

		let options = { headers: { "key": this.accessToken } };
		const response = await fetch(`${this.origin}/api/songs?market=SK&limit=${requestLimit}&offset=${requestOffset}`, options);
		const json = await response.json();

		return json;
	} 

	getMyPlaylists = async (limit, offset) => {
		let requestLimit = limit || 10;
		let requestOffset = offset || 0;

		let options = { headers: { "key": this.accessToken } };
		const response = await fetch(`${this.origin}/api/playlists?limit=${requestLimit}&offset=${requestOffset}`, options);
		const json = await response.json();

		return json;
	} 

	getPlaylistTracks = async (playlistId, limit, offset) => {
		let requestPlaylistId = playlistId;
		let requestLimit = limit || 10;
		let requestOffset = offset || 0;

		let options = { headers: { "key": this.accessToken } };
		const response = await fetch(`${this.origin}/api/playlist/tracks?pid=${requestPlaylistId}&limit=${requestLimit}&offset=${requestOffset}`, options);
		const json = await response.json();

		return json;
	} 

	followPlaylist = async (playlistId) => {
		let requestPlaylistId = playlistId;

		let options = { method: 'POST', headers: { "key": this.accessToken } };
		const response = await fetch(`${this.origin}/api/playlist/follow?pid=${requestPlaylistId}`, options);
		const json = await response.json();

		return json;
	}

	getPlayback = async () => {
		let options = { headers: { "key": this.accessToken } };
		const response = await fetch(`${this.origin}/api/playback`, options);
		const json = await response.json();

		return json;
	}

	skipSong = async () => {
		let options = { headers: { "key": this.accessToken } };
		const response = await fetch(`${this.origin}/api/skip`, options);
		const json = await response.json();

		return json;
	}

	prevSong = async () => {
		let options = { headers: { "key": this.accessToken } };
		const response = await fetch(`${this.origin}/api/prev`, options);
		const json = await response.json();

		return json;
	}
}

export default ApiControler;