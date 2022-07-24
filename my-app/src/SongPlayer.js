import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function SongPlayer({ accessToken, songUri }) {
    console.log("SoNg", songUri)
    if (!accessToken) return null
    return <SpotifyPlayer
        token="BQC9nt96upKXb3rEQrwqtmsSkTFO22xtLolXQ3Rt2ZpF4Pfktvt0JQZJZPxKnKW4A4AMqxFTshg1hagU83cSidG97e5G_UyxLiOmJv9bXSXiHmznqSj9rV8UIPyAzxbzIhNJj3gRqBU-V-E1GtupN6D3ggjwsQBZcMtqw48m6PX1VZyaY-2xaoOF6f1Gd91XJSq-qW41OND0TYmNBl5ILUYwozFkgfsIApFKvVI-kFEC0qXg3glx5GCj7q35MH-73pl_xDIWn7nYqDTCTpij0Rm3OCmg"
        uris={songUri ? [songUri] : []}
    />;


}