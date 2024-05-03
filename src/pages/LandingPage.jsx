import ChoosePerfectProperty from '../components/sections/ChoosePerfectProperty';
import LandingProperties from '../components/sections/LandingProperties';
import LandingSection from '../components/sections/LandingSection';

const LandingPage = () => {
    return (
        <>
            <LandingSection />
            <div className='middle-main-container'>
                <ChoosePerfectProperty/>
                <LandingProperties />
            </div>
        </>
    );
};

export default LandingPage;