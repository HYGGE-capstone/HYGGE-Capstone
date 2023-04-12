import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [idCanUsable, setidCanUsable] = useState(false);

  useEffect(() => {
    setidCanUsable(false);
  }, []);
  const navigate = useNavigate();

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

  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: "center" }}>
        <h3>회원가입</h3>
      </div>
      <form>
        <div className="email">
          <label>Email</label>
          <button className="emailCheck">이메일 인증</button>
        </div>
        <input
          name="users_email"
          type="text"
          value={email}
          onChange={changeEmail}
        />
        <div className="id">
          <label>ID</label>
          <button className="idCheck">아이디 중복 확인</button>
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
        <button className="button" type="button" disabled={!idCanUsable}>
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
