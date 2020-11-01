
import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /**
    initialFolder is an object which holds the complete structure of the files and folders.
    path is an array which holds the route of the folders.
    modalTitle is a string which sets the title for creating file or folder.
    editName is a boolean which is used to check the operation ie create or edit.
    editObject is an object which holds the file of folder details whose value has to be edited.
    dataToDisplay is the variable which display the data on screen.
   */
  initialFolder;
  path = ["mydrive"];
  dataToDisplay;
  modalTitle;
  editName: boolean = false;
  editType;
  editObject;
  public name: string;
  constructor() {}

  /**
   ngOnInit is used to initialise the variables on loading the document.
   */
  ngOnInit() {
    this.name = ""
    this.initialFolder = {
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
    this.dataToDisplay = this.initialFolder["folders"].concat(
      this.initialFolder["files"]
    );
  }

  /**
   * Displays curr dir
   * @param name  the folder  name for which files or folders have to be display.
   */
  displayCurrDir(name) {

    this.path = [...this.path, name];
    let currentDirectory = this.findCurrDir();
    this.dataToDisplay = currentDirectory["folders"].concat(currentDirectory["files"])
  }
/**
 * Finds curr dir
 * @returns the folder structure in which user is currently present 
 */
findCurrDir() {
    var currentDirectory = this.initialFolder;
    var currFolder = currentDirectory["folders"];
    this.path.forEach(level => {
      if (level !== "my drive") {
        for (var i = 0; i < currFolder.length; i++) {
          if (level === currFolder[i].name) {
            currentDirectory = currFolder[i];
            currFolder = currFolder[i]["folders"];
            break;
          }
        }

      }

    });
    return currentDirectory;
  }
  /**
   * Alters path
   * @param index the index of the current folder.
   * Allow users to directly move to a folder from the breadcrumb.
   */
  alterPath(index) {

    var newPath = [];
    for (var i = 0; i <= index; i++) {
      newPath.push(this.path[i]);
    }
    this.path = newPath;
    var currentDirectory = this.findCurrDir();
    this.dataToDisplay = currentDirectory["folders"].concat(
      currentDirectory["files"]
    );
  }
  /**
   * Sets modal title
   * @param title value can be either file or folder.
   * Used to set the title of the modal.
   */
  setModalTitle(title) {
    this.modalTitle = title;
  }
  /**
   * Function to handle creation of file or folder
   */
  onSubmit() {
    this.createFileFolder(this.name, this.modalTitle)
    this.name="";
  }
  /**
   * Creates file folder
   * @param name file or folder name
   * @param type either file or folder
   * Create file or folder
   */
  createFileFolder(name, type) {
    type = type + "s";
    type = type.toLowerCase();
    var duplicateItem = false;
    var currFolder = this.findCurrDir()[type];
    var fObject;
    if (type === "folders") {
      fObject = { name: name, type: "folder", files: [], folders: [] };
    } else {
      fObject = { name: name, type: "file" };
    }
    currFolder.forEach((obj) => {
      if (obj.name === name) {
        window.alert("Already Present");
        duplicateItem = true;
      }
    });
    if (!duplicateItem) {
      currFolder.push(fObject);
      let currentDirectory = this.findCurrDir();
      this.dataToDisplay = currentDirectory["folders"].concat(
        currentDirectory["files"]
      );
    }
  }
  /**
   * Deletes file folder
   * @param object 
   * Function to handle deletion of file or folder
   */
  deleteFileFolder(object) {
    let type = object.type;
    let name = object.name;
    let newArray = [];
    let currentDirectory = this.findCurrDir();
    type += "s";
    currentDirectory[type].forEach((item) => {
      if (item.name != name) {
        newArray.push(item);
      }
    });
    currentDirectory[type] = newArray;
    this.dataToDisplay = currentDirectory["folders"].concat(currentDirectory["files"])
  }
  /**
   * Handles edit
   * @param obj 
   * Function to handle edit operation on file or folder.
   */
  handleEdit(obj) {
    this.editObject = obj;
    this.editName = true
    this.name = obj.name;
    this.editType = obj.type + "s";
    $("#exampleModal").modal()

  }
  /**
   * Change file or folder name in the structure.
   */
  onEdit() {
    let currentDirectory = this.findCurrDir();
    currentDirectory[this.editType].forEach(item => {
      if (item.name === this.editObject.name) {
        item.name = this.name;
      }
    });
    this.dataToDisplay = currentDirectory["folders"].concat(currentDirectory["files"])
    this.name = '';
    this.editName = false;
    $("#exampleModal").modal('hide')
  }
/**
 * Closes modal
 * Function to close modal explicitly.
 */
closeModal() {
    this.editName = false
  }
}


