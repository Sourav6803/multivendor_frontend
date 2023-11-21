import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx"
import Loader from "../../../pages/Loader";
import Countdown from 'react-countdown';


const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state?.products)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData && sortedData?.slice(0, 4);
    setData(firstFive);
    setLoading(false)
  }, [allProducts]);

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <div>
        <span className='text-[white] text-[12px] mx-auto w-[11/12]'>{hours} : {minutes} : {seconds} Left</span>
      </div>
    )
  }



  return (

    <div className={`mt-3 pb-2`} style={{ backgroundImage: "url('https://i.pinimg.com/1200x/3b/73/3d/3b733d7ff58aa5478e8b53accc9511ee.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
      {
        loading ? <div className="flex  justify-center "> <Loader /></div> :
          <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
              <h1>Best Deals</h1>
              <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
            </div>
            <div className="grid grid-cols-2 gap-[10px] md:grid-cols-2 md:gap-[15px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[25px] mb-6 border-0">
              {
                data && data.length !== 0 && (
                  <>
                    {data && data?.map((i, index) => <ProductCard data={i} key={index} />)}
                  </>
                )
              }
            </div>
            {
              isLoading && <div className="flex justify-center"><Loader /></div>
            }
          </div>
      }
    </div>

  );
};

export default BestDeals;