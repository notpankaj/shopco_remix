import { FaTwitter } from "react-icons/fa";
import { FaInstagram, FaGithub, FaFacebookF } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-[var(--bg-thrid)] mt-[100px] py-[50px] px-[15px] pl-[30px] md:px-[8%] flex flex-col  ">
      <div className="flex flex-col sm:flex-row border-b-1 border-b-[lightgrey] pb-[30px] 2xl:pb-[40px]">
        <section>
          <h2 className="heading text-[2rem]">SHOP.CO</h2>
          <p className="text-[10px] lg:text-[14px]  opacity-60 w-[250px] lg:w-[300px] 2xl:w-[400px] ">
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>

          <div className="flex gap-[10px]">
            <button className="w-[28px] h-[28px] bg-white  border-[1px] rounded-full mt-[10px] cursor-pointer  flex justify-center items-center">
              <FaTwitter className="text-[14px] " />
            </button>
            <button className="w-[28px] h-[28px] bg-white border-[1px] rounded-full mt-[10px] cursor-pointer  flex justify-center items-center">
              <FaFacebookF className="text-[14px]" />
            </button>
            <button className="w-[28px] h-[28px] bg-white border-[1px] rounded-full mt-[10px] cursor-pointer  flex justify-center items-center">
              <FaInstagram className="text-[14px]" />
            </button>
            <button className="w-[28px] h-[28px] bg-white border-[1px] rounded-full mt-[10px] cursor-pointer  flex justify-center items-center">
              <FaGithub className="text-[14px]" />
            </button>
          </div>
        </section>
        <section className="flex flex-wrap justify-between  flex-1 mt-[20px] sm:ml-[5%] sm:mt-[0px]">
          <div className="mt-[20px] flex-1/2 sm:flex-1 ">
            <span className="text-[18px]">COMPANY</span>
            <div className="flex flex-col mt-[10px]">
              <span className="text-[14px] opacity-60 cursor-pointer">
                About
              </span>
              <span className="text-[14px] opacity-60 cursor-pointer">
                Feature
              </span>
              <span className="text-[14px] opacity-60 cursor-pointer">
                Work
              </span>
              <span className="text-[14px] opacity-60 cursor-pointer">
                Carrer
              </span>
            </div>
          </div>
          <div className="mt-[20px] flex-1/2 sm:flex-1 ">
            <span className="text-[18px]">HELP</span>
            <div className="flex flex-col mt-[10px]">
              <span className="text-[14px] opacity-60 cursor-pointer">
                Customer Support
              </span>
              <span className="text-[14px] opacity-60 cursor-pointer">
                Devlivery Details
              </span>
              <span className="text-[14px] opacity-60 cursor-pointer">
                Terms & Conditions
              </span>
              <span className="text-[14px] opacity-60 cursor-pointer">
                Privacy Policy
              </span>
            </div>
          </div>
          <div className="mt-[20px] flex-1/2 sm:flex-1 ">
            <span className="text-[18px]">FAQ</span>
            <div className="flex flex-col mt-[10px]">
              <span className="text-[14px] opacity-60 cursor-pointer">
                Account
              </span>
              <span className="text-[14px] opacity-60 cursor-pointer">
                Manage Deliveries
              </span>
              <span className="text-[14px] opacity-60 cursor-pointer">
                Orders
              </span>
              <span className="text-[14px] opacity-60 cursor-pointer">
                Payments
              </span>
            </div>
          </div>
          <div className="mt-[20px] flex-1/2 sm:flex-1 ">
            <span className="text-[18px]">COMPANY</span>
            <div className="flex flex-col mt-[10px]">
              <span className="text-[14px] opacity-60 cursor-pointer">
                Free eBooks
              </span>
              <span className="text-[14px] opacity-60 cursor-pointer">
                Development Tutorial
              </span>
              <span className="text-[14px] opacity-60 cursor-pointer">
                How to - Blog
              </span>
              <span className="text-[14px] opacity-60 cursor-pointer">
                Youtube Playlist
              </span>
            </div>
          </div>
        </section>
      </div>
      <span className="text-[12px] text-center sm:text-[14px] lg:text-[16px] mt-[20px] opacity-50 mx-auto">
        © {new Date().getFullYear() - 2}-{new Date().getFullYear() + 1}, All
        rights reserved <br />
        <span className="text-[8px] sm:text-[10px] ">
          made with ❤️ by <a href="#">Pankaj</a>
        </span>
      </span>
    </div>
  );
};

export default Footer;
