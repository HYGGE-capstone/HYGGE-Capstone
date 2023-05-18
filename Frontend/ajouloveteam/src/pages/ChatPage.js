import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useridState } from "../recoil/atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  const [chatRoomList, setChatRoomList] = useState([
    { id: 1, name: "시스템 알림" },
  ]);
  const [selectChatRoom, setSelectChatRoom] = useState("시스템 알림");
  const [chatMessage, setChatMessage] = useState([]);
  const [chatContent, setChatContent] = useState("");
  const [userId, setUserId] = useRecoilState(useridState);

  const changechatContent = (event) => {
    setChatContent(event.target.value);
  };

  const navigate = useNavigate();
  const navigateToMain = () => {
    navigate("/main");
  };
  const getSystemAlarm = async () => {
    const accessToken = localStorage.getItem("accessToken");
    await axios
      .get(`http://43.201.179.98:8080/api/v1/noti`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        var tempChatMessage = resp.data.notifications;
        console.log(tempChatMessage);
        tempChatMessage.reverse();
        console.log(tempChatMessage);
        //const newChatMessage = chatMessage.reverse();
        setChatMessage(tempChatMessage);
        //console.log(chatMessage);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSystemAlarm();
  }, []);
  const sendMessage = () => {
    const newMessage = {
      id: 1,
      sender: "송명준",
      content: chatContent,
    };
    const tempChatMessage = [...chatMessage];
    tempChatMessage.splice(tempChatMessage.length, 0, newMessage);
    setChatMessage(tempChatMessage);
    setChatContent("");
  };

  return (
    <div>
      <div className="main-top">
        <div className="main-wrapper">
          <div className="top-name" onClick={() => navigateToMain()}>
            아주좋은팀
          </div>
        </div>
      </div>
      <div className="chat-mid">
        <div className="chat-side">
          <div className="chat-side-wrapper">
            <div className="chat-room-jemok">쪽지함 목록</div>
            <div className="chat-room-list">
              {chatRoomList.map((data) => {
                return (
                  <div
                    className="char-room-name"
                    key={data.id}
                    onClick={() => getSystemAlarm()}
                  >
                    {data.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="chat-main">
          <div className="chat-main-top">
            <div className="chat-top-wrapper">
              <div className="chat-top-name">{selectChatRoom}</div>
            </div>
          </div>
          <div className="chat-main-mid">
            <div className="chat-mid-wrapper">
              <div className="chat-message">
                {chatMessage.map((data) => {
                  return (
                    <div
                      className="chat-message-wrapper"
                      key={data.createdTime}
                    >
                      <div className="chat-message-person">{data.from}</div>
                      <div className="chat-message-content">{data.content}</div>
                      {data.opened === true && (
                        <div className="chat-message-time">
                          {data.createdTime}
                        </div>
                      )}
                      {data.opened === false && (
                        <div className="chat-message-time">
                          {data.createdTime}
                          <div className="chat-message-new">New</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
