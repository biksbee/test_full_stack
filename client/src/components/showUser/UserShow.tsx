import {EmailField, ImageField, Show, SimpleShowLayout, TextField} from 'react-admin';
import {MapView} from "../map/MapView";

export const UserShow = () => {

    return (
        <Show>
            <SimpleShowLayout>
                <ImageField source={"avatar"} />
                <TextField source={"id"} />
                <TextField source={"name"} />
                <TextField source={"username"} />
                <EmailField source={"email"} />
                <TextField source="age" />
                <TextField source="sex" />
                <MapView source={"address"} />
            </SimpleShowLayout>
        </Show>
    );
}
