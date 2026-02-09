import "./App.css";
import React,{useState} from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import Controls from "./Controls";
import ParticipantView from "./ParticipantView";
import ChatView from "./ChatView";


function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  const [userInfo] = useState(localStorage.getItem('meetingUsers')?localStorage.getItem('username'):[{}]);

  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED");
     // addUserInfo('1234567890',props.userName?props.userName:props.userId);
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });
  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="page-wrapper">
      {joined && joined === "JOINED" ? (
        <>
            <div className="chat-main-wrapper">
                <div className="fixed-header">
                        <div className="navbar">
                              <div className="user-details mr-auto">
                                    <div className="float-left user-img m-r-10">
                                        <div title={props.userName?props.userName:props.userId}><img src="assets/img/user.jpg" alt="" className="w-40 rounded-circle" /><span className="status online"></span></div>
                                    </div>
                                    <div className="user-info float-left">
                                        <div title={props.userName?props.userName:props.userId}><span className="font-bold">{props.userName?props.userName:props.userId}</span></div>
                                        <span className="last-seen">Online</span>
                                    </div>
                              </div>
                              <span className="blog-title meeting-text">Meeting Id: {props.meetingId}</span>
                        </div>
                  </div>
                        {/* For rendering all the participants in the meeting */}
                        {[...participants.keys()].map((participantId) => (
                          <ParticipantView
                            participantId={participantId}
                            key={participantId}
                            userName={props.userName}
                            userId={props.userId}
                            userInfo={userInfo}
                          />
                          ))}
                          <Controls />
            </div>
            <div id="chat-view-div">
              <div className="fixed-header">
                <ul className="nav nav-tabs nav-tabs-bottom">
                    <li className="nav-item group-chat-box-title"><div className="nav-link active show" data-toggle="tab">Group Chat Box</div></li>
                </ul>
            </div>
                <ChatView userId={props.userId?props.userId:''} />
            </div>
            </>
            
          ) : joined && joined === "JOINING" ? (
            <div className="account-box video-join-call-button-div">
              <p><i className="fa fa-video-camera"></i>&nbsp;Joining the meeting...</p>
            </div>
            
          ) : (
            <div className="account-box video-join-call-button-div">
              <button className="btn btn-primary" onClick={joinMeeting}><i className="fa fa-video-camera"></i>&nbsp;{props.userId && "Create and"} Join a meeting</button>
            </div>
          )}
    </div>
  );
}

export default MeetingView;