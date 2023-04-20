import { compareAsc, format } from "date-fns";
import { newTask } from "./modules/tasks";
import { newProject } from "./modules/projects";
import { Storage } from "./modules/storage";

import {
  openTheForm,
  closeTheForm,
  collapsibleTabs,
  projectOptions,
} from "./modules/eventshandler";

newTask();
collapsibleTabs();
openTheForm();
projectOptions();
closeTheForm();
newProject();
