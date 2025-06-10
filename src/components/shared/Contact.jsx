import { useState, useCallback } from 'react'

export function Contact({ currentLanguage, translates }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: '',
    about: '',
  })
  const [message, setMessage] = useState({ type: '', text: '' })

  const urlbase = import.meta.env.DEV
    ? 'http://localhost:3010/'
    : 'https://piac.org.mx/server/'

  const handleChange = useCallback((e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const showMessage = useCallback((type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 4000)
  }, [])

  const validar = useCallback(() => {
    const { name, email, topic, about } = form
    if (![name, email, topic, about].every((v) => v.trim())) {
      showMessage(
        'error',
        currentLanguage === 'es'
          ? 'Por favor, rellena todos los campos'
          : 'Please, fill in all the fields'
      )
      return false
    }
    return true
  }, [form, currentLanguage, showMessage])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      if (!validar()) return
      try {
        const response = await fetch(urlbase + 'sendEmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, currentLanguage }),
        })
        const json = await response.json()
        if (json.status === true) {
          showMessage(
            'success',
            currentLanguage === 'es' ? json.message : json.message_en
          )
          setForm({ name: '', email: '', topic: '', about: '' })
        } else {
          showMessage(
            'error',
            currentLanguage === 'es' ? json.message : json.message_en
          )
        }
      } catch {
        showMessage(
          'error',
          currentLanguage === 'es'
            ? 'Ups, algo salió mal, intentalo más tarde'
            : 'Ups, something went wrong, try again later'
        )
      }
    },
    [form, currentLanguage, urlbase, validar, showMessage]
  )

  return (
    <div
      id='contact'
      className='flex flex-col md:flex-row lg:flex-row items-center justify-center bg-[#EAEAEA] p-5 lg:px-40 pb-10 gap-10 scroll-mb-0'
    >
      <div className='lg:flex-3/8 md:flex-1/2 grid justify-center gap-5'>
        <div>
          <img src='/img/Logo_PIAC.webp' alt='Logo PIAC' />
        </div>
        <div className='text-center'>
          <p className='text-lg text-gray-500'>{translates.subtitle}</p>
          <p className='text-lg my-5'>
            <a
              href='mailto:contacto@piac.org.mx'
              target='_blank'
              rel='noopener noreferrer'
            >
              contacto@piac.org.mx
            </a>
          </p>
          <p className='text-lg text-gray-500'>{translates.socialmedia}</p>
        </div>
        <div className='flex flex-row gap-2 justify-center'>
          <a
            href='https://www.facebook.com/piac.org.mx'
            target='_blank'
            rel='noopener noreferrer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              width='50'
              height='50'
              viewBox='0 0 48 48'
            >
              <path
                fill='#039be5'
                d='M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z'
              ></path>
              <path
                fill='#fff'
                d='M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z'
              ></path>
            </svg>
          </a>
          <a
            href='https://www.linkedin.com/company/piac-org-mx'
            target='_blank'
            rel='noopener noreferrer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              width='50'
              height='50'
              viewBox='0 0 48 48'
            >
              <path
                fill='#0288D1'
                d='M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z'
              ></path>
              <path
                fill='#FFF'
                d='M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z'
              ></path>
            </svg>
          </a>
          <a
            href='https://www.instagram.com/piac_org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              width='50'
              height='50'
              viewBox='0 0 48 48'
            >
              <radialGradient
                id='yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1'
                cx='19.38'
                cy='42.035'
                r='44.899'
                gradientUnits='userSpaceOnUse'
              >
                <stop offset='0' stop-color='#fd5'></stop>
                <stop offset='.328' stop-color='#ff543f'></stop>
                <stop offset='.348' stop-color='#fc5245'></stop>
                <stop offset='.504' stop-color='#e64771'></stop>
                <stop offset='.643' stop-color='#d53e91'></stop>
                <stop offset='.761' stop-color='#cc39a4'></stop>
                <stop offset='.841' stop-color='#c837ab'></stop>
              </radialGradient>
              <path
                fill='url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)'
                d='M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z'
              ></path>
              <radialGradient
                id='yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2'
                cx='11.786'
                cy='5.54'
                r='29.813'
                gradientTransform='matrix(1 0 0 .6663 0 1.849)'
                gradientUnits='userSpaceOnUse'
              >
                <stop offset='0' stop-color='#4168c9'></stop>
                <stop
                  offset='.999'
                  stop-color='#4168c9'
                  stop-opacity='0'
                ></stop>
              </radialGradient>
              <path
                fill='url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)'
                d='M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z'
              ></path>
              <path
                fill='#fff'
                d='M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z'
              ></path>
              <circle cx='31.5' cy='16.5' r='1.5' fill='#fff'></circle>
              <path
                fill='#fff'
                d='M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z'
              ></path>
            </svg>
          </a>

          <a
            href='https://www.youtube.com/@PIAC.A.C'
            target='_blank'
            rel='noopener noreferrer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              width='50'
              height='50'
              viewBox='0 0 48 48'
            >
              <path
                fill='#FF3D00'
                d='M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z'
              ></path>
              <path fill='#FFF' d='M20 31L20 17 32 24z'></path>
            </svg>
          </a>
        </div>
        {message.text && (
          <p
            className={`mt-5 font-bold text-center transition-opacity duration-1000 ease-in-out ${
              message.type === 'error' ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
      <div className='lg:flex-5/8 md:flex-1/2 w-full items-center justify-center'>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <div className='space-y-12'>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6'>
              <div className='sm:col-span-full'>
                <label
                  htmlFor='name'
                  className='block text-sm/6 font-medium text-gray-900'
                >
                  {translates.name}
                </label>
                <div className='mt-2'>
                  <input
                    id='name'
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    type='text'
                    required
                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  />
                </div>
              </div>
              <div className='sm:col-span-full'>
                <label
                  htmlFor='email'
                  className='block text-sm/6 font-medium text-gray-900'
                >
                  {translates.email}
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    value={form.email}
                    onChange={handleChange}
                    autoComplete='email'
                    required
                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  />
                </div>
              </div>
              <div className='sm:col-span-full'>
                <label
                  htmlFor='topic'
                  className='block text-sm/6 font-medium text-gray-900'
                >
                  {translates.topic}
                </label>
                <div className='mt-2'>
                  <input
                    id='topic'
                    name='topic'
                    type='text'
                    value={form.topic}
                    onChange={handleChange}
                    required
                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  />
                </div>
              </div>
              <div className='col-span-full'>
                <label
                  htmlFor='about'
                  className='block text-sm/6 font-medium text-gray-900'
                >
                  {translates.about}
                </label>
                <div className='mt-2'>
                  <textarea
                    name='about'
                    id='about'
                    value={form.about}
                    onChange={handleChange}
                    rows='3'
                    required
                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <div className='flex flex-row gap-3 rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
                />
              </svg>
              <button type='submit'>{translates.send}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
