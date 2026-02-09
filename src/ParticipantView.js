import "./App.css";
import React, { useRef, useEffect } from "react";
import { useParticipant, VideoPlayer } from "@videosdk.live/react-sdk";


function ParticipantView(props) {
  const micRef = useRef(null);
  const {micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(props.participantId);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn, displayName]);

  return (
    <div>
      {webcamOn?
        (
        <VideoPlayer
          participantId={props.participantId} // Required
          type="video"
          className="h-full account-box"
          classNameVideo="h-full"
          videoStyle={{}}
        />
        ):(
          <div className="video-container h-full account-box no-image-div"><h3>{displayName}</h3></div>
        )
      }
      {/* <p>
        Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
        {micOn ? "ON" : "OFF"}
      </p> */}
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
    </div>
  );
}

export default ParticipantView;