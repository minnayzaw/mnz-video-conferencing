import "./App.css";
import React,{useState} from "react";
import { useMeeting } from "@videosdk.live/react-sdk";

function Controls() {
  const { leave, toggleMic, toggleWebcam} = useMeeting();
  const [mediaConfig, setMediaConfig] = useState({
    video:1,
    audio:1
  });
  const mediaHandler = (val) =>{
     mediaConfig[val] === 1 ? 
     setMediaConfig(prevMedia => ({
      ...prevMedia, 
      [val]: 2
    }))
    : 
    setMediaConfig(prevMedia => ({
      ...prevMedia, 
      [val]: 1
    }))
    val === 'video' ? toggleWebcam() : toggleMic();
  }
  return (
    <div className="video-join-call-controls">
      <div className="chat-footer">
          <div className="call-icons account-box">
                  <ul className="call-items">
                      <li className="call-item">
                          <div onClick={() => mediaHandler('video')} title="Enable Video" data-placement="top" data-toggle="tooltip">
                          {mediaConfig.video === 1 && <i className="fa fa-video-camera"></i>}
                          {mediaConfig.video === 2 && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-camera-video-off" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10.961 12.365a2 2 0 0 0 .522-1.103l3.11 1.382A1 1 0 0 0 16 11.731V4.269a1 1 0 0 0-1.406-.913l-3.111 1.382A2 2 0 0 0 9.5 3H4.272l.714 1H9.5a1 1 0 0 1 1 1v6a1 1 0 0 1-.144.518zM1.428 4.18A1 1 0 0 0 1 5v6a1 1 0 0 0 1 1h5.014l.714 1H2a2 2 0 0 1-2-2V5c0-.675.334-1.272.847-1.634zM15 11.73l-3.5-1.555v-4.35L15 4.269zm-4.407 3.56-10-14 .814-.58 10 14z"/>
                              </svg>
                          }
                          </div>
                      </li>
                       <li className="call-item">
                            <div onClick={() => mediaHandler('audio')} title="Mute Audio" data-placement="top" data-toggle="tooltip">
                                 {mediaConfig.audio === 1 && <i className="fa fa-microphone"></i>}
                                 {mediaConfig.audio === 2 && 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-mic-mute" viewBox="0 0 16 16">
                                      <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4 4 0 0 0 12 8V7a.5.5 0 0 1 1 0zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a5 5 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4m3-9v4.879l-1-1V3a2 2 0 0 0-3.997-.118l-.845-.845A3.001 3.001 0 0 1 11 3"/>
                                      <path d="m9.486 10.607-.748-.748A2 2 0 0 1 6 8v-.878l-1-1V8a3 3 0 0 0 4.486 2.607m-7.84-9.253 12 12 .708-.708-12-12z"/>
                                    </svg>
                                  }
                             </div>
                        </li>
                        <li className="call-item">
                            <div onClick={() => leave()} title="End Call" data-placement="top" data-toggle="tooltip">
                                 <i className="fa fa-phone end-call-icon"></i>
                             </div>
                        </li>
                      </ul>
                     
            </div>
        </div>
    </div>
  );
}

export default Controls;