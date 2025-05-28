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
                <h4>${item.title}</h4>
                <p>${item.subtitle}</p>
            </div>`,
        };
    });
    const getItems = useCallback(() => {
        return items.map((item) => {
          return (
            <a
              key={item.id}
              className="gallery-item"
              data-src={item.src}
            >
              <img
                style={{ maxWidth: '280px' }}
                className="img-responsive"
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
                speed={500}
                elementClassNames="custom-wrapper-class"
                onBeforeSlide={onBeforeSlide}
            >
                {getItems()}
            </LightGallery>
        </div>
    );
}
