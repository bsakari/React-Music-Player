import React, {useRef, useState} from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import "./styles/app.scss"
import data from "./data"
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
    //Ref
    const audioRef = useRef(null)
    //State
    const [songs,setSongs] = useState(data())
    const [currentSong,setCurrentSong] = useState(songs[0])
    const [isPlaying,setIsPlaying] = useState(false)
    const [libraryStatus,setLibraryStatus] = useState(false)
  return (
    <div className={`App ${libraryStatus?"active-nav":""}`}>
        <Nav
            libraryStatus={libraryStatus}
            setLibraryStatus={setLibraryStatus}/>
        <Song
            currentSong={currentSong}/>
        <Player
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            songs={songs}
            setSongs={setSongs}/>
        <Library
            libraryStatus={libraryStatus}
            audioRef={audioRef}
            setIsPlaying={setIsPlaying}
            isPlaying={isPlaying}
            setCurrentSong={setCurrentSong}
            songs={songs}
            setSongs={setSongs}/>
    </div>
  );
}

export default App;
