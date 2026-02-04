import { useReducer, type ChangeEvent } from "react";

interface IState {
  value: string;
  isTouched: boolean;
}

interface IAction {
  type: "INPUT" | "BLUR" | "RESET";
  payload?: { value: string };
}

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state: IState, action: IAction) => {
  if (action.type === "INPUT") {
    return {
      value: action.payload!.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
    };
  }
  if (action.type === "RESET") {
    return {
      value: "",
      isTouched: false,
    };
  }
  return initialInputState;
};

const useInput = (
  validateValue: (value: string) => boolean,
  initialValue?: string
) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, {
    value: initialValue ? initialValue : "",
    isTouched: false,
  });

  const isValueValid = validateValue(inputState.value);
  const hasError = !isValueValid && inputState.isTouched;

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "INPUT", payload: { value: event.target.value } });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const setValue = (newValue: string) => {
    dispatch({ type: "INPUT", payload: { value: newValue } });
  };

  return {
    value: inputState.value,
    isValid: isValueValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    setValue,
  };
};

export default useInput;
