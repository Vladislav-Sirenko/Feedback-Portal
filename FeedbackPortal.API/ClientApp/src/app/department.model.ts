export class Department {
    Department_ID: number;
    Name: string;
    Adress: string;
    constructor(Name: string, Adress: string, Department_ID: number) {
        this.Name = Name;
        this.Adress = Adress;
        this.Department_ID = Department_ID;
    }
}
