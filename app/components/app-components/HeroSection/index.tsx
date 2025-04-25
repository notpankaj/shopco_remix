import styles from "./index.module.css";
import BanerImg from "/public/temp/Bannar.png";
const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row  bg-[var(--bg-secondary)]">
      <section className="px-[20px] py-[40px] md:pl-[8%]  md:w-[50vw]">
        <div className="">
          <h1 className={`heading leading-none ${styles.main_text}`}>
            FIND CLOTHES <br />
            THAT MATCHES <br />
            YOUR STYLE <br />
          </h1>
          <h6 className="opacity-[0.5] text-[10px] mt-[10px] [@media(min-width:500px)]:text-[12px] max-w-[570px] md:max-w-[400px] ">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </h6>

          <button className="btn-primary w-full mt-[10px] [@media(min-width:500px)]:mt-[15px] [@media(min-width:500px)]:py-[15px] md:max-w-[250px]">
            Shop Now
          </button>

          <div className="flex gap-[5px] mt-[20px] flex-wrap items-center justify-center md:justify-start md:items-start   ">
            {[
              { title: "High-Quality Products", count: "200+" },
              { title: "International Brands", count: "2000+" },
              { title: "Happy Customers", count: "30,000" },
            ].map((item, key) => {
              return (
                <div
                  key={key}
                  className="flex flex-col items-center  w-[45%]  max-w-[150px] md:flex-1  md:max-w-auto  "
                >
                  <span className="text-[16px]">{item.count}</span>
                  <span className="text-[10px]">{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section>
        <div className="w-full  md:w-[50vw] h-full  md:min-h-full md:max-h-[580px] max-w-[1200px]  flex items-end ">
          {/* <div className="w-full mx-auto max-w-[590px] md:max-w-auto md:min-h-[400px] max-h-[580px] 2xl:mr-[20%] overflow-hidden flex items-end "> */}
          <img src={BanerImg} className=" w-[100%]  h-[100%] object-contain" />
          {/* </div> */}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
