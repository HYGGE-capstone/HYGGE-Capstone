import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useridState, messageToIdState } from "../recoil/atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import api from "../axios/axios";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  const [messageRoomList, setMessageRoomList] = useState([]);
  const [selectMessageRoom, setSelectMessageRoom] = useState("");
  const [selectMessageRoomId, setSelectMessageRoomId] = useState();
  const [messageList, setMessageList] = useState([]);
  const [chatContent, setChatContent] = useState("");
  const [userId, setUserId] = useRecoilState(useridState);
  const [messageToId, setMessageToId] = useRecoilState(messageToIdState);

  const changechatContent = (event) => {
    setChatContent(event.target.value);
  };

  const navigate = useNavigate();
  const navigateToMain = () => {
    navigate("/main");
  };

  const getMessageRoom = async () => {
    //const accessToken = localStorage.getItem("accessToken");
    await api
      .get(`v1/message/room`)
      .then((resp) => {
        //console.log(resp);
        var tempRoomList = resp.data;
        tempRoomList.sort(function (a, b) {
          if (a.lastUpdateTime < b.lastUpdateTime) return 1;
          if (a.lastUpdateTime > b.lastUpdateTime) return -1;
          return 0;
        });
        setMessageRoomList(tempRoomList);

        for (var i = 0; i < resp.data.length; i++) {
          if (resp.data[i].toId === messageToId) {
            setMessageToId(resp.data[i].toId);
            setSelectMessageRoom(resp.data[i].toNickname);
            setSelectMessageRoomId(resp.data[i].messageRoomId);
            getMessageList(
              resp.data[i].messageRoomId,
              resp.data[i].toNickname,
              resp.data[i].toId
            );
            break;
          }
        }
      })
      .catch((err) => {
        //console.log(err);
        alert(err.response.data.message);
      });
  };

  const getMessageRoomAfterDelete = async () => {
    await api
      .get(`v1/message/room`)
      .then((resp) => {
        //console.log(resp);
        var tempRoomList = resp.data;
        tempRoomList.sort(function (a, b) {
          if (a.lastUpdateTime < b.lastUpdateTime) return 1;
          if (a.lastUpdateTime > b.lastUpdateTime) return -1;
          return 0;
        });
        setMessageRoomList(tempRoomList);
      })
      .catch((err) => {
        //console.log(err);
        //alert(err.response.data.message);
      });
  };
  const getMessageList = async (messageRoomId, toNickname, toId) => {
    await api
      .get(`v1/message/room/${messageRoomId}`)
      .then((resp) => {
        console.log(resp);
        //var tempMessage = resp.data;
        //tempMessage.reverse();
        //const newChatMessage = chatMessage.reverse();
        setMessageList(resp.data);
        setSelectMessageRoomId(messageRoomId);
        setSelectMessageRoom(toNickname);
        setMessageToId(toId);
        getMessageRoomAfterDelete();
        console.log(messageToId);
      })
      .catch((err) => {
        //console.log(err);
        alert(err.response.data.message);
      });
  };

  const messageSend = async () => {
    const message = {
      to: messageToId,
      content: chatContent,
    };
    await api
      .post(`v1/message`, message)
      .then((resp) => {
        //console.log(resp);
        setChatContent("");
        getMessageList(selectMessageRoomId, selectMessageRoom, messageToId);
      })
      .catch((err) => {
        alert(err.response.data.message);
        setChatContent("");
      });
  };

  const deleteMessageRoom = async (messageRoomId) => {
    await api
      .delete(`v1/message/room/${messageRoomId}`)
      .then((resp) => {
        getMessageRoomAfterDelete();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  useEffect(() => {
    getMessageRoom();
    //getMessageList(selectMessageRoomId);
  }, []);

  return (
    <div className="message-page">
      <div className="main-top">
        <div className="main-wrapper">
          <div
            className="top-name"
            onClick={() => navigateToMain()}
            style={{ fontFamily: "SUITE-Regular" }}
          >
            아주좋은팀
          </div>
        </div>
      </div>
      <div className="message-mid">
        <div className="message-side" style={{ fontFamily: "SUITE-Regular" }}>
          <div className="message-side-wrapper">
            <div className="message-room-jemok">쪽지함 목록</div>
            <div className="message-room-list">
              {messageRoomList.map((data) => {
                return (
                  <div
                    className="message-room-name"
                    key={data.toId}
                    onClick={() =>
                      getMessageList(
                        data.messageRoomId,
                        data.toNickname,
                        data.toId
                      )
                    }
                  >
                    {data.dirty && (
                      <div
                        className="chat-message-new"
                        style={{ marginRight: "2px" }}
                      >
                        New
                      </div>
                    )}
                    {data.toNickname}
                    <Button
                      variant="outlined"
                      style={{
                        marginLeft: "20px",
                        borderRadius: "0",
                        borderWidth: "2px",
                        fontSize: "8px",
                      }}
                      onClick={() => deleteMessageRoom(data.messageRoomId)}
                    >
                      쪽지함 삭제
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="message-main">
          <div className="message-main-top">
            <div className="message-top-wrapper">
              <div
                className="message-top-name"
                style={{ fontFamily: "SUITE-Regular" }}
              >
                {selectMessageRoom}
              </div>
            </div>
          </div>
          <div className="message-main-mid">
            <div className="message-mid-wrapper">
              {messageList.map((data, index) => {
                return (
                  <div
                    className={`${
                      messageToId === data.toId
                        ? "message-same-wrapper"
                        : "message-message-wrapper"
                    }`}
                    key={data.messageId}
                  >
                    <div
                      className="message-message-content"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {data.content}
                    </div>
                    {data.opened === true && (
                      <div className="message-message-time">
                        {data.createdTime}
                      </div>
                    )}
                    {data.opened === false && (
                      <div className="message-message-time">
                        {data.createdTime}
                        <div className="message-message-new">New</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="message-input-wrapper">
            <TextField
              className="message-text"
              variant="standard"
              value={chatContent}
              placeholder="메세지 입력"
              onChange={changechatContent}
              style={{
                width: "100%",
                height: 100,
              }}
              InputProps={{
                disableUnderline: true,
                style: { height: 100, overflowY: "scroll" },
              }}
              multiline
            />

            <div className="message-input-submit">
              <Button
                variant="outlined"
                style={{
                  width: "100%",
                  height: "60px",
                  marginTop: "5px",
                  borderRadius: "0",
                  borderWidth: "2px",
                }}
                onClick={messageSend}
              >
                전송
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
