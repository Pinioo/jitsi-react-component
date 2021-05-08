import React from "react"

const VideoConference = (props) => {
  const userInfo = props.userInfo
  const jitsiContainerId = "jitsi-container-id"
  const [jitsi, setJitsi] = React.useState({})

  const loadJitsiAPI = () => {
    let resolver = null;

    const onloadPromise = new Promise((resolve) => {
      resolver = resolve;
    });
  
    const script = document.createElement("script")
    script.src = "https://meet.jit.si/external_api.js"
    script.async = true
    script.onload = () => resolver()
    document.body.appendChild(script)
    return onloadPromise
  }

  const initJitsi = async () => {
    await loadJitsiAPI()
    setJitsi(createJistiMeet())
  }

  const interfaceOverwrite = userInfo.adminRole === true ? {
      TOOLBAR_ALWAYS_VISIBLE: false
    }:{
      TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'chat', 'settings'
      ],
      TOOLBAR_ALWAYS_VISIBLE: false
    }

  const createJistiMeet = () => {
    return new window.JitsiMeetExternalAPI("meet.jit.si", {
      roomName: userInfo.roomName,
      userInfo: {
        displayName: userInfo.displayName
      },
      configOverwrite: {
        hideConferenceSubject: true,
        enableNoisyMicDetection: false,
        prejoinPageEnabled: false
      },
      interfaceConfigOverwrite: interfaceOverwrite,
      parentNode: document.getElementById(jitsiContainerId)
    })
  }
  
  React.useEffect(() => {
    initJitsi()
    return () => jitsi?.dispose?.()
  }, [])

  return <div id={jitsiContainerId} style={{ height:720, width: "100%" }} />
}

export default VideoConference
