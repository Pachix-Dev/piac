import React, { useState } from 'react';
import { agenda2025 } from '../../data/data_agenda_2025.js';

const Eventos = ({ currentLanguage }) => {
    const [expandedMainEventId, setExpandedMainEventId] = useState(null);
    const [expandedSubEventId, setExpandedSubEventId] = useState(null);

    const toggleMainEvent = (id) => {
        setExpandedMainEventId(expandedMainEventId === id ? null : id);
        setExpandedSubEventId(null);
    };

    const toggleSubEvent = (id) => {
        setExpandedSubEventId(expandedSubEventId === id ? null : id);
    };

    return (
        <div className="font-sans mx-auto p-4 lg:px-32"
            data-aos="fade-up"
            data-aos-duration="1000">
            <p className="font-bold text-3xl md:text-6xl mb-6 text-center text-gray-800">
                {currentLanguage === 'es' ? 'Próximos Eventos' : 'Upcoming Events'}
            </p>
            <p className="text-lg md:text-2xl pb-3 mb-8 text-right text-amber-300 border-b-2 border-gray-800">
                {currentLanguage === 'es' ? 'Agenda 2025, sujeta a cambios***' : 'Agenda 2025, subject to change***'}
            </p>
            <ul className="list-none p-0">
                {agenda2025.map((mainEvent) => (
                    <li key={mainEvent.id} className="mb-6 bg-white shadow-lg rounded-xl overflow-hidden">
                        <button
                            onClick={() => toggleMainEvent(mainEvent.id)}
                            className="text-white text-xl md:text-2xl text-left w-full px-6 py-4 font-bold flex justify-between items-center transition-colors duration-200"
                            style={{ background: mainEvent.color }}
                        >
                            <span>
                                {currentLanguage === 'es' ? mainEvent.title : mainEvent.title_en}
                            </span>
                            <span>{expandedMainEventId === mainEvent.id ? '▲' : '▼'}</span>
                        </button>

                        {expandedMainEventId === mainEvent.id && (
                            <div className="p-6 transition-all duration-300 ease-in-out text-xl">
                                {mainEvent.description && (
                                    <div className="flex flex-row gap-10">

                                        <div
                                            dangerouslySetInnerHTML={{ __html: currentLanguage === 'es' ? mainEvent.description : mainEvent.description_en }}
                                            className="mb-6 text-gray-700 leading-relaxed w-2/3 text-justify"
                                        />
                                        <div className='w-1/3'>
                                            {mainEvent.img && <img src={mainEvent.img} alt="" className="w-full h-full" />}
                                        </div>
                                    </div>
                                )}

                                {mainEvent.agenda.map((month) => (
                                    <div key={month.mes} className="mb-8">
                                        <h3 className="border-b-2 border-gray-200 pb-2 mb-4 text-xl md:text-2xl font-extrabold uppercase text-gray-800">
                                            {currentLanguage === 'es' ? month.mes : month.mes_en}
                                        </h3>

                                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                            {month.eventos.map((subEvent, index) => {
                                                const subEventId = `${mainEvent.id}-${month.mes}-${index}`;
                                                const isSubEventExpanded = expandedSubEventId === subEventId;

                                                return (
                                                    <div
                                                        key={subEventId}
                                                        className="p-4 border border-gray-200 rounded-lg bg-gray-50 transition-all duration-300 ease-in-out transform shadow-sm hover:shadow-lg hover:scale-105 cursor-pointer"
                                                    >
                                                        <button
                                                            onClick={() => toggleSubEvent(subEventId)}
                                                            className="font-bold text-base md:text-lg text-left w-full mb-1 text-gray-800"
                                                        >
                                                            <span className="block font-bold text-xl ">{currentLanguage === 'es' ? subEvent.fecha : subEvent.fecha_en}</span>
                                                            <span className="block text-md font-semibold italic" style={{ color: mainEvent.color }}>
                                                                {currentLanguage === 'es' ? subEvent.title : subEvent.title_en}
                                                            </span>
                                                            {/* Lógica para mostrar "ver más" o "ver menos" */}
                                                            <span className="block text-md font-normal italic mt-2 text-gray-500">
                                                                {isSubEventExpanded
                                                                    ? (currentLanguage === 'es' ? "" : "")
                                                                    : (currentLanguage === 'es' ? "ver más..." : "see more...")
                                                                }
                                                            </span>
                                                        </button>

                                                        {isSubEventExpanded && (
                                                            <div className="mt-2 text-sm text-gray-600 transition-all duration-300 ease-in-out">
                                                                {subEvent.description && <p className="mb-1">{currentLanguage === 'es' ? subEvent.description : subEvent.description_en}</p>}
                                                                {subEvent.lugar && <p className="mb-1 font-semibold">
                                                                    {currentLanguage === 'es' ? 'Lugar:' : 'Location:'} {currentLanguage === 'es' ? subEvent.lugar : subEvent.lugar_en}
                                                                </p>}
                                                                {subEvent.acceso && <p className="font-semibold">
                                                                    {currentLanguage === 'es' ? 'Acceso:' : 'Access:'} {currentLanguage === 'es' ? subEvent.acceso : subEvent.acceso_en}
                                                                </p>}
                                                                <span className="block text-md font-normal italic mt-2 text-gray-500">
                                                                    {isSubEventExpanded
                                                                        ? (currentLanguage === 'es' ? "ver menos..." : "see less...")
                                                                        : (currentLanguage === 'es' ? "" : "")
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                                <div>
                                    <h3 class="uppercase font-bold text-2xl pt-4 border-t-2 border-gray-200" >{currentLanguage === 'es' ? 'Beneficios para el PIAC:' : 'Benefits for PIAC   :'}</h3>
                                    <p
                                        dangerouslySetInnerHTML={{ __html: currentLanguage === 'es' ? mainEvent.beneficios : mainEvent.beneficios_en }}
                                        className="leading-relaxed italic"
                                        style={{ color: mainEvent.color }}
                                    />
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default Eventos;