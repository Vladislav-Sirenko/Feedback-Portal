
export class Feedback {
    id: number;
    mark: number;
    text: string;
    date: Date;
    departmentId: number;
    username: string;
    ispositive: boolean;
    authUserId: number;
    dispatch_time: Date;
    arrived_time: Date;
    department_time: string;
}
export class Users {
    id: number;
    first_name: string;
    email: string;
    password: string;
    admin: number;

}
