import { FC, useState } from 'react'
import { Edit, ImageInput, SimpleForm, TextInput, useRecordContext } from 'react-admin';
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";
import { Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export const UserEdit = () => {

    return(
        <Edit resource={'users'}>
            <SimpleForm>
                <TextInput source="id" InputProps={{ disabled: true }}/>
                <TextInput source="name"/>
                <TextInput source="username" />
                <TextInput source="email" />
                <TextInput source="age" />
                <TextInput source="sex" />
                <ImageInput source="avatar" />
                <MapView
                    source="address"
                />
            </SimpleForm>
        </Edit>
    )
}

interface Icord {
    source: string;
}
  
const MapView:FC<Icord> = (props) => {

    const record = useRecordContext();
    const { setValue } = useFormContext();
    const [coords, setCoords] = useState(record !== undefined ? record.address : props.source);

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