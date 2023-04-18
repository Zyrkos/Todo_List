import { compareAsc, format } from "date-fns";
import { newTask } from "./modules/tasks";

import {
  openTheForm,
  closeTheForm,
  collapsibleTabs,
  projectSelection,
  
  
} from "./modules/eventshandler";

newTask();
collapsibleTabs();
openTheForm();
closeTheForm();


projectSelection();

