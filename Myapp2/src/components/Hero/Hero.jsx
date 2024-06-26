import CountUp from "react-countup";
import "./Hero.css"; // Adjust the import path as needed
import { HiLocationMarker } from "react-icons/hi";
import { motion } from 'framer-motion'
import '../../index.css'

function Hero() {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* Left Section  */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />

            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 3,
                type:"spring"
              }}
            >
              Discover <br />
              Quality Inox Solutions <br /> for Your Home
            </motion.h1>
          </div>
          <div className="flexColStart hero-des">
            <span className="secondaryText" >
              Welcome to our world of precision-crafted inox and iron creations
            </span>
            <span className="secondaryText"  >Step into a realm where craftsmanship meets innovation</span>
          </div>
          <div className="flexCenter search-bar">
            <HiLocationMarker color="var(--blue)" size={25} />
            <input type="text" />
            <button className="button"> Search</button>{" "}
          </div>
          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={1000} end={2500} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Premium Product</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={10} end={212} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Happy Customer</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp end={28} /> <span>+</span>
              </span>
              <span className="secondaryText">Years of experience</span>
            </div>
          </div>

        </div>
        {/* Right Section  */}
        <div className="flexCenter hero-right">
          <motion.div
          initial={{ 
            x:"7rem",
            opacity:0
           }} animate={{ 
            x:"0",
            opacity:1
           }}
           transition={{ 
            duration:3,
            type:"spring"
            }}

           className="image-container">
            <img src="images/hero-image.png" alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
