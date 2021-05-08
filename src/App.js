import React from "react";
import VideoConference from "./VideoConference";

const App = () => {
  const [tmpUserInfo, setTmpUserInfo] = React.useState({
    displayName: "",
    roomName: "",
    adminRole: false,
  })

  const [userInfo, setUserInfo] = React.useState(null)

  const handleChange = (event) => {
    const target = event.target
    console.log(target)
    if(target.type === "checkbox")
      setTmpUserInfo({ ...tmpUserInfo, [target.name]: target.checked});
    else
      setTmpUserInfo({ ...tmpUserInfo, [target.name]: target.value});
  }

  const handleSubmit = (event) => {
    setUserInfo(tmpUserInfo)
    event.preventDefault()
  }

  if(userInfo) 
    return <VideoConference userInfo={userInfo}/>
  else
    return <form onSubmit={handleSubmit}>
      <label>
        Display name: <input type="text" name="displayName" onChange={handleChange} />
      </label><br />
      <label>
        Room name: <input type="text" name="roomName" onChange={handleChange} />
      </label><br />
      <label>
        Are you admin?: <input type="checkbox" name="adminRole" onChange={handleChange} />
      </label><br />
      <input type="submit" value="Join" />
    </form>
};

export default App;
