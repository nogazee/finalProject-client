import type IUser from "./userType";

interface IRequest {
  type: string;
  status: string;
  title: string;
  description: string;
  createdAt: string;
  requestor: IUser;
  _id: string;
  rejectionComment: string | null;
}

export type { IRequest as default };
