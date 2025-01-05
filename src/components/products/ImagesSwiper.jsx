import React,{useState} from "react";
import Swiper from "react-id-swiper"
import NoImage from "../../assets/img/src/no_image.png"
import 'swiper/css/swiper.css'

// 

// スワイパー
const ImageSwiper = (props) => {
    const [params] = useState({
        pagination: { 
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            dynamicBullets: true
        },
        navegation:{
            nextEl: '.swiper-button-next',
            prevEl: 'swiper-button-prev'
        },
        loop: true
    })

    const images = props.images

    return (
        <Swiper {...params}>
            {images.lemgth === 0 ? ( //画像がないとき
                <div className="p-media__thumb">
                    <img src={NoImage} art="no image"/>
                </div>
            ) : ( // 画像があるとき
                images.map(images => (
                    <div className="p-media__thumb">
                        <img src={image.path} alt="商品画像" />
                    </div>
                ))
            )}
        </Swiper>
    )
};

export default ImageSwiper