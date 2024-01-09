
export interface LoginData {
    email: string;
    password: string;
  }

export interface GetProfileData extends LoginData{
    id: number;
    name:string;
    phone:number;
}