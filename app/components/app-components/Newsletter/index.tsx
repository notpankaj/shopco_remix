import styles from "./index.module.css";
const Newsletter = () => {
  return (
    <div
      className={`w-[90%] mx-[5%]  py-[15px] bg-black absolute left-0 rounded-[20px] flex flex-col  ${styles.container}`}
    >
      <div className={styles.section_a}>
        <h1 className="heading text-white mx-[8%] text-wrap text-[2.7rem]  leading-none">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h1>
      </div>
      <div
        className={`flex items-center mt-[15px] flex-col justify-center  gap-[10px] ${styles.section_b}`}
      >
        <div className="bg-white h-[45px] w-[90%] rounded-[62px] "></div>
        <button className="btn-primary bg-white text-black w-[90%] ">
          Subscribe to Newsletter
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
