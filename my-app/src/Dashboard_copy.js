import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'
import SongPlayer from './SongPlayer'
import TrackResult from './TrackResult'
import SendVideo from './SendVideo'
import {
  Container,
  Typography,
  Avatar,
  Box,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListSubheader,
  ListItemSecondaryAction,
  Tabs,
  Tab,
  Grid,
  Button,
  Hidden,
} from '@material-ui/core';
import { millisToMinutesAndSeconds } from './utils/index';

const useStyles = makeStyles(theme => ({
  list: {
    width: '100%',
  },
  header: {
    marginBottom: theme.spacing(1),
  },
  title: {
    fontWeight: 'bold',
  },
  tabs: {
    backgroundColor: theme.palette.action.active,
  },
  buttons: {
    marginTop: theme.spacing(3),
  },
  listSubHeaderRoot: {
    backgroundColor: '#E5E5E5',
    color: '#252525'
    /* To change the font, use the fontFamily rule */
  }
}));


export default function Dashboard_copy({ code }) {
  const classes = useStyles();
  const [topTracks, setTopTracks] = useState([])
  const accessToken = useAuth(code)
  const [playingSong, setPlayingSong] = useState()
  const [showWebcam, setShowWebcam] = useState(false);
  const [emotion, setEmotion] = useState({counter: 0});
  

  // function chooseTrack(track) {
  //   setPlayingSong(track)
  // }
  function chooseTrack(track) {
    setPlayingSong(track);
    let tracks = JSON.parse(JSON.stringify(topTracks));
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].uri === track.uri) {
        tracks[i].played = true;
        break
      }
    }
    setTopTracks(tracks);
    setShowWebcam(false);
  }

  function fetchNextTrack() {
    setShowWebcam(true);
    setTimeout(() => {
      setShowWebcam(false);

      let tracks = JSON.parse(JSON.stringify(topTracks));
      for (let i = 0; i < tracks.length; i++) {
        if (tracks[i].mood === emotion.mood && !tracks[i].played) {
          setPlayingSong(tracks[i]);
         
          tracks[i].played = true;
          break;
        }
      }
      setTopTracks(tracks)
    }, 15000)
  }

  // useEffect(() => {
  //   if (!accessToken) return

  //   axios.post('http://127.0.0.1:8000/songs', {
  //     accessToken,
  //   }).then(res => {
  //     console.log(res.data)

  //     setTopTracks(res.data)
  //     //   setTopTracks(res.data.map(track => {
  //     //     const smallImage = track.album.images.reduce(
  //     //       (smallest, image) => {
  //     //         if (image.height < smallest.height) return image
  //     //         return smallest
  //     //       },
  //     //       track.album.images[0]
  //     //     )
  //     //   return {
  //     //     artist: track.artists[0].name,
  //     //     title: track.name,
  //     //     uri: track.uri,
  //     //      albumUrl: smallImage.url,
  //     //   }

  //     // }))
  //   })



  // }, [accessToken])

  useEffect(() => {
    axios.post('http://localhost:8000/songs', {
      accessToken,
    }).then(res => {
      let tracks = res.data.map(track => {
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
          mood: track.mood === "aggressive" ? "angry" : track.mood === "calm" ? "neutral" : track.mood,
          played: false,
          name: track.name,
          album: track.album.name,
          id: track.id,
          duration_ms: track.duration_ms
        }
      })
      setTopTracks(
        tracks
      )
      setShowWebcam(true);
    })

  }, [accessToken]);


  useEffect(() => {
    console.log(emotion)
    let tracks = JSON.parse(JSON.stringify(topTracks));
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].mood === emotion.mood && !tracks[i].played) {
        setPlayingSong(tracks[i]);
        
        tracks[i].played = true;
        break;
      }
    }
    setTopTracks(tracks);
  }, [emotion])

  return (

    <React.Fragment>

      <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>

        <Box className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>

          <Grid container spacing={2} direction="row" alignItems="flex-start" justify="space-between" >
            <Grid item xs={3}>
              <div>
                <Box style={{ padding: 10, textAlign: 'center' }}>
                  <img
                    alt="logo"
                    src={require('/Users/akshay/Desktop/Project/my-app/src/spotify.png')}
                    style={{ width: '40%' }}
                  />
                </Box>
                {/* <div className={classes.toolbar} /> */}
                <Divider />

                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    '& ul': { padding: 0 },
                  }}
                  subheader={<li />}
                >
                  {['happy', 'sad', 'angry', 'neutral'].map((mood) => (

                    <li key={`section-${mood}`}>
                      <ul ul class="list-group">
                        <ListSubheader >
                          <div>
                            <Typography variant="h4" style={{ color: 'white' }} >
                              {mood}
                            </Typography>
                          </div>
                        </ListSubheader>
                        <Divider color='red'></Divider>
                        {topTracks.map((item, idx) => {
                          if (item.mood !== mood) {
                            return
                          }
                          return (
                            <ListItem key={`item-${mood}-${item}`}>
                              <ListItemText primary={`${item.name}`} primaryTypographyProps={{
                                fontSize: 20,
                                fontWeight: 'medium',
                                lineHeight: '20px',
                                mb: '2px',
                              }} />
                            </ListItem>
                          )
                        })}

                      </ul>
                    </li>
                  ))}
                </List>
              </div>

            </Grid>
            <Grid item xs={9}>
              <div>
                <Typography variant="h4" className={classes.title}>
                  All Songs
                </Typography>
              </div>
              <List className={classes.list}>
                {topTracks.map((track, idx) => {
                  return (
                    <TrackResult
                      track={track}
                      key={track.uri}
                      chooseTrack={chooseTrack}
                    />
                    // <Box key={topTracks.id}>
                    //   <ListItem
                    //     alignItems="flex-start"
                    //     button

                    //   >
                    //     <ListItemAvatar>
                    //       <Avatar
                    //         alt="Remy Sharp"
                    //         src={track.album.images[2].url}
                    //       />
                    //     </ListItemAvatar>
                    //     <ListItemText
                    //       primary={track.name}
                    //       secondary={
                    //         <React.Fragment>
                    //           {track.album.artists[0].name} · {track.album.name}
                    //         </React.Fragment>
                    //       }
                    //     />
                    //     <ListItemSecondaryAction>
                    //       {millisToMinutesAndSeconds(track.duration_ms)}
                    //     </ListItemSecondaryAction>
                    //   </ListItem>
                    //   {topTracks.length !== idx + 1 ? (
                    //     <Divider variant="inset" component="li" />
                    //   ) : (
                    //     ''
                    //   )}
                    // </Box>
                  );
                })}
              </List>

            </Grid>
          </Grid>


        </Box>
        <div>
          <SongPlayer accessToken={accessToken} songUri={playingSong?.uri} fetchNextTrack={fetchNextTrack} />
        </div>
  
        {showWebcam ? <SendVideo setEmotion={setEmotion} setShowWebcam={setShowWebcam} /> : <></>}
      </Container>
    </React.Fragment>




  )





}