class ApiControler {
	constructor() {
		this.accessToken = '';
		this.refreshToken = '';
	}

	setAccessToken = (token) => {
		this.accessToken = token;
	} 

	setRefreshToken = (token) => {
		this.refreshToken = token;
	} 

	logout = () => {
		this.accessToken = '';
		this.refreshToken = '';
		localStorage.clear();
	}

	getToken = () => {
		let ls = localStorage;
		let urlSearch = new URLSearchParams(window.location.search);

		if (urlSearch.has('token')) {
			this.accessToken = urlSearch.get('token');
			this.refreshToken = urlSearch.get('refresh');

			ls.setItem('token', urlSearch.get('token'));
			ls.setItem('refresh', urlSearch.get('refresh'));

			// Clear Url in the browser window
			window.history.pushState({}, document.title, "/");
		} else {
			let storedToken = ls.getItem('token');
			if (storedToken != null) {
				this.accessToken = storedToken;
				this.refreshToken = ls.getItem('refresh');
			}
		}

	}

	getMe = async () => {
		let options = { headers: { "key": this.accessToken } };
		const response = await fetch(`http://localhost:5000/api/me`, options);
		const json = await response.json();

		return json;
	} 

	getMySongs = async (limit, offset) => {
		let requestLimit = limit || 20;
		let requestOffset = offset || 0;

		let options = { headers: { "key": this.accessToken } };
		const response = await fetch(`http://localhost:5000/api/songs?market=SK&limit=${requestLimit}&offset=${requestOffset}`, options);
		const json = await response.json();

		return json;
	} 

	getMyPlaylists = async (limit, offset) => {
		let requestLimit = limit || 10;
		let requestOffset = offset || 0;

		let options = { headers: { "key": this.accessToken } };
		const response = await fetch(`http://localhost:5000/api/playlists?limit=${requestLimit}&offset=${requestOffset}`, options);
		const json = await response.json();

		return json;
	} 

	getPlayback = async () => {
		let options = { headers: { "key": this.accessToken } };
		const response = await fetch("http://localhost:5000/api/playback", options);
		const json = await response.json();

		return json;
	}

	skipSong = async () => {
		let options = { headers: { "key": this.accessToken } };
		const response = await fetch("http://localhost:5000/api/skip", options);
		const json = await response.json();

		return json;
	}

	prevSong = async () => {
		let options = { headers: { "key": this.accessToken } };
		const response = await fetch("http://localhost:5000/api/prev", options);
		const json = await response.json();

		return json;
	}
}

export default ApiControler;