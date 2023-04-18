import { compareAsc, format } from "date-fns";
import { newTask } from "./modules/tasks";
import { newProject } from "./modules/projects";
import { addNewTask } from "./domcreator";
 
import {
  openTheForm,
  closeTheForm,
  collapsibleTabs,
  projectSelection,
} from "./modules/eventshandler";

newTask();
collapsibleTabs();
openTheForm();
projectSelection();
closeTheForm();
newProject();

addNewTask()

