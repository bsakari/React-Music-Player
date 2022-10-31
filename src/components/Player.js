import React, {useState,useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faPlay,faPause} from "@fortawesome/free-solid-svg-icons";

const Player = (props) => {
    //Use Effect
    useEffect(()=>{
        const newSongs = props.songs.map(function (song) {
            if (props.currentSong.id === song.id){
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
    },[props.currentSong])
    //Event Handlers
    const playSongHandler = () => {
        if (props.isPlaying){
            //Stop
            props.audioRef.current.pause()
            props.setIsPlaying(!props.isPlaying)
        }else {
            //Play
            props.audioRef.current.play()
            props.setIsPlaying(!props.isPlaying)
        }
    }

    const timeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime
        const songDuration = e.target.duration
        //Calculate Percentage
        const roundedCurrent = Math.round(currentTime)
        const roundedDuration = Math.round(songDuration)
        const animationPercentage = Math.round((roundedCurrent/roundedDuration)*100)
        setSongInfo({...songInfo,currentTime:currentTime,duration:songDuration,animationPercentage:animationPercentage})
    }

    const getTime = (time) => {
      return (
          Math.floor(time/60)+":"+("0"+Math.floor(time%60)).slice(-2)
      )
    }

    const dragHandler = (e) => {
        const currentTime = e.target.value
        props.audioRef.current.currentTime = currentTime
        setSongInfo({...songInfo,currentTime:currentTime})
    }

    const skipTrackHandler = async (direction) => {
        let currentIndex = props.songs.findIndex((song)=>song.id === props.currentSong.id)
        if (direction === "skip-forward"){
            await props.setCurrentSong(props.songs[(currentIndex+1)%props.songs.length])
            if (props.isPlaying)props.audioRef.current.play()
        }
        if (direction === "skip-back"){
            if ((currentIndex-1)%props.songs.length===-1){
                await props.setCurrentSong(props.songs[props.songs.length -1])
                if (props.isPlaying) props.audioRef.current.play()
                return
            }
            await props.setCurrentSong(props.songs[(currentIndex-1)%props.songs.length])
            if (props.isPlaying) props.audioRef.current.play()
        }
        if (props.isPlaying) props.audioRef.current.play()
    }

    const songEndHandler =  () => {
        let currentIndex = props.songs.findIndex((song)=>song.id === props.currentSong.id)
         props.setCurrentSong(props.songs[(currentIndex+1)%props.songs.length])
        if (props.isPlaying) {
            setTimeout(function () {
                props.audioRef.current.play()
            },2000)
        }
    }


    //State
    const [songInfo,setSongInfo]=useState({
        currentTime:0,
        duration:0,
        animationPercentage:0,
    })

    //Add the styles
    const trackAnim = {
        transform:`translateX(${songInfo.animationPercentage}%)`
    }

  return (
      <div className="player">
          <div className="time-control">
              <p>{getTime(songInfo.currentTime)}</p>
              <div style={{background:`linear-gradient(to right, ${props.currentSong.color[0]}, ${props.currentSong.color[1]})`}} className="track">
                  <input
                      onChange={dragHandler}
                      min={0}
                      max={songInfo.duration || 0}
                      value={songInfo.currentTime}
                      type="range"/>
                  <div style={trackAnim} className="animate-track"></div>
              </div>
              <p>{songInfo.duration?getTime(songInfo.duration):"0.00"}</p>
          </div>
          <div className="play-control">
              <FontAwesomeIcon onClick={()=>skipTrackHandler("skip-back")} className="skip-back" size="2x" icon={faAngleLeft}/>
              <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={props.isPlaying?faPause:faPlay}/>
              <FontAwesomeIcon onClick={()=>skipTrackHandler("skip-forward")} className="skip-forward" size="2x" icon={faAngleRight}/>
          </div>
          <audio onEnded={songEndHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={props.audioRef} src={props.currentSong.audio}></audio>

      </div>
  )
}
export default Player