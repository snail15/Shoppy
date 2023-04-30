import React, { useState } from 'react';
import Button from '../components/UI/Button';
import { uploadImage } from '../api/uploader';
import { Toaster, toast } from 'react-hot-toast';
import useProducts from '../hooks/useProducts';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const { addProduct } = useProducts();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    toast.loading(`${product.title} uploading..`);
    uploadImage(file)
      .then((url) => {
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess(true);
              toast.success(`${product.title} uploaded!!`);
            },
          }
        );

        console.log(url);
        // addNewProduct(product, url).then(() => {
        //   setSuccess(true);
        //   toast.success(`${product.title} uploaded!!`);
        // });
      })
      .catch((error) => {
        setSuccess(false);
        toast.error(`Something went wrong..`);
      })
      .finally(() => setIsUploading(false));
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target; //This is from the input tag - name = 'file'
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  return (
    <>
      <section className='w-full text-center'>
        <h2 className='text-2xl font-bold my-4'>Add New Product</h2>
        {file && (
          <img
            className='w-96 mx-auto mb-2'
            src={URL.createObjectURL(file)}
            alt='local file'
          />
        )}
        <form className='flex flex-col px-12' onSubmit={handleSubmit}>
          <input
            type='file'
            accept='image/*'
            name='file'
            required
            onChange={handleChange}
          />
          <input
            type='text'
            name='title'
            value={product.title ?? ''}
            placeholder='Product Name'
            required
            onChange={handleChange}
          />
          <input
            type='number'
            name='price'
            value={product.price ?? ''}
            placeholder='Price'
            required
            onChange={handleChange}
          />
          <input
            type='text'
            name='category'
            value={product.category ?? ''}
            placeholder='Product Category'
            required
            onChange={handleChange}
          />
          <input
            type='text'
            name='description'
            value={product.description ?? ''}
            placeholder='Product Description'
            required
            onChange={handleChange}
          />
          <input
            type='text'
            name='options'
            value={product.options ?? ''}
            placeholder='Product Options'
            required
            onChange={handleChange}
          />
          <Button
            text={isUploading ? 'Uploading..' : 'Add Product'}
            disabled={isUploading}
          />
        </form>
      </section>
      <Toaster
        position='top-center'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            icon: '👏',
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
          loading: {
            duration: 2000,
            icon: '🔥',
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </>
  );
}
