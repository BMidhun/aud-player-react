import { SetStateAction } from "react"

type Props = {
    togglePlaylist : React.Dispatch<SetStateAction<boolean>>
}

function PlaylistMenu({togglePlaylist} : Props) {
    return (
        <>
           <button className="btn" type="button" onClick={() => togglePlaylist(false)}>
           <i className="bi bi-chevron-left"></i>
          </button> 

          <h2>
              Playlist 
          </h2>
        </>
    )
}

export default PlaylistMenu
