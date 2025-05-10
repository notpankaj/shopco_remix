import React, { useRef, useState } from "react";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
    setStartX(pageX);
    if (scrollRef.current) {
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
    const walk = (pageX - startX) * 1.5; // Increase factor for speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <div className="my-5 md:my-10 flex flex-col items-center justify-center">
      {/* Title */}
      <h3 className="heading uppercase text-2xl md:text-3xl text-center">
        {title}
      </h3>

      {/* Scrollable Product List with Drag */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-hidden scroll-smooth whitespace-nowrap pl-5 w-[90%] max-w-[1290px] cursor-grab active:cursor-grabbing select-none"
        onMouseDown={startDrag}
        onMouseMove={onDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={startDrag}
        onTouchMove={onDrag}
        onTouchEnd={stopDrag}
      >
        {children}
      </div>

      {/* View All Button */}
      {!disableViewAll && (
        <button
          onClick={onViewAllClick}
          className="mt-[20px] border border-black rounded-full text-sm h-9 w-36 hover:bg-black hover:text-white transition"
        >
          View All
        </button>
      )}
    </div>
  );
};

export default HorizontalProductListWrapper;
