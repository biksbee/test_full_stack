import { List, SimpleList, Datagrid, TextField, EmailField } from "react-admin";
import { useMediaQuery, Theme } from "@mui/material"

import {dataProvider} from "../../dataProvider";

export const UsersList = () => {

    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

    return (
        <List>
            {isSmall ? (
                    <SimpleList
                        primaryText={(record) => record.username}
                        secondaryText={(record) => record.name}
                        tertiaryText={(record) => record.email}
                    />

            ) : (
                <Datagrid
                    rowClick={"show"}
                >
                    <TextField source={"id"} />
                    <TextField source={"name"} />
                    <TextField source={"username"} />
                    <EmailField source={"email"} />
                </Datagrid>
            )}
        </List>
    )
}