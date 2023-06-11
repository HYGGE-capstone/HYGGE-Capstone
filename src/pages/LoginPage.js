import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  useridState,
  userNickNameState,
  userSchoolNameState,
} from "../recoil/atom";

function LoginPage() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = useRecoilState(useridState);
  const [userNickName, setUserNickName] = useRecoilState(userNickNameState);
  const [userSchoolName, setUserSchoolName] =
    useRecoilState(userSchoolNameState);

  const navigate = useNavigate();
  const changeId = (event) => {
    setId(event.target.value);
  };
  const changePwd = (event) => {
    setPwd(event.target.value);
  };
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const loginTrial = (event) => {};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const login = async () => {
    const user = {
      loginId: id,
      password: pwd,
    };
    await axios
      .post("http://43.201.179.98:80/api/auth/login", user)
      .then((resp) => {
        alert(id + "님 로그인 되었습니다");
        localStorage.setItem("accessToken", resp.data.accessToken);
        localStorage.setItem("refreshToken", resp.data.refreshToken);
        const accessToken = localStorage.getItem("accessToken");
        setId("");
        setPwd("");
        setUserId(resp.data.loginId);
        setUserNickName(resp.data.nickname);
        setUserSchoolName(resp.data.schoolName);
        if (resp.data.role === "ROLE_USER") {
          navigate("/main");
        }
        if (resp.data.role === "ROLE_ADMIN") {
          navigate("/schoolAdmin");
        }
        if (resp.data.loginId === "master" && resp.data.role === "ROLE_ADMIN") {
          navigate("/admin");
        }
      })
      .catch((err) => {
        setId("");
        setPwd("");
        alert("아이디 또는 비밀번호를 찾을 수 없습니다.");
      });
  };

  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: "center" }}>
        <h3>로그인</h3>
      </div>
      <form>
        <label>ID</label>
        <input name="users_id" type="text" value={id} onChange={changeId} />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={pwd}
          onChange={changePwd}
        />
        <button className="button" type="button" onClick={login}>
          제출
        </button>
        <div className="loginPage-button">
          <Link
            style={{ color: "gray", textDecoration: "none" }}
            to="/register"
          >
            아이디가 없다면...{" "}
          </Link>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>아이디 찾기</DialogTitle>
          <DialogContent>
            <DialogContentText>
              아이디 찾기를 위해 이메일을 입력하세요.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={email}
              onChange={changeEmail}
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>확인</Button>
            <Button onClick={handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}

export default LoginPage;
