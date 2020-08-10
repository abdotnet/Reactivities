import { observer } from "mobx-react-lite";
import React, {  useContext } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import ActivityStore from "../../../app/Stores/activityStore";


const ActivityList: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const { activityByDate, selectActivity, deleteActivity, submitting, target } = activityStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {activityByDate.map((pr) => (
          <Item key={pr.id}>
            <Item.Content>
              <Item.Header as="a">{pr.title}</Item.Header>
              <Item.Meta>{pr.date}</Item.Meta>
              <Item.Description>
                <div>{pr.description}</div>
                <div>
                  {pr.city} , {pr.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectActivity(pr.id)}
                  floated="right"
                  content="view"
                  color="blue"
                />
                <Button
                  name={pr.id}
                  loading={target === pr.id && submitting}
                            onClick={(e) => deleteActivity(e, pr.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={pr.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
