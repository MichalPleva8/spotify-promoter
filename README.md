# Spotify Promoter 

<img src="/docs/preview.jpg" alt="App preview" />

You can try this app on [spotify-promoter.herokuapp.com](https://spotify-promoter.herokuapp.com/)

Promoter is a web app made to promote your Spotify Playlist!
- Main idea of Promoter is to share a taste of your playlist by short samples of each song
- Every user will see your music in beautiful coverflow view
- Promoter design is based on absolute simplicity

# How it works ?

You can promote your playlist by doing this 4 easy steps:

1. Click Promote button on your Homepage
2. Authorize with Spotify
3. Select playlist that you want to promote and click Promote
4. After that you can share a link with your friends or post it on a social media

<img src="/docs/share.jpg" alt="Share preview" />

# How to Install and Run the Project ? 

- In order to run this project you need to install packages in the **/** and **/client** by running in your terminal

```
npm install
```
- You also need to create ``` .env ``` file in your **/server** directory and it needs to contain:
```
CLIENT_ID=
CLIENT_SECREAT=
MONGO_URL=
```
- You can get your spotify credentails at [Developer Dashboard](https://developer.spotify.com/dashboard/login)
- And MONGO_URL from your local server or other source

- After that you need to run express server and react app at the same time 
- In one terminal go to **/client** and run ``` npm start ```
- In one terminal go to **/** and run ``` npm start ```

# Future ideas

* Storyline -> Feature that will show some stories, thoughts or pictures about the playlist creation
* Trendings -> Make a leaderboard for playlist
* Make a page that shows you all promoted playlists
* Show playback timeline

# Technologies 💻
- MongoDB
- Express
- React.js
- Node.js

Good helping hand [Spotify Docs](https://developer.spotify.com/)
