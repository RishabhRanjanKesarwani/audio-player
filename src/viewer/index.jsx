import './style.css';
import 'reactjs-popup/dist/index.css';
import 'toastr/build/toastr.min.css'

import Add from "../assets/Add.svg";
import Heart from "../assets/Heart.png";
import HeartFilled from "../assets/Heart.svg";
import Popup from 'reactjs-popup';
import Share from "../assets/Share.svg";
import toastr from "toastr";

const Viewer = props => {
  const { songDetails, setFavourite } = props;
  const { id, imageUrl, name, singer, album, song, isFavourite } = songDetails;
  const addButton = (
    <div className="action-button">
      <img className="add" src={Add} alt="Add Songs" />
    </div>
  );
  toastr.options = {
    positionClass : 'toast-top-right',
    hideDuration: 300,
    timeOut: 5000
  }
  const copyLink = () => {
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = song;
    tempInput.select();
    toastr.clear()
    try {
      document.execCommand('copy');
      setTimeout(() => toastr.info(`Link copied to clipboard.`), 300)
    } catch (error) {
      setTimeout(() => toastr.error(`Some error occurred in copying the link to the clipboard.`), 300)
    }
    tempInput.remove();
  }
  return (
    <div className="container viewer">
      <div className="row">
        <div className="col">
          <div className="image-container">
            <img src={imageUrl} className="image" alt="Song cover" />
          </div>
        </div>
        <div className="col">
          <div className="row">
            <div className="col text">Now Playing</div>
          </div>
          <div className="row">
            <div className="col details-container">
              <p className="text details name">{name}</p>
              <p className="text details singer">{singer}</p>
              <p className="text details album">{album}</p>
            </div>
          </div>
          <div className="row">
            <div className="action-button" onClick={() => setFavourite(!isFavourite, id)}>
              <img className="heart" src={isFavourite ? HeartFilled : Heart} alt="Heart" />
            </div>
            <Popup trigger={addButton} position="bottom">
              <div className="modal container">
                <p className="text modal-heading">Oopss...</p>
                <p className="text modal-question">Wanna add your favourite songs to the playlist?</p>
                <p className="text">Choose your Spext plan <a href="https://spext.co/" className="modal-answer" target="_blank" rel="noreferrer">here</a> and thereafter add as many songs as you like.</p>
                <p className="text modal-note">Press esc key or click outside the popup to close the popup.</p>
              </div>
            </Popup>
            <div className="action-button" onClick={copyLink}>
              <img className="share" src={Share} alt="Share Song" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;