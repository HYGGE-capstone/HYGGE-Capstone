import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function PersonalPage() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [resumeContent, setResumeContent] = useState("");
  const [resume, setResume] = useState([]);
  const [index, setIndex] = useState();
  const [id, setId] = useState();
  const [user_id, setUser_id] = useState();
  const [subject_id, setSubject_id] = useState(-1);
  useEffect(() => {
    setResume(resumeData);
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setId();
    setIndex();
    setSubject_id();
    setUser_id();
    setResumeContent("");
    setResumeTitle("");
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    setId();
    setIndex();
    setSubject_id();
    setUser_id();
    setResumeContent("");
    setResumeTitle("");
  };
  const changeId = (e) => {
    setId(e.target.value);
  };
  const changeUserId = (e) => {
    setUser_id(e.target.value);
  };
  const changeSubjectId = (e) => {
    setSubject_id(e.target.value);
  };
  const changeResumeTitle = (e) => {
    setResumeTitle(e.target.value);
  };
  const changeResumeContent = (e) => {
    setResumeContent(e.target.value);
  };
  const resumeDelete = () => {
    const tempResume = [...resume];
    tempResume.splice(index, 1);
    setResume(tempResume);
    handleClose();
  };
  const resumeChange = () => {
    const changeResume = {
      id: id,
      user_id: user_id,
      subject_id: subject_id,
      title: resumeTitle,
      content: resumeContent,
    };
    const tempResume = [...resume];
    tempResume.splice(index, 1);
    tempResume.splice(index, 0, changeResume);
    setResume(tempResume);
    handleClose();
  };
  const resumeAdd = () => {
    const AddResume = {
      id: id,
      user_id: user_id,
      subject_id: subject_id,
      title: resumeTitle,
      content: resumeContent,
    };
    const tempResume = [...resume];
    tempResume.splice(tempResume.length, 0, AddResume);
    setResume(tempResume);
    handleClose2();
  };
  var personalInfo = [
    "test000",
    "test000@ajou.ac.kr",
    "test000pw",
    "테스트000",
  ];
  var personalInfoTitle = ["아이디", "이메일", "비밀번호", "닉네임"];
  var resumeData = [
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
      <div className="personal-top">
        <div className="personal-top-name">아주좋은팀</div>
      </div>
      <div className="personal-wrapper">
        <div className="personal-info-section">
          <div className="personal-info-wrapper">
            <div className="personal-info-jemok">개인정보 관리</div>
            <div className="personal-content-wrapper">
              <div className="personal-info-title">
                {personalInfoTitle.map((data) => (
                  <div className="info-title">{data}</div>
                ))}
              </div>
              <div className="personal-info-content">
                {personalInfo.map((data) => (
                  <div className="info-content">{data}</div>
                ))}
              </div>
            </div>
            <div className="personal-button-wrapper">
              <Button variant="outlined" style={{ marginRight: "15px" }}>
                취소
              </Button>
              <Button variant="outlined">저장</Button>
            </div>
          </div>
        </div>
        <div className="personal-resume-section">
          <div className="personal-resume-wrapper">
            <div className="personal-resume-top">
              <div className="personal-resume-jemok">개인 이력서 관리</div>
              <div className="personal-top-button">
                <Button variant="outlined" onClick={handleClickOpen2}>
                  추가
                </Button>
              </div>
            </div>
            <div className="personal-resume-content">
              <div className="personal-resume-title">
                {resume.map((data, index) => (
                  <div
                    className="resume-info-title"
                    onClick={() => {
                      setResumeTitle(data.title);
                      setResumeContent(data.content);
                      setIndex(index);
                      setId(data.id);
                      setUser_id(data.user_id);
                      setSubject_id(data.subject_id);
                      handleClickOpen();
                    }}
                  >
                    {data.title}
                  </div>
                ))}
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
        <DialogTitle>이력서 확인 및 편집</DialogTitle>
        <DialogContent>
          <div className="resume-dialog-wrapper">
            <TextField
              id="outlined-textarea"
              value={resumeTitle}
              onChange={changeResumeTitle}
              style={{ width: "100%" }}
              multiline
            />
            <TextField
              id="outlined-textarea"
              value={resumeContent}
              onChange={changeResumeContent}
              style={{ width: "100%" }}
              multiline
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={resumeChange}>수정</Button>
          <Button onClick={resumeDelete}>삭제</Button>
          <Button onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open2}
        onClose={handleClose2}
        PaperProps={{ sx: { width: "60%", height: "40%" } }}
      >
        <DialogTitle>이력서 추가</DialogTitle>
        <DialogContent>
          <div className="resume-dialog-wrapper">
            <TextField
              id="outlined-textarea"
              value={id}
              onChange={changeId}
              style={{ width: "100%" }}
              multiline
            />
            <TextField
              id="outlined-textarea"
              value={user_id}
              onChange={changeUserId}
              style={{ width: "100%" }}
              multiline
            />
            <TextField
              id="outlined-textarea"
              value={subject_id}
              onChange={changeSubjectId}
              style={{ width: "100%" }}
              multiline
            />
            <TextField
              id="outlined-textarea"
              value={resumeTitle}
              placeholder="이력서 제목"
              onChange={changeResumeTitle}
              style={{ width: "100%" }}
              multiline
            />
            <TextField
              id="outlined-textarea"
              value={resumeContent}
              placeholder="이력서 내용"
              onChange={changeResumeContent}
              style={{ width: "100%" }}
              multiline
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={resumeAdd}>추가</Button>
          <Button onClick={handleClose2}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PersonalPage;
