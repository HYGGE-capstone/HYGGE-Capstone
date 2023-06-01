import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [idCanUsable, setidCanUsable] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [open, setOpen] = useState(false);
  const [userEmailVer, setUserEmailVer] = useState("");
  const [validEmailVer, setValidEmailVer] = useState("");
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [schoolId, setSchoolId] = useState(0);

  useEffect(() => {
    setidCanUsable(false);
  }, []);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const password = useRef();
  password.current = watch("password");

  const userEmail = watch("users_email");
  const userId = watch("users_id");
  const userPassword = watch("password");
  const userNickname = watch("nickname");

  const navigate = useNavigate();

  const changeEmail = (event) => {
    setEmail(event.target.value);
    console.log(...register("users_email"));
    console.log(watch);
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

  const changeUserEmailVer = (event) => {
    setUserEmailVer(event.target.value);
  };
  const URL = "";

  const checkIdCanUsable = async (e) => {
    e.preventDefault();
    await axios
      .get(`http://43.201.179.98:8080/api/auth/signup/loginId/${userId}`) //임시
      .then((resp) => {
        alert("사용 가능한 아이디입니다.");
        setidCanUsable(true);
      })
      .catch((err) => {
        alert("사용 불가능한 아이디입니다.");
        setidCanUsable(false);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const emailVerCheck = async (e) => {
    await axios
      .post(
        `http://43.201.179.98:8080/api/auth/signup/email/auth?to=${userEmail}`
      ) //임시
      .then((resp) => {
        setValidEmailVer(resp.data.code);
        setSchoolId(resp.data.schoolId);
        handleClickOpen();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const onSubmit = async () => {
    const user = {
      loginId: userId,
      email: userEmail,
      password: userPassword,
      nickname: userNickname,
      schoolId: schoolId,
    };

    await axios
      .post(`http://43.201.179.98:8080/api/auth/signup`, user) //임시
      .then((resp) => {
        console.log(resp);
        alert("회원가입 완료!");
        navigate("/login");
      })
      .catch((err) => {
        alert("회원가입 실패!");
        console.log(err);
      });
  };

  const emailCodeCheck = () => {
    if (userEmailVer === validEmailVer) {
      alert("이메일 인증 완료!");
      setValidEmail(true);
      handleClose();
    } else {
      alert("이메일 인증 실패!");
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
          <Button className="emailCheck" onClick={emailVerCheck}>
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
                label="인증번호"
                type="text"
                fullWidth
                variant="standard"
                value={userEmailVer}
                onChange={changeUserEmailVer}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소</Button>
              <Button onClick={emailCodeCheck}>인증하기</Button>
            </DialogActions>
          </Dialog>
        </div>
      </form>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="users_email"
          type="text"
          //value={email}
          onChange={changeEmail}
          {...register("users_email", {
            required: true,
          })}
        />
        {errors.users_email && errors.users_email.type === "required" && (
          <p>This email field is required</p>
        )}
        <div className="id">
          <label>ID</label>
          <button className="idCheck" onClick={checkIdCanUsable}>
            아이디 중복 확인
          </button>
        </div>
        <input
          name="users_id"
          type="text"
          //value={id}
          //onChange={changeId}
          {...register("users_id", { required: true })}
        />
        {errors.users_id && errors.users_id.type === "required" && (
          <p>This id field is required</p>
        )}
        <label>nickname</label>
        <input
          name="nickname"
          //value={nickname}
          //onChange={changeNickname}
          {...register("nickname", { required: true })}
        />
        {errors.nickname && errors.nickname.type === "required" && (
          <p>This nickname field is required</p>
        )}
        <label>Password</label>
        <input
          name="password"
          type="password"
          //value={pwd}
          //onChange={changePwd}
          {...register("password", { required: true })}
        />
        {errors.password && errors.password.type === "required" && (
          <p>This password field is required</p>
        )}
        <label>Password Check</label>
        <input
          name="passwordCheck"
          type="password"
          //value={pwdCheck}
          //onChange={changePwdCheck}
          {...register("passwordCheck", {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.passwordCheck && errors.passwordCheck.type === "required" && (
          <p>This password Check field is required</p>
        )}
        {errors.passwordCheck && errors.passwordCheck.type === "validate" && (
          <p>The passwords do not match password Check</p>
        )}

        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        <button
          className="button"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!(idCanUsable && validEmail)}
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
