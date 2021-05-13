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
      <div className="menu">
        <button
          className="btn"
          type="button"
          onClick={togglePlaylist}
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        <h2>Playlist</h2>
      </div>
      <TrackList 
       playlist = {playlist}
       selectTrackFromPlaylist = {selectTrackFromPlaylist}
      />
    </div>
  );
}

export default Playlist;
