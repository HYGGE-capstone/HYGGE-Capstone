import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const changeId = (event) => {
    setId(event.target.value);
  };
  const changePwd = (event) => {
    setPwd(event.target.value);
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
        <button className="button" type="button">
          제출
        </button>
        <Link style={{ color: "gray", textDecoration: "none" }} to="/register">
          아이디가 없다면...{" "}
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
