# angular-10-jwt-authentication-example

Angular 10 - JWT Authentication Example

To see a demo and further details go to https://jasonwatmore.com/post/2020/07/09/angular-10-jwt-authentication-example-tutorial

https://github.com/michaelbromley/ngx-pagination

## Quick Start

```
npm install ngx-pagination --save
```

### Angular Version

This library is built to work with **Angular 5+**, and support ahead-of-time compilation.
If you need to support an earlier or pre-release version of Angular for now, please see the changelog for advice on which version to use.

### Module Format

This library ships as a "flat ES module" (FESM). This means that all the JavaScript code is located in a single ES5-compatible file, but makes use of ES2015 `import` and `export` statements.

Webpack, Systemjs and Rollup all support this format and should work without problems.

A UMD bundle is also provided for systems which do not support FESM.

## Simple Example

```TypeScript
// app.module.ts
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import {MyComponent} from './my.component';

@NgModule({
    imports: [BrowserModule, NgxPaginationModule], // <-- include it in your app module
    declarations: [MyComponent],
    bootstrap: [MyComponent]
})
export class MyAppModule {}
```

```TypeScript
// my.component.ts
import {Component} from '@angular/core';

@Component({
    selector: 'my-component',
    template: `
    <ul>
      <li *ngFor="let item of collection | paginate: { itemsPerPage: 10, currentPage: p }"> ... </li>
    </ul>
               
    <pagination-controls (pageChange)="p = $event"></pagination-controls>
    `
})
export class MyComponent {
    p: number = 1;
    collection: any[] = someArrayOfThings;  
}
```

## API

### PaginatePipe

The PaginatePipe should be placed at the end of an NgFor expression. It accepts a single argument, an object conforming 
to the [`PaginationInstance` interface](/src/pagination-instance.ts). The following config options are available:

```HTML
<some-element *ngFor="let item of collection | paginate: { id: 'foo',
                                                      itemsPerPage: pageSize,
                                                      currentPage: p,
                                                      totalItems: total }">...</some-element>

```

* **`itemsPerPage`** [`number`] - **required** The number of items to display on each page.
* **`currentPage`** [`number`] - **required** The current (active) page number.
* **`id`** [`string`] If you need to support more than one instance of pagination at a time, set the `id` and ensure it
matches the id attribute of the `PaginationControlsComponent` / `PaginationControlsDirective` (see below).
* **`totalItems`** [`number`] The total number of items in the collection. Only useful when doing server-side paging, 
where the collection size is limited to a single page returned by the server API. For in-memory paging, 
this property should not be set, as it will be automatically set to the value of `collection.length`.

### PaginationControlsComponent

This a default component for displaying pagination controls. It is implemented on top of the `PaginationControlsDirective`, and has a pre-set
template and styles based on the [Foundation 6 pagination component](http://foundation.zurb.com/sites/docs/pagination.html). If you require a more 
customised set of controls, you will need to use the `PaginationControlsDirective` and implement your own component.

```HTML
<pagination-controls  id="some_id"
                      (pageChange)="pageChanged($event)"
                      (pageBoundsCorrection)="pageChanged($event)"
                      maxSize="9"
                      directionLinks="true"
                      autoHide="true"
                      responsive="true"
                      previousLabel="Previous"
                      nextLabel="Next"
                      screenReaderPaginationLabel="Pagination"
                      screenReaderPageLabel="page"
                      screenReaderCurrentLabel="You're on page">
</pagination-controls>
```

* **`id`** [`string`] If you need to support more than one instance of pagination at a time, set the `id` and ensure it
matches the id set in the PaginatePipe config.
* **`pageChange`** [`event handler`] The expression specified will be invoked whenever the page changes via a click on one of the
pagination controls. The `$event` argument will be the number of the new page. This should be used to update the value of the `currentPage` variable which was passed to the `PaginatePipe`.
