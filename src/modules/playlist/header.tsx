type Props = {
    togglePlaylist : () => void,
}

function Header({togglePlaylist}:Props) {
    return (
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
    )
}

export default Header
