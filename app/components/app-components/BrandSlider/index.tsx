// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import withSuspense from "~/hooks/withSuspense";

const HighlightReviews = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
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

  const brands = [
    { id: 1, name: "Brand 1", logo: "/public/temp/CK.svg" },
    { id: 2, name: "Brand 2", logo: "/public/temp/GUCCI.svg" },
    { id: 3, name: "Brand 3", logo: "/public/temp/PRADA.svg" },
    { id: 4, name: "Brand 4", logo: "/public/temp/VERSACE.svg" },
    { id: 5, name: "Brand 5", logo: "/public/temp/ZARA.svg" },
  ];

  return (
    <div className="bg-black h-[70px]  md:h-[100px] ">
      <Slider {...settings}>
        {brands.map((brand) => (
          <div key={brand.id} className="px-2">
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-[30px] md:h-[40px] my-[20px] md:my-[30px]  w-auto mx-auto"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default withSuspense(HighlightReviews);
