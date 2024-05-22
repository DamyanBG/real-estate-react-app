import ChoosePerfectProperty from '../components/sections/ChoosePerfectProperty';
import LandingProperties from '../components/sections/LandingProperties';
import LandingSection from '../components/sections/LandingSection';
import {SomeComponent} from "@evolved/react-simple-scheduler"

const LandingPage = () => {
    return (
        <>
            <LandingSection />
            <SomeComponent />
            <div className='middle-main-container'>
                <ChoosePerfectProperty/>
                <LandingProperties />
            </div>
        </>
    );
};

export default LandingPage;