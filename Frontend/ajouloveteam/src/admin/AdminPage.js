import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useridState } from "../recoil/atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import api from "../axios/axios";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function AdminPage() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [schoolList, setSchoolList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [teamList, setTeamList] = useState([
    { id: 1, name: "HYGGE" },
    { id: 2, name: "HYGGE2" },
    { id: 3, name: "HYGGE3" },
  ]);
  const [selectSchoolId, setSelectSchoolId] = useState();
  const [selectSubjectId, setSelectSubjectId] = useState();
  const [adminFlag, setAdminFlag] = useState(0);
  const [userId, setUserId] = useRecoilState(useridState);
  const [schoolName, setSchoolName] = useState("");
  const [schoolEmailForm, setSchoolEmailForm] = useState("");
  const [schoolId, setSchoolId] = useState();
  const [SubjectName, setSubjectName] = useState("");
  const [SubjectCode, setSubjectCode] = useState("");
  const [SubjectYear, setSubjectYear] = useState();
  const [SubjectSemester, setSubjectSemester] = useState("");
  const [SubjectTime, setSubjectTime] = useState("");
  const [SubjectPName, setSubjectPName] = useState("");
  const [teamInfo, setTeamInfo] = useState([]);
  const navigate = useNavigate();
  const navigateToAdmin = () => {
    window.location.reload();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSchoolName("");
    setSchoolEmailForm("");
  };

  const handleClickOpen2 = (schoolName, schoolEmailForm, schoolId) => {
    setSchoolName(schoolName);
    setSchoolEmailForm(schoolEmailForm);
    setSchoolId(schoolId);
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    setSchoolName("");
    setSchoolEmailForm("");
    setSchoolId();
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
    setSubjectName("");
    setSubjectCode("");
    setSubjectYear();
    setSubjectSemester("");
    setSubjectTime("");
    setSubjectPName("");
  };
  const handleClickOpen4 = (data) => {
    setSelectSubjectId(data.subjectId);
    setSchoolId(data.schoolId);
    setSubjectName(data.name);
    setSubjectCode(data.code);
    setSubjectYear(data.year);
    setSubjectSemester(data.semester);
    setSubjectTime(data.time);
    setSubjectPName(data.professorName);
    setOpen4(true);
  };

  const handleClose4 = () => {
    setOpen4(false);
    setSubjectName("");
    setSubjectCode("");
    setSubjectYear();
    setSubjectSemester("");
    setSubjectTime("");
    setSubjectPName("");
  };

  const handleClickOpen5 = (data) => {
    setTeamInfo(Object.values(data));
    console.log(Object.values(data));
    setOpen5(true);
  };

  const handleClose5 = () => {
    setTeamInfo([]);
    setOpen5(false);
  };
  const changeSchoolName = (event) => {
    setSchoolName(event.target.value);
  };
  const changeSchoolEmailForm = (event) => {
    setSchoolEmailForm(event.target.value);
  };
  const changeSubjectName = (event) => {
    setSubjectName(event.target.value);
  };
  const changeSubjectCode = (event) => {
    setSubjectCode(event.target.value);
  };
  const changeSubjectYear = (event) => {
    setSubjectYear(event.target.value);
  };
  const changeSubjectSemester = (event) => {
    setSubjectSemester(event.target.value);
  };
  const changeSubjectTime = (event) => {
    setSubjectTime(event.target.value);
  };
  const changeSubjectPName = (event) => {
    setSubjectPName(event.target.value);
  };
  const schoolManage = (schoolId) => {
    setSelectSchoolId(schoolId);
    setAdminFlag(1);
    getSubjectList(schoolId);
  };

  const subjectManage = (subjectId) => {
    setSelectSubjectId(subjectId);
    setAdminFlag(2);
    getTeamList(subjectId);
  };
  const addSchool = async () => {
    const school = {
      schoolName: schoolName,
      schoolEmailForm: schoolEmailForm,
    };
    await api
      .post(`admin/school`, school)
      .then((resp) => {
        console.log(resp);
        handleClose();
      })
      .catch((err) => {
        handleClose();
        alert(err.response.data.message);
      });
  };
  const changeSchool = async () => {
    const school = {
      schoolId: schoolId,
      schoolName: schoolName,
      schoolEmailForm: schoolEmailForm,
    };
    await api
      .put(`admin/school`, school)
      .then((resp) => {
        console.log(resp);
        handleClose2();
        getSchoolList();
      })
      .catch((err) => {
        handleClose2();
        alert(err.response.data.message);
      });
  };
  const addSubject = async () => {
    const subject = {
      schoolId: selectSchoolId,
      name: SubjectName,
      code: SubjectCode,
      year: SubjectYear,
      semester: SubjectSemester,
      time: SubjectTime,
      professorName: SubjectPName,
    };
    await api
      .post(`admin/subject`, subject)
      .then((resp) => {
        console.log(resp);
        handleClose3();
        getSubjectList(selectSchoolId);
      })
      .catch((err) => {
        handleClose3();
        alert(err.response.data.message);
      });
  };

  const subjectChange = async () => {
    console.log(selectSubjectId);
    const subject = {
      subjectId: selectSubjectId,
      schoolId: selectSchoolId,
      name: SubjectName,
      code: SubjectCode,
      year: SubjectYear,
      semester: SubjectSemester,
      time: SubjectTime,
      professorName: SubjectPName,
    };
    await api
      .put(`admin/subject`, subject)
      .then((resp) => {
        console.log(resp);
        handleClose4();
        getSubjectList(selectSchoolId);
      })
      .catch((err) => {
        handleClose4();
        alert(err.response.data.message);
      });
  };

  const subjectDelete = async (subjectId) => {
    await api
      .delete(`admin/subject?subjectId=${subjectId}`)
      .then((resp) => {
        console.log(resp);
        getSubjectList(selectSchoolId);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const teamDelete = async (teamId) => {
    await api
      .delete(`admin/team?teamId=${teamId}`)
      .then((resp) => {
        console.log(resp);
        getTeamList(selectSubjectId);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  const getTeamList = async (subjectId) => {
    await api
      .get(`admin/team?subjectId=${subjectId}`)
      .then((resp) => {
        console.log(resp);
        setTeamList(resp.data.teams);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  const getSubjectList = async (schoolId) => {
    await api
      .get(`admin/subject?schoolId=${schoolId}`)
      .then((resp) => {
        console.log(resp);
        setSubjectList(resp.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  const getSchoolList = async () => {
    await api
      .get(`admin/school`)
      .then((resp) => {
        setSchoolList(resp.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  useEffect(() => {
    getSchoolList();
  }, []);
  return (
    <div>
      <div className="main-top">
        <div className="main-wrapper">
          <div
            className="top-name"
            onClick={() => navigateToAdmin()}
            style={{ fontFamily: "SUITE-Regular" }}
          >
            아주좋은팀 ADMIN
          </div>
        </div>
      </div>
      <div className="admin-mid">
        <div className="admin-main">
          <div className="admin-main-top">
            <div className="admin-top-wrapper">
              <div
                className="admin-top-name"
                style={{ fontFamily: "SUITE-Regular" }}
              >
                {adminFlag === 0 && <div>학교 관리</div>}
                {adminFlag === 1 && <div>수업 관리</div>}
                {adminFlag === 2 && <div>팀 관리</div>}
              </div>
            </div>
            <div className="admin-top-button">
              {adminFlag === 0 && (
                <Button
                  variant="outlined"
                  style={{
                    marginLeft: "80px",
                    width: "100px",
                    fontSize: "10px",
                  }}
                  onClick={() => handleClickOpen()}
                >
                  학교추가
                </Button>
              )}
              {adminFlag === 1 && (
                <Button
                  variant="outlined"
                  style={{
                    marginLeft: "80px",
                    width: "100px",
                    fontSize: "10px",
                  }}
                  onClick={() => handleClickOpen3()}
                >
                  수업 추가
                </Button>
              )}
            </div>
          </div>
          <div className="admin-main-mid">
            <div className="admin-mid-wrapper">
              <div className="admin-content-wrapper">
                {adminFlag === 0 &&
                  schoolList.map((data, index) => {
                    return (
                      <div className="admin-content" key={index}>
                        <div className="admin-content-name">
                          {data.schoolName}
                        </div>
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
                            <Dropdown.Item
                              href="#/action-1"
                              onClick={() => schoolManage(data.schoolId)}
                            >
                              학교 관리
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#/action-2"
                              onClick={() =>
                                handleClickOpen2(
                                  data.schoolName,
                                  data.schoolEmailForm,
                                  data.schoolId
                                )
                              }
                            >
                              학교 수정
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    );
                  })}
                {adminFlag === 1 &&
                  subjectList.map((data, index) => {
                    return (
                      <div className="admin-content" key={index}>
                        <div className="admin-content-name">
                          {data.subjectId} {data.name}({data.code})
                        </div>
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
                            <Dropdown.Item
                              href="#/action-1"
                              onClick={() => subjectManage(data.subjectId)}
                            >
                              수업 관리
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#/action-2"
                              onClick={() => handleClickOpen4(data)}
                            >
                              수업 수정
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#/action-3"
                              onClick={() => subjectDelete(data.subjectId)}
                            >
                              수업 삭제
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    );
                  })}
                {adminFlag === 2 &&
                  teamList.map((data, index) => {
                    return (
                      <div className="admin-content" key={index}>
                        <div className="admin-content-name">
                          {data.teamName}
                        </div>
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
                            <Dropdown.Item
                              href="#/action-1"
                              onClick={() => handleClickOpen5(data)}
                            >
                              팀 정보보기
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#/action-3"
                              onClick={() => teamDelete(data.teamId)}
                            >
                              팀 삭제
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    );
                  })}
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
        <DialogTitle style={{ background: "#072e5d", color: "white" }}>
          학교 추가
        </DialogTitle>
        <DialogContent
          style={{
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
          }}
        >
          <div className="resume-dialog-wrapper" style={{ height: "80%" }}>
            학교 이름
            <TextField
              id="outlined-textarea"
              variant="standard"
              value={schoolName}
              onChange={changeSchoolName}
              style={{
                width: "100%",
                marginBottom: "12px",
              }}
              InputProps={{
                style: {},
              }}
            />
            학교 이메일 폼
            <TextField
              id="outlined-textarea"
              variant="standard"
              value={schoolEmailForm}
              onChange={changeSchoolEmailForm}
              style={{
                width: "100%",
                marginBottom: "12px",
              }}
              InputProps={{
                style: {},
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={addSchool} style={{ color: "#072e5d" }}>
            확인
          </Button>
          <Button onClick={handleClose} style={{ color: "#072e5d" }}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open2}
        onClose={handleClose2}
        PaperProps={{ sx: { width: "60%", height: "40%" } }}
      >
        <DialogTitle style={{ background: "#072e5d", color: "white" }}>
          학교 수정
        </DialogTitle>
        <DialogContent
          style={{
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
          }}
        >
          <div className="resume-dialog-wrapper" style={{ height: "80%" }}>
            학교 이름
            <TextField
              id="outlined-textarea"
              variant="standard"
              value={schoolName}
              onChange={changeSchoolName}
              style={{
                width: "100%",
                marginBottom: "12px",
              }}
              InputProps={{
                style: {},
              }}
            />
            학교 이메일 폼
            <TextField
              id="outlined-textarea"
              variant="standard"
              value={schoolEmailForm}
              onChange={changeSchoolEmailForm}
              style={{
                width: "100%",
                marginBottom: "12px",
              }}
              InputProps={{
                style: {},
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={changeSchool} style={{ color: "#072e5d" }}>
            확인
          </Button>
          <Button onClick={handleClose2} style={{ color: "#072e5d" }}>
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
          과목 추가
        </DialogTitle>
        <DialogContent
          style={{
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
          }}
        >
          <div className="resume-dialog-wrapper" style={{ height: "80%" }}>
            과목 이름
            <TextField
              id="outlined-textarea"
              variant="standard"
              value={SubjectName}
              onChange={changeSubjectName}
              style={{
                width: "100%",
                marginBottom: "12px",
              }}
              InputProps={{
                style: {},
              }}
            />
            과목 코드
            <TextField
              id="outlined-textarea"
              variant="standard"
              value={SubjectCode}
              onChange={changeSubjectCode}
              style={{
                width: "100%",
                marginBottom: "12px",
              }}
              InputProps={{
                style: {},
              }}
            />
            과목 년도
            <TextField
              id="outlined-textarea"
              variant="standard"
              value={SubjectYear}
              onChange={changeSubjectYear}
              style={{
                width: "100%",
                marginBottom: "12px",
              }}
              InputProps={{
                style: {},
              }}
            />
            과목 학기
            <TextField
              id="outlined-textarea"
              variant="standard"
              value={SubjectSemester}
              onChange={changeSubjectSemester}
              style={{
                width: "100%",
                marginBottom: "12px",
              }}
              InputProps={{
                style: {},
              }}
            />
            과목 시간
            <TextField
              id="outlined-textarea"
              variant="standard"
              value={SubjectTime}
              onChange={changeSubjectTime}
              style={{
                width: "100%",
                marginBottom: "12px",
              }}
              InputProps={{
                style: {},
              }}
            />
            과목 교수 이름
            <TextField
              id="outlined-textarea"
              variant="standard"
              value={SubjectPName}
              onChange={changeSubjectPName}
              style={{
                width: "100%",
                marginBottom: "12px",
              }}
              InputProps={{
                style: {},
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={addSubject} style={{ color: "#072e5d" }}>
            확인
          </Button>
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
          과목 수정
        </DialogTitle>
        <DialogContent
          style={{
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
          }}
        >
          <div className="resume-dialog-wrapper" style={{ height: "80%" }}>
            과목 이름
            <TextField
              id="outlined-textarea"
              variant="standard"
              value={SubjectName}
              onChange={changeSubjectName}
              style={{
                width: "100%",
                marginBottom: "12px",
              }}
              InputProps={{
                style: {},
              }}
            />
            과목 코드
            <TextField
              id="outlined-textarea"
              variant="standard"
              value={SubjectCode}
              onChange={changeSubjectCode}
              style={{
                width: "100%",
                marginBottom: "12px",
              }}
              InputProps={{
                style: {},
              }}
            />
            과목 년도
            <TextField
              id="outlined-textarea"
              variant="standard"
              value={SubjectYear}
              onChange={changeSubjectYear}
              style={{
                width: "100%",
                marginBottom: "12px",
              }}
              InputProps={{
                style: {},
              }}
            />
            과목 학기
            <TextField
              id="outlined-textarea"
              variant="standard"
              value={SubjectSemester}
              onChange={changeSubjectSemester}
              style={{
                width: "100%",
                marginBottom: "12px",
              }}
              InputProps={{
                style: {},
              }}
            />
            과목 시간
            <TextField
              id="outlined-textarea"
              variant="standard"
              value={SubjectTime}
              onChange={changeSubjectTime}
              style={{
                width: "100%",
                marginBottom: "12px",
              }}
              InputProps={{
                style: {},
              }}
            />
            과목 교수 이름
            <TextField
              id="outlined-textarea"
              variant="standard"
              value={SubjectPName}
              onChange={changeSubjectPName}
              style={{
                width: "100%",
                marginBottom: "12px",
              }}
              InputProps={{
                style: {},
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={subjectChange} style={{ color: "#072e5d" }}>
            확인
          </Button>
          <Button onClick={handleClose4} style={{ color: "#072e5d" }}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open5}
        onClose={handleClose5}
        PaperProps={{ sx: { width: "60%", height: "60%" } }}
      >
        <DialogTitle style={{ background: "#072e5d", color: "white" }}>
          팀 정보 보기
        </DialogTitle>
        <DialogContent
          style={{
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
          }}
        >
          <div className="resume-dialog-wrapper" style={{ height: "80%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>팀이름 : {teamInfo[1]}</div>
              <div>팀 주제 : {teamInfo[2]}</div>
              <div style={{ display: "flex" }}>
                팀 설명 : {"  "}
                <div dangerouslySetInnerHTML={{ __html: teamInfo[3] }} />
              </div>
              <div>팀 최대인원수 : {teamInfo[4]}</div>
              <div>팀 현재인원수 : {teamInfo[5]}</div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose5} style={{ color: "#072e5d" }}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminPage;
