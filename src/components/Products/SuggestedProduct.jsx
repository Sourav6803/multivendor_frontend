import React, { useEffect, useState } from 'react'
import { productData } from '../../static/data'
import styles from '../../styles/styles'
import ProductCard from "../Route/ProductCard/ProductCard"
import { useSelector } from 'react-redux'


const SuggestedProduct = ({data}) => {
    const { allProducts } = useSelector((state) => state?.products);
    const [productData,setProductData] = useState()

    useEffect(()=>{
        const d = allProducts && allProducts?.filter((i)=> i.category === data.category || i.name === data.name || i.tags === data.tags)
        setProductData(d)
    },[])
  return (
    <div>
        {
            data ? (
                <div className={`p-4 ${styles.section}`} style={{backgroundImage: "https://media.istockphoto.com/id/1180447175/vector/rangoli-dark-red-maroon-colored-grunge-background-diwali-greeting-with-one-small-diya-at-the.jpg?s=2048x2048&w=is&k=20&c=f7wcjVwr8LK45i26-wI7TuHTVeUEylfDN36IXhqq5fM=" , backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
                    <h2 className={`${styles.heading} text-[25px] font-[500] border-b mb-5 `}>
                        Related Product
                    </h2>
                    <div className='grid grid-cols-1  gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 '>
                        {
                            productData && productData.map((i,index)=>(
                                <ProductCard data={i} key={index} />
                            ))
                        }
                    </div>
                </div>
            ): null
        }
    </div>
  )
}

export default SuggestedProduct