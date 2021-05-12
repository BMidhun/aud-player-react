import { useEffect, useState } from "react";
// import jsmediatags from "../../jsmediatags";
import readMetaData from "../../helper/readMeta";

type Props = {
  currentTrack : File | null
}

type Track = {
  albumTitle: string | undefined,
  artistName: string | undefined,
  imageSrc: string | undefined,
}

function Player({currentTrack}:Props) {

  const [trackData,setTrackData] = useState<Track | undefined>();

  useEffect(() => {
    if(currentTrack) {
      console.log(currentTrack)

      readMetaData(currentTrack).then(res => {
        console.log(res)
        setTrackData(res);
      });
    }
  },[currentTrack])

    return (
        <div className="player">
            <audio>
              <source src="https://cdnm.meln.top/mr/The%20Weeknd%20-%20Starboy%20%28feat.%20Daft%20Punk%29.mp3?session_key=b4fd8fdcfc2535933e96c1bfe0ab8553&hash=c0df9edf799a04c73cb2f27edd70e61d" type="audio/mpeg"/>
            </audio>
            <img src={trackData ? `data:imagetrackData.imageSrc` : ''} alt="album.jpg"/>
            <div className="progress">
              <div className="progress-bar-wrap">
                <div className="progress-bar"></div>
              </div>

              <div className="progress-time-wrap">
                <span>00:35</span>
                <span>03:12</span>
              </div>
            </div>

            <div className="player-controls">
              <button type="button" className="btn">
                <i className="bi bi-arrow-repeat"></i>
              </button>
              <button type="button" className="btn">
                <i className="bi bi-chevron-bar-left"></i>
              </button>
              <button type="button" className="btn btn--lg">
                <i className="bi bi-play"></i>
              </button>
              <button type="button" className="btn">
                <i className="bi bi-chevron-bar-right"></i>
              </button>
              <button type="button" className="btn">
                <i className="bi bi-shuffle"></i>
              </button>
            </div>
          </div>
    )
}

export default Player
