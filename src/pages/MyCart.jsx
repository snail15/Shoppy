import React from 'react';
import CartItem from '../components/CartItem';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import PriceCard from '../components/PriceCard';
import Button from '../components/UI/Button';
import useCart from '../hooks/useCart';

export default function MyCart() {
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();
  const SHIPPING = 100;
  if (isLoading) return <p>Loading..</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );

  return (
    <section className='p-8 flex flex-col'>
      <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>
        My Cart
      </p>
      {!hasProducts && <p>Cart is empty</p>}
      {hasProducts && (
        <>
          <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div className='flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16'>
            <PriceCard text='Item Amount' price={totalPrice} />
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard text='Shipping' price={SHIPPING} />
            <FaEquals className='shrink-0' />
            <PriceCard text='Total Amount' price={totalPrice + SHIPPING} />
          </div>
          <Button text='Place Order' />
        </>
      )}
    </section>
  );
}
