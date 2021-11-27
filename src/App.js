import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'toastr/build/toastr.min.css'
import './App.css';

import { useRef, useState } from 'react';

import Player from './player';
import ReactPlayer from "react-player";
import Songs from "./songs.json";
import Viewer from './viewer';
import toastr from "toastr";

function App() {
  const [playingStatus, setPlayingStatus] = useState(false);
  const [songs, setSongs] = useState(Songs);
  const [selectedSong, setSelectedSong] = useState(Songs[0]);
  const [isListShuffled, setIsListShuffled] = useState(false);
  const [isAutoPlayOn, setIsAutoPlayOn] = useState(false);
  const [isSongLooped, setIsSongLooped] = useState(false);
  const [volume, setVolume] = useState(null);
  const [duration, setDuration] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  toastr.options = {
    positionClass : 'toast-top-right',
    hideDuration: 300,
    timeOut: 5000
  }
  const setFavourite = (isFavourite, id) => {
    const temp = [...songs];
    const index = temp.findIndex(s => s.id === id);
    if (index >= 0) {
      temp[index].isFavourite = isFavourite;
      setSongs(temp);
      setSelectedSong(temp[index]);
    }
  }
  const playOrPause = () => {
    setPlayingStatus(!playingStatus);
  }
  const playNext = id => {
    const index = songs.findIndex(s => s.id === id);
    if (index >= 0) {
      if (index === songs.length - 1) {
        setPlayingStatus(false);
        toastr.info("This is the LAST song in the playlist.");
      } else {
        setSelectedSong(songs[index + 1]);
        setPlayingStatus(true);
      }
    }
  }
  const playPrevious = id => {
    const index = songs.findIndex(s => s.id === id);
    if (index >= 0) {
      if (index === 0) {
        setPlayingStatus(false);
        toastr.info("This is the FIRST song in the playlist.");
      } else {
        setSelectedSong(songs[index - 1]);
        setPlayingStatus(true);
      }
    }
  }
  const shufflePlaylist = () => {
    const temp = [...songs];
    temp.sort(() => .5 - Math.random()); // Shuffling randomly
    setSongs(temp);
    setIsListShuffled(true);
  }
  const resetShuffling = () => {
    setSongs(Songs);
    setIsListShuffled(false);
  }
  const onMediaEnd = () => {
    if (isAutoPlayOn && !isSongLooped) {
      playNext(selectedSong.id);
    }
    if (isSongLooped) {
      ref.current.seekTo(0, 'seconds');
    }
    if (isAutoPlayOn || isSongLooped) {
      setPlayingStatus(true);
    } else {
      setPlayingStatus(false);
    }
  }
  const onProgress = progressObject => {
    setPlayedSeconds(progressObject.playedSeconds);
  }
  const seekToSeconds = seconds => {
    console.log(seconds)
    ref.current.seekTo(seconds, 'seconds')
  }
  const ref = useRef(null);
  return (
    <div className="App container">
      <div className="row justify-content-md-center align-items-center">
        <div className="col-md-6 viewer-container">
          <Viewer songDetails={selectedSong} setFavourite={setFavourite} />
        </div>
        <div className="col-md-6">
          <Player 
            songDetails={selectedSong}
            playOrPause={playOrPause}
            isPlaying={playingStatus}
            playNext={playNext}
            playPrevious={playPrevious}
            shufflePlaylist={shufflePlaylist}
            resetShuffling={resetShuffling}
            isListShuffled={isListShuffled}
            isAutoPlayOn={isAutoPlayOn}
            setIsAutoPlayOn={setIsAutoPlayOn}
            isSongLooped={isSongLooped}
            setIsSongLooped={setIsSongLooped}
            setVolume={setVolume}
            duration={duration}
            playedSeconds={playedSeconds}
            seekTo={seekToSeconds}
          />
        </div>
      </div>
        <ReactPlayer
          ref={ref}
          url={selectedSong.song}
          width="0px"
          height="0px"
          playing={playingStatus}
          controls={false}
          onEnded={onMediaEnd}
          volume={volume}
          onDuration={duration => setDuration(duration)}
          onProgress={onProgress}
        />
    </div>
  );
}

export default App;
