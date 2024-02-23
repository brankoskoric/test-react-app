import {ErrorProps} from "../../interfaces/Properties.tsx";
import {Alert} from "@mui/material";

const ErrorComponent = (props: ErrorProps) => {
    const {message} = props

    return (
        <div>
            <Alert severity="error" sx={{fontSize:"14px"}}>{message}</Alert>
        </div>
    )
}

export default ErrorComponent