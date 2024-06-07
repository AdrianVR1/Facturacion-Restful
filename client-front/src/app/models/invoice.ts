import { Client } from "./client";
import { ItemInvoice } from "./item-invoice";

export class Invoice {
    id!: number;
    description!:string;
    observation!:string;
    items: Array<ItemInvoice> = []; 
    client!: Client;
    total:number = 0.0;
    createAt!: string;

    calculateBigTotal(): number {
        this.total = 0;
        this.items.forEach((item: ItemInvoice) => {
            this.total +=  item.calculateAmount();
        });
        return this.total;
    }
}