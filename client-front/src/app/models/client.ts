import { City } from "./city";
import { Invoice } from "./invoice";

export class Client {
    id: number = 0;
    name!: string;
    lastname!: string;
    email!: string;
    date!: string;
    dateDt!: string;
    city!: City;
    invoices: Invoice[] = [];

}