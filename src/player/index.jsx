import './style.css';
import 'reactjs-popup/dist/index.css';

import React, { useState } from 'react';

import AutoPlay from "../assets/AutoPlay.svg";
import Drawer from "../assets/Drawer.svg";
import Left from "../assets/Left.svg";
import Loop from "../assets/Loop.svg";
import Pause from "../assets/Pause.svg";
import Play from "../assets/Play.png";
import Popup from 'reactjs-popup';
import ProgressBar from "react-bootstrap/ProgressBar";
import Right from "../assets/Right.svg";
import Shuffle from "../assets/Shuffle.svg";
import Volume from "../assets/Volume.svg";
import toastr from "toastr";

const toTwoDigits = number => {
  if (Math.floor(number / 10) >= 1) {
    return `${number}`;
  }
  return `0${number}`
};

const secondsToHMS = durationInSeconds => {
  durationInSeconds = Number(durationInSeconds);
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor(durationInSeconds % 3600 / 60);
  const seconds = Math.floor(durationInSeconds % 3600 % 60);
  return `${hours > 0 ? `${toTwoDigits(hours)}:` : ''}${toTwoDigits(minutes)}:${toTwoDigits(seconds)}`
};

const Player = props => {
  const [seekSeconds, setSeekSeconds] = useState(null);
  const [isSeekSecondsValid, setIsSeekSecondsValid] = useState(false);
  const { 
    songDetails: {id},
    isPlaying,
    isListShuffled,
    isSongLooped = false,
    isAutoPlayOn = false,
    playOrPause,
    playNext,
    playPrevious,
    shufflePlaylist,
    resetShuffling,
    setIsSongLooped,
    setIsAutoPlayOn,
    duration,
    playedSeconds,
    seekTo
  } = props;
  const audioControls = (
    <img src={Volume} alt="Volume" title="Audio controls" className={`player-icon`} />
  );
  // const seekTag = (
  //   <div className="tag">
  //     <div className="tag-content"></div>
  //   </div>
  // )
  // if (document.getElementsByClassName("progress-bar")[0]) {
  //   document.getElementsByClassName("progress-bar")[0].appendChild(seekTag);
  // }
  const seekInput = event => {
    const input = parseInt(event.target.value);
    if (input > duration || input < 0) {
      toastr.error("Input seconds is out of bounds.")
      setIsSeekSecondsValid(false);
    } else {
      setSeekSeconds(input);
      setIsSeekSecondsValid(true);
    }
  }
  const seek = () => {
    if (isSeekSecondsValid) {
      seekTo(seekSeconds);
    }
  }
  return (
    <div className="container player">
      <div className="row justify-content-around align-items-center">
        <div className="col-md-3">
          <div className="row justify-content-around secondary-controls">
            <div className="col">
              <img src={Shuffle} alt="Shuffle" title="Shuffle playlist" className={`player-icon ${isListShuffled ? "active" : "inactive"}`} onClick={isListShuffled ? resetShuffling : shufflePlaylist} />
            </div>
            <div className="col">
              <img src={Loop} alt="Loop" title="Play on loop" className={`player-icon ${isSongLooped ? "active" : "inactive"}`} onClick={() => setIsSongLooped(!isSongLooped)} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row justify-content-around align-items-center">
            <div className="main-controls-container">
              <div className="main-controls" onClick={() => playPrevious(id)}>
                <img src={Left} alt="Left" className="main-controls-image" />
              </div>
            </div>
            <div className="main-controls-container play-container">
              <div className="main-controls play" onClick={playOrPause}>
                <img src={isPlaying ? Pause : Play} alt="Playing" className="main-controls-image play-image" />
              </div>
            </div>
            <div className="main-controls-container">
              <div className="main-controls" onClick={() => playNext(id)}>
                <img src={Right} alt="Right" className="main-controls-image" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="row justify-content-around secondary-controls">
            <div className="col">
              <img src={AutoPlay} alt="AutoPlay" title="Auto play" className={`player-icon ${isAutoPlayOn ? "active" : "inactive"}`} onClick={() => setIsAutoPlayOn(!isAutoPlayOn)} />
            </div>
            <div className="col">
              <Popup trigger={audioControls} position="bottom">
              <div className="modal container">
                <p className="text modal-heading">Coming soon...</p>
                <p className="text modal-text">While we are working on an amazing audio panel, you can use your device audio settings to control volume and other audio controls.</p>
                <p className="text modal-note">Press esc key or click outside the popup to close the popup.</p>
              </div>
            </Popup>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <ProgressBar now={playedSeconds} max={duration} />
      </div>
      <div className="row justify-content-between">
        <div className="col">
          <p className="text duration">{secondsToHMS(playedSeconds)}</p>
        </div>
        <div className="col seek-container">
          <input type="number" max={duration} min={0} title="Seek in seconds" onChange={seekInput} className="seek" />
          <button className="seek-button" onClick={seek} disabled={!isSeekSecondsValid} title="Enter a valid number to enable the button">Seek</button>
        </div>
        <div className="col">
          <p className="text duration length">{secondsToHMS(duration)}</p>
        </div>
      </div>
      <img className="drawer" src={Drawer} alt="Drawer" />
    </div>
  );
};

export default Player;