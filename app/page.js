import Deals from './_components/main/Deals/Deals';
import ProductList from './_components/main/product/Product';
import { Header, Carousel } from './index'
import React from 'react';

export default function Home() {

  return (
    <>
      <Header />
      <div className='px-2 space-y-5'>
        <Carousel />
        <ProductList />
        {/* <Deals /> */}
      </div>
    </>
  );
}
