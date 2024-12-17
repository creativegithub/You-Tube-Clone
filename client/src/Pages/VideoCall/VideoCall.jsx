import React, { useState, useEffect, useRef } from "react";
import "./VideoCall.css";
import { useDispatch, useSelector } from "react-redux";
import RecordRTC from "recordrtc";
import io from "socket.io-client";
import { createCall, endExistingCall, joinCall } from "../../action/Call";
import { VscLiveShare } from "react-icons/vsc";
import { RiLiveFill, RiLiveLine } from "react-icons/ri";
import { MdScreenShare, MdStopScreenShare } from "react-icons/md";
import { BsRecord, BsRecordBtn, BsRecordBtnFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import Leftsidebar from "../../Components/Leftsidebar/Leftsidebar";

const VideoCall = () => {
  const { callerId, callerName, role } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const calls = useSelector((state) => state.callreducer.data);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [notification, setNotification] = useState("");
  const socket = useRef();

  const isHost = role === "host";

  // console.log("Caller ID:", callerId); // This will log the callerId from the URL
  // console.log("Role:", role);
  // console.log("Caller Name", callerName);

  const currentuser = useSelector((state) => state.currentuserreducer);

  const userId = currentuser.result._id;

  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.on("offer", async (offer) => {
      const pc = new RTCPeerConnection();
      setPeerConnection(pc);
      await pc.setRemoteDescription(new RTCSessionDescription(offer));

      localStream
        .getTracks()
        .forEach((track) => pc.addTrack(track, localStream));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.current.emit("answer", answer);

      pc.onicecandidate = ({ candidate }) => {
        if (candidate) {
          socket.current.emit("candidate", candidate);
        }
      };

      pc.ontrack = (event) => {
        if (event.streams && event.streams.length > 0) {
          const stream = event.streams[0];
          setRemoteStream(stream);
          remoteVideoRef.current.srcObject = stream;
        }
      };
    });

    socket.current.on("userLiveNotification", (message) => {
      showNotification(message);
    });

    socket.current.on("answer", (answer) => {
      peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.current.on("candidate", (candidate) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      socket.current.disconnect();
      if (peerConnection) peerConnection.close();
    };
  }, [localStream]);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);
    remoteVideoRef.current.srcObject = stream;
    dispatch(createCall(callerId, callerName));

    const pc = new RTCPeerConnection();
    setPeerConnection(pc);
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.current.emit("offer", offer);

    // Emit the "startCall" event when the host goes live
    socket.current.emit("startCall", callerId, callerName);

    pc.onicecandidate = ({ candidate }) => {
      if (candidate) {
        socket.current.emit("candidate", candidate);
      }
    };

    pc.ontrack = (event) => {
      if (event.streams && event.streams.length > 0) {
        const stream = event.streams[0];
        setRemoteStream(stream);
        remoteVideoRef.current.srcObject = stream;
      }
    };

    showNotification("You are now live!");
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      // Add screen tracks to the peer connection.
      screenStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, screenStream);
      });

      // Set the screen stream as the local video (you can also hide local video).
      remoteVideoRef.current.srcObject = screenStream;
      setIsScreenSharing(true);

      // Listen for the end of the screen sharing
      screenStream
        .getVideoTracks()[0]
        .addEventListener("ended", stopScreenShare);

      showNotification("Screen sharing started.");
    } catch (error) {
      console.error("Error sharing the screen:", error);

      showNotification("Failed to start screen sharing.");
    }
  };

  const stopScreenShare = () => {
    if (!peerConnection || peerConnection.connectionState === "closed") {
      console.warn("Peer connection is closed. Cannot stop screen sharing.");
      return;
    }

    // Restore the original local stream (camera and mic)
    localVideoRef.current.srcObject = localStream;
    setIsScreenSharing(false); // Update screen sharing state

    showNotification("Screen sharing stopped.");
  };

  const endCall = async () => {
    const recordingUrl = "url_to_the_recording";
    if (!calls || !Array.isArray(calls)) {
      console.error("Calls state is not available or is not an array");
      return;
    }

    const currentCall = calls.find((call) => call.callerId === callerId);
    if (!currentCall) {
      console.error("No active call found for callerId:", callerId);
      return;
    }

    await dispatch(endExistingCall(currentCall._id, recordingUrl));
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (peerConnection) {
      peerConnection.close();
    }

    // Stop recording if it's active
    stopRecording();

    // Stop screen sharing if it's active
    if (isScreenSharing) {
      stopScreenShare();
    }

    setIsScreenSharing(false);
    showNotification("Live stream ended.");

    // Navigate to home page
    navigate("/");
  };

  const startRecording = () => {
    const newRecorder = RecordRTC(localStream, { type: "video" });
    newRecorder.startRecording();
    setRecorder(newRecorder);
    showNotification("Recording started.");
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "recording.webm";
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
      });
      showNotification("Recording stopped and saved.");
    }
  };

  const showNotification = (message) => {
    setNotification(message);

    // Optional: Clear the notification after 3 seconds
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <div className="container_Pages_App">
      <Leftsidebar />
      <div className="container2_Pages_App">
        <div className="videoCallContainer">
          <div className="videoCallContainer2">
            {isScreenSharing ? (
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                className="videoCallVideo"
              />
            ) : (
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="videoCallVideo"
              />
            )}

            <div className="videoCallUserDetail">
              <div className="Channel_logo_App">
                <p className="fstChar_logo_App">
                  {callerName.charAt(0).toUpperCase()}
                </p>
              </div>
              {callerName}
            </div>
          </div>

          <div className="videoCallbuttonContainer">
            {/* Render Go Live button if the user is the host */}
            {isHost ? (
              <button className="joinBtn" onClick={startCall}>
                Go Live <RiLiveFill size={22} />
              </button>
            ) : (
              <button
                className="joinBtn"
                onClick={() => dispatch(joinCall(callerId, userId))}
              >
                Join Live <VscLiveShare size={22} />
              </button>
            )}

            {/* Render additional buttons only if the user is the host */}
            {isHost && (
              <>
                <button className="joinBtn" onClick={endCall}>
                  End Live <RiLiveLine size={22} />
                </button>
                <button className="joinBtn" onClick={startRecording}>
                  Record <BsRecordBtnFill size={22} />
                </button>
                <button className="joinBtn" onClick={stopRecording}>
                  Stop Recording <BsRecordBtn size={22} />
                </button>
                <button
                  className="joinBtn"
                  onClick={isScreenSharing ? stopScreenShare : startScreenShare}
                >
                  {isScreenSharing ? "Stop Sharing" : "Share Screen"}
                  {isScreenSharing ? (
                    <MdStopScreenShare size={22} />
                  ) : (
                    <MdScreenShare size={22} />
                  )}
                </button>
              </>
            )}
          </div>
          {notification && (
            <div className="notification_container">
              <div className="notification">
                <p>{notification}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
