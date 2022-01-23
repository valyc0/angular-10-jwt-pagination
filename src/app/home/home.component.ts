import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';
import { HttpClient } from '@angular/common/http';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[];

    collection: any;
    p: number;
    itemsPerPage = 5;
    totalItems: any;

    constructor(private userService: UserService, private http: HttpClient) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
        this.getAllData();
    }


    getAllData() {
        const url = `https://api.instantwebtools.net/v1/passenger?page=${0}&size=${this.itemsPerPage}`;
        this.http.get(url).subscribe((data: any) => {
            console.log(data);
            this.collection = data;
            this.totalItems = data.totalPassengers;
        })
    }

    getPage(page) {
        const url = `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${this.itemsPerPage}`;
        this.http.get(url).subscribe((data: any) => {
            console.log(data);
            this.collection = data;
            this.totalItems = data.totalPassengers;

        })
    }
}