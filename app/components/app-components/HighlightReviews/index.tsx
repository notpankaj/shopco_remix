// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import withSuspense from "~/hooks/withSuspense";
import { FaStar } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
const HighlightReviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
    centerPadding: "20px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const reviews = [
    {
      id: 1,
      name: "Sarha M.",
      review:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”",
    },
    {
      id: 2,
      name: "Alex K.",
      review:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”",
    },
    {
      id: 3,
      name: "James G.",
      review:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”",
    },
    {
      id: 4,
      name: "Andrew G.",
      review:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”",
    },
    {
      id: 5,
      name: "Justin B.",
      review:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”",
    },
    {
      id: 6,
      name: "Speed L.",
      review:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”",
    },
    {
      id: 7,
      name: "KSI K.",
      review:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”",
    },
    {
      id: 8,
      name: "PEW D.",
      review:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”",
    },
    {
      id: 9,
      name: "Chico L.",
      review:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”",
    },
    {
      id: 10,
      name: "Jordan B.",
      review:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”",
    },
  ];

  return (
    <div className="py-[10px]">
      <h1 className="heading text-[2rem] mx-[4%] md:mx-[8%]">
        OUR HAPPY CUSTOMERS
      </h1>
      <div className="mx-[4%] md:mx-[8%]">
        <Slider {...settings}>
          {reviews.map((review) => (
            <div
              key={review.id}
              className="h-[240px] border-1 border-gray-300  px-[20px] py-[30px] rounded-[20px]"
            >
              <div className="flex gap-[4px]">
                {new Array(5).fill(null).map((_, key) => (
                  <FaStar key={key} className="text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-[15px] mt-[10px]">
                <span className="font-semibold text-[16px]">{review.name}</span>
                <FaCheckCircle className="text-green-600 mb-[1px]" />
              </div>
              <p className="text-[12px] opacity-60 mt-[10px]">
                {review.review}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default withSuspense(HighlightReviews);
