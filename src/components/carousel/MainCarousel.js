import React, {useState, useEffect} from 'react'
import { Carousel } from 'react-responsive-carousel';
import {getCrousel} from '../../functions/crousel'

const MainCarousel = () => {

  const [carousel, setCarousel] = useState([]);

  useEffect(() => {
    loadCarousel();
  }, [])

  const loadCarousel = () => getCrousel().then((res) => {
    // console.log(JSON.stringify(res.data[0].images));
    if (res.data.length === 0) return;
    setCarousel(res.data[0].images);
  })

  return (
    <div className='main-carousel my-2 relative shadow-sm'>
        <Carousel showThumbs={false} showStatus={false} showIndicators={false} autoPlay infiniteLoop >
          {carousel && carousel.map((item) => (
            <div key={item.public_id} className=''>
              <div className='flex space-x-2'>
                <img className='max-h-96' src={item.url} alt='img' />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
  )
}

export default MainCarousel