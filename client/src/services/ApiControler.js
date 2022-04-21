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

	setAccessToken = (token, expires) => {
		this.accessToken = token;

		// this.refresh(expires);
	} 

	setRefreshToken = (token) => {
		this.refreshToken = token;
	} 

	refresh = (expires) => {
		let expiresMs = expires * 1000;

		setTimeout(async() => {
			let options = { headers: { "refresh": this.refreshToken }, mode: 'no-cors' };
			const response = await fetch(`${this.origin}/auth/refresh`, options);

			if (response.ok) {
				const json = await response.json();
				await this.setAccessToken(json.accessToken, json.expires);
			}

		}, expiresMs)
	}

	logout = () => {
		this.setAccessToken('');
		this.setRefreshToken('');
		sessionStorage.clear();
	}

	getToken = () => {
		let ls = sessionStorage;
		let urlSearch = new URLSearchParams(window.location.search);

		if (urlSearch.has('token')) {
			this.setAccessToken(urlSearch.get('token'), urlSearch.get('expires'));
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

	promotePlaylist = async (data) => {
		let requestHeaders = {
			"Content-type": "application/json",
			"Accept": "application/json"
		}

		let options = { method: 'POST', headers: requestHeaders, body: JSON.stringify(data) };
		const response = await fetch(`${this.origin}/process/save`, options);
		const json = await response.json();

		return json;
	} 

	getAllPlaylist = async () => {
		let requestHeaders = {
			"Content-type": "application/json",
			"Accept": "application/json"
		}

		let options = { method: 'GET', headers: requestHeaders };
		const response = await fetch(`${this.origin}/process/all`, options);
		const json = await response.json();

		return json;
	} 

	getAllTags = async () => {
		let requestHeaders = {
			"Content-type": "application/json",
			"Accept": "application/json"
		}

		try {
			let options = { method: 'GET', headers: requestHeaders };
			const response = await fetch(`${this.origin}/process/tags`, options);
			const json = await response.json();

			return json;
		} catch (error) {
			return new Error('Could not get tags!');
		}
	} 

	getPromotedPlaylist = async (pid) => {
		let requestHeaders = {
			"Content-type": "application/json",
			"Accept": "application/json"
		}

		let options = { method: 'GET', headers: requestHeaders };
		const response = await fetch(`${this.origin}/process/${pid}`, options);
		const json = await response.json();

		return json;
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

	getPlaylistTracks = async (pid, limit=15, offset=0) => {
		try {
			let options = { headers: { "key": this.accessToken } };
			// const response = await fetch(`https://api.spotify.com/v1/playlists/${pid}/tracks?limit=${limit}&offset=${offset}`, options)
			// const json = await response.json();
			const response = await fetch(`${this.origin}/api/playlist/tracks?pid=${pid}&limit=${limit}&offset=${offset}`, options);
			const json = await response.json();

			return json;
		} catch (error) {
			this.refresh();
			console.error("ApiControler", error);
		}
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