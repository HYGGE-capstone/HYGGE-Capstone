import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { useridState, userpwdState } from "../recoil/atom";
import axios from "axios";

const wholeTextArray = [
  "apple",
  "banana",
  "coding",
  "javascript",
  "java",
  "juice",
  "jupitor",
  "원티드",
  "프리온보딩",
  "프론트엔드",
];

function MainPage() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isHaveInputValue, setIsHaveInputValue] = useState(false);
  const [dropDownList, setDropDownList] = useState(wholeTextArray);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);
  const [select, setSelect] = useState("");
  const [select2, setSelect2] = useState("");
  const [subjectSection, setSubjectSection] = useState(-1);
  const [teamTopButton, setTeamTopButton] = useState(1);
  const [selectTeamName, setSelectTeamName] = useState("HYGGE");
  const [teamId, setTeamId] = useState();
  const [teamSubject, setTeamSubject] = useState("");
  const [teamMaxNum, setTeamMaxNum] = useState("");
  const [teamName, setTeamName] = useState("");
  const [userId, setUserId] = useRecoilState(useridState);
  const [userPwd, setUserPwd] = useRecoilState(userpwdState);
  const [subjectSearchResult, setSubjectSearchResult] = useState([
    "캡스톤디자인1",
    "캡스톤디자인2",
    "캡스톤디자인3",
    "캡스톤디자인4",
    "캡스톤디자인5",
  ]);
  const [teamInfo, setTeamInfo] = useState([
    {
      id: 1,
      name: "이지수",
      stack: "JAVA, C, Spring, Backend",
    },
    {
      id: 2,
      name: "권성학",
      stack: "Node.js, React, Frontend",
    },
    {
      id: 3,
      name: "송명준",
      stack: "Cloud, AWS, DevOps",
    },
  ]);
  const [teamSupplyInfo, setTeamSupplyInfo] = useState([
    {
      id: 1,
      name: "이지수",
      stack: "JAVA, C, Spring, Backend",
    },
    {
      id: 2,
      name: "권성학",
      stack: "Node.js, React, Frontend",
    },
    {
      id: 3,
      name: "송명준",
      stack: "Cloud, AWS, DevOps",
    },
  ]);
  const [subTeamInfo, setSubTeamInfo] = useState([
    {
      id: 1,
      name: "HYGGE",
      guamok: "캡스톤디자인",
      subject: "팀원 매칭 프로젝트",
      curNum: 4,
      maxNum: 5,
    },
    {
      id: 2,
      name: "뉴진스",
      guamok: "캡스톤디자인",
      subject: "주제 미정",
      curNum: 1,
      maxNum: 4,
    },
  ]);
  const [team, setTeam] = useState([
    {
      id: 11,
      subject: "캡스톤디자인",
      name: "아주좋은팀",
    },
    {
      id: 22,
      subject: "캡스톤디자인",
      name: "아주좋은팀",
    },
    {
      id: 33,
      subject: "캡스톤디자인",
      name: "아주좋은팀",
    },
  ]);
  const handleClick = (id, name) => {
    setSelect(id);
    setSelectTeamName(name);
    setSubjectSection(1);
    // 가입 로직 실행
  };
  const handleClick2 = (id, name) => {
    setSelect(id);
    setSelectTeamName(name);
    setSubjectSection(2);
    // 가입 로직 실행
  };
  const changeTeamId = (event) => {
    setTeamId(event.target.value);
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
  const subjectSearchClick = (name) => {
    setSubjectSection(2);
    setSelectTeamName(name);
  };
  const showDropDownList = () => {
    if (inputValue === "") {
      setIsHaveInputValue(false);
      setDropDownList([]);
    } else {
      const choosenTextList = wholeTextArray.filter((textItem) =>
        textItem.includes(inputValue)
      );
      setDropDownList(choosenTextList);
    }
  };

  const changeInputValue = (event) => {
    setInputValue(event.target.value);
    setIsHaveInputValue(true);
  };

  const clickDropDownItem = (clickedItem) => {
    setInputValue(clickedItem);
    setIsHaveInputValue(false);
  };

  const handleDropDownKey = (event) => {
    //input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (
        event.key === "ArrowDown" &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }

      if (event.key === "ArrowUp" && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1);
      if (event.key === "Enter" && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex]);
        setDropDownItemIndex(-1);
      }
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const navigate = useNavigate();

  const navigateToPersonal = () => {
    navigate("/personal");
  };

  const makeTeam = () => {
    const newTeam = {
      id: teamId,
      subject: selectTeamName,
      name: teamName,
    };
    const tempTeam = [...team];
    tempTeam.splice(tempTeam.length, 0, newTeam);
    setTeam(tempTeam);

    const newSubTeamInfo = {
      id: teamId,
      name: teamName,
      guamok: selectTeamName,
      subject: teamSubject,
      curNum: 1,
      maxNum: teamMaxNum,
    };
    const tempSubTeamInfo = [...subTeamInfo];
    tempSubTeamInfo.splice(tempSubTeamInfo.length, 0, newSubTeamInfo);
    setSubTeamInfo(tempSubTeamInfo);

    handleClose2();
  };

  const subSearch = async (e) => {
    await axios
      .get(
        `http://43.201.179.98:8080/api/v1/subject/search?query=${inputValue}`
      ) //임시
      .then((resp) => {
        console.log(resp.data.subjects);
        setSubjectSection(0);
        setSubjectSearchResult(resp.data.subjects);
      })
      .catch((err) => {});
  };
  useEffect(showDropDownList, [inputValue]);

  var subjectSearch = [
    "캡스톤디자인1",
    "캡스톤디자인2",
    "캡스톤디자인3",
    "캡스톤디자인4",
    "캡스톤디자인5",
  ];
  var gudok = [
    {
      id: 1,
      name: "SW캡스톤디자인",
      code: "F100-1",
      year: 2023,
      semester: 1,
    },
    {
      id: 2,
      name: "SW캡스톤디자인",
      code: "F100-1",
      year: 2023,
      semester: 1,
    },
    {
      id: 3,
      name: "SW캡스톤디자인",
      code: "F100-1",
      year: 2023,
      semester: 1,
    },
    {
      id: 4,
      name: "SW캡스톤디자인",
      code: "F100-1",
      year: 2023,
      semester: 1,
    },
  ];
  var resume = [
    {
      id: 1,
      user_id: 1,
      subject_id: 1,
      title: "이력서1",
      content:
        "동해물과백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화삼천리 화려강산 대한사람 대한으로 길이보전하세동해물과백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화삼천리 화려강산 대한사람 대한으로 길이보전하세동해물과백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화삼천리 화려강산 대한사람 대한으로 길이보전하세동해물과백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화삼천리 화려강산 대한사람 대한으로 길이보전하세동해물과백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화삼천리 화려강산 대한사람 대한으로 길이보전하세동해물과백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화삼천리 화려강산 대한사람 대한으로 길이보전하세동해물과백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화삼천리 화려강산 대한사람 대한으로 길이보전하세동해물과백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화삼천리 화려강산 대한사람 대한으로 길이보전하세",
    },
    {
      id: 2,
      user_id: 1,
      subject_id: 1,
      title: "이력서1",
      content:
        "동해물과백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화삼천리 화려강산 대한사람 대한으로 길이보전하세",
    },
    {
      id: 3,
      user_id: 1,
      subject_id: 1,
      title: "이력서1",
      content:
        "동해물과백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화삼천리 화려강산 대한사람 대한으로 길이보전하세",
    },
    {
      id: 4,
      user_id: 1,
      subject_id: 1,
      title: "이력서1",
      content:
        "동해물과백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화삼천리 화려강산 대한사람 대한으로 길이보전하세",
    },
    {
      id: 5,
      user_id: 1,
      subject_id: 1,
      title: "이력서1",
      content:
        "동해물과백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화삼천리 화려강산 대한사람 대한으로 길이보전하세",
    },
  ];
  return (
    <div>
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
                    <div className="jongbo-text-name">{userId}</div>
                  </div>
                </div>
                <div className="jongbo-button-wrapper">
                  <Button
                    variant="outlined"
                    style={{ marginRight: "15px" }}
                    onClick={navigateToPersonal}
                  >
                    내 정보
                  </Button>
                  <Button variant="outlined">로그아웃</Button>
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
                      onKeyUp={handleDropDownKey}
                    />
                    {isHaveInputValue && (
                      <div className="dropDownBox">
                        {dropDownList.map((dropDownItem, dropDownIndex) => {
                          return (
                            <div
                              className="dropDownItem"
                              key={dropDownIndex}
                              onClick={() => clickDropDownItem(dropDownItem)}
                              onMouseOver={() =>
                                setDropDownItemIndex(dropDownIndex)
                              }
                            >
                              {dropDownItem}
                            </div>
                          );
                        })}
                      </div>
                    )}
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
                    onClick={() => handleClick(data.id, data.name)}
                    className={`${select === data.id ? "select" : "team"}`}
                  >
                    <div className="team-jongbo">
                      <div className="team-jongbo-time">{data.subject}</div>
                      <div className="team-jongbo-name">{data.name}</div>
                    </div>
                    <div className="subject-button"></div>
                  </div>
                ))}
                {gudok.map((data) => (
                  <div
                    onClick={() => handleClick2(data.id, data.name)}
                    className={`${select === data.id ? "select" : "subject"}`}
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
                      <Button variant="outlined" style={{ marginLeft: "10px" }}>
                        구독 해제
                      </Button>
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
                      <div className="subject-search-com">
                        <div
                          className="subject-search-name"
                          onClick={() => subjectSearchClick(data.name)}
                        >
                          {data.name} {data.code}
                          <div className="subject-search-prof">
                            {data.pname}
                          </div>
                        </div>
                        <div className="subject-search-button">
                          <Button
                            variant="outlined"
                            style={{ marginLeft: "20px" }}
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
                      <div className="team-top-name">팀 {selectTeamName}</div>
                      <div className="team-top-button">
                        <Button
                          variant="outlined"
                          style={{ marginLeft: "20px" }}
                          onClick={() => {
                            setTeamTopButton(0);
                          }}
                        >
                          팀 정보 보기
                        </Button>
                        <Button
                          variant="outlined"
                          style={{ marginLeft: "20px" }}
                          onClick={() => {
                            setTeamTopButton(1);
                          }}
                        >
                          팀 지원자 보기
                        </Button>
                      </div>
                    </div>
                    {subjectSection === 1 &&
                      teamTopButton === 0 &&
                      teamInfo.map((data) => (
                        <div className="team-info-com">
                          <div className="team-info-name">{data.name}</div>
                          <div className="team-info-stack">{data.stack}</div>
                          <div className="team-info-button">
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
                            >
                              쪽지
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
                            >
                              이력서 보기
                            </Button>
                          </div>
                        </div>
                      ))}
                    {subjectSection === 1 &&
                      teamTopButton === 1 &&
                      teamInfo.map((data) => (
                        <div className="team-info-com">
                          <div className="team-info-name">{data.name}</div>
                          <div className="team-info-stack">{data.stack}</div>
                          <div className="team-info-button">
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
                            >
                              수락
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
                            >
                              거절
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
                            >
                              쪽지
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: "20px" }}
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
                          style={{ marginRight: "50px" }}
                          onClick={handleClickOpen2}
                        >
                          팀 생성
                        </Button>
                      </div>
                    </div>
                    {subTeamInfo.map((data) => (
                      <div className="sub-team-com">
                        <div className="sub-team-name">{data.name}</div>
                        <div className="sub-team-sub">{data.subject}</div>
                        <div className="sub-team-num">
                          {data.curNum}/{data.maxNum}
                        </div>
                        <div className="sub-team-button">
                          <Button
                            variant="outlined"
                            style={{ marginLeft: "20px" }}
                          >
                            지원
                          </Button>
                          <Button
                            variant="outlined"
                            style={{ marginLeft: "20px" }}
                          >
                            쪽지
                          </Button>
                          <Button
                            variant="outlined"
                            style={{ marginLeft: "20px" }}
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
              PaperProps={{ sx: { width: "60%", height: "40%" } }}
            >
              <DialogTitle>팀 생성</DialogTitle>
              <DialogContent>
                <TextField
                  id="outlined-textarea"
                  value={teamId}
                  onChange={changeTeamId}
                  placeholder="팀 ID"
                  style={{ width: "100%" }}
                  multiline
                />
                <TextField
                  id="outlined-textarea"
                  value={teamName}
                  onChange={changeTeamName}
                  placeholder="팀 이름"
                  style={{ width: "100%" }}
                  multiline
                />
                <TextField
                  id="outlined-textarea"
                  value={teamSubject}
                  onChange={changeTeamSubject}
                  placeholder="팀 주제"
                  style={{ width: "100%" }}
                  multiline
                />
                <TextField
                  id="outlined-textarea"
                  value={teamMaxNum}
                  onChange={changeTeamMaxNum}
                  placeholder="팀 인원수"
                  style={{ width: "100%" }}
                  multiline
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={makeTeam}>확인</Button>
                <Button onClick={handleClose2}>닫기</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
