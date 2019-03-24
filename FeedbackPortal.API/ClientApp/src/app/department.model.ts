export class Department {
    Department_ID: number;
    Name: string;
    Adress: string;
    constructor(name:string,adress:string,id:number){
        this.Name = name;
        this.Adress = adress;
        this.Department_ID = id;
    }
}