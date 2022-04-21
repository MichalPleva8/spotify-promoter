# Spotify Promoter 

One of my frist apps, looking backwards the code is kinda funny, but at least it works :D

<img src="/docs/preview.jpg" alt="App preview" />

You can try this app on [spotify-promoter.herokuapp.com](https://spotify-promoter.herokuapp.com/)

Promoter is a web app made to promote your Spotify Playlist!
- Main idea of Promoter is to share a taste of your playlist by short samples of each song
- Every user will see your music in beautiful coverflow view
- Promoter design is based on absolute simplicity

**You can't promote your playlists because spotify won't let you authorize because this app is registered as development only app**

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
CLIENT_SECRET=
MONGO_URL=
```
- You can get your spotify credentails at [Developer Dashboard](https://developer.spotify.com/dashboard/login)
- And MONGO_URL from your local server or other source like [Mongo Atlas](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_footprint_row_search_core_brand_atlas_desktop&utm_term=mongodb%20atlas%20online&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624584&adgroup=115749713503&gclid=Cj0KCQiAi9mPBhCJARIsAHchl1zcFE_ptplvfP4PaSULExsIWtIYgllK55dGYfyQ4MmsPx_rpUaG-A8aAkuIEALw_wcB)

- After that you need to run express server and react app at the same time 
- In one terminal go to **/client** and run ``` npm start ```
- In one terminal go to **/** and run ``` npm start ```

# Future ideas
Shorttime:
* Page that shows you all promoted playlists
* Automatic continue after track stoped playing
* Home/Back button in Promote pages
* Like system

Longtime:
* Storyline -> Feature that will show some stories, thoughts or pictures about the playlist creation
* Trendings -> Make a leaderboard for playlist

# Technologies 💻
- MongoDB
- Express
- React.js
- Node.js

Good helping hand [Spotify Docs](https://developer.spotify.com/)
