import React from "react"

const VideoConference = (props) => {
  const jitsiContainerId = "jitsi-container-id"
  const [jitsi, setJitsi] = React.useState({})

  const initialiseJitsi = async () => {
    if(!document.getElementById("jitsi")){
      const script = document.createElement("script")
      script.src = "https://meet.jit.si/external_api.js"
      script.async = true
      script.id = "jitsi"
      document.body.appendChild(script)
      script.onload = () => { 
        const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
            roomName: props.roomName,
            userInfo: {
              displayName: props.displayName
            },
            configOverwrite: {
              hideConferenceSubject: true,
              enableNoisyMicDetection: false,
              prejoinPageEnabled: false
            },
            interfaceConfigOverwrite: {
              TOOLBAR_BUTTONS: [
                  'microphone', 'camera', 'chat', 'settings'
              ],
              TOOLBAR_ALWAYS_VISIBLE: false
            },
            parentNode: document.getElementById(jitsiContainerId)
        })

        setJitsi(_jitsi)
      }
    }
  }

  React.useEffect(() => {
    return () => jitsi?.dispose?.()
  }, [jitsi])

  initialiseJitsi()

  return <div id={jitsiContainerId} style={{ height:720, width: "40%" }} />
}

export default VideoConference
