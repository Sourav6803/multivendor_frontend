
import React from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../../../styles/styles';


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};


const Slider = () => {
    const { allProducts } = useSelector(state => state.products)
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';

    const renderer = ({ hours, minutes, seconds }) => {
        return (
        <div>
            <span className='text-[#7f7f7f] text-[12px] mx-auto w-[11/12]'>{hours} : {minutes} : {seconds} Left</span>
           </div>
        )
    }

    return (
        <div className={`${styles.section} `}>
            <div className='mt-5 bg-white flex'>
                <p className='text-[12px] font-semibold ' style={{ padding: "15px 10px" }}>Deals Of the Day</p>
                <div className='flex ml-1 items-center'>
                    <img src={timerURL} alt='' width={24} />
                    <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                </div>
                <button className={` ml-auto text-white !bg-blue-700 !w-[100px] !h-[30px] rounded-md mt-2`}>View All</button>
            </div>
            <hr />
            {
                allProducts && <Carousel responsive={responsive}
                    swipeable={false}
                    draggable={false}
                    centerMode={true}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={10000}
                    keyBoardControl={true}
                    showDots={false}
                    containerClass="carousel-container"
                    // removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px" >
                    {
                        allProducts && allProducts?.map((product, key) => (
                            <div className='text-center ' style={{ textAlign: "center", padding: "25px 15px" }} key={key}>

                                <Link to={`/product/${product?._id}`}><img key={key} src={product?.images[0]} alt='' style={{ width: "auto", height: "150px" }} /></Link>
                                <p className='font-semibold'>{product?.name.slice(0, 17)}...</p>
                                <p className='text-green-800'>You will get {product.discountPercentage}% Off</p>
                                <p className='text-slate-600'>{product?.tags}</p>

                            </div>
                        ))
                    }
                </Carousel>
            }
        </div>
    )
    
}

export default Slider

