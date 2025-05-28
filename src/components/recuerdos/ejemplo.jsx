import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { recuerdos } from "../../data/data_recuerdos";

const photos = recuerdos.map((item) => {
  return {
    src: item.img,
    width: 1000,
    height: 1000,
  };
});

export default function Gallery2() {
    return (
        <RowsPhotoAlbum photos={photos} />
    );
  }