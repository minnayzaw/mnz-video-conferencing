import "./App.css";
import React, { useState } from "react";
import md5 from "md5";
import {hostId} from './config/Constants';

function JoinScreen({ getMeetingAndToken, userNameHandler, userName, userIdHandler, userId, authToken }) {
  const [meetingId, setMeetingId] = useState(null);
  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };
  return (
    <div className="form-group video-join-call-div">
      <div className="account-box">
        <input
          className="form-control video-join-call-button"
          type="text"
          placeholder="Enter Meeting Id"
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
        />
       <input
          id="join-user-name"
          className="form-control video-join-call-button"
          type="text"
          placeholder="Enter your name"
          onChange={(e) => {
            userNameHandler(e.target.value);
          }}
        />
        <button className="btn btn-primary btn-rounded join-button" onClick={onClick} disabled={meetingId && authToken && userName ? "" : "disabled"}><i className="fa fa-video-camera camera"></i>&nbsp;Join now</button>
      </div>
      <div className="account-box">
        <input
          id="create-user-name"
          className="form-control video-join-call-button"
          type="text"
          placeholder="Enter user ID"
          onChange={(e) => {
            userIdHandler(e.target.value);
          }}
        />
        <button className="btn btn-primary btn-rounded join-button" onClick={onClick} disabled={userId && md5(userId) === hostId ? "" : "disabled"}><i className="fa fa-video-camera camera"></i>&nbsp;Login to create a meeting</button>
      </div>
    </div>
  );
}

export default JoinScreen;