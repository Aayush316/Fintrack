import React from "react";
import './App.css';
import Navbar from "./components/Navbar";
import AppCard from "./components/AppCard";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import { useEffect } from "react";

export default function App() {
  const data = [
    {
      id: "1",
      src: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      name: "person1",
      review:
        "The website is a user-friendly platform promoting financial planning and savings. Its responsive design ensures accessibility on all devices, while the savings tracker and investment learning tools stand out.",
    },
    {
      id: "2",
      src: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      name: "person2",
      review:
        "I love the simplicity and utility of the platform. The budgeting tools and investment options are incredible for users like me who are new to financial planning.",
    },
    {
      id: "3",
      src: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      name: "person3",
      review:
        "The dashboard is highly intuitive, and the detailed breakdown of expenses makes it easier to track my financial goals.",
    },
    {
      id: "4",
      src: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      name: "person4",
      review:
        "An excellent tool for learning about investments. The stock trading simulation has been especially helpful in understanding how markets work.",
    },
    {
      id: "5",
      src: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      name: "person5",
      review:
        "This platform is an all-in-one solution for financial planning, savings tracking, and investment learning. Highly recommended!",
    },
  ];

  useEffect(() => {
    // Ensure Swiper initializes after DOM is ready
    const swiperContainer = document.querySelector(".custom-pagination");
    if (!swiperContainer) {
      console.error("Custom pagination element not found.");
    }
  }, []);
  return (
    <div className="mainapp">
      <div>
        <Navbar />
      </div>
      <div className="indeximage">
        <img className="financeimage" src="https://www.greenvillefederal.com/wp-content/uploads/2021/03/MoneyMatters.jpg" alt="" />
      </div>
      <div className="content1">
        <div className="savingscontent">
          <h1>The art is not in making <span style={{ color: '#3baea0' }}>money,</span> but in <span style={{ color: '#3baea0' }}>saving</span> it.</h1>
          <p>
            Our Savings Tracker is designed to help you stay organized, motivated, and on track towards achieving your savings targets.
            It provides detailed insights into your spending patterns and helps identify areas where you can save. With real-time updates and easy-to-use features, it’s your ultimate tool for building financial security.
          </p>
          <div className="savebtndiv">
            <button className="savebtn">Save Now</button>
          </div>
        </div>
        <div className="savimage">
          <img className="img1" src="https://i.ytimg.com/vi/_JwFYW-rcXU/maxresdefault.jpg" alt="" />
        </div>
      </div>
      <div className="testimonials">
        <h1 className="testi">
          Our <span style={{ color: "#3baea0" }}>Testimonials</span>
        </h1>
        <div className="allTestimonials">
          <div className="navigation-container">
            <div className="custom-prev">&#8249;</div>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true,
                el: ".custom-pagination", // Link to custom pagination
              }}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {data.map((person, index) => (
                <SwiperSlide key={index}>
                  <AppCard person={person} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="custom-next">&#8250;</div>
          </div>
          <div className="custom-pagination"></div> {/* Custom pagination container */}
        </div>
      </div>
    </div>
  );
}
