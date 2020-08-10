import { observable, action, computed } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/activity";

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable selectedActivity: IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;

  @computed get activityByDate() {
    return this.activities.sort(
      (a, b) => 
        Date.parse(a.date) - Date.parse(b.date)
      
    )
  }
  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((a) => a.id === id);
    this.editMode = false;
  };

  @action loadActivities = async () => {
    try {
      this.loadingInitial = true;

      const activities = await agent.Activities.list();

      activities.forEach((act) => {
        act.date = act.date.split(".")[0];
        this.activities.push(act);
      });
      this.loadingInitial = false;
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    console.log();
    try {
      const response = await agent.Activities.create(activity);
      this.activities.push(activity);
      this.submitting = false;
      this.editMode = false;
    } catch (error) {
      console.log(error);
      this.submitting = false;
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };
}

export default createContext(new ActivityStore());
