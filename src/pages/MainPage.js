import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import {
  useridState,
  userNickNameState,
  messageToIdState,
} from "../recoil/atom";
import axios from "axios";
import api from "../axios/axios";
import { get } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Button2 from "react-bootstrap/Button";

function MainPage() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [open7, setOpen7] = React.useState(false);
  const [open8, setOpen8] = React.useState(false);
  const [open9, setOpen9] = React.useState(false);
  const [open10, setOpen10] = React.useState(false);
  const [open11, setOpen11] = React.useState(false);
  const [open12, setOpen12] = React.useState(false);
  const [inputValue, setInputValue] = useState("");
  const [select, setSelect] = useState("");
  const [subjectSection, setSubjectSection] = useState(-1);
  const [teamTopButton, setTeamTopButton] = useState(0);
  const [selectTeamName, setSelectTeamName] = useState("");
  const [selectTeamId, setSelectTeamId] = useState();
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [selectSubjectId, setSelectSubjectId] = useState();
  const [teamApplicantId, setTeamApplicantId] = useState();
  const [selectApplyNickName, setSelectApplyNickName] = useState("");
  const [selectSuggestNickName, setSelectSuggestNickName] = useState("");
  const [selectSuggestId, setSelectSuggestId] = useState();
  const [teamDescription, setTeamDescription] = useState("");
  const [teamSubject, setTeamSubject] = useState("");
  const [teamMaxNum, setTeamMaxNum] = useState("");
  const [teamName, setTeamName] = useState("");
  const [userId, setUserId] = useRecoilState(useridState);
  const [userNickName, setUserNickName] = useRecoilState(userNickNameState);
  const [messageToId, setMessageToId] = useRecoilState(messageToIdState);
  const [resumeTitle, setResumeTitle] = useState("");
  const [resumeContent, setResumeContent] = useState("");
  const [resumeId, setResumeId] = useState();
  const [showResumeTitle, setShowResumeTitle] = useState("");
  const [showResumeContent, setShowResumeContent] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [teamJonbo, setTeamJonbo] = useState("");
  const [teamTitle, setTeamTitle] = useState("");
  const [selectOfferId, setSelectOfferId] = useState();
  const [selectOfferTeamName, setSelectOfferTeamName] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [gudok, setGucok] = useState([]);
  const [isAlarm, setIsAlarm] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [isLeader, setIsLeader] = useState(false);
  const [subjectSearchResult, setSubjectSearchResult] = useState([]);
  const [teamInfo, setTeamInfo] = useState([]);
  const [teamSupplyInfo, setTeamSupplyInfo] = useState([]);
  const [subTeamInfo, setSubTeamInfo] = useState([]);
  const [subscriberList, setSubscriberList] = useState([]);
  const [teamSuggestList, setTeamSuggestList] = useState([]);
  const [team, setTeam] = useState([]);
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike"],
        [
          {
            color: [],
          },
          { background: [] },
        ],
        ["clean"],
      ],
    },
  };
  const handleClick = (id, name, leader, subjectId) => {
    setSelect(id);
    console.log(id);
    setSelectTeamName(name);
    setSelectSubjectId(subjectId);
    setSubjectSection(1);
    setIsLeader(leader);
    getTeamMembers(id);
    setTeamSupplyInfo([]);
    // 가입 로직 실행
  };
  const handleClick2 = (id, name) => {
    setSelect(id);
    setSelectTeamName(name);
    setSelectTeamId(id);
    setSubjectSection(2);
    getSubjectTeamList(id);
    setSubjectId(id);
    // 가입 로직 실행
  };
  const changeTeamDescription = (value) => {
    setTeamDescription(value);
  };
  const changeTeamName = (event) => {
    setTeamName(event.target.value);
  };
  const changeTeamSubject = (event) => {
    setTeamSubject(event.target.value);
  };
  const changeTeamMaxNum = (event) => {
    setTeamMaxNum(event.target.value);
  };
  const subjectSearchClick = (name, id) => {
    setSubjectSection(2);
    setSelectTeamName(name);
    getSubjectTeamList(id);
  };

  const changeResumeTitle = (e) => {
    setResumeTitle(e.target.value);
  };
  const changeResumeContent = (value) => {
    setResumeContent(value);
  };
  const changeInputValue = (event) => {
    setInputValue(event.target.value);
  };

  const changeMessageContent = (event) => {
    setMessageContent(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setResumeTitle("");
    setResumeContent("");
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    setTeamName("");
    setTeamDescription("");
    setTeamSubject("");
    setTeamMaxNum();
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClickOpen4 = () => {
    setOpen4(true);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };
  const handleClickOpen5 = (teamName, teamId) => {
    setOpen5(true);
    setSelectedTeam(teamName);
    setSelectedTeamId(teamId);
  };

  const handleClose5 = () => {
    setOpen5(false);
  };
  const handleClickOpen6 = (id, nickName) => {
    setOpen6(true);
    setTeamApplicantId(id);
    setSelectApplyNickName(nickName);
  };

  const handleClose6 = () => {
    setOpen6(false);
  };
  const handleClickOpen7 = (id, nickName) => {
    setOpen7(true);
    setTeamApplicantId(id);
    setSelectApplyNickName(nickName);
  };

  const handleClose7 = () => {
    setOpen7(false);
  };

  const handleClickOpen8 = (id, nickName) => {
    setOpen8(true);
    setSelectSuggestNickName(nickName);
    setSelectSuggestId(id);
  };

  const handleClose8 = () => {
    setOpen8(false);
  };
  const handleClickOpen9 = (id, name) => {
    setOpen9(true);
    setSelectOfferId(id);
    setSelectOfferTeamName(name);
  };

  const handleClose9 = () => {
    setOpen9(false);
  };
  const handleClickOpen10 = (id, name) => {
    setOpen10(true);
    setSelectOfferId(id);
    setSelectOfferTeamName(name);
  };

  const handleClose10 = () => {
    setOpen10(false);
  };

  const handleClickOpen11 = (id, name) => {
    setOpen11(true);
  };

  const handleClose11 = () => {
    setOpen11(false);
  };

  const handleClickOpen12 = (id, name) => {
    setOpen12(true);
  };

  const handleClose12 = () => {
    setOpen12(false);
  };
  const navigate = useNavigate();

  const navigateToPersonal = () => {
    navigate("/personal");
  };
  const navigateToChat = () => {
    navigate("/chat");
  };
  const navigateToMessage = () => {
    navigate("/message");
  };

  const OpenMessageForm = (memberId) => {
    setMessageToId(memberId);
    handleClickOpen12();
  };
  const logout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const token = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    await api
      .post(`auth/logout`, token)
      .then((resp) => {
        navigate("/login");
        setUserId("");
        setUserNickName("");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const makeTeam = async () => {
    const newTeam = {
      name: teamName,
      subjectId: subjectId,
      title: teamSubject,
      description: teamDescription,
      maxMember: teamMaxNum,
    };
    //const accessToken = localStorage.getItem("accessToken");
    await api
      .post(`v1/team/create`, newTeam, {})
      .then((resp) => {
        console.log(resp);
        handleClose2();
        setTeamName("");
        setTeamSubject("");
        setTeamDescription("");
        setTeamMaxNum();
        getSubjectTeamList(subjectId);
        getTeamList();
      })
      .catch((err) => {
        alert(err.response.data.message);
        setTeamName("");
        setTeamSubject("");
        setTeamDescription("");
        setTeamMaxNum();
      });
    handleClose2();
  };

  const showTeamJonbo = (teamDescription, teamTitle) => {
    setTeamJonbo(teamDescription);
    setTeamTitle(teamTitle);
    handleClickOpen3();
  };
  const subSearch = async (e) => {
    await api
      .get(`v1/subject/search?query=${inputValue}`) //임시
      .then((resp) => {
        console.log(resp);
        console.log(resp.data.subjects);
        setSubjectSection(0);
        setSubjectSearchResult(resp.data.subjects);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const getTeamList = async () => {
    //const accessToken = localStorage.getItem("accessToken");
    await api
      .get(`v1/team`)
      .then((resp) => {
        console.log(resp);
        setTeam(resp.data.teams);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  const subjectGudok = async () => {
    console.log(subjectId);
    const id = {
      subjectId: subjectId,
    };
    //const accessToken = localStorage.getItem("accessToken");
    await api
      .post(`v1/subscribe`, id)
      .then((resp) => {
        console.log(resp);
        getGudok();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const makeResume = (id) => {
    handleClickOpen();
    setSubjectId(id);
  };

  const setResume = async (id) => {
    const resume = {
      content: resumeContent,
      title: resumeTitle,
      subjectId: subjectId,
    };
    //const accessToken = localStorage.getItem("accessToken");
    await api
      .post(`v1/resume`, resume)
      .then((resp) => {
        console.log(resp);
        handleClose();
        subjectGudok();
      })
      .catch((err) => {
        alert(err.response.data.message);
        handleClose();
      });
  };

  const showMemberResume = async (memberId) => {
    //const accessToken = localStorage.getItem("accessToken");
    await api
      .get(`v1/resume/subject/${selectSubjectId}/member/${memberId}`)
      .then((resp) => {
        console.log(resp);
        setShowResumeTitle(resp.data.title);
        setShowResumeContent(resp.data.content);
        handleClickOpen4();
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  };

  const TeamApply = async (teamId) => {
    const teamApply = {
      teamId: teamId,
    };
    //const accessToken = localStorage.getItem("accessToken");
    await api
      .post(`v1/applicant`, teamApply)
      .then((resp) => {
        console.log(resp);
        handleClose5();
      })
      .catch((err) => {
        alert(err.response.data.message);
        handleClose5();
      });
  };

  const teamApplyOk = async (id) => {
    const teamApply = {
      teamApplicantId: teamApplicantId,
    };
    //const accessToken = localStorage.getItem("accessToken");
    await api
      .post(`v1/applicant/accept`, teamApply)
      .then((resp) => {
        console.log(resp);
        getTeamApplyList();
        handleClose6();
      })
      .catch((err) => {
        alert(err.response.data.message);
        handleClose6();
      });
  };
  const teamApplyNo = async (id) => {
    const teamApply = {
      teamApplicantId: teamApplicantId,
    };
    //const accessToken = localStorage.getItem("accessToken");
    await api
      .post(`v1/applicant/reject`, teamApply)
      .then((resp) => {
        console.log(resp);
        getTeamApplyList();
        handleClose7();
      })
      .catch((err) => {
        alert(err.response.data.message);
        handleClose7();
      });
  };

  const teamSuggest = async () => {
    const teamSuggest = {
      subscriberId: selectSuggestId,
      teamId: select,
    };
    //const accessToken = localStorage.getItem("accessToken");
    await api
      .post(`v1/offer`, teamSuggest)
      .then((resp) => {
        console.log(resp);
        getSubscriberList();
        handleClose8();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
        handleClose8();
      });
  };

  const teamSuggestOk = async () => {
    const offer = {
      offerId: selectOfferId,
    };
    //const accessToken = localStorage.getItem("accessToken");
    await api
      .post(`v1/offer/accept`, offer)
      .then((resp) => {
        console.log(resp);
        getTeamSuggestList();
        getTeamList();
        handleClose9();
      })
      .catch((err) => {
        alert(err.response.data.message);
        handleClose9();
      });
  };
  const teamSuggestNo = async () => {
    const offer = {
      offerId: selectOfferId,
    };
    //const accessToken = localStorage.getItem("accessToken");
    await api
      .post(`v1/offer/reject`, offer)
      .then((resp) => {
        console.log(resp);
        getTeamSuggestList();
        handleClose10();
      })
      .catch((err) => {
        alert(err.response.data.message);
        handleClose10();
      });
  };

  const messageSend = async () => {
    const message = {
      to: messageToId,
      content: messageContent,
    };
    await api
      .post(`v1/message`, message)
      .then((resp) => {
        console.log(resp);
        setMessageToId(resp.data.toId);
        handleClose12();
        navigateToMessage();
      })
      .catch((err) => {
        alert(err.response.data.message);
        handleClose12();
      });
  };

  const setResumeChange = async () => {
    await api
      .get(`v1/resume/subject/${subjectId}/me`)
      .then((resp) => {
        console.log(resp);
        setResumeTitle(resp.data.title);
        setResumeContent(resp.data.content);
        setResumeId(resp.data.resumeId);
        handleClickOpen11();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const resumeChange = async () => {
    const resume = {
      resumeId: resumeId,
      content: resumeContent,
      title: resumeTitle,
      subjectId: subjectId,
    };
    await api
      .put(`v1/resume`, resume)
      .then((resp) => {
        console.log(resp);
        handleClose11();
      })
      .catch((err) => {
        handleClose11();
        alert(err.response.data.message);
      });
  };
  const getTeamSuggestList = async () => {
    //const accessToken = localStorage.getItem("accessToken");
    setTeamTopButton(4);
    await api
      .get(`v1/offer?subjectId=${subjectId}`)
      .then((resp) => {
        console.log(resp);
        setTeamSuggestList(resp.data.offerTeams);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const getAlarmCheck = async () => {
    //const accessToken = localStorage.getItem("accessToken");
    await api
      .get(`v1/noti/check`)
      .then((resp) => {
        console.log(resp);
        setIsAlarm(resp.data.dirty);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  const getMessageCheck = async () => {
    //const accessToken = localStorage.getItem("accessToken");
    await api
      .get(`v1/message/check/total`)
      .then((resp) => {
        console.log(resp);
        setIsMessage(resp.data.dirty);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  const getGudok = async () => {
    //const accessToken = localStorage.getItem("accessToken");
    await api
      .get(`v1/subscribe`)
      .then((resp) => {
        console.log(resp);
        setGucok(resp.data.subscribes);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  const getSubscriberList = async () => {
    //const accessToken = localStorage.getItem("accessToken");
    setTeamTopButton(2);
    await api
      .get(`v1/team/subscribers?subjectId=${selectSubjectId}`)
      .then((resp) => {
        console.log(resp);
        setSubscriberList(resp.data.members);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  const getSubjectTeamList = async (id) => {
    //const accessToken = localStorage.getItem("accessToken");
    setTeamTopButton(3);
    await api
      .get(`v1/team/search?subjectId=${id}`)
      .then((resp) => {
        console.log(resp);
        setSubTeamInfo(resp.data.teams);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  const getTeamMembers = async (id) => {
    //const accessToken = localStorage.getItem("accessToken");
    setTeamTopButton(0);
    await api
      .get(`v1/team/members?teamId=${id}`)
      .then((resp) => {
        console.log(resp);
        setTeamInfo(resp.data.members);
        console.log(teamInfo);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const getTeamApplyList = async () => {
    setTeamTopButton(1);
    console.log(select);
    //const accessToken = localStorage.getItem("accessToken");
    await api
      .get(`v1/applicant?teamId=${select}`)
      .then((resp) => {
        console.log(resp);
        setTeamSupplyInfo(resp.data.applicants);
        console.log(teamSupplyInfo);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  useEffect(() => {
    getGudok();
    getTeamList();
    getAlarmCheck();
    getMessageCheck();
  }, []);

  return (
    <div className="main-page">
      <div className="main-top">
        <div className="main-wrapper">
          <div className="top-name">아주좋은팀</div>
        </div>
      </div>
      <div className="main-mid">
        <div className="main-mid-wrapper">
          <div className="mid-top-wrapper">
            <div className="left-top-wrapper">
              <div className="jongbo-section">
                <div className="jongbo-wrapper">
                  <div className="jongbo-picture"></div>
                  <div className="jongbo-text-wrapper">
                    <div className="jongbo-text-name">{userNickName}</div>
                    <div className="jongbo-text-id">({userId})</div>
                  </div>
                </div>
                <div className="jongbo-button-wrapper">
                  {isAlarm === true ? (
                    <Button
                      id="alarmButton"
                      variant="outlined"
                      style={{
                        marginRight: "10px",
                        width: "20%",
                        fontSize: "9px",
                        color: "red",
                        borderColor: "red",
                      }}
                      onClick={navigateToChat}
                    >
                      알림
                    </Button>
                  ) : (
                    <Button
                      id="alarmButton"
                      variant="outlined"
                      style={{
                        marginRight: "10px",
                        width: "20%",
                        fontSize: "12px",
                      }}
                      onClick={navigateToChat}
                    >
                      알림
                    </Button>
                  )}

                  {isMessage === true ? (
                    <Button
                      variant="outlined"
                      style={{
                        marginRight: "10px",
                        width: "20%",
                        fontSize: "9px",
                        color: "red",
                        borderColor: "red",
                      }}
                      onClick={navigateToMessage}
                    >
                      쪽지
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      style={{
                        marginRight: "10px",
                        width: "20%",
                        fontSize: "12px",
                      }}
                      onClick={navigateToMessage}
                    >
                      쪽지
                    </Button>
                  )}

                  <Button
                    variant="outlined"
                    style={{ width: "20%", fontSize: "12px" }}
                    onClick={() => logout()}
                  >
                    로그아웃
                  </Button>
                </div>
              </div>
            </div>
            <div className="right-top-wrapper">
              <div className="search-section">
                <div className="search-wrapper">
                  <div className="search-field">
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="과목이름"
                      variant="standard"
                      value={inputValue}
                      onChange={changeInputValue}
                    />
                  </div>
                </div>
                <div className="search-button">
                  <Button
                    variant="outlined"
                    style={{
                      marginRight: "15px",
                      marginTop: "40px",
                      marginLeft: "20px",
                    }}
                    onClick={subSearch}
                  >
                    검색
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mid-down-wrapper">
            <div className="left-down-wrapper">
              <div className="gudok-section">
                {team.map((data) => (
                  <div
                    onClick={() =>
                      handleClick(
                        data.teamId,
                        data.teamName,
                        data.leader,
                        data.subjectId
                      )
                    }
                    className={`${select === data.teamId ? "select" : "team"}`}
                    key={data.teamId}
                  >
                    <div className="team-jongbo">
                      <div className="team-jongbo-time">
                        {data.subjectName}({data.subjectCode})
                      </div>
                      <div className="team-jongboname-wrapper">
                        <div className="team-jongbo-name">{data.teamName}</div>
                        {data.leader && (
                          <div className="team-jongbo-leader">L</div>
                        )}
                      </div>
                    </div>
                    <div className="subject-button"></div>
                  </div>
                ))}
                {gudok.map((data) => (
                  <div
                    onClick={() => handleClick2(data.subjectId, data.name)}
                    className={`${
                      select === data.subjectId ? "select" : "subject"
                    }`}
                    key={data.subjectId}
                  >
                    <div className="subject-jongbo">
                      <div className="subject-time">
                        {data.year}년 {data.semester}학기
                      </div>
                      <div className="subject-name">
                        {data.name} {data.code}
                      </div>
                    </div>
                    <div className="subject-button">
                      <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle
                          split
                          variant="success"
                          id="dropdown-split-basic"
                          drop="end"
                          style={{
                            background: "white",
                            color: "blue",
                            borderColor: "#5D9FDF",
                            height: "30px",
                            marginLeft: "40px",
                          }}
                        />

                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">
                            구독 해제
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#/action-2"
                            onClick={setResumeChange}
                          >
                            이력서 수정
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="right-down-wrapper">
              <div className="subject-section">
                {subjectSection === 0 && (
                  <div className="subject-search-result">
                    {subjectSearchResult.map((data) => (
                      <div className="subject-search-com" key={data.code}>
                        <div
                          className="subject-search-name"
                          onClick={() =>
                            subjectSearchClick(data.name, data.subjectId)
                          }
                        >
                          {data.name} ({data.code})
                          <div className="subject-search-prof">
                            {data.pname}
                          </div>
                        </div>
                        <div className="subject-search-button">
                          <Button
                            variant="outlined"
                            style={{ marginLeft: "20px" }}
                            onClick={() => makeResume(data.subjectId)}
                          >
                            구독
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {subjectSection === 1 && (
                  <div className="team-info-result">
                    <div className="team-info-top">
                      <div className="team-top-name">
                        팀 {selectTeamName}
                        {isLeader && <div className="team-top-leader">L</div>}
                      </div>
                      <div className="team-top-button">
                        <Button
                          variant="outlined"
                          style={{ marginLeft: "20px" }}
                          onClick={() => {
                            getTeamMembers(select);
                          }}
                        >
                          팀 정보 보기
                        </Button>
                        {isLeader && (
                          <Button
                            variant="outlined"
                            style={{ marginLeft: "20px" }}
                            onClick={() => {
                              getTeamApplyList();
                            }}
                          >
                            팀 지원자 보기
                          </Button>
                        )}
                        {isLeader && (
                          <Button
                            variant="outlined"
                            style={{ marginLeft: "20px" }}
                            onClick={() => {
                              getSubscriberList();
                            }}
                          >
                            팀 미소속 구독자 보기
                          </Button>
                        )}
                      </div>
                    </div>
                    {subjectSection === 1 &&
                      teamTopButton === 0 &&
                      teamInfo.map((data) => (
                        <div className="team-info-com" key={data.memberId}>
                          <div className="team-info-name">
                            {data.nickname}
                            <div className="team-info-id">({data.loginId})</div>
                          </div>
                          <div className="team-info-button">
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
                              onClick={() => {
                                OpenMessageForm(data.memberId);
                              }}
                            >
                              쪽지
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
                              onClick={() => {
                                showMemberResume(data.memberId);
                              }}
                            >
                              이력서 보기
                            </Button>
                          </div>
                        </div>
                      ))}
                    {subjectSection === 1 &&
                      teamTopButton === 1 &&
                      teamSupplyInfo.map((data) => (
                        <div className="team-info-com" key={data.applicantId}>
                          <div className="team-info-supplyName">
                            {data.applicantNickname}({data.applicantLoginId})
                          </div>
                          <div className="team-info-button">
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
                              onClick={() =>
                                handleClickOpen6(
                                  data.teamApplicantId,
                                  data.applicantNickname
                                )
                              }
                            >
                              수락
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
                              onClick={() =>
                                handleClickOpen7(
                                  data.teamApplicantId,
                                  data.applicantNickname
                                )
                              }
                            >
                              거절
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
                              onClick={() => {
                                OpenMessageForm(data.applicantId);
                              }}
                            >
                              쪽지
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
                              onClick={() => showMemberResume(data.applicantId)}
                            >
                              이력서 보기
                            </Button>
                          </div>
                        </div>
                      ))}
                    {subjectSection === 1 &&
                      teamTopButton === 2 &&
                      subscriberList.map((data) => (
                        <div className="team-info-com" key={data.memberId}>
                          <div className="team-info-supplyName">
                            {data.nickname}({data.loginId})
                          </div>
                          <div className="team-info-button">
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
                              onClick={() =>
                                handleClickOpen8(data.memberId, data.nickname)
                              }
                            >
                              제안
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
                              onClick={() => {
                                OpenMessageForm(data.memberId);
                              }}
                            >
                              쪽지
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
                              onClick={() => showMemberResume(data.memberId)}
                            >
                              이력서 보기
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
                {subjectSection === 2 && (
                  <div className="sub-team-result">
                    <div className="sub-team-top">
                      <div className="sub-top-name">
                        {selectTeamName}
                        <div className="sub-top-text">에서 모집중인 팀</div>
                      </div>
                      <div className="sub-top-button">
                        <Button
                          variant="outlined"
                          style={{ marginRight: "20px" }}
                          onClick={handleClickOpen2}
                        >
                          팀 생성
                        </Button>
                        <Button
                          variant="outlined"
                          style={{ marginRight: "50px" }}
                          onClick={() => getTeamSuggestList()}
                        >
                          팀 합류 제안 조회
                        </Button>
                      </div>
                    </div>
                    {teamTopButton === 3 &&
                      subTeamInfo.map((data) => (
                        <div className="sub-team-com" key={data.teamId}>
                          <div className="sub-team-name">{data.teamName}</div>
                          <div className="sub-team-sub">{data.teamTitle}</div>
                          <div className="sub-team-num">
                            {data.numMember}/{data.maxMember}
                          </div>
                          <div className="sub-team-button">
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
                              onClick={() =>
                                handleClickOpen5(data.teamName, data.teamId)
                              }
                            >
                              지원
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
                              onClick={() => {
                                OpenMessageForm(data.leaderId);
                              }}
                            >
                              쪽지
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
                              onClick={() =>
                                showTeamJonbo(
                                  data.teamDescription,
                                  data.teamTitle
                                )
                              }
                            >
                              정보보기
                            </Button>
                          </div>
                        </div>
                      ))}
                    {teamTopButton === 4 &&
                      teamSuggestList.map((data) => (
                        <div className="sub-team-com" key={data.teamId}>
                          <div className="sub-team-name">{data.teamName}</div>
                          <div className="sub-team-sub">{data.teamTitle}</div>
                          <div className="sub-team-num">
                            {data.numMember}/{data.maxMember}
                          </div>
                          <div className="sub-team-button">
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "10px" }}
                              onClick={() =>
                                handleClickOpen9(data.offerId, data.teamName)
                              }
                            >
                              수락
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "10px" }}
                              onClick={() =>
                                handleClickOpen10(data.offerId, data.teamName)
                              }
                            >
                              거절
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "10px" }}
                              onClick={() => {
                                OpenMessageForm(data.leaderId);
                              }}
                            >
                              쪽지
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "10px" }}
                              onClick={() =>
                                showTeamJonbo(
                                  data.teamDescription,
                                  data.teamTitle
                                )
                              }
                            >
                              정보보기
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <Dialog
              open={open2}
              onClose={handleClose2}
              PaperProps={{ sx: { width: "60%", height: "60%" } }}
            >
              <DialogTitle style={{ background: "#072e5d", color: "white" }}>
                팀 생성
              </DialogTitle>
              <DialogContent
                style={{
                  marginTop: "15px",
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "scroll",
                }}
              >
                <div
                  className="resume-dialog-wrapper"
                  style={{ height: "80%" }}
                >
                  팀 이름
                  <TextField
                    id="outlined-textarea"
                    variant="standard"
                    value={teamName}
                    onChange={changeTeamName}
                    style={{
                      width: "100%",
                      marginBottom: "12px",
                    }}
                    InputProps={{
                      style: {},
                    }}
                    multiline
                  />
                  팀 주제
                  <TextField
                    id="outlined-textarea"
                    variant="standard"
                    value={teamSubject}
                    onChange={changeTeamSubject}
                    style={{
                      width: "100%",
                      marginBottom: "12px",
                    }}
                    InputProps={{
                      style: {},
                    }}
                    multiline
                  />
                  팀 설명
                  <ReactQuill
                    onChange={changeTeamDescription}
                    value={teamDescription}
                    modules={modules}
                  />
                  팀 인원수
                  <input
                    type="number"
                    value={teamMaxNum}
                    onChange={changeTeamMaxNum}
                    min="2"
                    style={{
                      marginTop: "12px",
                      width: "20%",
                      fontSize: "15px",
                    }}
                  ></input>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={makeTeam} style={{ color: "#072e5d" }}>
                  확인
                </Button>
                <Button onClick={handleClose2} style={{ color: "#072e5d" }}>
                  닫기
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{ sx: { width: "60%", height: "60%" } }}
            >
              <DialogTitle style={{ background: "#072e5d", color: "white" }}>
                이력서 추가
              </DialogTitle>
              <DialogContent style={{ marginTop: "15px" }}>
                <div
                  className="resume-dialog-wrapper"
                  style={{ height: "80%" }}
                >
                  이력서 제목
                  <TextField
                    id="outlined-textarea"
                    variant="standard"
                    value={resumeTitle}
                    onChange={changeResumeTitle}
                    style={{
                      width: "100%",
                      marginBottom: "12px",
                    }}
                    InputProps={{
                      style: {
                        overflowY: "scroll",
                      },
                    }}
                    multiline
                  />
                  이력서 내용
                  <ReactQuill
                    onChange={changeResumeContent}
                    value={resumeContent}
                    modules={modules}
                    style={{ height: "70%" }}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={setResume} style={{ color: "#072e5d" }}>
                  추가
                </Button>
                <Button onClick={handleClose} style={{ color: "#072e5d" }}>
                  닫기
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={open3}
              onClose={handleClose3}
              PaperProps={{ sx: { width: "60%", height: "60%" } }}
            >
              <DialogTitle style={{ background: "#072e5d", color: "white" }}>
                주제 : {teamTitle}
              </DialogTitle>
              <div
                style={{
                  marginTop: "10px",
                  marginLeft: "25px",
                  fontSize: "20px",
                }}
              >
                설명
              </div>
              <DialogContent>
                <div
                  className="resume-dialog-wrapper"
                  style={{ marginTop: "20px" }}
                  dangerouslySetInnerHTML={{ __html: teamJonbo }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose3} style={{ color: "#072e5d" }}>
                  닫기
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={open4}
              onClose={handleClose4}
              PaperProps={{ sx: { width: "60%", height: "60%" } }}
            >
              <DialogTitle style={{ background: "#072e5d", color: "white" }}>
                제목 :{showResumeTitle}
              </DialogTitle>
              <div
                style={{
                  marginTop: "10px",
                  marginLeft: "25px",
                  fontSize: "20px",
                }}
              >
                내용
              </div>
              <DialogContent>
                <div
                  className="resume-dialog-wrapper"
                  style={{ marginTop: "20px" }}
                  dangerouslySetInnerHTML={{ __html: showResumeContent }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose4} style={{ color: "#072e5d" }}>
                  닫기
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={open5}
              onClose={handleClose5}
              PaperProps={{ sx: { width: "40%", height: "30%" } }}
            >
              <DialogTitle style={{ background: "#072e5d", color: "white" }}>
                팀 지원
              </DialogTitle>
              <DialogContent style={{ marginTop: "10px" }}>
                {selectedTeam}에 지원하시겠습니까?
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => TeamApply(selectedTeamId)}
                  style={{ color: "#072e5d" }}
                >
                  지원
                </Button>
                <Button onClick={handleClose5} style={{ color: "#072e5d" }}>
                  취소
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={open6}
              onClose={handleClose6}
              PaperProps={{ sx: { width: "40%", height: "30%" } }}
            >
              <DialogTitle style={{ background: "#072e5d", color: "white" }}>
                지원자 수락
              </DialogTitle>
              <DialogContent style={{ marginTop: "10px" }}>
                {selectApplyNickName}님의 지원을 수락하시겠습니까?
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => teamApplyOk()}
                  style={{ color: "#072e5d" }}
                >
                  수락
                </Button>
                <Button onClick={handleClose6} style={{ color: "#072e5d" }}>
                  닫기
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={open7}
              onClose={handleClose7}
              PaperProps={{ sx: { width: "40%", height: "30%" } }}
            >
              <DialogTitle style={{ background: "#072e5d", color: "white" }}>
                지원자 거절
              </DialogTitle>
              <DialogContent style={{ marginTop: "10px" }}>
                {selectApplyNickName}님의 지원을 거절하시겠습니까?
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => teamApplyNo()}
                  style={{ color: "#072e5d" }}
                >
                  거절
                </Button>
                <Button onClick={handleClose7} style={{ color: "#072e5d" }}>
                  닫기
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={open8}
              onClose={handleClose8}
              PaperProps={{ sx: { width: "40%", height: "30%" } }}
            >
              <DialogTitle style={{ background: "#072e5d", color: "white" }}>
                팀 합류 제안
              </DialogTitle>
              <DialogContent style={{ marginTop: "10px" }}>
                {selectSuggestNickName}님에게 팀 합류 제안을 보내시겠습니까?
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => teamSuggest()}
                  style={{ color: "#072e5d" }}
                >
                  확인
                </Button>
                <Button onClick={handleClose8} style={{ color: "#072e5d" }}>
                  닫기
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={open9}
              onClose={handleClose9}
              PaperProps={{ sx: { width: "40%", height: "30%" } }}
            >
              <DialogTitle style={{ background: "#072e5d", color: "white" }}>
                팀 합류 제안 수락
              </DialogTitle>
              <DialogContent style={{ marginTop: "10px" }}>
                {selectOfferTeamName}팀 합류 제안을 수락하시겠습니까?
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => teamSuggestOk()}
                  style={{ color: "#072e5d" }}
                >
                  확인
                </Button>
                <Button onClick={handleClose9} style={{ color: "#072e5d" }}>
                  닫기
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={open10}
              onClose={handleClose10}
              PaperProps={{ sx: { width: "40%", height: "30%" } }}
            >
              <DialogTitle style={{ background: "#072e5d", color: "white" }}>
                팀 합류 제안 거절
              </DialogTitle>
              <DialogContent style={{ marginTop: "10px" }}>
                {selectOfferTeamName}팀 합류 제안을 거절하시겠습니까?
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => teamSuggestNo()}
                  style={{ color: "#072e5d" }}
                >
                  확인
                </Button>
                <Button onClick={handleClose10} style={{ color: "#072e5d" }}>
                  닫기
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={open11}
              onClose={handleClose11}
              PaperProps={{ sx: { width: "60%", height: "60%" } }}
            >
              <DialogTitle style={{ background: "#072e5d", color: "white" }}>
                이력서 수정
              </DialogTitle>
              <DialogContent style={{ marginTop: "15px" }}>
                <div
                  className="resume-dialog-wrapper"
                  style={{ height: "80%" }}
                >
                  이력서 제목
                  <TextField
                    id="outlined-textarea"
                    variant="standard"
                    value={resumeTitle}
                    onChange={changeResumeTitle}
                    style={{
                      width: "100%",
                      marginBottom: "12px",
                    }}
                    InputProps={{
                      style: {
                        overflowY: "scroll",
                      },
                    }}
                    multiline
                  />
                  이력서 내용
                  <ReactQuill
                    onChange={changeResumeContent}
                    value={resumeContent}
                    modules={modules}
                    style={{ height: "70%" }}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={resumeChange} style={{ color: "#072e5d" }}>
                  수정
                </Button>
                <Button onClick={handleClose11} style={{ color: "#072e5d" }}>
                  닫기
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={open12}
              onClose={handleClose12}
              PaperProps={{ sx: { width: "60%", height: "35%" } }}
            >
              <DialogTitle style={{ background: "#072e5d", color: "white" }}>
                쪽지 보내기
              </DialogTitle>
              <DialogContent style={{ marginTop: "15px" }}>
                <TextField
                  className="message-text"
                  variant="standard"
                  placeholder="메세지 입력"
                  value={messageContent}
                  onChange={changeMessageContent}
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
              </DialogContent>
              <DialogActions>
                <Button onClick={messageSend} style={{ color: "#072e5d" }}>
                  전송
                </Button>
                <Button onClick={handleClose12} style={{ color: "#072e5d" }}>
                  닫기
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
