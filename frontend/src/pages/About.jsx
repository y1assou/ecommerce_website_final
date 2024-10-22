import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            AFOS made was born out of a passion for preserving tradition and celebrating cultural heritage. Our journey began with a simple idea: to create a platform where customers can easily discover and purchase beautifully crafted traditional clothing from the comfort of their homes.
          </p>
          <p>
            Since our inception, we’ve been committed to curating a unique collection of high-quality garments that honor timeless craftsmanship. From elegant kaftans and djellabas to finely embroidered abayas, our products reflect the richness of tradition while catering to modern tastes.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            At Afos made, our mission is to empower customers with choice, convenience, and cultural connection. We're dedicated to providing a seamless shopping experience, from exploring our collection to receiving timeless pieces delivered to your door.
          </p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>With our user-friendly interface and hassle- free ordering process, shopping has never been easier.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>

      <NewsLetterBox />

    </div>
  )
}

export default About
