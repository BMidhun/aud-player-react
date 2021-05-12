import { useState , useEffect} from "react";
import Menu from "./modules/common/menu";
import Player from "./modules/player";
import PlayerMenu from "./modules/player/playermenu";
import Playlist from "./modules/playlist";
import PlaylistMenu from "./modules/playlist/playlistmenu";

function App() {
  const [isOnPlaylist, setIsOnPlaylist] = useState<boolean>(false);
  const [currentTrackIndex ,setCurrentTrackIndex] = useState<number>(0);
  const [playlist,setPlaylist] = useState<FileList|null>(null);

 

  return (
    <div className="mobile-layout">
      <div className="screen">
        <Menu>
          {!isOnPlaylist ? (
            <PlayerMenu togglePlaylist={setIsOnPlaylist} setPlaylist={setPlaylist} />
          ) : <PlaylistMenu togglePlaylist={setIsOnPlaylist}/>}
        </Menu>
        {!isOnPlaylist ? <Player currentTrack={playlist? playlist[currentTrackIndex] : null}/> : <Playlist />}
      </div>
    </div>
  );
}

export default App;
