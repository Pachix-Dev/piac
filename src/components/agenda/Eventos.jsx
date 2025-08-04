import React, { useState } from 'react';
import { agenda2025 } from '../../data/data_agenda_2025.js';

const Eventos = (currentLanguage) => {
    // El estado ahora guarda el ID del evento principal que está expandido
    const [expandedMainEventId, setExpandedMainEventId] = useState(null);
    // Nuevo estado para guardar el ID del evento individual que está expandido
    const [expandedSubEventId, setExpandedSubEventId] = useState(null);

    // Función para manejar el clic en el evento principal
    const toggleMainEvent = (id) => {
        setExpandedMainEventId(expandedMainEventId === id ? null : id);
        // Reseteamos el evento individual expandido al cerrar el principal
        setExpandedSubEventId(null);
    };

    // Función para manejar el clic en el evento individual (la fecha)
    const toggleSubEvent = (id) => {
        setExpandedSubEventId(expandedSubEventId === id ? null : id);
    };

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <h1>Próximos Eventos</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {agenda2025.map((mainEvent) => (
                    <li key={mainEvent.id} className="mb-1 p-3" >
                        <button
                            onClick={() => toggleMainEvent(mainEvent.id)}
                            className='text-black text-2xl text-left w-full p-2.5 font-bold rounded-lg justify-between items-center flex'
                            style={{
                                background: mainEvent.color,
                            }}
                        >
                            <span>{currentLanguage === 'es' ? mainEvent.title : mainEvent.title_en}</span>
                            <span>{expandedMainEventId === mainEvent.id ? '▲' : '▼'}</span>
                        </button>

                        {/* Se muestra toda la agenda si el ID del evento principal coincide con el estado */}
                        {expandedMainEventId === mainEvent.id && (
                            <div className='mt-4 p-4 bg-[#f9f9f9] rounded-xl' >
                                {mainEvent.description && (
                                    <div dangerouslySetInnerHTML={{ __html: currentLanguage === 'es' ? mainEvent.description : mainEvent.description_en }} style={{ marginBottom: '20px' }} />
                                )}

                                {/* Mapea por meses dentro del evento principal */}
                                {mainEvent.agenda.map((month) => (
                                    <div key={month.mes} style={{ marginTop: '15px' }}>
                                        <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '5px' }}>{month.mes}</h3>

                                        {/* Contenedor con CSS Grid para las 3 columnas */}
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                                            {/* Mapea los eventos individuales dentro de cada mes */}
                                            {month.eventos.map((subEvent, index) => {
                                                const subEventId = `${mainEvent.id}-${month.mes}-${index}`;
                                                return (
                                                    <div key={subEventId} style={{ padding: '10px', border: '1px solid #eee', borderRadius: '5px' }}>
                                                        <button
                                                            onClick={() => toggleSubEvent(subEventId)}
                                                            style={{
                                                                background: 'none',
                                                                border: 'none',
                                                                fontWeight: 'bold',
                                                                cursor: 'pointer',
                                                                textAlign: 'left',
                                                                width: '100%',
                                                                padding: 0,
                                                                marginBottom: '5px'
                                                            }}
                                                        >
                                                            {subEvent.fecha} - {subEvent.title}
                                                        </button>
                                                        {/* Se muestra la información detallada si este sub-evento está expandido */}
                                                        {expandedSubEventId === subEventId && (
                                                            <div style={{ fontSize: '0.9em', marginTop: '5px' }}>
                                                                {subEvent.description && <p style={{ margin: '5px 0' }}>{subEvent.description}</p>}
                                                                {subEvent.lugar && <p style={{ margin: '5px 0' }}><strong>Lugar:</strong> {subEvent.lugar}</p>}
                                                                {subEvent.acceso && <p style={{ margin: '5px 0' }}><strong>Acceso:</strong> {subEvent.acceso}</p>}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Eventos;