export interface User {
  email: string;
  name: string;
  password: string;
  avatar: string;
}
export interface loginUser {
  email: string;
  password: string;
}

export interface logindata {
  access_token: string;
  refresh_token: string;
}

export interface apiloginresponse {
  login: {
    access_token: string;
    refresh_token: string;
  };
}

export interface ForgotPass {
  email: string;
}
