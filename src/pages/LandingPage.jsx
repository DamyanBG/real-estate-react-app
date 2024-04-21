import LandingProperties from '../components/LangingPage/LangingProperties';
import MainSection from '../components/LangingPage/MainSection';
import ChoicePefectPropperty from '../components/LangingPage/ChoicePefectPropperty';
import './LandingPage.scss';

const LandingPage = () => {
    return (
        <>
            <MainSection />
            <div className='middle-main-container'>
                <ChoicePefectPropperty/>
                <LandingProperties />
            </div>
        </>
    );
};

export default LandingPage;
