import { useState } from 'react';
import './Carousel.scss';
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

export default function Carousel({ slides }) {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <section className="carousel">
            <div className="carousel-image-wrapper">
                {slides.length &&
                    slides.map((slide, index) => (
                        <>
                            <div
                                key={index}
                                className={index === current ? 'slide active' : 'slide'}
                            >
                                {index === current && <img src={slide.image} alt="Slide image" />}
                            </div>
                        </>
                    ))}
            </div>
            <div className="caoursel-buttons-wrapper">
                <button className="carousel-button-right" onClick={nextSlide}>
                    <FaArrowRight />
                </button>
                <button className="carousel-button-left" onClick={prevSlide}>
                    <FaArrowLeft />
                </button>
            </div>
        </section>
    );
}
