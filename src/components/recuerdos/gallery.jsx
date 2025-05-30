import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// If you want you can use SCSS instead of css
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { recuerdos } from "../../data/data_recuerdos";
import './gallery.css'

export function Gallery({currentLanguage}) {
  
    const onBeforeSlide = (detail) => {
        const { index, prevIndex } = detail;
        console.log(index, prevIndex);
    };
    console.log(currentLanguage);
   
    const [filter, setFilter] = useState('all');

    //Filtramos por año
    const filteredRecuerdos = recuerdos.filter((item) => {
      return filter === 'all' || item.year === filter;
    });

    //ya filtrado agarramos los datos
    const items = filteredRecuerdos.map((item) => {  
      return {
            id: item.id,
            src: item.img,
            thumb: item.img,
            year: item.year,
            subHtml: `<div class="lightGallery-captions">
                <h3>${currentLanguage === 'es' ? item.title : item.title_en}</h3>
                <p>${currentLanguage === 'es' ? item.subtitle : item.subtitle_en}</p>
            </div>`,
        };
    });

    //Utiliza la funcion de LightGallery para renderizar las imgs
    const getItems = useCallback(() => {
        return items.map((item) => {
          return (
            <a
              key={item.id}
              className="item"
              data-src={item.src}
              data-sub-html={item.subHtml}
            >
              <img
                className="h-full w-full object-cover rounded-lg"
                data-year={item.year}
                src={item.thumb}
              />
            </a>
          );
        });
      }, [items]);


    return (
      <div className="App">
        <div className="flex flex-wrap justify-center gap-10 my-7 years">
          {/* Los estilos de los años están en el archivo gallery.css */}
          <a data-year="2013" onClick={(e) => { e.preventDefault(); setFilter('all'); }}>Todos</a>
          <a data-year="2013" onClick={(e) => { e.preventDefault(); setFilter('2013'); }}>2013</a>
          <a data-year="2014" onClick={(e) => { e.preventDefault(); setFilter('2014'); }}>2014</a>
          <a data-year="2015" onClick={(e) => { e.preventDefault(); setFilter('2015'); }}>2015</a>
          <a data-year="2016" onClick={(e) => { e.preventDefault(); setFilter('2016'); }}>2016</a>
          <a data-year="2017" onClick={(e) => { e.preventDefault(); setFilter('2017'); }}>2017</a>
          <a data-year="2018" onClick={(e) => { e.preventDefault(); setFilter('2018'); }}>2018</a>
          <a data-year="2019" onClick={(e) => { e.preventDefault(); setFilter('2019'); }}>2019</a>
          <a data-year="2020" onClick={(e) => { e.preventDefault(); setFilter('2020'); }}>2020</a>
          <a data-year="2021" onClick={(e) => { e.preventDefault(); setFilter('2021'); }}>2021</a>
          <a data-year="2022" onClick={(e) => { e.preventDefault(); setFilter('2022'); }}>2022</a>
          <a data-year="2023" onClick={(e) => { e.preventDefault(); setFilter('2023'); }}>2023</a>
          <a data-year="2024" onClick={(e) => { e.preventDefault(); setFilter('2024'); }}>2024</a>
        </div>
          
        <LightGallery
          plugins={[lgThumbnail, lgZoom]}
          speed={50}
          elementClassNames="pinterest-wrapper"
          onBeforeSlide={onBeforeSlide}
        >
            
          {getItems()}
        </LightGallery>
      </div>
    );
}
