import Admin from "./Admin";

import { Navigate } from "react-router-dom";

function Protected()
{
    if(localStorage.getItem("token"))
    {
        return(
            <Admin />
        )
    }else{
        return(
            <Navigate to="/login" />
        )
    }
}

export default Protected;