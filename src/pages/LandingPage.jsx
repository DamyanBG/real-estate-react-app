import ChoosePerfectProperty from '../components/sections/ChoosePerfectProperty';
import LandingProperties from '../components/sections/LandingProperties';
import MainSection from '../components/sections/MainSection';

const LandingPage = () => {
    return (
        <>
            <MainSection />
            <div className='middle-main-container'>
                <ChoosePerfectProperty/>
                <LandingProperties />
            </div>
        </>
    );
};

export default LandingPage;