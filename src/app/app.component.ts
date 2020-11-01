
import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  initialfolder;
  path = ["mydrive"];
  contentOnScreen;
  modalTitle;
  editName: boolean = false;
  editType;
  editObject;
  public name: string;
  constructor() {}

  ngOnInit() {
    this.name = ""
    this.initialfolder = {
      key: "1",
      name: "my drive",
      files: [{ name: 'Test File', type: 'file' }],
      folders: [
        {
          name: "Demo Folder",
          type: "folder",
          files: [],
          folders: []
        }
      ]
    };
    this.contentOnScreen = this.initialfolder["folders"].concat(
      this.initialfolder["files"]
    );
  }


  displayCurrentDirectory(name) {

    this.path = [...this.path, name];
    let currentDirectory = this.findCurrentDirectory();
    this.contentOnScreen = currentDirectory["folders"].concat(currentDirectory["files"])
  }

  findCurrentDirectory() {
    var currentDirectory = this.initialfolder;
    var currentArrayToLookInto = currentDirectory["folders"];
    this.path.forEach(level => {
      if (level !== "my drive") {
        for (var i = 0; i < currentArrayToLookInto.length; i++) {
          if (level === currentArrayToLookInto[i].name) {
            currentDirectory = currentArrayToLookInto[i];
            currentArrayToLookInto = currentArrayToLookInto[i]["folders"];
            break;
          }
        }

      }

    });
    return currentDirectory;
  }
  alterPath(index) {

    var newPath = [];
    for (var i = 0; i <= index; i++) {
      newPath.push(this.path[i]);
    }
    this.path = newPath;
    var currentDirectory = this.findCurrentDirectory();
    this.contentOnScreen = currentDirectory["folders"].concat(
      currentDirectory["files"]
    );
  }
  setModalTitle(title) {
    this.modalTitle = title;
  }
  onSubmit() {
    this.createFileFolder(this.name, this.modalTitle)
    this.name="";
  }
  createFileFolder(name, type) {
    type = type + "s";
    type = type.toLowerCase();
    var duplicateItem = false;
    var currentArrayToLookInto = this.findCurrentDirectory()[type];
    var fObject;
    if (type === "folders") {
      fObject = { name: name, type: "folder", files: [], folders: [] };
    } else {
      fObject = { name: name, type: "file" };
    }
    currentArrayToLookInto.forEach((obj) => {
      if (obj.name === name) {
        window.alert("Already Present");
        duplicateItem = true;
      }
    });
    if (!duplicateItem) {
      currentArrayToLookInto.push(fObject);
      let currentDirectory = this.findCurrentDirectory();
      this.contentOnScreen = currentDirectory["folders"].concat(
        currentDirectory["files"]
      );
    }
  }
  deleteFileFolder(object) {
    let type = object.type;
    let name = object.name;
    let newArray = [];
    let currentDirectory = this.findCurrentDirectory();
    type += "s";
    currentDirectory[type].forEach((item) => {
      if (item.name != name) {
        newArray.push(item);
      }
    });
    currentDirectory[type] = newArray;
    this.contentOnScreen = currentDirectory["folders"].concat(currentDirectory["files"])
  }
  handleEdit(obj) {
    this.editObject = obj;
    this.editName = true
    this.name = obj.name;
    this.editType = obj.type + "s";
    $("#exampleModal").modal()

  }
  onEdit() {
    let currentDirectory = this.findCurrentDirectory();
    currentDirectory[this.editType].forEach(item => {
      if (item.name === this.editObject.name) {
        item.name = this.name;
      }
    });
    this.contentOnScreen = currentDirectory["folders"].concat(currentDirectory["files"])
    this.name = '';
    this.editName = false;
    $("#exampleModal").modal('hide')
  }

  closeModal() {
    this.editName = false
  }
}


