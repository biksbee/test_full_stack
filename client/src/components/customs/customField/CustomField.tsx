import {TextField, useRecordContext} from "react-admin";

const CustomField = ({ source } : {source: string}) => {
    const record = useRecordContext();

    console.log(record)

    if(!record) return null;
    return record ?  (
        <TextField
            sx={{
                textDecoration: "none"
            }}
        >
            {record[source]}
        </TextField>
    ) : null
}

export default CustomField;