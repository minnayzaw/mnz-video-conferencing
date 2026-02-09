import "./App.css";
import React, { useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "./API";
import JoinScreen from "./JoinScreen";
import MeetingView from "./MeetingView";
import SignUp from "./Signup";
import { GoogleLogin } from '@react-oauth/google';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './firebase';


function App(props) {
  const [meetingId, setMeetingId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loginToken, setLoginToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const responseMessage = (response) => {
    if(response.clientId && response.clientId === props.clientId){
      setLoginToken(response.clientId);
    }
  };
  const errorMessage = (error) => {
    setLoginToken(null);
  };

  const userNameHandler = (username) => {
    setUserName(username);
  }
  const userIdHandler = (userid) => {
    let userIdValue = userid;
    setUserId(userIdValue);
  }
  
  const getMeetingAndToken = async (id) => {
    const meetingId = id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };
  
  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      userCredential.user && userCredential.user.accessToken && setLoginToken(userCredential.user.accessToken);
    } catch (error) {
      let errMsg = error.message.split(':');
      setError(errMsg[1])
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setLoginToken(null);
    } catch (error) {
      setError('Error signing out: ');
    }
  };

  return authToken && meetingId ? (
    <div className="main-wrapper">
       <div className="header">
            <div className="header-left">
                <div className="logo">
                    <img src="assets/img/mnz-logo.jpeg" width="35" height="35" alt="" /> <span>MNZ Video Conferencing Room</span>
                </div>
            </div>
            {loginToken && <div className="header-right">
             <button className="btn btn-primary" onClick={handleSignOut}>Sign Out</button>
          </div>}
            <a id="mobile_btn" className="mobile_btn float-left" href="#sidebar"><i className="fa fa-bars"></i></a>
        </div>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: userName?userName:userId
        }}
        token={authToken}
      > <MeetingView authToken={authToken} meetingId={meetingId} userNameHandler={userNameHandler} userIdHandler={userIdHandler} userName={userName} userId={userId} onMeetingLeave={onMeetingLeave} />
      </MeetingProvider>
     
    </div>
  ) : (
    <div className="main-wrapper">
      <div className="header">
          <div className="header-left">
              <div className="logo">
                  <img src="assets/img/mnz-logo.jpeg" width="35" height="35" alt="" /> <span>MNZ Video Conferencing Room</span>
              </div>
          </div>
          {loginToken && <div className="header-right">
             <button className="btn btn-primary" onClick={handleSignOut}>Sign Out</button>
          </div>}
          <a id="mobile_btn" className="mobile_btn float-left" href="#sidebar"><i className="fa fa-bars"></i></a>
      </div>
      {loginToken && <JoinScreen authToken={authToken} userNameHandler={userNameHandler} userIdHandler={userIdHandler} userName={userName} userId={userId} getMeetingAndToken={getMeetingAndToken} />}
      {!loginToken && <>
        <SignUp />
        <div className="form-group sign-up-div google-button-div">
          <div className="account-box">
            {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{error}</strong> 
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
              </div>}
          <input 
              className="form-control video-join-call-button"
              type="email"
              placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
              className="form-control video-join-call-button"
              type="password"
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
          />
          <div id="sign-in-button-div">
            <button className="btn btn-primary btn-rounded join-button sign-in-button" onClick={handleSignIn}>Sign In</button>
            <GoogleLogin className="google-button" onSuccess={responseMessage} onError={errorMessage} />
          </div>
          <div className="clr"></div>
          </div>
        </div>
        </>
      }
    </div>
  );
 
}

export default App;