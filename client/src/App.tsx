import {Admin, Resource } from "react-admin";

import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";

import GroupIcon from '@mui/icons-material/Group';

import { UsersList } from "./components/listUser/UsersList"
import { UserShow } from "./components/showUser/UserShow"
import { UserEdit } from "./components/editUser/UserEdit";
import { UserCreate } from "./components/createUser/UserCreate";

import { Profile } from "./components/profile/Profile";

export const App = () => {

    return (
        <Admin
            authProvider={authProvider}
            dataProvider={dataProvider}
            requireAuth
            dashboard={Profile}
            darkTheme={{palette: {mode: 'dark'}}}
        >
            <Resource
                name={"users"}
                list={UsersList}
                show={UserShow}
                recordRepresentation={"name"}
                edit={UserEdit}
                create={UserCreate}
                icon={GroupIcon}
            />
        </Admin>
    );
}

