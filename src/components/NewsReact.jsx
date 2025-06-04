import React from "react";
import { news } from "../data/data_news_2024.js";

const NewsReact = (currentLanguage) => (
    <div className="relative flex items-start p-4 sm:p-8 md:px-0 max-w-6xl mx-auto">

        {/* Línea vertical central */}
        <div className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-2 bg-gradient-to-b from-yellow-400 to-yellow-200 rounded-full z-0 shadow-lg" />

        {/* Contenedor de noticias */}
        <div className="flex flex-col w-full">
            {news.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                    <div
                        key={item.title + idx}
                        className="relative flex flex-col lg:flex-row w-full mb-12 items-center"
                    >
                        {/* Columna izquierda */}
                        <div className={`hidden lg:flex w-1/2 justify-${isLeft ? "end" : "start"} pr-4`}>
                            {isLeft && (
                                <div className="max-w-2xl w-full flex flex-row-reverse">
                                    <a href={currentLanguage === "en" ? "/en/news/" + item.slug : "/news/" + item.slug}>
                                        <div className=" w-full lg:min-w-[500px] flex-1 flex flex-col shadow-2xl bg-amber-100 sm:flex-row items-start gap-4 sm:gap-6  rounded-4xl rounded-tr-none  p-4 sm:p-8  hover:scale-[1.04] hover:shadow-[0_8px_32px_0_rgba(251,191,36,0.25)] transition-all duration-300">
                                            {/* Imagen */}
                                            <img
                                                src={item.src}
                                                alt={item.title}
                                                className="hidden md:block h-32 sm:h-40 w-24 sm:w-32 object-cover rounded-lg shadow  "
                                            />
                                            <div>
                                                <h4 className="font-extrabold text-xl sm:text-2xl mb-2   drop-shadow">
                                                    {currentLanguage === "es"
                                                        ? item.title
                                                        : item.title_en}
                                                </h4>
                                                <time className="block mb-2 text-xs sm:text-sm text-yellow-500 font-semibold">
                                                    {item.year}
                                                </time>
                                                <p className="mb-2 text-base sm:text-lg text-gray-700 leading-relaxed">
                                                    {currentLanguage === "es"
                                                        ? item.subtitle : item.subtitle_en}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
                        {/* Punto de la línea de tiempo */}

                        {/* Columna derecha */}
                        <div className={`hidden lg:flex w-1/2 justify-${!isLeft ? "start" : "end"} pl-4`}>
                            {!isLeft && (
                                <div className="max-w-2xl w-full flex">
                                    <a href={currentLanguage === "en" ? "/en/news/" + item.slug : "/news/" + item.slug}>

                                        <div className="flex-1 flex w-full lg:min-w-[500px] bg-amber-100 flex-col sm:flex-row items-start gap-4 sm:gap-6  rounded-4xl  rounded-tl-none shadow-2xl p-4 sm:p-8  hover:scale-[1.04] hover:shadow-[0_8px_32px_0_rgba(251,191,36,0.25)] transition-all duration-300">
                                            {/* Imagen */}
                                            <img
                                                src={item.src}
                                                alt={item.title}
                                                className="hidden md:block h-32 sm:h-40 w-24 sm:w-32 object-cover rounded-lg shadow"
                                            />
                                            <div>
                                                <h4 className="font-extrabold text-xl sm:text-2xl mb-2 drop-shadow">
                                                    {currentLanguage === "es"
                                                        ? item.title
                                                        : item.title_en}
                                                </h4>
                                                <time className="block mb-2 text-xs sm:text-sm text-yellow-500 font-semibold">
                                                    {item.year}
                                                </time>
                                                <p className="mb-2 text-base sm:text-lg text-gray-700 leading-relaxed">
                                                    {currentLanguage === "es"
                                                        ? item.subtitle : item.subtitle_en}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
                        {/* Vista móvil/tablet: tarjeta completa */}
                        <div className="flex lg:hidden w-full">
                            <div className="bg-amber-100 flex-1 flex flex-col sm:flex-row items-start gap-4 sm:gap-6  rounded-2xl shadow-2xl p-4 sm:p-8 w-full 0 hover:scale-[1.04] hover:shadow-[0_8px_32px_0_rgba(251,191,36,0.25)] transition-all duration-300">
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="hidden md:block h-32 sm:h-40 w-24 sm:w-32 object-cover rounded-lg shadow border-2 border-yellow-200"
                                />
                                <div>
                                    <h4 className="font-extrabold text-xl sm:text-2xl mb-2 drop-shadow">
                                        {currentLanguage === "es"
                                            ? item.title
                                            : item.title_en}
                                    </h4>
                                    <time className="block mb-2 text-xs sm:text-sm  font-semibold">
                                        {item.year}
                                    </time>
                                    <p className="mb-2 text-base sm:text-lg text-gray-700 leading-relaxed">
                                        {currentLanguage === "es"
                                            ? item.subtitle
                                            : item.subtitle_en}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);

export default NewsReact;