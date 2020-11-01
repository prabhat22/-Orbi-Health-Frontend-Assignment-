import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.css"]
})
export class BreadcrumbComponent implements OnInit {
  @Input() path;
  @Output() parentPath: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() { }
  alterPath(index) {
    this.parentPath.emit(index);
  }
}
