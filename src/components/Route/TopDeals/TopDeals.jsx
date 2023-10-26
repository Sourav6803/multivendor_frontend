import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx"


const TopDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state?.products)


  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    // let discountPercentage = allProducts?.map(item=>((item.originalPrice - item.discountPrice) / item.originalPrice)*100)
    // console.log(discountPercentage)
    // let topDiscountProducts = 
    const sortedData = allProductsData?.sort((a, b) => {
        let percentageA = ((a.originalPrice - a.discountPrice) / a.originalPrice)*100
        let percentageB = ((b.originalPrice - b.discountPrice) / b.originalPrice)*100
        return percentageA - percentageB
    });
    
    const firstFive = sortedData && sortedData?.slice(0, 4);
    setData(firstFive);
  }, [allProducts]);



  return (
    <div>
      <div className={`${styles.section} border-red-800`} >
        <div className={`${styles.heading}`}>
          <h1>Top Deals</h1>
        </div>
        <div className="border-gray-800 grid grid-cols-2 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0"  >
          {
            data && data.length !== 0 && (
              <>
                {data && data?.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default TopDeals;