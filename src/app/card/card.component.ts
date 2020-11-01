import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";


@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})
export class CardComponent implements OnInit {
  @Input() data;
  editDeleteMenu = false;
  @Output() folderClick: EventEmitter<string> = new EventEmitter();
  @Output() deleteClick: EventEmitter<Object> = new EventEmitter();
  @Output() editClick: EventEmitter<Object> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    console.log("data" + this.data);
  }

  setEditMenu(value) {
    this.editDeleteMenu = value;
  }
  openNewDirectory(item) {
    if (!this.editDeleteMenu && item.type === "folder") {
      this.folderClick.emit(item.name)
    }
  }
  rightClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setEditMenu(true);
  }
  handleDelete(e, item) {
    e.preventDefault();
    e.stopPropagation();
    console.log('delelte')
    let obj = { name: item.name, type: item.type }
    this.deleteClick.emit(obj)
  }
  handleEdit(e, item) {
    e.preventDefault();
    e.stopPropagation();
    console.log('edit')
    let obj = { name: item.name, type: item.type }
    this.editClick.emit(obj);
  }
}
