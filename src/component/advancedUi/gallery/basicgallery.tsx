import { Fragment, useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import file01 from '../../../assets/img/gallery/1.jpg';
import file02 from '../../../assets/img/gallery/2.jpg';
import file03 from '../../../assets/img/gallery/3.jpg';
import file04 from '../../../assets/img/gallery/4.jpg';
import file05 from '../../../assets/img/gallery/5.jpg';
import file07 from '../../../assets/img/gallery/7.jpg';
import file08 from '../../../assets/img/gallery/8.jpg';

export const LightboxGallery1 = () => {

    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <div className="col-span-12 lg:col-span-3">
                <div className="inner">
                    <a href="#" className='gallery'>
                        <img src={file02} alt='media2' className=" w-full" onClick={() => setOpen(true)} />
                    </a>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-3">
                <div className="inner">
                    <a href="#" className='gallery'>
                        <img src={file04} alt='media3' className="" onClick={() => setOpen(true)} />
                    </a>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-3">

                <div className="inner">
                    <a href="#" className='gallery'>
                        <img src={file03} alt='media4' className=" w-full" onClick={() => setOpen(true)} />
                    </a>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-3">

                <div className="inner">
                    <a href="#" className='gallery'>
                        <img src={file01} alt='media5' className="" onClick={() => setOpen(true)} />
                    </a>
                </div>
            </div>

            <Lightbox open={open} close={() => setOpen(false)} plugins={[Captions]} zoom={{
                maxZoomPixelRatio: 10,
                scrollToZoom: true

            }}
                slides={[{
                    src: file01, title: `Image-1`,
                }, {
                    src: file04, title: "Image-2",
                }, {
                    src: file03, title: "Image-3",
                }, {
                    src: file05, title: "Image-4",
                },]}

            />

        </Fragment>
    );
};


export const LightboxGalleryDescription = () => {

    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <div className="col-span-12 lg:col-span-3">
                <div className="inner">
                    <a href="#" data-glightbox='title:Description Bottom' className="gallery2" >
                        <img src={file02} alt='media2' className='w-full' onClick={() => setOpen(true)} />
                    </a>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-3 ">
                <div className="inner">
                    <a href="#" className="gallery2" >
                        <img src={file04} alt='media3' onClick={() => setOpen(true)} />
                    </a>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-3">

                <div className="inner">
                    <a href="#" className="gallery2" >
                        <img src={file08} alt='media4' className="gallery2" onClick={() => setOpen(true)} />
                    </a>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-3">

                <div className="inner">
                    <a href="#" className="gallery2" >
                        <img src={file07} alt='media5' className="gallery2" onClick={() => setOpen(true)} />
                    </a>
                </div>
            </div>

            <Lightbox open={open} close={() => setOpen(false)} plugins={[Captions]} zoom={{
                scrollToZoom: true


            }}
                slides={[{

                    src: file01, title: `Image-1`,
                    description: "Veliki zali, Dubravica, Croatia",
                }, {

                    src: file08, title: "Image-2",
                    description: "Veliki zali, Dubravica, Croatia",
                }, {
                    src: file03, title: "Image-3",
                    description: "Veliki zali, Dubravica, Croatia",
                }, {
                    src: file07, title: "Image-4",
                    description: "Veliki zali, Dubravica, Croatia",
                },]}


            />

        </Fragment>
    );
};









