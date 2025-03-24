import slide1 from '/images/slider/slide1.jpg'
import slide2 from '/images/slider/slide2.jpg'
import slide3 from '/images/slider/slide3.jpg'
import product1 from '/images/products/tshirt.jpg'
import product2 from '/images/products/jeans.jpg'

console.log('Slider images:', { slide1, slide2, slide3 }); // Debug line

export const images = {
  slides: {
    slide1,
    slide2,
    slide3
  },
  products: {
    product1,
    product2
  },
  slider: {
    slide1: "/src/assets/images/slider/slide1.jpg",
    slide2: "/src/assets/images/slider/slide2.jpg",
    slide3: "/src/assets/images/slider/slide3.jpg"
  }
}
