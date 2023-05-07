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
  const [inputValue, setInputValue] = useState("");
  const [isHaveInputValue, setIsHaveInputValue] = useState(false);
  const [dropDownList, setDropDownList] = useState(wholeTextArray);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);
  const [select, setSelect] = useState("");
  const handleClick = (id) => {
    setSelect(id);
    // 가입 로직 실행
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

  const navigate = useNavigate();

  const navigateToPersonal = () => {
    navigate("/personal");
  };

  useEffect(showDropDownList, [inputValue]);

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
                    <div className="jongbo-text-name">이지수 님</div>
                    <div className="jongbo-text-j=hakgoa">소프트웨어학과</div>
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
                  >
                    구독
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mid-down-wrapper">
            <div className="left-down-wrapper">
              <div className="gudok-section">
                {gudok.map((data) => (
                  <div
                    onClick={() => handleClick(data.id)}
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
              <div className="team-section">
                <div className="team-wrapper">
                  <div className="team-top">
                    <div className="team-name">팀 이름</div>
                    <div className="team-real-name">HYGGE</div>
                  </div>
                  <div className="team-down">
                    <div className="team-role">팀장</div>
                    <div className="team-button">
                      <div className="team-information-button">
                        <Button variant="outlined" style={{ width: "100px" }}>
                          팀 정보
                        </Button>
                      </div>
                      <div className="team-chatting-button">
                        <Button
                          variant="outlined"
                          style={{ marginLeft: "20px", width: "100px" }}
                        >
                          팀원 채팅
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="subject-section">
                <div className="subject-soga">
                  <div className="soga-text"></div>
                </div>
                <div className="subject-content-wrapper">
                  <div className="subject-content-module">
                    <div className="subject-content-name"></div>
                    <div className="subject-content-joje"></div>
                    <div className="subject-content-button">
                      <div className="subject-content-button-wrapper">
                        <div className="scbw-jiwon"></div>
                        <div className="scbw-jjokji"></div>
                        <div className="scbw-jongo"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { width: "60%", height: "40%" } }}
      >
        <DialogTitle>내 정보</DialogTitle>
        <DialogContent>
          <div className="myjongbo-wrapper">
            <div className="myjongbo-resume-wrapper">
              {resume.map((data) => (
                <div className="myjongbo-resume">{data.content}</div>
              ))}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>확인</Button>
          <Button onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MainPage;
