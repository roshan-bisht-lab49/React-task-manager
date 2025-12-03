export enum UsersType {
  Manager = "Manager",
  Representative = "Representative",
  All = "All",
}

export enum VeriTaskQueries {
  Deals = "deals",
  Users = "users",
  Login = "login",
  RejectReasons = "RejectReasons",
}

export enum VeriTaskMutations {
  UpdateDeal = "UpdateDeal",
}

export interface AppUsers {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UsersType;
  managerId: string | null;
}

export interface RejectReasons {
  id: string;
  key: string;
  description: string;
}

export type DealStatus = "Draft" | "Pending" | "Approved" | "Rejected";

export interface DealDetails {
  id: string;
  dealId: string | null;
  productId: string;
  productName: string;
  productQuantity: number;
  productUnitPrice: number;
  productTotalPrice: number;
}

export interface Client {
  id: string;
  name: string;
}
export interface Deal {
  id: string;
  clientId: string;
  creatorId: string;
  approverId: string | null;
  createdAt: Date;
  updatedAt: Date;
  totalQuantity: number;
  transactionValue: number;
  status: DealStatus;
  reason: string | null;
  details: DealDetails[];
  client: Client;
  approver: AppUsers | null;
  creator: AppUsers | null;
}

export type HandleOnSuccess = () => void;
