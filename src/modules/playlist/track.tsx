import { IPicture } from "music-metadata/lib/type";
import { useEffect, useState } from "react";
import computeDuration from "../../helper/computeDuration";
import readMetaData from "../../helper/readMeta";
import AlbumCover from "../../images/audio-icon.png";

type Props = {
  trackData: File | null;
  index : number;
  selectTrackFromPlaylist : (tracknum:number) => void

};

type TrackType = {
    albumTitle: string | undefined;
    artistName: string | undefined;
    imageSrc: IPicture | undefined;
    duration: number ;
  };



function Track({ trackData, index,selectTrackFromPlaylist }: Props) {
  const [parseData, setParsedData] = useState<TrackType | undefined>(undefined);
  useEffect(() => {
    if (trackData) {
      readMetaData(trackData).then((res: any) => {
        setParsedData(res);
      });
    }
  }, [trackData]);

  function getTrack () {
    selectTrackFromPlaylist(index)

  }

  return (
    <div className="playlist-track-wrap" onClick={getTrack}>
      <div className="playlist-image-wrap">
        <picture>
          <source
            srcSet={
              parseData?.imageSrc?.format
                ? `data:${
                    parseData?.imageSrc?.format
                  };base64,${parseData.imageSrc.data.toString("base64")}`
                : ""
            }
          />
          <img src={AlbumCover} alt="albumcover.jpg"></img>
        </picture>
      </div>
      <div className="playlist-track-detail">
        <h4>{parseData && parseData.albumTitle ? parseData.albumTitle : 'N/A' }</h4>
        <p>{parseData && parseData.artistName ? parseData.artistName : 'N/A'}</p>
      </div>
      
      <p>{parseData && parseData.duration ? computeDuration(parseData.duration) : 'N/A' }</p>
    </div>
  );
}

export default Track;
