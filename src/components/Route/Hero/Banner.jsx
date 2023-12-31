import { styled } from '@mui/material';
import banner1 from "./upto50ff.jpg"

import Carousel from 'react-multi-carousel';
import { useNavigate } from 'react-router-dom';



const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const Image = styled('img')(({ theme }) => ({
    width: '100%',
    height: 280,
    [theme.breakpoints.down('sm')]: {
        objectFit: 'cover',
        height: 180
    }
}));

const Banner = () => {

    const navigate = useNavigate()

     const bannerData = [
         { id: 1, url: "https://sourav-ekart.s3.ap-south-1.amazonaws.com/abc/up%20to%2050%25%20off.jpg", tags: "Birthday gift" },
         { id: 2, url: 'https://sourav-ekart.s3.ap-south-1.amazonaws.com/abc/img_2_1700580392749%5B1%5D.jpg',  },
         { id: 3, url: 'https://sourav-ekart.s3.ap-south-1.amazonaws.com/abc/Big%20Sale%20on%20image.png' , tags: "Potrait" },
         //{ id: 4, url: 'https://rukminim1.flixcart.com/flap/3376/560/image/f6202f13b6f89b03.jpg?q=50', shopId: "" }
    ]

    
    return (
        <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            keyBoardControl={true}
            showDots={true}
            slidesToSlide={1}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            {
                bannerData.map(image => (
                    <Image src={image.url} alt="banner" id={image?.shopId} key={image.id} onClick={e=>navigate(`/product/birthday-gift`)} />
                ))
            }
        </Carousel>
    )
}

export default Banner;