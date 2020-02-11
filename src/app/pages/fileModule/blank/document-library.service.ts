import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export class Product {
    ID: string;
    name: string;
    expanded?: boolean;
    parentId?: string;
    icon?: string;
    price?: number;
    isFolder: boolean;
    isFile: boolean;
}

export class BreadCrump {
    constructor(node, name) {
        this.node = node;
        this.name = name;
    }
    node: string;
    name: string;
}

var products: Product[] = [];

@Injectable()
export class Service {

    constructor( private http: HttpClient ) {
    }

    getProducts(): Product[] {
        return products;
    }

    addItem(item, parentId) {
        products.push(
            {
        ID: item.nodeRef,
        name: item.name,
        expanded : (item.isFile) ? false : true,
        parentId : parentId,
        icon : (item.isFile) ? 'assets/img/pdf_file.svg' : 'assets/img/folder.svg',
        price : null,
        isFolder: item.isFolder,
        isFile: item.isFile
    }
        )
    }

    editItem(id, name) {
        products = [];
        let firstItem = {
            ID: "1",
            name: "Document library",
            expanded: false,
            isFile: false,
            isFolder: true
        };
        products.push(firstItem);
        products[0].expanded = true;
        products[0].ID=  id;
        if(name) products[0].name = name;
    }

    Scan(functionName, selectedScannerName ): Promise<any> {
        return new Promise(
            ((resolve, reject) => {

                this.http.post('https://127.0.0.1:7777/execute/scan',{'functionName': functionName, 'selectedScannerName': selectedScannerName},
                    {observe: 'body'})
                    .subscribe((data: any) => {
                            console.log(data);
                            resolve(data)
                        },
                        error => {
                            reject(error)
                        });
            })
        );
    }

}
