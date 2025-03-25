import "./styles.scss";
import {
  FileCode,
  FileSpreadsheet,
  Presentation,
  Image,
  FileText,
  FilePen,
  Search,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Navbar/Sidebar";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ShoppingCart, Star } from 'lucide-react';
import { images } from '../../constants/images';

const HomePage = () => {
  const features = [
    {
      title: "How To Edit PDF File?",
      description:
        "Our tools help you process PDF files more easily. Our website contains all the most useful tools for you to process PDF files.",
      image: "/src/assets/png/img1.png", // Thay bằng link ảnh
    },
    {
      title: "Work directly on your files",
      description:
        "Do more than just view PDFs. You can edit directly, add, edit, delete files, mark PDF files,...",
      image: "/src/assets/png/img2.png", // Thay bằng link ảnh
    },
    {
      title: "Convert PDF file to HTML file",
      description:
        "This makes programming easier and faster for developers, saving a lot of time.",
      image: "/src/assets/jpg/img2.jpg", // Thay bằng link ảnh
    },
  ];
  const tools = [
    { icon: FilePen, color: "#ff4d00", label: "Edit PDF" },
    { icon: FileText, color: "#0f1fff", label: "PDF to Word" },
    { icon: FileCode, color: "#ff824d", label: "PDF to HTML" },
    { icon: Presentation, color: "#ff824d", label: "PDF to PPT" },
    { icon: FileSpreadsheet, color: "#00c220", label: "PDF to Excel" },
    { icon: Image, color: "#0010f5", label: "PDF to JPG" },
  ];

  const slides = [
    {
      image: images.slider.slide1 || "/src/assets/images/slider/slide1.jpg",
      title: "New Collection 2024",
      description: "Discover our latest arrivals"
    },
    {
      image: images.slider.slide2 || "/src/assets/images/slider/slide2.jpg",
      title: "Summer Sale",
      description: "Up to 50% off"
    },
    {
      image: images.slider.slide3 || "/src/assets/images/slider/slide3.jpg",
      title: "Exclusive Deals",
      description: "Limited time offers"
    }
  ];

  const products = [
    {
      id: 1,
      name: "Premium T-Shirt",
      price: 29.99,
      image: images.products.product1,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Casual Jeans",
      price: 59.99,
      image: images.products.product2,
      rating: 4.2,
    },
    // Add more products as needed
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0"> {/* Added min-w-0 to prevent flex item from overflowing */}
        <Navbar user={{ name: "John Doe", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" }} />
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden"> {/* Added overflow-x-hidden */}
          {/* Hero Slider */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            className="h-[280px] w-full relative group"
            style={{
              width: '100%',
              maxWidth: '100vw',
              overflow: 'hidden'
            }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} style={{ width: '100%', height: '280px' }}>
                <div className="relative h-full w-full overflow-hidden">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-[280px] object-fill"
                    style={{ objectPosition: 'center' }}
                    onError={(e) => {
                      console.error('Slider image failed to load:', e.currentTarget.src);
                      e.currentTarget.src = 'https://via.placeholder.com/1600x900';
                    }}
                  />
                  {/* Gradient overlay thay vì màn đen mờ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Content container */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="max-w-7xl mx-auto">
                      <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">
                        {slide.title}
                      </h2>
                      <p className="text-lg text-white/90 max-w-xl">
                        {slide.description}
                      </p>
                      <button className="mt-3 px-5 py-1.5 bg-white text-black font-semibold rounded-full 
                        hover:bg-black hover:text-white transition-all duration-300">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Products Section */}
          <div className="max-w-2xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Latest Products</h2>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow p-4">
                  {/* Post Header */}
                  <div className="flex items-center mb-3">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shop"
                      alt="Store avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="font-semibold">Fashion Store</p>
                      <p className="text-gray-500 text-sm">2 hours ago</p>
                    </div>
                  </div>

                  {/* Post Description */}
                  <p className="mb-3 text-gray-600">
                    Check out our new {product.name}! Available now at special price.
                  </p>

                  {/* Product Image */}
                  <div className="relative group">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = '/images/fallback.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 rounded-lg" />
                  </div>

                  {/* Product Info */}
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <span className="text-xl font-bold text-blue-600">${product.price}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="text-sm text-gray-600">{product.rating} (24 reviews)</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                        <Star size={20} />
                        <span>Like</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                        <ShoppingCart size={20} />
                        <span>Add to Cart</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                        </svg>
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-blue-900 py-8">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-50">About Us</h3>
                <p className="text-yellow-50">Your one-stop shop for fashion and style. Discover the latest trends and shop with confidence.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-50">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-yellow-50 hover:text-white font-medium">Home</a></li>
                  <li><a href="#" className="text-yellow-50 hover:text-white font-medium">Shop</a></li>
                  <li><a href="#" className="text-yellow-50 hover:text-white font-medium">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-50">Contact Info</h3>
                <ul className="space-y-2">
                  <li className="text-yellow-50">Email: info@example.com</li>
                  <li className="text-yellow-50">Phone: (123) 456-7890</li>
                  <li className="text-yellow-50">Address: 123 Fashion St, Style City</li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
