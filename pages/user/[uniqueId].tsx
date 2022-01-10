import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'
import {createContext, useContext} from "react";
import {fetchUser} from "../../actions/user";
import Preload from "../../components/Preload";


export const getServerSideProps = async (ctx:GetServerSidePropsContext) => {
    const result = await fetchUser(ctx.query.uniqueId);
    return {
        props: {
            result
        },
    }
}

const UserContext = createContext({});

const useUserContext = () => useContext(UserContext);

const User = ({result}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return <Preload />
    return (
        <UserContext.Provider value={result}>
            <h1>Hello World</h1>
        </UserContext.Provider>
    )
}

export default User