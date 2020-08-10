import React, { useState, FormEvent, useContext } from "react";
import {
    Button,
    Form,
    Segment
} from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/Stores/activityStore";

interface IProps {
    activity: IActivity;
}
const ActivityForm: React.FC<IProps> = ({
    activity: initialFormState,
}) => {
    const activityStore = useContext(ActivityStore);
    const { createActivity, editActivity, submitting, cancelFormOpen } = activityStore;


    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState;
        }
        else {
            return {
                id: "",
                title: "",
                category: "",
                description: "",
                date: "",
                venue: "",
                city: "",
            };
        }
    };

    const [activity, setActivity] = useState<IActivity>(initializeForm);

    const handleInputChange = (
        event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.currentTarget;

        setActivity({ ...activity, [name]: value });
    };

    const handleSubmit = () => {
        
        
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid(),
            };
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
        console.log(activity);
    };

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    onChange={handleInputChange}
                    placeholder="Title"
                    name="title"
                    value={activity.title}
                />
                <Form.TextArea
                    onChange={handleInputChange}
                    row="2"
                    name="description"
                    placeholder="Description"
                    value={activity.description}
                />
                <Form.Input
                    name="category"
                    onChange={handleInputChange}
                    placeholder="Category"
                    value={activity.category}
                />
                <Form.Input
                    name="date"
                    onChange={handleInputChange}
                    type="datetime-local"
                    placeholder="Date"
                    value={activity.date}
                />
                <Form.Input
                    name="city"
                    onChange={handleInputChange}
                    placeholder="City"
                    value={activity.city}
                />
                <Form.Input
                    name="venue"
                    onChange={handleInputChange}
                    placeholder="Venue"
                    value={activity.venue}
                />
                <Button
                    loading={submitting}
                    floated="right"
                    positive
                    type="submit"
                    content="Submit"
                />
                <Button
                    onClick={cancelFormOpen}
                    floated="right"
                    type="submit"
                    content="Cancel"
                />
            </Form>
        </Segment>
    );
};
export default observer(ActivityForm);
