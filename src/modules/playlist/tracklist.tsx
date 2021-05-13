import Track from "./track";

type Props = {
  playlist: File[];
  selectTrackFromPlaylist : (tracknum:number) => void
};

export default function TrackList({ playlist, selectTrackFromPlaylist }: Props) {

  return (
      playlist.length ? 
      <div className="tracklist">
         {      playlist.map((file,index) => {
                   return <Track trackData={file} key={file.name + index} index={index} selectTrackFromPlaylist = {selectTrackFromPlaylist}/>
                })

            }
      </div> 
      : 
      <div className="no-tracks"><h2>Please add some tracks</h2></div>
  )
}
