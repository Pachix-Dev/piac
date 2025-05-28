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
export function Gallery() {
    const onBeforeSlide = (detail) => {
        const { index, prevIndex } = detail;
        console.log(index, prevIndex);
    };

    const items = recuerdos.map((item) => {
        return {
            id: item.id,
            src: item.img,
            thumb: item.img,
            subHtml: `<div class="lightGallery-captions">
                <h3>${item.title}</h3>
                <p>${item.subtitle}</p>
            </div>`,
        };
    });
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
                src={item.thumb}
              />
            </a>
          );
        });
      }, [items]);


    return (
        <div className="App">
            
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
