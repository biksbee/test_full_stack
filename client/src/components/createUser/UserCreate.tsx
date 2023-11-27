import {Create, SimpleForm, TextInput, useRecordContext} from "react-admin";
import {FC, useState} from "react";
import {useFormContext} from "react-hook-form";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import {Typography} from "@mui/material";

export const UserCreate = () => (
      <Create resource={'users'}>
            <SimpleForm>
                <TextInput source="id" InputProps={{ disabled: true }}/>
                <TextInput source="name"/>
                <TextInput source="username" />
                <TextInput source="email" />
                <TextInput source="age" />
                <TextInput source="password" />
                <TextInput source="sex" />
                <MapView
                    source="address"
                />
            </SimpleForm>
          </Create>
);

interface Icord {
    source: string;
}

const MapView:FC<Icord> = (props) => {

    const record = useRecordContext();
    const { setValue } = useFormContext();
    const [coords, setCoords] = useState(record !== undefined ? record.address : [51.5074, -0.1278]);

    const onMapClick = (e: any) => {
        const currentCoords = e.get('coords');
        setCoords(currentCoords);
        setValue(props.source, currentCoords, { shouldDirty: true });
    }

    return (
        <YMaps>
            <Typography
                variant="h5"
                component="h2"
                style={{
                    paddingBottom: 15
                }}
            >
                {"Address"}
            </Typography>
            <Map
                onClick={onMapClick}
                width={'100%'}
                height={400}
                defaultState={{
                    center: coords,
                    zoom: 9
                }}
            >
                {coords && <Placemark geometry={coords} />}
            </Map>
        </YMaps>
    )
};