import { useState, useContext } from "react";
import { replace, useNavigate } from "react-router-dom";
import { loginOrSignUp } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import useInput from "../../hooks/use-input";
import Card from "../UI/Card";
import Button from "../UI/Button";
import InputField from "./InputField";
import classes from "./AuthForm.module.css";

const nameValidator = (value: string) => value.trim() !== "";
const personalNumValidator = (value: string) => value.trim().length === 7;
const emailValidator = (value: string) => value.includes("@");
const passwordValidator = (value: string) => value.trim().length >= 7;

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>();

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(nameValidator);

  const {
    value: personalNumValue,
    isValid: personalNumIsValid,
    hasError: personalNumHasError,
    valueChangeHandler: personalNumChangeHandler,
    inputBlurHandler: personalNumBlurHandler,
    reset: personalNumReset,
  } = useInput(personalNumValidator);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(emailValidator);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(passwordValidator);

  let formIsValid = false;
  if (
    (nameIsValid && personalNumIsValid && emailIsValid && passwordIsValid) ||
    (emailIsValid && passwordIsValid && isLogin)
  ) {
    formIsValid = true;
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState: boolean) => !prevState);
    setError(null);
    resetForm();
  };

  const submitHandler = async () => {
    if (!formIsValid) {
      return;
    }

    const reqData = {
      name: nameValue,
      personalNumber: personalNumValue,
      email: emailValue,
      password: passwordValue,
    };

    const { data, error } = await loginOrSignUp(reqData, isLogin);

    if (data) {
      const expirationTime = new Date(new Date().getTime() + data.expiresIn);
      authCtx.login(data.token, expirationTime.toISOString());
      navigate("/requests", { replace: true });
      resetForm();
    }
    
    setError(error);
  };

  const resetForm = () => {
    nameReset();
    personalNumReset();
    emailReset();
    passwordReset();
  };

  return (
    <Card className={classes.card}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        {!isLogin && (
          <>
            <InputField
              type="text"
              name="name"
              label="Full Name"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={nameValue}
              hasError={nameHasError}
              errorMessage="Name is required"
            />
            <InputField
              type="text"
              name="personalNum"
              label="Personal Number"
              onChange={personalNumChangeHandler}
              onBlur={personalNumBlurHandler}
              value={personalNumValue}
              hasError={personalNumHasError}
              errorMessage="Invalid personal number"
            />
          </>
        )}
        <InputField
          type="email"
          name="email"
          label="Email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={emailValue}
          hasError={emailHasError}
          errorMessage="Invalid email"
        />
        <InputField
          type="password"
          name="password"
          label="Password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={passwordValue}
          hasError={passwordHasError}
          errorMessage={
            !isLogin
              ? "Password must be at least 7 characters long"
              : "Invalid password"
          }
        />
        <div className={classes.actions}>
          <Button onClick={submitHandler}>
            {isLogin ? "Login" : "Create Account"}
          </Button>
          {error && <p>{error}</p>}
          <Button className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AuthForm;
