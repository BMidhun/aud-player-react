import Header from "./header";
import TrackList from "./tracklist";

type Props = {
    openPlaylist : boolean,
    togglePlaylist : () => void,
    playlist : File[],
    selectTrackFromPlaylist : (tracknum:number) => void
}

function Playlist({openPlaylist,togglePlaylist,playlist,selectTrackFromPlaylist}:Props) {
   

  return (
    <div className={`playlist playlist-${openPlaylist ? 'show': 'hide'}`} >
      <Header 
       togglePlaylist={togglePlaylist}
      />
      <TrackList 
       playlist = {playlist}
       selectTrackFromPlaylist = {selectTrackFromPlaylist}
      />
    </div>
  );
}

export default Playlist;
