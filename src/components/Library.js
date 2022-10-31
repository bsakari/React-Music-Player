import React from "react";
import LibrarySong from "./LibrarySong";
const Library = (props) => {
  return(
      <div className={`library ${props.libraryStatus?"active-library":""}`}>
          <h2>Songs</h2>
          <div className="library-songs">
              {props.songs.map((song,index)=> (
                  <LibrarySong
                      setSongs={props.setSongs}
                      audioRef={props.audioRef}
                      setIsPlaying={props.setIsPlaying}
                      isPlaying={props.isPlaying}
                      setCurrentSong={props.setCurrentSong}
                      song={song}
                      songs={props.songs}
                      key={song.id}/>))}
          </div>
      </div>
  )
}
export default Library