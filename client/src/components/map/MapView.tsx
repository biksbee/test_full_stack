import {FC, useState} from "react";
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";
import {Theme, Typography, useMediaQuery} from "@mui/material";
import {useRecordContext } from "react-admin";

interface Icord {
    source: string | number[];
    setLocationState?: any;
}

export const MapView:FC<Icord> = (props) => {

    const record = useRecordContext();

    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("xl"));

    const [coords, setCoords] = useState(record !== undefined ? record.address : props.source);


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
                width={`${!isSmall ? '55vw' : '90%'}`}
                height={!isSmall ? 320 : 400}
                defaultState={{center: coords, zoom: 9}}
            >
                {coords && <Placemark geometry={coords} />}
            </Map>
        </YMaps>
    )
};