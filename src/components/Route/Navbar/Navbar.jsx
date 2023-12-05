// import React from 'react'
// import {  categoriesData } from '../../../static/data'

import { Typography, Box, styled } from '@mui/material'; 
import { categoriesData } from '../../../static/data';
import { useNavigate } from 'react-router-dom';
 
 const navData = [
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100', text: 'Top Offers' },
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100', text: 'Grocery' },
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100', text: 'Mobile' },
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100', text: 'Fashion' },
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100', text: 'Electronics' },
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/ee162bad964c46ae.png?q=100', text: 'Home' },
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100', text: 'Appliances' },
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100', text: 'Travel' },
    { url: 'https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100', text: 'Beauty, Toys & More' }
];

// const Navbar = () => {
//   return (
//     <div className='flex justify-between grid grid-cols-2 gap-[20px] md:grid-cols-4 md:gap-[25px] lg:grid-cols-6 lg:gap-[25px] xl:grid-cols-8 xl:gap-[30px]  ' style={{margin: "55px 130px 0 130px" , }}>
//         {
//             navData && navData.map((item,index)=>(
//                 <div className='text-center ' style={{padding: "12px 8px" }} key={index} >
//                     <img  src={item.url} alt='' width={64}/>
//                     <p className='text-sm font-semibold'>{item.text}</p>
//                 </div>
//             ))
//         }
//     </div>
//   )
// }

// export default Navbar









const Component = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    //margin: '55px 130px 0 130px !important',
    overflowX: 'overlay',
    
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'full',
    [theme.breakpoints.down('lg')]: {
        marginTop: ' !important',
        marginLeft: '0 !important'
    }
}))

const Container = styled(Box)`
    padding: 12px 8px;
    text-align: center
`

const Text = styled(Typography)`
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
`;

const Image = styled('img')(({ theme }) => ({
    
    justifyContent: 'space-between',
    
    overflowX: 'overlay',
    [theme.breakpoints.down('lg')]: {
        width: '90px',
        height: '50px'
    }
}))



const Navbar = () => {
    const navigate = useNavigate()

    const handleSubmit = (i) => {
        navigate(`/products?category=${i.title}`)
    }
    return (
        <Component>
            {
                categoriesData.map((temp, index )=> (
                    
                    <Container key={index}>
                        <Image src={temp.image_Url} style={{  width: 100 , height: 50 }}  alt=''  key={index}  onClick={() => handleSubmit(temp)}/>
                        <Text>{temp.title.length > 6 ? temp.title.slice(0,5) : temp.title}..</Text>
                    </Container>
                    
                ))
            }
        </Component>
    )
}

export default Navbar;