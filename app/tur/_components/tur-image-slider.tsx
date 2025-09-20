'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';

const TurImageSlider = ({ images, setActiveImage }: { images: any, setActiveImage: (e: number) => void }) => {
    return (
        <div className="relative">
            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200">
                <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>

            <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200">
                <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>

            <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={1}
                navigation={{
                    prevEl: '.swiper-button-prev-custom',
                    nextEl: '.swiper-button-next-custom',
                }}
                loop={true}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 16,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }}
                className="px-8" // Tugmalar uchun padding
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="relative h-48 rounded-lg overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={getImageUrl(image?.md || "")}
                                alt={`Gallery image ${index + 1}`}
                                onClick={() => setActiveImage(index)}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default TurImageSlider