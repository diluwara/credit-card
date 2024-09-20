import React, { useContext, useRef } from "react";
import LoginContext from "../../store/loginContext";
import langContextObj from "../../store/langContext";
import { images } from "../../constants";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import { useTranslation } from "react-i18next";
import classes from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";

function LoginBox() {
  const loginCtx = useContext(LoginContext);
  const langCtx = useContext(langContextObj);
  const userNameRef = useRef<HTMLInputElement>(null);
  const errorMessageRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Multiple valid usernames
  const validUsernames = ["admin", "diluwara"];
  let isValid = true;

  function loginHandler(e: React.FormEvent) {
    e.preventDefault();
    const enteredUsername = userNameRef.current?.value;

    // Check if entered username is either 'admin' or 'diluwara'
    isValid = validUsernames.includes(enteredUsername ?? "");

    if (userNameRef.current) {
      if (isValid) {
        loginCtx.toggleLogin();
        navigate("/"); // Navigate to dashboard or home after login
      } else {
        userNameRef.current.focus();
        errorMessageRef.current?.setAttribute(
          "style",
          "display: inline-block;opacity: 1"
        );
      }
    }
  }

  return (
    <div
      className={`${classes.container} ${
        langCtx.lang === "fa" ? classes.rtl : ""
      }`}
    >
      <div className={classes.loginBox}>
        <div className={classes.logo}>
          <img src={images.logo} alt="digikala" />
        </div>
        <h2 className={classes.title}>{t("loginPage")}</h2>
        <form onSubmit={loginHandler}>
          <Input
            ref={userNameRef}
            type={"text"}
            id={"userName"}
            placeholder={"admin or diluwara"} // Updated placeholder
          />
          <span ref={errorMessageRef} className={classes.errorMessage}>
            {t("errorMessage")}
          </span>
          <Input
            type={"password"}
            id={"pass"}
            value={"123456"}
            readonly={true}
          />
          <Button type="submit">{t("login")}</Button>
          <Link className={classes.forgat_pass} to="/">
            {t("forgetPass")}
          </Link>
          <div className={classes.checkbox}>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">{t("rememberMe")}</label>
          </div>
        </form>
      </div>

      <div className={classes.keyPic}>
        <img
          src={require("../../assets/images/Revenue-cuate.svg").default}
          alt="illustrator key"
        />
      </div>
    </div>
  );
}

export default LoginBox;
