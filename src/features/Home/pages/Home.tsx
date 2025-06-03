import { Link } from 'react-router-dom';

import ProductCard from '../components/ProductCard';

function Home() {
  return (
    <div className='flex flex-col gap-10'>
      <div className='grid grid-cols-autofill-250 p-10 gap-10'>
        <Link to={'/'}>
          <ProductCard
            title='ROG Strix G16 (2024), 16 "(40.64cm) QHD+ 240Hz, Intel Core i9 14900HX, Gaming Laptop'
            description='Processor: Intel Core i9 Processor 14900HX 2.2 GHz (36MB Cache, up to 5.8 GHz, 24 cores, 32 Threads) Multitasking Power, Exceptional Gaming Experience.

Memory: 16GB DDR5 SO-DIMM with | Storage: 1TB PCIe 4.0 NVMe M.2 SSD
Graphics: NVIDIA Dedicated GeForce RTX 4070 Laptop GPU2.5 8GB GDD VRAM

Display: 16-inch QHD+ 16:10 (2560 x 1600, WQXGA), 3ms, 240Hz, IPS-level, 500nits, Anti-glare display, Pantone Validated

Keyboard: Backlit Chiclet Keyboard Per-Key RGB'
            image='https://res.cloudinary.com/dvaxcfbor/image/upload/v1748941379/product1_d329def61c.jpg'
            price={199990}
            rating={3.6}
          />
        </Link>
      </div>
    </div>
  );
}

export default Home;
