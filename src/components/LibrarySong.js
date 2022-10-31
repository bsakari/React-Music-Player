import React from "react";

const LibrarySong = function (props) {
    //EventHandler
    const songSelectHandler = async ()=>{
        await props.setCurrentSong(props.song)

        //Add active state
        const newSongs = props.songs.map(function (song) {
            if (props.song.id === song.id){
                return{
                    ...song,active:true
                }
            }else {
                return {
                    ...song,active:false
                }
            }
        })
        props.setSongs(newSongs)
        if (props.isPlaying) props.audioRef.current.play()

    }

    return (
        <div onClick={songSelectHandler} className={`library-song ${props.song.active?" selected":""}`}>
            <img alt={props.song.name} src={props.song.cover}/>
            <div className="song-description">
                <h3>{props.song.name}</h3>
                <h4>{props.song.artist}</h4>
            </div>
        </div>
    )
}
export default LibrarySong