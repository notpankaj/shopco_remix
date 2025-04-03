import Img_Casual from "public/temp/BBDS-Casual.png";
import Img_Fromal from "public/temp/FORMAL.png";
import Img_GYM from "public/temp/GYM.png";
import Img_Party from "public/temp/Party.png";

const BrowserByStyles = () => {
  return (
    <div className="mx-[8%] mb-[110px] px-[30px] pt-[40px] pb-[50px] bg-[#F0F0F0]  rounded-[40px] ">
      <h4 className="uppercase text-[52px] heading mx-auto text-center mb-[20px]">
        Browse by Dress Style
      </h4>

      <section className="flex flex-col gap-[30px]  mx-auto max-w-[1239px]">
        <div className="flex gap-[30px] relative flex-col h-[500px] md:h-auto md:flex-row">
          <div className="flex-[0.4] bg-white h-[289px] rounded-[20px] overflow-hidden relative">
            <span className="bg-white font-medium px-[10px] py-[5px] rounded-[10px] text-black text-[25px] absolute top-[15px] left-[20px] z-[1] ">
              Casual
            </span>
            <img
              src={Img_Casual}
              className="absolute bottom-0 top-0 right-0 w-[100%] h-[100%] opacity-85 object-cover"
            />
          </div>
          <div className="flex-[0.6]  bg-white h-[289px] rounded-[20px] overflow-hidden relative">
            <span className="bg-white font-medium px-[10px] py-[5px] rounded-[10px] text-black text-[25px] absolute top-[15px] left-[20px] z-[1] ">
              Formal
            </span>
            <img
              src={Img_Fromal}
              className="absolute bottom-0 top-0 right-0 w-[100%] h-[100%] opacity-85 object-cover"
            />
          </div>
        </div>
        <div className="flex  gap-[30px] flex-col h-[500px] md:h-auto md:flex-row-reverse">
          <div className="flex-[0.4]  bg-white h-[289px] rounded-[20px] overflow-hidden relative">
            <span className="bg-white font-medium px-[10px] py-[5px] rounded-[10px] text-black text-[25px] absolute top-[15px] left-[20px] z-[1] ">
              Gym
            </span>
            <img
              src={Img_GYM}
              className="absolute bottom-0 top-0 right-0 w-[100%] h-[100%] opacity-85 object-cover"
            />
          </div>
          <div className="flex-[0.6]  bg-white h-[289px] rounded-[20px] overflow-hidden relative">
            <span className="bg-white font-medium px-[10px] py-[5px] rounded-[10px] text-black text-[25px] absolute top-[15px] left-[20px] z-[1] ">
              Party
            </span>
            <img
              src={Img_Party}
              className="absolute bottom-0 top-0 right-0 w-[100%] h-[100%] opacity-85 object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrowserByStyles;
