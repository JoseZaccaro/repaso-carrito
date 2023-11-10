import React, { useEffect, useState } from 'react';

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = ['Slide 1', 'Slide 2', 'Slide 3'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="carousel">
            {slides.map((slide, index) => (
                <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
                    {slide}
                </div>
            ))}
        </div>
    );
};

export default Carousel;
