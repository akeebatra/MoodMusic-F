import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import { useState, useEffect} from 'react';

export default function SongPlayer({ accessToken, songUri }) {

    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [songUri])
  
    if (!accessToken) return null
    return (
      <SpotifyPlayer
        token={'BQBk1Ccy3_7fnRblDs_K9R1yuh7aUMG7GgLyAEp4MaPxd9wVaLrZhmJoBdcj5qUfuHGF_qwUK-zN4IAaLpuZ9Mz8NOcN6QXVHSAqK5-XCHhoFbyDSrxZAz5fnu-P3a0oVUV5DiVPjQrIf6gfsl0aCUmOQ7f4HnEr8GMdTguPzDpuv6qyO6opDG-eGgeWzSB5cIQmZLUNvx0RqK-i5bZ1ViTexL4'}
        showSaveIcon
        callback={state => {
          if (!state.isPlaying) setPlay(false)
        }}
        play={play}
        uris={['spotify:track:76cy1WJvNGJTj78UqeA5zr']}
      />
    )





    // console.log("SoNg", songUri)
    // if (!accessToken) return null
    // return <SpotifyPlayer
    //     token='BQBk1Ccy3_7fnRblDs_K9R1yuh7aUMG7GgLyAEp4MaPxd9wVaLrZhmJoBdcj5qUfuHGF_qwUK-zN4IAaLpuZ9Mz8NOcN6QXVHSAqK5-XCHhoFbyDSrxZAz5fnu-P3a0oVUV5DiVPjQrIf6gfsl0aCUmOQ7f4HnEr8GMdTguPzDpuv6qyO6opDG-eGgeWzSB5cIQmZLUNvx0RqK-i5bZ1ViTexL4'
    //     uris={['spotify:track:76cy1WJvNGJTj78UqeA5zr']}
    // />;


}

