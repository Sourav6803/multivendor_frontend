import React, { useEffect, useState } from 'react';
import styles from '../../../styles/styles';
import { Link } from 'react-router-dom';
import Carousel from '../../Carousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsShop } from '../../../redux/actions/product';


const Hero = () => {

    const [filteredProducts, setFilteredProducts] = useState([]);
    const { allProducts } = useSelector((state) => state.products);
    const { seller } = useSelector((state) => state.seller);

    const handleBannerClick = () => {
          let sellerId = "652df7bb4e3edccc4a614b6c"
        
        const filteredProducts = allProducts.filter(product => console.log(product));
        setFilteredProducts(filteredProducts);
    }

    //  console.log(filteredProducts)
        
       

        // const dispatch = useDispatch();

        // useEffect(() => {
        //     dispatch(getAllProductsShop(seller._id));
        // }, [dispatch]);

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000

        };

        // 652df7bb4e3edccc4a614b6c

        return (
            <>
                <Slider {...settings}>
                    <Link to={"/products"}>
                        <div>
                            <img style={{ width: '100%', height: '100%', backgroundRepeat: 'no-repeat' }} src='https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/05323192c0547d31.png?q=20' alt='' />
                        </div>
                    </Link>
                    <div>
                        <img style={{ width: '100%', height: '100%', backgroundRepeat: 'no-repeat' }} src='https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/a1d93b6bc446790d.jpg?q=20' alt='' />
                    </div>
                    <div>
                        <img style={{ width: '100%', height: '100%', backgroundRepeat: 'no-repeat' }} src='https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/2a92f06c76751f6a.jpg?q=20' alt='' />
                    </div>
                    <div>
                        <img style={{ width: '100%', height: '100%', backgroundRepeat: 'no-repeat' }} src='https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/7fd0e4ab26429926.jpg?q=20' alt='' />
                    </div>
                </Slider>

                <div className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`} style={{ backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)" }} >
                    <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
                        <h1 className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>Best collection for <br /> Home Decoration</h1>
                        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
                            assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
                            quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
                            <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
                        </p>
                        <Link to="/products" className="inline-block">
                            <div className={`${styles.button} mt-5`}>
                                <span className="text-[#fff] font-[Poppins] text-[18px]">
                                    Shop Now
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>

            </>
        )
    }

    export default Hero