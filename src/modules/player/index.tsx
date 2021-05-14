// import moment from "moment";
import { memo, useEffect, useRef, useState } from "react";
import computeDuration from "../../helper/computeDuration";
// import jsmediatags from "../../jsmediatags";
import readMetaData from "../../helper/readMeta";
import AlbumCover from "../../images/audio-icon.png";

type Props = {
  currentTrack: File | null;
  hasPrev: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  shouldRepeat : boolean,
  toggleRepeat : () => void,
  toggleShuffle : () => void,
  shouldShuffle:boolean
};

type Track = {
  albumTitle: string | undefined;
  artistName: string | undefined;
  imageSrc: any;
  duration: number | undefined;
};

function Player({ currentTrack, hasNext, hasPrev, onNext, onPrevious , shouldRepeat, toggleRepeat, toggleShuffle, shouldShuffle}: Props) {
  const [trackData, setTrackData] = useState<Track | undefined>();

  const [currentProgress, setCurrentProgress] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);

  
  
  useEffect(() => {
    const player = audioPlayerRef.current;

    function setTrackEndToTrue(e:any) {
       onNext();
    }

    if(player){
       player.addEventListener('ended', setTrackEndToTrue)
    }

    return () => {
      player.removeEventListener('ended', setTrackEndToTrue)
    }
  },[onNext])

  


  const progressRef: any = useRef();

  const progressParentRef: any = useRef();

  const audioPlayerRef: any = useRef();

  const changeDuration = (e: any) => {
    const duration = computeDuration(e.target.currentTime);
    setCurrentProgress(duration);
    const currentTime = e.target.currentTime;
    const totalTime = e.target.duration;
    const width = (currentTime / totalTime) * 100;
    if (progressRef.current) progressRef.current.style.width = width + "%";
  };

  const playAudio = () => {
    const player = audioPlayerRef.current;
    if (player.paused && !isPlaying) {
      player.play();
    }
  };

  function pauseAudio() {
    const player = audioPlayerRef.current;
    if (!player.paused && isPlaying) {
      player.pause();
    }
  }

  useEffect(() => {
    const player = audioPlayerRef.current;
      player.loop = shouldRepeat
  }, [shouldRepeat]);

  function onProgressSeek(e: any) {
    if (progressParentRef.current) {
      const player = audioPlayerRef.current;
      const trackTotalDuration = player.duration;

      let playPoint = (
        e.offsetX / progressParentRef.current.clientWidth
      ).toFixed(6) as any;

      playPoint = (trackTotalDuration * playPoint).toFixed(6);

      player.currentTime = playPoint;
    }
  }


  

  

  useEffect(() => {
    const player = audioPlayerRef.current;
    const progress = progressRef.current;

    if (currentTrack) {
      setCurrentProgress("00:00");
      readMetaData(currentTrack).then((res) => {
        setTrackData(res);
      });
    } else {
      setTrackData(undefined);
    }

    return () => {
      if (player && progress && currentTrack) {
        setCurrentProgress("");
        setIsPlaying(false);

        progress.style.width = "0%";
        player.removeEventListener("playing", () => {
          setIsPlaying(true);
        });
        player.removeEventListener("pause", () => {
          setIsPlaying(false);
        });
        player.removeEventListener("timeupdate", changeDuration);
        progress.removeEventListener("click", onProgressSeek);
      }
    };
    
  }, [currentTrack]);

  useEffect(() => {
    const player = audioPlayerRef.current;
    const progressParent = progressParentRef.current;

    if (trackData && currentTrack) {
      player.src = URL.createObjectURL(currentTrack);

      player.addEventListener("playing", () => {
        setIsPlaying(true);
      });
      player.addEventListener("pause", () => {
        setIsPlaying(false);
      });

      player.addEventListener("timeupdate", changeDuration);

      progressParent.addEventListener("click", onProgressSeek);

      setTimeout(() => {
        player.play();
      }, 100);
    }
  }, [trackData, currentTrack]);

  return (
    <div className="player">
      <audio ref={audioPlayerRef} id="audioPlayer"></audio>
      <div className="track-image-wrap">
        <picture className="track-image">
          <source
            srcSet={
              trackData?.imageSrc?.format
                ? `data:${
                    trackData.imageSrc.format
                  };base64,${trackData.imageSrc.data.toString("base64")}`
                : ""
            }
          />
          <img src={AlbumCover} alt="albumcover.jpg"></img>
        </picture>
      </div>

      {currentTrack && (
        <div className="track-details text-center">
          <h3>{trackData?.albumTitle || "Album N/A"}</h3>
          <p>{trackData?.artistName || "Artist N/A"}</p>
        </div>
      )}

      {currentTrack && (
        <div className="progress">
          <div className="progress-bar-wrap" ref={progressParentRef}>
            <div className="progress-bar" ref={progressRef}></div>
          </div>

          {trackData && trackData.duration && (
            <div className="progress-time-wrap">
              <span>{currentProgress}</span>
              <span>{computeDuration(trackData.duration)}</span>
            </div>
          )}
        </div>
      )}

      {currentTrack && trackData ? (
        <div className="player-controls">
          <button
            type="button"
            className={`btn ${shouldRepeat && 'btn-active'}`}
            onClick={toggleRepeat}
          >
            <i className="bi bi-arrow-repeat"></i>
          </button>
          <button
            type="button"
            className="btn"
            disabled={!hasPrev}
            onClick={onPrevious}
          >
            <i className="bi bi-chevron-bar-left"></i>
          </button>

          <button
            type="button"
            className="btn btn--lg btn-play"
            onClick={() => {
              isPlaying ? pauseAudio() : playAudio();
            }}
          >
            {!isPlaying ? (
              <i className="bi bi-play"></i>
            ) : (
              <i className="bi bi-pause"></i>
            )}
          </button>

          <button
            type="button"
            className="btn"
            disabled={!hasNext}
            onClick={onNext}
          >
            <i className="bi bi-chevron-bar-right"></i>
          </button>

          <button 
          type="button" 
          className={`btn ${shouldShuffle && 'btn-active'}`}
          onClick={toggleShuffle}
          >
            <i className="bi bi-shuffle"></i>
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2>Please add tracks to enjoy music</h2>
        </div>
      )}
    </div>
  );
}

export default memo(Player);
