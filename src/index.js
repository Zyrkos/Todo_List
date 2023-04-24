import { compareAsc, format } from "date-fns";
import { newTask } from "./modules/tasks";
import { newProject } from "./modules/projects";

import {
  /* tabSwitch, */
  openTheForm,
  closeTheForm,
  collapsibleTabs,
} from "./modules/eventshandler";

newTask();
collapsibleTabs();
openTheForm();
closeTheForm();
newProject();
/* tabSwitch(); */
