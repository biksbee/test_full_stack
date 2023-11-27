import { useRecordContext } from "react-admin";
import { Link } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

const MyCustomUrlField = ({ source } : {source: string}) => {
    const record = useRecordContext();

    if(!record) return null;
    return record ?  (
        <Link
            href={record[source]}
            sx={{
                textDecoration: "none"
            }}
        >
            {record[source]}
            <LaunchIcon
                sx={{
                    fontSize: 15,
                    ml: 1
                }}
            />
        </Link>
    ) : null
}

export default MyCustomUrlField;