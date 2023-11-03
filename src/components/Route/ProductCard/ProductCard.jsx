import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styles from '../../../styles/styles';
import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard"
import { useDispatch, useSelector } from 'react-redux';
import {
    addToWishlist,
    removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { toast } from 'react-toastify';
import { addTocart } from '../../../redux/actions/cart';
import Ratings from '../../Products/Ratings';
import { BsFillStarFill } from 'react-icons/bs';



const ProductCard = ({ data, isEvent }) => {
    const [click, setClick] = useState(false)
    const [open, setOpen] = useState(false)
    const { wishlist } = useSelector(state => state?.wishlist)
    const { cart } = useSelector(state => state?.cart)
    const [count, setCount] = useState(1);

    // console.log(isEvent)

    const dispatch = useDispatch()

    useEffect(() => {
        if (wishlist && wishlist.find((i) => i?._id === data?._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishlist]);

    const removeFromWishlistHandler = (data) => {
        setClick(!click);
        dispatch(removeFromWishlist(data));
    };

    const addToWishlistHandler = (data) => {
        setClick(!click);
        dispatch(addToWishlist(data));
    };

    const addToCartHandler = (id) => {
        const isItemExists = cart && cart?.find((i) => i?._id === id);
        if (isItemExists) {
            toast.error("Item already in cart!");
        } else {
            if (data.stock < count) {
                toast.error("Product stock limited!");
            } else {
                const cartData = { ...data, qty: count };
                dispatch(addTocart(cartData));
                toast.success("Item added to cart successfully!");
            }
        }
    };



    const discountPercentage = Math.ceil(((data?.originalPrice - data?.discountPrice) / data?.originalPrice) * 100)



    return (
        <div className='w-full h-[300px] bg-white rounded-lg shadow-sm relative cursor-pointer '>
            <div className='p-1'>
                <Link to={`${isEvent === true ? `/product/${data?._id}?isEvent=true` : `/product/${data?._id}`}`}>
                    <img src={`${data?.images && data?.images[0]}`} alt='' className='w-full h-[160px]  object-cover rounded-md' />
                </Link>
            </div>

            <div className='p-1'>
                <Link to={`/shop/preview/${data.shop._id}`}>
                    <p className={`${styles.shop_name} sm:text-base `}>{data?.shop?.name}</p>
                </Link>
                <Link to={`/product/${data?._id}`}>
                    <p className={`text-[12px] font-[500] sm:text-base`}>
                        {data?.name?.length > 20 ? data?.name?.slice(0, 20) + "..." : data.name}
                    </p>

                    <div className='py-1 flex items-center justify-between'>
                        <div className='flex'>
                            <p className={`${styles.productDiscountPrice} !text-[14px]`}>
                                ₹{data.originalPrice === 0 ? data?.originalPrice : data?.discountPrice}
                            </p>
                            <p className={`${styles.price} !text-[12px]`}>
                                ₹{data.originalPrice ? data.originalPrice : null}
                            </p>
                        </div>
                        <span className='font-[600] text-[12px] text-[#267c3d]'>
                            {data.sold_out} sold
                        </span>

                    </div>
                    <div className=' text-green-700 flex justify-between !text-[14px]'>
                        <div>
                            <p> {discountPercentage}% off</p>
                        </div>
                        <div className='flex bg-green-600 rounded-sm'>
                            {/* <Ratings rating={data?.ratings} /> */}
                            <span className="ml-1 text-white text-xs font-semibold rounded mr-1 mt-[2px] ">{data?.ratings ? data?.ratings : 3} </span>
                            <span><BsFillStarFill color='white' className='mt-[2px]'/></span>
                        </div>
                    </div>
                </Link>

                {/* Side option */}
                <div className='text-white'>
                    {
                        click ? (
                            <AiFillHeart size={22} className='cursor-pointer absolute right-2 top-5 pr-1' color={click ? "red" : "white"} onClick={() => removeFromWishlistHandler(data)} title='Remove from wishlist' />
                        ) : (
                            <AiOutlineHeart size={22} className='cursor-pointer absolute right-2 top-5 pr-1' color={click ? "red" : "white"} onClick={() => addToWishlistHandler(data)} title='Add to wishlist' />
                        )
                    }

                    <AiOutlineEye size={22} className='cursor-pointer absolute right-2 top-14 pr-1' color="white" onClick={() => setOpen(!open)} title='Quick View' />
                    <AiOutlineShoppingCart size={25} className='cursor-pointer absolute right-2 top-24 pr-1' color="white" onClick={() => addToCartHandler(data?._id)} title='Add to cart' />

                    {
                        open ? (
                            <ProductDetailsCard open={open} setOpen={setOpen} data={data} />
                        ) : ""
                    }
                </div>
            </div>




        </div>
    )
}

export default ProductCard
