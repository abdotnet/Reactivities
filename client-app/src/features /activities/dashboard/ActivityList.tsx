import React, { SyntheticEvent } from "react";
import { Button, Grid, Item, Label, List, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}
const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
  target,
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map((pr) => (
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
                  loading={target == pr.id && submitting}
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

export default ActivityList;
