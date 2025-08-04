import React, { useState } from 'react';

// Datos genéricos de eventos
const events = [
    {
        id: 1,
        title: '24° Festival de Cine Alemán',
        description: 'Una muestra de lo mejor del cine alemán contemporáneo, con proyecciones de largometrajes y cortometrajes.',
    },
    {
        id: 2,
        title: 'Concierto de Jazz en el Parque',
        description: 'Disfruta de una tarde de buena música en un ambiente relajado, con la participación de talentosos músicos locales.',
    },
    {
        id: 3,
        title: 'Taller de Fotografía Urbana',
        description: 'Aprende a capturar la esencia de la ciudad. El taller incluye teoría y práctica en locaciones emblemáticas.',
    },
];

const Eventos = () => {
    // Estado para controlar qué evento tiene la descripción visible.
    // null significa que ninguno está expandido.
    const [expandedEventId, setExpandedEventId] = useState(null);

    // Función para manejar el clic.
    const toggleDescription = (id) => {
        // Si el evento actual ya está expandido, lo cerramos.
        // Si no, expandimos el evento en el que se hizo clic.
        setExpandedEventId(expandedEventId === id ? null : id);
    };

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <h1>Próximos Eventos</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {events.map((event) => (
                    <li key={event.id} style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                        <button
                            onClick={() => toggleDescription(event.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '1.2em',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                textAlign: 'left',
                                width: '100%',
                                padding: '0',
                            }}
                        >
                            {event.title}
                        </button>
                        {/* Si el id del evento coincide con el estado, mostramos la descripción. */}
                        {expandedEventId === event.id && (
                            <p style={{ marginTop: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '5px' }}>
                                {event.description}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Eventos;