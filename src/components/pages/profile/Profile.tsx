import { useEffect, useState, useRef, useContext } from "react";
import AuthContext from "../../../store/auth-context";
import { getProfile, editProfile } from "../../../lib/api";
import useInput from "../../../hooks/use-input";
import type IUser from "../../../types/userType";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import EditField from "./EditField";
import classes from "./Profile.module.css";

const nameValidator = (value: string) => value.trim() !== "";
const personalNumValidator = (value: string) => value.trim().length === 7;
const emailValidator = (value: string) => value.includes("@");

const Profile = () => {
  const authCtx = useContext(AuthContext);

  const [userData, setUserData] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const personalNumInputRef = useRef<HTMLInputElement>(null);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    setValue: nameSetValue,
  } = useInput(nameValidator);

  const {
    value: personalNumValue,
    isValid: personalNumIsValid,
    hasError: personalNumHasError,
    valueChangeHandler: personalNumChangeHandler,
    inputBlurHandler: personalNumBlurHandler,
    setValue: personalNumSetValue,
  } = useInput(personalNumValidator);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    setValue: emailSetValue,
  } = useInput(emailValidator);

  useEffect(() => {
    const loadUser = async () => {
      const { data: fetchedUser, error } = await getProfile(authCtx.token);
      if (fetchedUser) {
        setUserData(fetchedUser);
        nameSetValue(fetchedUser.name);
        emailSetValue(fetchedUser.email);
        personalNumSetValue(fetchedUser.personalNumber.toString());
      }

      setError(error);
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const changeEditingMode = () => {
    setIsEditing((prevState: boolean) => !prevState);
  };

  const clickHandler = async () => {
    changeEditingMode();
    if (isEditing) {
      const updatedUserData = {
        name: nameInputRef.current!.value,
        email: emailInputRef.current!.value,
        personalNumber: personalNumInputRef.current!.value,
      };

      const { data: updatedUser, error } = await editProfile(
        authCtx.token,
        updatedUserData,
      );

      if (updatedUser) setUserData(updatedUser);
      setError(error);
    }
  };

  let formIsValid = false;
  if (nameIsValid && personalNumIsValid && emailIsValid) formIsValid = true;

  return (
    <Card className={classes.card}>
      {error ? <p>{error}</p> : isLoading && <p>Loading...</p>}
      {userData && (
        <div className={classes.profile}>
          <EditField
            type="text"
            label="Name"
            name="name"
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            hasError={nameHasError}
            isEditing={isEditing}
            validator={nameValidator}
            ref={nameInputRef}
          />
          <EditField
            type="email"
            label="Email"
            name="email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            hasError={emailHasError}
            isEditing={isEditing}
            validator={emailValidator}
            ref={emailInputRef}
          />
          <EditField
            type="text"
            label="Personal Number"
            name="personalNum"
            value={personalNumValue}
            onChange={personalNumChangeHandler}
            onBlur={personalNumBlurHandler}
            hasError={personalNumHasError}
            isEditing={isEditing}
            validator={personalNumValidator}
            ref={personalNumInputRef}
          />
          <div className={classes.actions}>
            <Button
              onClick={clickHandler}
              disabled={!formIsValid}
              className={!formIsValid ? classes.disabled : ""}
            >
              {isEditing ? "Done" : "Edit Profile"}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Profile;
