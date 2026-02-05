import axios, { AxiosError } from "axios";
import type IUser from "../types/userType";
import type IRequest from "../types/requestType";

const BASE_URL = "http://localhost:3000";

const errorFormatHandler = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      return {
        error: error.response.data.message,
        status: "ERROR " + error.response.status,
        data: null,
      };
    } else if (error.request) {
      return {
        error: "Network Error: " + error.request,
        status: "ERROR",
        data: null,
      };
    }
    return {
      error: "Error: " + error.message,
      status: "ERROR",
      data: null,
    };
  }
  return {
    error: "Something went wrong",
    status: "ERROR",
    data: null,
  };
};

export const getProfile = async (token: string | null | undefined) => {
  try {
    const url = BASE_URL + "/users/profile/";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data, status: "SUCCESS", error: null };
  } catch (error) {
    return errorFormatHandler(error);
  }
};

export const loginOrSignUp = async (
  reqData: {
    name: string;
    personalNumber: string;
    email: string;
    password: string;
  },
  isLogin: boolean,
) => {
  try {
    const url = BASE_URL + "/users/";

    const response = await axios.post(isLogin ? url + "login" : url, reqData);
    const token = response.data.token;
    const expiresIn = 604800000;

    return { data: { token, expiresIn }, status: "SUCCESS", error: null };
  } catch (error) {
    return errorFormatHandler(error);
  }
};

export const editProfile = async (
  token: string | null | undefined,
  userData: Partial<IUser>,
) => {
  try {
    const url = BASE_URL + "/users/profile/edit";
    const response = await axios.patch(url, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data.user, status: "SUCCESS", error: null };
  } catch (error) {
    return errorFormatHandler(error);
  }
};

export const getRequests = async (
  token: string | null | undefined,
  params: string,
  manage: boolean,
) => {
  try {
    let url = BASE_URL + "/requests?" + params;
    if (manage) {
      url = BASE_URL + "/requests/manage/allRequests?" + params;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data, status: "SUCCESS", error: null };
  } catch (error) {
    return errorFormatHandler(error);
  }
};

export const createNewRequest = async (
  token: string | null | undefined,
  reqData: Partial<IRequest>,
) => {
  try {
    const url = BASE_URL + "/requests/";
    const response = await axios.post(url, reqData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data.request, status: "SUCCESS", error: null };
  } catch (error) {
    return errorFormatHandler(error);
  }
};

export const changeReqStatus = async (
  token: string | null | undefined,
  reqId: string,
  statusData: { status: string; comment?: string },
) => {
  try {
    const url = BASE_URL + "/requests/manage/statusUpdate";
    const response = await axios.patch(
      url,
      { _id: reqId, statusData: statusData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { data: response.data.request, status: "SUCCESS", error: null };
  } catch (error) {
    return errorFormatHandler(error);
  }
};
