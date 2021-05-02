import React from "react";
import VideoConference from "./VideoConference";

const App = () => {
  const [displayName, setDisplayName] = React.useState('')
  const [roomName, setRoomName] = React.useState('')

  const [tmpDisplayName, setTmpDisplayName] = React.useState('')
  const [tmpRoomName, setTmpRoomName] = React.useState('')

  const handleSubmit = (event) => {
    setDisplayName(tmpDisplayName)
    setRoomName(tmpRoomName)
    event.preventDefault()
  }

  const handleRoomChange = (event) => {
    setTmpRoomName(event.target.value)
  }

  const handleDisplayChange = (event) => {
    setTmpDisplayName(event.target.value)
  }

  if(displayName !== '' && roomName !== '') 
    return <VideoConference displayName={displayName} roomName={roomName}/>
  else
    return <form onSubmit={handleSubmit}>
      <label>
        Display name: <input type="text" name="displayName" onChange={handleDisplayChange} />
      </label><br />
      <label>
        Room name: <input type="text" name="roomName" onChange={handleRoomChange} />
      </label><br />
      <input type="submit" value="Join" />
    </form>
};

export default App;
