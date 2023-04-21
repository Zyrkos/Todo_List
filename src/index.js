import { compareAsc, format } from "date-fns";
import { newTask } from "./modules/tasks";
import { newProject } from "./modules/projects";

import {
  openTheForm,
  closeTheForm,
  collapsibleTabs,
} from "./modules/eventshandler";

newTask();
collapsibleTabs();
openTheForm();
closeTheForm();
newProject();
