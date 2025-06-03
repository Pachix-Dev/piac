import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';



export function CriteriaSection({ translates }) {
    const [showText, setShowText] = useState(false);
    const [textReady, setTextReady] = useState(false);

    const handleToggle = () => {
        if (!showText) {
            setShowText(true);
            setTimeout(() => setTextReady(true), 500);
        } else {
            setTextReady(false);
            setTimeout(() => setShowText(false), 500);
        }
    };

    const svgVariants = {
        center: { x: 0, transition: { duration: 0.5 } },
        left: { x: 0, transition: { duration: 0.5 } },
    };

    const textVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
    };

    return (
        <motion.section
            layout
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-[#fffbebd6] rounded-none md:rounded-2xl  m-0 md:m-2  my-5 py-10 px-4 md:px-10"
        >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">

                {/* SVG + título */}
                <motion.div
                    className="flex flex-col items-center text-center md:text-left md:items-center justify-center md:w-1/2"
                    variants={svgVariants}
                    initial="center"
                    animate="left"
                >
                    <div
                        onClick={handleToggle}
                        className="cursor-pointer select-none flex flex-col items-center"
                        tabIndex={0}
                        role="button"
                        aria-pressed={showText}

                    >
                        <div className='flex gap-2'>
                            <img src="/img/AboutUs2.png"
                                alt='Criterios de actuación'

                                height={150}
                                width={150}>
                            </img>
                            <img src="/img/AboutUs.png"
                                alt='Criterios de actuación'
                                height={150}
                                width={150}>
                            </img>
                        </div>
                        <h2 className="uppercase text-xl md:text-2xl font-semibold mt-4">
                            {translates.tittle_3}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {showText ? translates.ca.subtext_1 : translates.ca.subtext_2}
                        </p>
                    </div>
                </motion.div>

                {/* Texto animado */}
                <div className="md:w-1/2">
                    <AnimatePresence>
                        {textReady && (
                            <motion.div
                                className="p-6 space-y-4 text-gray-800 text-lg"
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <p>{translates.ca.text_1}                                </p>
                                <p>{translates.ca.text_2}</p>
                                <p>{translates.ca.text_3}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {!textReady && (
                        <div style={{ minHeight: 220 }} aria-hidden="true"></div>
                    )}
                </div>
            </div>
        </motion.section>
    );
};

export default CriteriaSection;
