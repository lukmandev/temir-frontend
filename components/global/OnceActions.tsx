import {FC, useEffect} from "react";
import {useAppDispatch} from "../../hooks/redux";
import {check} from "../../actions/auth";


const OnceActions:FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(check());
    }, []);

    return null;
}



export default OnceActions;