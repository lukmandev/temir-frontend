import {FC} from "react";
import AuthLayout from "../layouts/Auth";


const Profile:FC = () => {

    return (
        <h1>Hello World</h1>
    )
}

const WrappedWithAuthLayout = () => {

    return (
        <AuthLayout Children={Profile} />
    )
}

export default WrappedWithAuthLayout;