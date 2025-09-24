import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const EmblaCarousel = (props) => {
  const { slides, options, currentLanguage } = props
  const [emblaRef] = useEmblaCarousel(options, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ])
  return (
    <div className='flex mx-auto relative overflow-hidden'>
      <div className=' overflow-hidden' ref={emblaRef}>
        {/* Contenedor de los slides */}
        <div className='flex md:h-96 lg:flex -ml-4'>
          {slides.map((recuerdo, index) => (
            // Cada slide
            <div
              key={index}
              className='grid grid-cols-1 gap-4 sm:flex sm:gap-0 bg-white rounded-xl justify-center items-center  h-fit flex-none w-fit p-4 m-5 '
            >
              <div className='md:hidden flex justify-center'>
                <img
                  className='h-full rounded-lg sm:w-lg md:w-32 lg:w-24'
                  src={recuerdo.img}
                  alt={recuerdo.title}
                />
              </div>

              {/* Detalles del slide */}
              <div className='lg:w-lg md:w-sm  m-1 p-1'>
                <div className=' m-1 p-1 flex flex-col  justify-center   '>
                  <h3 className='font-bold text-3xl text-gray-800 mb-1'>
                    {currentLanguage === 'en'
                      ? recuerdo.title_en
                      : recuerdo.title}
                  </h3>
                </div>
                <div className='m-2 p-2 flex flex-col  justify-center '>
                  <span className='text-xs font-medium text-gray-500'>
                    2025
                  </span>
                </div>
                <div className=' m-2 p-1 flex flex-col justify-center bg-white rounded-lg shadow-md '>
                  <p
                    className='text-md text-gray-600 mb-2 text-justify line-clamp-6'
                    dangerouslySetInnerHTML={{
                      __html:
                        currentLanguage === 'en'
                          ? recuerdo.description_en
                          : recuerdo.description,
                    }}
                  />
                </div>
              </div>

              {/* Contenido de la imagen del slide */}
              <div className=' hidden md:block mt-4'>
                <img
                  className='w-full h-auto rounded-lg md:h-64 lg:h-72'
                  src={recuerdo.img}
                  alt={recuerdo.title}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
