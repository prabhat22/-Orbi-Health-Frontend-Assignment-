import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.css"]
})
export class BreadcrumbComponent implements OnInit {
  /**
   * Input  of breadcrumb component
   * Takes path as an input from parent component.
   */
  @Input() path;
  /**
   * Output  of breadcrumb component
   * Return index of the folder name click
   */
  @Output() parentPath: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() { }
  alterPath(index) {
    this.parentPath.emit(index);
  }
}
