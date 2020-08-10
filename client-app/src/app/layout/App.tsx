import React, { useContext } from "react";
import { Container } from "semantic-ui-react";
import {  useEffect, Fragment } from "react";
import NavBar from "../../features /nav/navbar";
import ActivityDashboard from "../../features /activities/dashboard/ActivityDashboard";
import Loading from "./loading";
import ActivityStore from "../Stores/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {

  const activityStore = useContext(ActivityStore);
 
  useEffect(() => {
    activityStore.loadActivities();
  }, [ActivityStore]);

  if (activityStore.loadingInitial)
    return <Loading content="loading activities ...." />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard   />
      </Container>
    </Fragment>
  );
};

export default observer(App);
