import React, { useState } from 'react'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'
import { useEffect } from 'react'
import io from 'socket.io-client';
import axios from 'axios';
import { Container, Form } from 'react-bootstrap';
import TrackResult from './TrackResult';
import SongPlayer from './SongPlayer'
import { List } from '@mui/material';
const socket = io();

const spotifyApi = new SpotifyWebApi({
  redirectUri: 'http://localhost:3000',
  clientId: 'acca5513fecb49e7bb8fcb5f886b04b7',
  clientSecret: '782cd7c2bc674b68bbd57bdc19e28265',

})

export default function Dashboard({ code }) {

  const accessToken = useAuth(code)
  const [topTracks, setTopTracks] = useState([])
  const [playingSong, setPlayingSong] = useState()
  
  console.log(topTracks)
  
  function chooseTrack(track) {
    setPlayingSong(track)
  }
  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)

    axios.post('http://127.0.0.1:8000/songs', {
      accessToken,
    }).then(res => {
      console.log(res.data)
        setTopTracks(res.data.map(track => {
          const smallImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )
        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
           albumUrl: smallImage.url,
        }

      }))
    })



  }, [accessToken])


  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      {/* <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      /> */}
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {topTracks.map(track => (
          <TrackResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {/* {setTopTracks.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )} */}
      </div>
      <div>
        <SongPlayer accessToken={accessToken} songUri={playingSong?.uri} />
      </div>
    </Container> 
  )
}