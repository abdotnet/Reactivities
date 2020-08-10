import React, { SyntheticEvent, useContext } from "react";
import { Container } from "semantic-ui-react";
import { useState, useEffect, Fragment } from "react";
import { IActivity } from "../models/activity";
import NavBar from "../../features /nav/navbar";
import ActivityDashboard from "../../features /activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import Loading from "./loading";
import ActivityStore from "../Stores/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter((c) => c.id == activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };
  const handleDeleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);

    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter((c) => c.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };
  useEffect(() => {
    activityStore.loadActivities();
  }, [ActivityStore]);

  if (activityStore.loadingInitial)
    return <Loading content="loading activities ...." />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          selectActivity={activityStore.selectActivity}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default observer(App);
