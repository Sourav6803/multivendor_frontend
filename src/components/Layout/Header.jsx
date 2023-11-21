import React, { useState } from 'react';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import { categoriesData } from "../../static/data"
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from 'react-icons/bi';
import { CgProfile } from "react-icons/cg"
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx"
import { useSelector } from 'react-redux';
import { backend_url } from '../../server';
import Cart from '../Cart/Cart';
import Wishlist from '../Wishlist/Wishlist';
import { RxCross1 } from 'react-icons/rx';
import mainLogo from "../main_logo3.jpg"
import Logo from "./Jamalpur BAZAR-logos__white.png"



const Header = ({ activeHeading }) => {

    const { isAuthenticated, user } = useSelector(state => state?.user)
    const { wishlist } = useSelector(state => state.wishlist)
    const { isSeller } = useSelector(state => state.seller)
    const [searchTearm, setSearchTearm] = useState("")
    const [searchData, setSearchData] = useState(null)
    const [active, setActive] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    const { allProducts } = useSelector((state) => state.products)
    const [openCart, setOpenCart] = useState(false)
    const [openWishlist, setOpenWishlist] = useState(false)
    const [open, setOpen] = useState(false)
    const { cart } = useSelector(state => state?.cart)


    const handleSearchChange = (e) => {
        const term = e.target.value
        setSearchTearm(term)
        const filterProducts = allProducts && allProducts?.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
        )
        setSearchData(filterProducts)
    }

    window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
            setActive(true)
        } else {
            setActive(false)
        }
    })
    return (
        <>
            <div className={`${styles.section} `}>
                <div className='hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between'>
                    <div>
                        <Link to="/">
                            <img src={mainLogo} alt='dd' />
                        </Link>
                    </div>

                    {/* search box */}
                    <div className='w-[50%] relative'>
                        <input className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md' type='text' placeholder='Search product..' value={searchTearm} onChange={handleSearchChange} />
                        <AiOutlineSearch size={30} className='absolute right-2 top-1.5 cursor-pointer' />

                        {
                            searchData && searchData.length !== 0 ? (
                                <div className='absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4'>
                                    {searchData && searchData.map((i, index) => {

                                        return (
                                            <Link to={`/product/${i?._id}`} key={index} >
                                                <div key={index} className='w-full flex items-start py-3' >
                                                    <img src={`${i.images[0]}`} alt='img' className='w-[40px] h-[40px] mr-[10px]' />
                                                    <h1>{i?.name}</h1>
                                                </div>

                                            </Link>
                                        )
                                    })}
                                </div>
                            ) : null
                        }
                    </div>

                    <div className={`${styles.button}`}>
                        <Link to={`${isSeller ? "/dashboard" : '/shop-login'}`}>
                            <h1 className='text-[#fff] flex items-center'>
                                {isSeller ? "Dashboard" : "Become Seller"}  <IoIosArrowForward className='ml-1' />
                            </h1>
                        </Link>
                    </div>
                </div>

            </div>

            <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden 800px:flex items-center justify-between w-full  h-[70px]`} style={{ background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)" }}>
                <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`} >
                    {/* Categories */}
                    <div onClick={() => setDropDown(!dropDown)}>
                        <div className='relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block'>
                            <BiMenuAltLeft size={30} className='absolute top-3 left-2' />
                            <button className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}>All Categories</button>
                            <IoIosArrowDown size={20} className='absolute right-2 top-4 cursor-pointer' onClick={() => setDropDown(!dropDown)} />
                            {
                                dropDown ? (
                                    <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />
                                ) : null
                            }
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className={`${styles.noramlFlex}`}>
                        <Navbar active={activeHeading} />
                    </div>

                    <div className='flex'>
                        <div className={`${styles.noramlFlex}`}>
                            <div className='relative cursor-pointer mr-[15px]' onClick={() => setOpenWishlist(true)}>
                                <AiOutlineHeart size={30} color='rgb(255 255 255 / 83%' />
                                <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>{wishlist && wishlist?.length}</span>
                            </div>
                        </div>

                        <div className={`${styles.noramlFlex}`}>
                            <div className='relative cursor-pointer mr-[15px]' onClick={() => setOpenCart(true)}>
                                <AiOutlineShoppingCart size={30} color='rgb(255 255 255 / 83%' />
                                <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>{cart && isAuthenticated && cart?.length}</span>
                            </div>
                        </div>

                        <div className={`${styles.noramlFlex}`}>
                            <div className='relative cursor-pointer mr-[15px]' >
                                {
                                    isAuthenticated ? (
                                        <Link to="/profile">
                                            <img src={`${user?.avatar}`} alt='' className='w-[35px] h-[35px] rounded-full' />

                                        </Link>
                                    ) : (
                                        <Link to="/login">
                                            <CgProfile size={30} color='rgb(255 255 255 / 83%' />
                                        </Link>
                                    )
                                }
                            </div>
                        </div>

                        {/* cart popup */}
                        {
                            openCart ? (
                                <Cart setOpenCart={setOpenCart} />
                            ) : null
                        }

                        {/* wishlist popup */}
                        {
                            openWishlist ? (
                                <Wishlist setOpenWishlist={setOpenWishlist} />
                            ) : null
                        }
                    </div>
                </div>
            </div>

            {/* Mobile header */}

            <div className={` ${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`} style={{ background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)" }} >
                <div className='w-full flex items-center justify-between ' >
                    <div className="">
                        <BiMenuAltLeft size={40} className="ml-4" onClick={() => setOpen(true)} />
                    </div>
                    <div className='ml-[-200px]'>
                        <Link to="/">
                            <img
                                src={Logo}
                                alt=""
                                className=" items-start cursor-pointer "
                                height={40}
                                width={50}
                            />
                            {/* <p>Jamalpur BAZAAR</p> */}
                        </Link>
                    </div>
                    <div >
                        <div className="relative mr-[20px]" onClick={() => setOpenCart(true)}>
                            <AiOutlineShoppingCart size={30} />
                            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                                {cart && cart?.length}
                            </span>
                        </div>
                    </div>
                    {/* cart popup */}
                    {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

                    {/* wishlist popup */}
                    
                    {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
                    
                </div>

                {/* header sidebar */}
                {
                    open && (
                        <div className={` fixed w-full bg-[#0000005f] z-20 h-full top-0 `}>
                            <div className='fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll'>
                                <div className='w-full justify-between flex pr-3 '>
                                    <div>
                                        <div className='relative mr-[15px] ' onClick={()=>setOpenWishlist(true)}>
                                            <AiOutlineHeart size={30} className='mt-5 ml-3' />
                                            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                                                {cart && cart?.length}
                                            </span>
                                        </div>
                                    </div>
                                    <RxCross1 size={30} className='mt-5 ml-4' onClick={() => setOpen(false)} />
                                </div>

                                <div className='my-8 w-[92%] m-auto h-[40px] relative' >
                                    <input placeholder='Search Product'
                                        className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md '
                                        value={searchTearm}
                                        onChange={handleSearchChange}
                                    />

                                    {
                                        searchData && searchData?.length !== 0 ? (
                                            <div className='absolute  bg-slate-50 shadow w-full z-10 left-0 p-3'>
                                                {searchData && searchData?.map((i, index) => {

                                                    const d = i?.name
                                                    
                                                    const Product_Name = d.replace(/\s+/g, "-")
                                                    return (
                                                        <Link to={`/product/${i?._id}`} >
                                                            <div key={index} className='w-full flex items-start py-3'>
                                                                <img src={i?.images[0]} alt='img' className='w-[50px]  mr-2' />
                                                                <h5>{i?.name}</h5>
                                                            </div>

                                                        </Link>
                                                    )
                                                })}
                                            </div>
                                        ) : null
                                    }
                                </div>
                                <Navbar active={activeHeading} />

                                <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                                    <Link to={`${isSeller ? "/dashboard" : '/shop-login'}`}>
                                        <h1 className='text-[#fff] flex items-center'>
                                            {isSeller ? "Dashboard" : "Become Seller"}  <IoIosArrowForward className='ml-1' />
                                        </h1>
                                    </Link>
                                </div>
                                <br />
                                <br />


                                <div className='flex w-full justify-center'>
                                    {
                                        isAuthenticated ? (
                                            <div>
                                                <Link to="/profile">
                                                    <img src={`${user?.avatar}`} alt='' className='w-[110px] h-[110px] rounded-full border-[3px] border-[#33a466] ' />
                                                </Link>
                                            </div>
                                        ) : (
                                            <>
                                                <Link to="/login" className='text-[18px] pr-[10px] text-[#000000b7] '>Login /</Link>
                                                <Link to="/sign-up" className='text-[18px]  text-[#000000b7] '>Sign Up</Link>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>


        </>
    )
}

export default Header