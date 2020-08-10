import { observable, action, computed , configure , runInAction} from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/activity";

configure({ enforceActions: 'always' });
class ActivityStore {

    @observable activityRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable selectedActivity: IActivity | undefined;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activityByDate() {
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        )
    }
    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = false;
    };

    @action loadActivities = async () => {
        try {
            this.loadingInitial = true;

            const activities = await agent.Activities.list();
            runInAction('Loading activities',() => {
                activities.forEach((act) => {
                    act.date = act.date.split(".")[0];
                    this.activityRegistry.set(act.id, act);
                });
                this.loadingInitial = false;
            })
           
        } catch (error) {

            runInAction('load activties error',() => {
                console.log(error);
                this.loadingInitial = false;
            })
           
        }
    };

    @action createActivity = async (activity: IActivity) => {

        this.submitting = true;
        console.log(activity);
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.submitting = false;
                this.editMode = false;
            })
          
        } catch (error) {
            runInAction(() => {
                console.log(error);
                this.submitting = false;
            })
          
        }
    };

    @action editActivity = async (activity: IActivity) => {
        try {
            this.submitting = true;
            await agent.Activities.update(activity);
            runInAction('edit acitivity',() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.submitting = false;
            })
          
        }
        catch (error) {
            runInAction('edit acitivity error',() => {
                this.submitting = false;
            })

            console.log(error);
        }
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {

        try {
            this.submitting = false;
            this.target = event.currentTarget.name;
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.submitting = false;
                this.target = ''
            })
            
        }
        catch (error) {
            runInAction(() => {
                this.submitting = false;
                this.target = ''
            })
           
            console.log(error);
        }
      
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;
    };

    @action openEditForm = (id: string) => {

        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = true;
    };

    @action cancelSelectedActivity = () => {
       // alert('testing');
        this.selectedActivity = undefined;

    }
    @action cancelFormOpen = () => {
        this.editMode = false;
    }

}

export default createContext(new ActivityStore());
