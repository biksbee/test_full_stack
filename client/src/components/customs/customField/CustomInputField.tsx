import { FC, useState, useEffect } from 'react';
import {useController, useFormContext} from 'react-hook-form';
import {TextInput} from "react-admin";
import { useDebounce } from "../../../hooks/useDebounce";

interface IC {
    source: string;
}

export const CustomInputField:FC<IC> = ({ source }) => {

    const [show, setShow] = useState<boolean>(true)
    const [debounceValue, setDebounceValue] = useState<string>('')
    const debounceItem = useDebounce(debounceValue, 300)
    const { setValue } = useFormContext();

    useEffect(() => {
        setValue(source, debounceItem, { shouldDirty: true });
    }, [debounceItem]);

    const input1 = useController({name: ''});

    return (
        <span
            style={{
                margin: 15,
                columnGap: 20
            }}
        >
            <input {...input1.field} type="checkbox" onClick={() => setShow(!show)} />
            {show &&
                <TextInput
                    onChange={(event) => setDebounceValue(event.target.value)}
                    source={source}
                />
            }
        </span>
    )
};