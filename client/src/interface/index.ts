export interface IUser {
    id: number;
    name: string;
    username: string;
    password: string;
    age: number;
    sex: string;
    address: number[];
    employees: number[];
    avatar: string;
    email: string;
}

export interface IIdentity extends Omit<IUser, 'password' & "employees">{}

export interface IAuth {
    username: string;
    password: string;

}
