import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";


@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})
export class CardComponent implements OnInit {

  /**
   * Input  of card component
   * Takes the data from parent component to traverse as a list of object.
   */
  @Input() data;
  /**
   * Output  of card component
   * Allow parent component to recognise that folder is click.
   */
  @Output() folderClick: EventEmitter<string> = new EventEmitter();
  /**
   * Output  of card component
   * Allow parent component to recognise the delete event for a file or folder.
   */
  @Output() deleteClick: EventEmitter<Object> = new EventEmitter();
  /**
   * Output  of card component
   * Allow parent component to recognise the edit event for a file or folder.
   */
  @Output() editClick: EventEmitter<Object> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  openNewDirectory(item) {
    if ( item.type === "folder") {
      this.folderClick.emit(item.name)
    }
  }

  handleDelete(e, item) {
    e.preventDefault();
    e.stopPropagation();
    let obj = { name: item.name, type: item.type }
    this.deleteClick.emit(obj)
  }
  handleEdit(e, item) {
    e.preventDefault();
    e.stopPropagation();
    
    let obj = { name: item.name, type: item.type }
    this.editClick.emit(obj);
  }
}
