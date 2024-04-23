import './ChoicePefectPropperty.scss';
import { FaCheck } from 'react-icons/fa';
import MyImage from '../../assets/images/about.jpg';
export default function ChoicePefectPropperty() {
    return (
        <>
            <div className="container-xxl">
                <div className="container">
                    <div className="row row-choice-best">
                        <div className="fadeIn">
                            <div className="about-img">
                                <img className="img-fluid w-100" src={MyImage} />
                            </div>
                        </div>
                        <div className="row-choice-best-right-side">
                            <h1>#1 Place To Find The Perfect Property</h1>
                            <p>
                                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                                diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
                                lorem sit clita duo justo magna dolore erat amet
                            </p>
                            <p>
                                <FaCheck className='choise-section-icon'/>
                                Tempor erat elitr rebum at clita
                            </p>
                            <p>
                                <FaCheck className='choise-section-icon'/>
                                Aliqu diam amet diam et eos
                            </p>
                            <p>
                                <FaCheck className='choise-section-icon'/>
                                Clita duo justo magna dolore erat amet
                            </p>
                            <a className="btn btn-primary" href="">
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
