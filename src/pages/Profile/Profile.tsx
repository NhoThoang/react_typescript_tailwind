import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Navbar/Sidebar';
import { getUserInformation, updateUserContact, uploadAvatar, getUserPaths } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    address: ""
  });
  const [userAvatar, setUserAvatar] = useState<string>("/images/default-avatar.png");
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy avatar từ localStorage
    const avatarUrl = localStorage.getItem('avatarUrl');
    const avatarExpiry = localStorage.getItem('avatarExpiry');
    const contactInfoStr = localStorage.getItem('contactInfo');
    const contactInfoExpiry = localStorage.getItem('contactInfoExpiry');
    
    // Kiểm tra và sử dụng avatar từ cache
    if (avatarUrl && avatarExpiry && new Date().getTime() < parseInt(avatarExpiry)) {
      setUserAvatar(avatarUrl);
    }

    // Kiểm tra và sử dụng contact info từ cache
    if (contactInfoStr && contactInfoExpiry && new Date().getTime() < parseInt(contactInfoExpiry)) {
      setContactInfo(JSON.parse(contactInfoStr));
    } else {
      // Nếu không có cache hoặc đã hết hạn thì mới gọi API
      fetchUserInfo();
    }
  }, []);

  const fetchUserInfo = async () => {
    try {
      const userInfo = await getUserInformation();
      const newContactInfo = {
        phone: userInfo.phone || "",
        address: userInfo.address || ""
      };
      
      // Lưu vào localStorage với thời hạn 24h
      const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('contactInfo', JSON.stringify(newContactInfo));
      localStorage.setItem('contactInfoExpiry', expiry.toString());
      
      setContactInfo(newContactInfo);
    } catch (error) {
      console.error('Failed to fetch user information:', error);
    }
  };

  const user = {
    name: "John Doe",
    title: "Senior Frontend Developer",
    location: "Hà Nội, Việt Nam",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    cover: "https://images.unsplash.com/photo-1707343843437-caacff5cfa74",
    stats: {
      followers: "8.5K",
      following: "2.3K",
      projects: "156"
    },
    about: {
      bio: "Passionate frontend developer with 5+ years of experience in building beautiful and scalable web applications. Specialized in React, TypeScript, and modern web technologies.",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "GraphQL"],
      experience: [
        {
          company: "Tech Solutions Inc.",
          role: "Senior Frontend Developer",
          period: "2021 - Present"
        },
        {
          company: "Digital Innovations Co.",
          role: "Frontend Developer",
          period: "2019 - 2021"
        }
      ]
    },
    activities: [
      {
        action: "Đã hoàn thành dự án",
        project: "E-commerce Dashboard",
        time: "2 giờ trước"
      },
      {
        action: "Đã đóng góp vào",
        project: "Open Source Project",
        time: "1 ngày trước"
      },
      {
        action: "Đã tạo repository mới",
        project: "AI Chat Application",
        time: "3 ngày trước"
      }
    ]
  };

  const handleSave = async () => {
    try {
      await updateUserContact(contactInfo.phone, contactInfo.address);
      
      // Cập nhật localStorage sau khi lưu thành công
      const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
      localStorage.setItem('contactInfoExpiry', expiry.toString());
      
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save contact information:', error);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const response = await uploadAvatar(file);
        // Giả sử response trả về đường dẫn avatar mới
        const { avatarPath } = await getUserPaths(); // Lấy đường dẫn mới
        const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
        
        localStorage.setItem('avatarUrl', avatarPath);
        localStorage.setItem('avatarExpiry', expiry.toString());
        setUserAvatar(avatarPath);
        
        setShowAvatarModal(false); // Đóng modal sau khi upload thành công
      } catch (error) {
        console.error('Failed to upload avatar:', error);
        // Có thể thêm thông báo lỗi cho người dùng ở đây
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('avatarUrl');
    localStorage.removeItem('avatarExpiry');
    localStorage.removeItem('contactInfo');
    localStorage.removeItem('contactInfoExpiry');
    navigate('/logout');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar user={user} />
        <div className="flex-1 overflow-y-auto pb-12">
          <div className="relative group">
            <div className="h-64 w-full relative">
              <img 
                src={user.cover} 
                alt="Cover" 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  className="bg-white text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                  onClick={() => document.getElementById('cover-upload')?.click()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Chỉnh sửa ảnh bìa
                </button>
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log('Upload cover:', file);
                    }
                  }}
                />
              </div>
            </div>

            <div className="absolute -bottom-20 left-8">
              <div className="relative group">
                <img
                  src={userAvatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white cursor-pointer"
                  onClick={() => setShowAvatarModal(true)}
                />
                
                <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-200"></div>
                
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-white text-sm font-medium mt-1">Cập nhật</span>
                </div>

                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </div>

              {showAvatarModal && (
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-90 flex items-center justify-center">
                  <div className="relative max-w-4xl w-full">
                    <button
                      className="absolute top-4 right-4 text-white hover:text-gray-300"
                      onClick={() => setShowAvatarModal(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <img
                      src={userAvatar}
                      alt="Profile"
                      className="w-full h-auto"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <div className="flex justify-between items-center">
                        <div className="text-white text-xl font-semibold">{user.name}</div>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center"
                          onClick={() => document.getElementById('avatar-upload')?.click()}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                          </svg>
                          Cập nhật ảnh đại diện
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-24 px-8 max-w-7xl mx-auto w-full">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-lg text-gray-600 mt-1">{user.title}</p>
                <div className="flex items-center mt-2 text-gray-600">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {user.location}
                </div>
              </div>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                Edit Profile
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-2xl font-bold text-gray-900">{user.stats.followers}</div>
                <div className="text-gray-600">Người theo dõi</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-2xl font-bold text-gray-900">{user.stats.following}</div>
                <div className="text-gray-600">Đang theo dõi</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-2xl font-bold text-gray-900">{user.stats.projects}</div>
                <div className="text-gray-600">Dự án</div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Giới thiệu</h2>
                  <p className="text-gray-600 leading-relaxed">{user.about.bio}</p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Kinh nghiệm</h2>
                  <div className="space-y-6">
                    {user.about.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-blue-500 pl-4">
                        <div className="font-medium text-gray-900">{exp.role}</div>
                        <div className="text-gray-600">{exp.company}</div>
                        <div className="text-sm text-gray-500 mt-1">{exp.period}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Kỹ năng</h2>
                  <div className="flex flex-wrap gap-2">
                    {user.about.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Hoạt động gần đây</h2>
                  <div className="space-y-4">
                    {user.activities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <div className="text-gray-900">
                            {activity.action} <span className="font-medium">{activity.project}</span>
                          </div>
                          <div className="text-sm text-gray-500">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Thông tin liên hệ</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Chỉnh sửa
                      </button>
                    ) : (
                      <button
                        onClick={handleSave}
                        className="text-green-500 hover:text-green-600 flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Lưu
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Số điện thoại</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      ) : (
                        <div className="text-gray-900 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {contactInfo.phone}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Địa chỉ</label>
                      {isEditing ? (
                        <textarea
                          value={contactInfo.address}
                          onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          rows={3}
                        />
                      ) : (
                        <div className="text-gray-900 flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {contactInfo.address}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
