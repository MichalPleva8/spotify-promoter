import React from 'react'

function RefreshButton() {
	let refreshToken = async () => {
		let storage = sessionStorage;

		let options = { headers: { "refresh": storage.getItem("refresh") } };
		const response = await fetch(`http://localhost:5000/auth/refresh`, options);
		const json = await response.json();
		await storage.setItem("token", json.token);
		await console.log(json);
	}

	return (
		<button onClick={() => refreshToken()}>
			Refresh Token
		</button>
	)
}

export default RefreshButton;
