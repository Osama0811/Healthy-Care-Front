export interface Auth {
}

export interface LoginResponse {
    id: string;
    name: string;
    userId: string;
    email: string;
    token: string;
    roleId:number;
  }

  export interface ILoginResponse {
    id: string;
    token: string;
    employeeID: number;
    role: string;
    permissions: string[];
    modules: string[] | undefined;
    userName: string | undefined;
    guid: string | undefined;
    userID: number;
    roleId:number;
    isUsingOTP: boolean;
  }

  export interface ILoginRequest {
    nationalNum: string | undefined;
    password: string | undefined;
  }
  export class LoginRequest implements ILoginRequest {
    nationalNum: string | undefined;
    password: string | undefined;
  }


  export interface IDept {
    Id: string | undefined;
    Name: string | undefined;
    Description: string | undefined;
  }
  export class Dept implements IDept {
    Id: string | undefined;
    Name: string | undefined;
    Description: string | undefined;
  }
