'use strict'

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

	getToken = () => {

	}

	getMe = () => {
		let options = {
			headers: {
				"token": this.accessToken
			}
		}
		
	
		fetch(`http://localhost:5000/api/me`, { headers: {
			token: this.accessToken
		}})
			.then(raw => raw.json())
			.then(json => {
				console.log("Controler:", json);
				return json;
			})
			.catch(error => {
				console.log("Controler:", error);
			});
	} 
}

export default ApiControler;