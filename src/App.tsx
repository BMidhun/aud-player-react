import { useEffect, useState } from "react";
import filesAsArray from "./helper/filesAsArray";
import getRandomTrack from "./helper/getRandomTrackNumber";
import Menu from "./modules/common/menu";
import Player from "./modules/player";
import Playlist from "./modules/playlist";

function App() {
  const [openPlaylist, setOpenPlaylist] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [playlist, setPlaylist] = useState<File[]>([]);
  const [shouldRepeat, setShouldRepeat] = useState(false);
  const [shouldShuffle, setShouldShuffle] = useState(false);

  const selectTrackFromPlaylist = (trackIndex:number) => {
    setOpenPlaylist(false);
    setCurrentTrackIndex(trackIndex);
  }

  const showPlaylist = () => {
    setOpenPlaylist(true);
  };

  const hidePlaylist = () => {
    setOpenPlaylist(false);
  };

  const toggleRepeat = () => {
    setShouldRepeat((prev) => !prev);
  };

  const toggleShuffle = () => {
    setShouldShuffle((prev) => !prev);
  };

  useEffect(() => {
    
    console.log("shouldShuffle:",shouldShuffle)
  }, [shouldShuffle])

  const changePlayList = (filesList: FileList | null) => {
    if (playlist?.length && filesList?.length) {

      setPlaylist(prev => [...prev,...filesAsArray(filesList)]);
      return;
    }
    if (!playlist.length && filesList?.length) {
      setPlaylist(filesAsArray(filesList));
      return;
    }
  };

  const onNext = () => {
    const playlistLength = playlist ? playlist.length : 0;

    if(shouldRepeat)
        return;
    if(shouldShuffle) { 
        setCurrentTrackIndex(getRandomTrack(playlistLength));
        return;
    } 

    if (currentTrackIndex !== playlistLength - 1) {
      setCurrentTrackIndex((prev) => prev + 1);
      return
    }
  };

  const onPrevious = () => {

    const playlistLength = playlist ? playlist.length : 0;

    if(shouldRepeat)
    return;

    if(shouldShuffle) { 
      setCurrentTrackIndex(getRandomTrack(playlistLength));
      return;
  } 
    if (currentTrackIndex) {
      setCurrentTrackIndex((prev) => prev - 1);
      return
    }
  };

  return (
    <div className="mobile-layout">
      <div className="screen">
        <Menu togglePlaylist={showPlaylist} changePlayList={changePlayList} />
        <Playlist
          openPlaylist={openPlaylist}
          togglePlaylist={hidePlaylist}
          playlist={playlist}
          selectTrackFromPlaylist = {selectTrackFromPlaylist}
        />
        <Player
          currentTrack={playlist ? playlist[currentTrackIndex] : null}
          hasPrev={Boolean( (currentTrackIndex || shouldShuffle) && !shouldRepeat )}
          hasNext={Boolean(
            (currentTrackIndex !== (playlist ? playlist.length - 1 : 0) || shouldShuffle) && !shouldRepeat
          )}
          onPrevious={onPrevious}
          onNext={onNext}
          shouldRepeat ={shouldRepeat}
          toggleRepeat={toggleRepeat}
          toggleShuffle={toggleShuffle}
          shouldShuffle={shouldShuffle}
        />
      </div>
    </div>
  );
}

export default App;
