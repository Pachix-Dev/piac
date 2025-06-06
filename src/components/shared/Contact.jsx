
import { useState } from 'react'

export function Contact({ currentLanguage, translates }) {
    const [message, setMessage] = useState('');
    const [okresponse, setokresponse] = useState('');
    const [form, setForm] = useState({
        name: '',
        email: '',
        topic: '',
        about: '',
    });

    const urlbase = import.meta.env.DEV
    ? 'http://localhost:3010/'
    : 'https://piac.org.mx/server/';


    //Toma los valores del formulario y lo guarda en el estado
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    //valida que los campos no estén vacíos
    const validar = () => {
        const name = form.name.trim();
        const email = form.email.trim();
        const topic = form.topic.trim();
        const about = form.about.trim();

        if (!name || !email || !topic || !about) {
            //Muestra el error dependiendo del idioma
            if(currentLanguage === 'es') {
                setMessage('Por favor, rellena todos los campos');
            }else {
                setMessage('Please, fill in all the fields');
            }
            setTimeout(() => {
                setMessage('');
            }, 4000);
            return false;
        }
        return true;
    }

    //Envia el formulario a la api
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validar()) {
            await sendEmail();
        }
    };

    //Formla la solicitud a la api
    async function sendEmail() {
        try {
            const response = await fetch(urlbase + 'sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    topic:form.topic,
                    about:form.about,
                    currentLanguage: currentLanguage
                }),
            });
    
            const json = await response.json()
    
            if (json.status === false) {
                //Muestra el error dependiendo del idioma
                if(currentLanguage === 'es') {
                    setMessage(json.message);
                }else {
                    setMessage(json.message_en);
                }
                setTimeout(() => {
                    setMessage('');
                }, 4000);
                return json;
            }else if (json.status === true) {
                //Muestra el mensaje de respuesta dependiendo del idioma
                if(currentLanguage === 'es') {
                    setokresponse(json.message);
                }else {
                    setokresponse(json.message_en);
                }
                setTimeout(() => {
                    setokresponse('');
                    setForm({ name: '', email: '', topic: '', about: '',});
                }, 4000);
                return json;
            } else {
                console.log("No te está retornando un status válido")
            }
        }catch(e){
            if(currentLanguage === 'es') {
                setMessage('Ups, algo salió mal, intentalo más tarde');
            }else {
                setMessage('Ups, something went wrong, try again later');
            }
            setTimeout(() => {<s></s>
                setMessage('');
            }, 4000);
        }
    }

    return (
        <>
            <div id="contact" className="flex flex-col md:flex-row lg:flex-row items-center justify-center bg-[#EAEAEA] p-5 lg:px-40 pb-10 gap-10 scroll-mb-0"> 
                <div className="lg:flex-3/8 md:flex-1/2 grid justify-center gap-5" 
                data-aos="fade-right"
                data-aos-offset="500"
                data-aos-easing="ease-in-sine">
                    <div>
                        <img src="/img/Logo_PIAC.webp" alt="Logo PIAC" />
                    </div>
                    <div className="text-center">
                        <p className="text-lg text-gray-500">{translates.subtitle}</p>
                        <p className="text-lg my-5">
                            <a href="mailto:contacto@piac.org.mx" target="_blank">contacto@piac.org.mx</a>
                        </p>
                        <p className="text-lg text-gray-500">{translates.socialmedia}</p>
                    </div>
                    <div className="flex flex-row gap-2 justify-center">
                        <a href="https://www.facebook.com/piac.org.mx" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 30 30">
                                <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"></path>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/company/piac-org-mx" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/piac_org/" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 24 24">
                                <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                            </svg>
                        </a>
                    </div>
                    {message && (
                        <p className='mt-5 text-red-600 font-bold text-center transition-opacity duration-1000 ease-in-out
                        '>{message}</p>
                    )}
                    {okresponse && (
                        <p className='mt-5 text-green-600 font-bold text-center transition-opacity duration-1000 ease-in-out
                        '>{okresponse}</p>
                    )}
                </div>
                <div className="lg:flex-5/8 md:flex-1/2 w-full  items-center justify-center">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                                    <div className="sm:col-span-full">
                                        <label
                                            htmlFor="name"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >{translates.name}</label
                                        >
                                        <div className="mt-2">
                                            <input
                                                id="name"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                type="text"
                                                required
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-full">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >{translates.email}</label
                                        >
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                autoComplete="email"
                                                required
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-full">
                                        <label
                                            htmlFor="topic"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >{translates.topic}</label
                                        >
                                        <div className="mt-2">
                                            <input
                                                id="topic"
                                                name="topic"
                                                type="text"
                                                value={form.topic}
                                                onChange={handleChange}
                                                required
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label
                                            htmlFor="about"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >{translates.about}</label
                                        >
                                        <div className="mt-2">
                                            <textarea
                                                name="about"
                                                id="about"
                                                value={form.about}
                                                onChange={handleChange}
                                                rows="3"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <div className="flex flex-row gap-3 rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                                <button
                                    type="submit"
                                >
                                    {translates.send}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}
