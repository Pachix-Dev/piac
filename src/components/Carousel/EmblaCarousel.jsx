import React, { useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useAutoplayProgress } from './EmblaCarouselAutoplayProgress';
import {
    NextButton,
    PrevButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButtons';

const EmblaCarousel = (props) => {
    const { slides, options } = props;
    const progressNode = useRef(null);
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay({ playOnInit: true, delay: 2000, stopOnInteraction: true })
    ]);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);

    return (

        <div className="flex w-full mx-auto relative overflow-hidden">
            <div>
                <PrevButton
                    onClick={onPrevButtonClick}
                    disabled={prevBtnDisabled}
                    className="p-3 h-full size-15  hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

                    </svg>
                </PrevButton>
            </div>
            <div className=" overflow-hidden" ref={emblaRef}>
                {/* Contenedor de los slides */}
                <div className="flex touch-pan-y touch-pinch-zoom -ml-4">
                    {slides.map((recuerdo, index) => (
                        // Cada slide
                        <div key={index} className=" justify-center items-center flex flex-none w-full p-4 m-5">
                            {/* Detalles del slide */}
                            <div className='m-5 p-3'>
                                <div className=" m-2 p-2 flex flex-col  justify-center   ">
                                    <h3 className="font-bold text-3xl text-gray-800 mb-1">
                                        {recuerdo.title}
                                    </h3>
                                </div>
                                <div className="m-2 p-2 flex flex-col  justify-center ">
                                    {recuerdo.subtitle && (
                                        <p className="text-sm text-gray-600 mb-2">
                                            {recuerdo.subtitle}
                                        </p>
                                    )}
                                    <span className="text-xs font-medium text-gray-500">
                                        {recuerdo.year}
                                    </span>
                                </div>
                                <div className=" m-2 p-1 flex flex-col justify-center bg-white rounded-lg shadow-md ">
                                    {recuerdo.subtitle && (
                                        <p className=" font-bold text-sm text-gray-600 mb-2">
                                            {recuerdo.subtitle}
                                        </p>
                                    )}
                                    <span className=" font-bold text-xs text-gray-500">
                                        {recuerdo.year}
                                    </span>
                                </div>
                            </div>

                            {/* Contenido de la imagen del slide */}
                            < div className="mt-4" >
                                <img
                                    className="w-full h-110 rounded-lg"
                                    src={recuerdo.img}
                                    alt={recuerdo.title}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div >
            <div >
                <NextButton
                    onClick={onNextButtonClick}
                    disabled={nextBtnDisabled}
                    className="p-3 h-full size-15  hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    </svg>
                </NextButton>
            </div>

        </div >
    );
};

export default EmblaCarousel;