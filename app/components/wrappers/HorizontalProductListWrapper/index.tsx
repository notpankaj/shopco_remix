import React from "react";

interface Props {
  title: string;
  disableViewAll?: boolean;
  onViewAllClick?: () => void;
  children: React.ReactNode;
}

const HorizontalProductListWrapper = ({
  title,
  onViewAllClick,
  disableViewAll = false,
  children,
}: Props) => {
  return (
    <div className="my-[20px] md:my-[40px] flex items-center justify-center flex-col">
      <h3 className="heading uppercase text-[32px]  md:text-[40px] mx-auto text-center">
        {title}
      </h3>
      {/*  */}
      {children}

      {/*  */}
      {disableViewAll || (
        <button
          onClick={onViewAllClick}
          className="border border-black rounded-[62px] text-[12px] h-[35px] w-[150px] mx-auto hover:bg-black hover:text-white"
        >
          View All
        </button>
      )}
    </div>
  );
};

export default HorizontalProductListWrapper;
