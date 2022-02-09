import type { NextPage } from 'next'
import MainLayout from "../layouts/Main";
import dynamic from 'next/dynamic'


const Banner = dynamic(() => import('../components/pages/home/Banner'));
const EasyToUse = dynamic(() => import('../components/pages/home/EasyToUse'));
const Cards = dynamic(() => import('../components/pages/home/Cards'));
const About = dynamic(() => import('../components/pages/home/About'));

const Home: NextPage = () => {


    return (
        <MainLayout showFooter={true}>
            {/*<Banner />*/}
            {/*<EasyToUse />*/}
            {/*<Cards />*/}
            {/*<About />*/}
        </MainLayout>
    )
}

export default Home;
