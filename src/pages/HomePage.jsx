import React from 'react';
import Header from "../components/Layout/Header"
import Hero from '../components/Route/Hero/Hero';
import Categories from '../components/Route/Categories/Categories';
import BestDeals from '../components/Route/BestDeals/BestDeals';
import FeaturedProduct from '../components/Route/FeaturedProduct/FeaturedProduct';
import Events from '../components/Events/Events';
import Sponsored from '../components/Route/Sponsored/Sponsored';
import Footer from '../components/Layout/Footer';
import NewArrival from '../components/Route/NewArrival/newArrival';
import TopDeals from '../components/Route/TopDeals/TopDeals';
import Slider from '../components/Route/Slider/Slider';
import MidSection from '../components/Route/MidSection/MidSection';
import SingleBanner from '../components/Route/Hero/SIngleBannner';
import Blog from '../components/Route/Blog/Blog';
import TopBanner from '../components/Route/Banner/TopBanner';
import CartProduct from '../components/Route/CartProduct/CartProduct';




const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1}/>
        <TopBanner />
        <Hero />
        <Categories />
        <SingleBanner />
        <BestDeals />
        <Slider />
        <Events />
        <FeaturedProduct />
        <MidSection />
        <TopDeals />
        <CartProduct />
        <NewArrival />
        <Sponsored />
        <Blog />
        <Footer />
    </div>
  )
}

export default HomePage