import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader' 

import DashboardSideBar from '../../components/Shop/Layout/DashboardSidebar';
import AllCupons from '../../components/Shop/AllCupons';


const ShopAllCupoun = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <AllCupons/>
        </div>
      </div>
    </div>
  )
}

export default ShopAllCupoun