import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [idCanUsable, setidCanUsable] = useState(false);
  const [pwdNotDup, setPwdNotDup] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [open, setOpen] = useState(false);
  const [userEmailVer, setUserEmailVer] = useState(0);
  const [validEmailVer, setValidEmailVer] = useState(0);

  useEffect(() => {
    setidCanUsable(false);
    setPwdNotDup(false);
  }, []);

  const emailRegEx =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[ac]{2}.[kr]{2}$/i;

  const navigate = useNavigate();

  const emailCheckTest = (emailInput) => {
    if (emailRegEx.test(emailInput)) {
      return true;
    } else {
      window.alert("올바른 대학교 이메일을 입력해주세요.");
      setEmail("");
      return false;
    }
  };

  const pwdCheckTest = (pwdInput, pwdCheckInput) => {
    if (pwdInput === pwdCheckInput) {
      return true;
    } else {
      window.alert("비밀번호를 다시 확인해주세요.");
      setPwd("");
      setPwdCheck("");
      return false;
    }
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changeId = (event) => {
    setId(event.target.value);
  };

  const changeNickname = (event) => {
    setNickname(event.target.value);
  };

  const changePwd = (event) => {
    setPwd(event.target.value);
  };

  const changePwdCheck = (event) => {
    setPwdCheck(event.target.value);
  };
  const URL = "";

  const checkIdCanUsable = async (e) => {
    e.preventDefault();
    await axios
      .get(URL + `users/idCanUsable/${id}`) //임시
      .then((resp) => {
        if (resp.data.data === true) {
          setidCanUsable(true);
          alert("사용 가능한 아이디입니다.");
        }
        if (resp.data.data === false) {
          setidCanUsable(false);
          setId("");
          alert("중복된 아이디입니다.");
        }
      })
      .catch((err) => {
        alert("아이디 중복 조회 실패!");
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const emailVerGen = async (e) => {
    let min = 100000;
    let max = 999999;
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setValidEmailVer(randomNum);
    console.log(randomNum);
    await axios
      .post(URL + `users/signup/ver`, {
        email: email,
        emailVer: randomNum,
      })
      .then((resp) => {
        if (resp.data.data === true) {
          // 임시
          alert("이메일 인증번호가 발송되었습니다.");
        }
      })
      .catch((err) => {
        alert("이메일 인증번호 발송 실패!");
      });
  };

  const emailVerCheck = (e) => {
    console.log(userEmailVer);
    console.log(validEmailVer);
    if (userEmailVer == validEmailVer) {
      setValidEmail(true);
      alert("이메일 인증이 완료되었습니다.");
    } else {
      alert("이메일 인증번호를 다시 확인해주세요.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: "center" }}>
        <h3>회원가입</h3>
      </div>
      <form>
        <div className="email">
          <label>Email</label>
          <Button
            className="emailCheck"
            onClick={(event) => {
              handleClickOpen();
              emailVerGen();
            }}
          >
            이메일 인증
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>이메일 인증</DialogTitle>
            <DialogContent>
              <DialogContentText>
                입력하신 이메일로 인증 코드가 발송되었습니다.<br></br>인증 코드
                6자리를 입력해주세요.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="인증번호 6자리"
                type="number"
                fullWidth
                variant="standard"
                onChange={(event) => {
                  setUserEmailVer(event.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소</Button>
              <Button
                onClick={(event) => {
                  emailVerCheck();
                  handleClose();
                }}
              >
                인증하기
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </form>
      <form>
        <input
          name="users_email"
          type="text"
          value={email}
          onChange={changeEmail}
        />
        <div className="id">
          <label>ID</label>
          <button className="idCheck" onClick={checkIdCanUsable}>
            아이디 중복 확인
          </button>
        </div>
        <input name="users_id" type="text" value={id} onChange={changeId} />
        <label>nickname</label>
        <input name="nickname" value={nickname} onChange={changeNickname} />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={pwd}
          onChange={changePwd}
        />
        <label>Password Check</label>
        <input
          name="passwordCheck"
          type="text"
          value={pwdCheck}
          onChange={changePwdCheck}
        />
        <button
          className="button"
          type="button"
          disabled={!(idCanUsable && pwdNotDup && validEmail)}
        >
          제출
        </button>
        <Link style={{ color: "gray", textDecoration: "none" }} to="/login">
          이미 아이디가 있다면...{" "}
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
