export class Department {
    Id: number;
    Name: string;
    Address: string;
    constructor(Name: string, Address: string, Department_ID: number) {
        this.Name = Name;
        this.Address = Address;
        this.Id = Department_ID;
    }
}
