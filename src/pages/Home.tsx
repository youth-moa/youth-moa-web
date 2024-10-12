import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

import Swiper from "swiper";
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/react";
import { IcoCheckOutlined, IcoNext } from "../assets";
import { Button } from "../components/common/Button";
import { ProgramCard } from "../components/common/ProgramCard";
import { NextButton } from "../components/home/NextButton";
import { PrevButton } from "../components/home/PrevButton";
import { SubTitle } from "../components/home/SubTitle";

import { getBannerList, getSpageList } from "../api/common";
import { getProgramList } from "../api/program";
import { CommonKey, ProgramKey } from "../queries/keys";
import type { BannerListType } from "../types/common";
import type { ProgramListType } from "../types/program";

export default function HomePage() {
  const navigate = useNavigate();

  const [programSwiper, setProgramSwiper] = useState<Swiper | undefined>();
  const [spaceSwiper, setSpaceSwiper] = useState<Swiper | undefined>();

  const { data: programs } = useQuery({
    queryKey: [CommonKey.list, { type: ProgramKey.program }],
    queryFn: async (): Promise<ProgramListType[]> => {
      const params = {
        size: 30,
      };
      const data = await getProgramList({ params });

      return data.content;
    },
    initialData: [],
  });

  const { data: spaces } = useQuery({
    queryKey: [CommonKey.list, { type: CommonKey.space }],
    queryFn: async () => {
      const data = await getSpageList();

      return data;
    },
    initialData: [],
  });

  const { data: banners } = useQuery({
    queryKey: [CommonKey.list, { type: CommonKey.banner }],
    queryFn: async (): Promise<BannerListType[]> => {
      const data = await getBannerList();
      return data;
    },
    initialData: [],
  });

  return (
    <>
      <section>
        <SwiperContainer
          speed={1000}
          slidesPerView={1}
          loop={true}
          effect={"fade"}
          modules={[Autoplay, EffectFade]}
          autoplay={{
            delay: 3500,
          }}
        >
          {banners?.map((banner, index) => (
            <SwiperSlide
              key={index}
              className="flex flex-col w-full h-[15rem] sm:h-[20rem] md:h-full"
            >
              <img
                className="object-cover h-full"
                src={banner.bannerUrl}
                alt={banner.bannerName}
              />
            </SwiperSlide>
          ))}
        </SwiperContainer>
      </section>

      <section className="w-full max-w-[60rem] px-5 py-16 m-auto">
        <SubTitle
          text="프로그램"
          className="font-bold text-black font-gmarket-sans"
        />

        <div className="flex items-center justify-between mt-2 mb-11">
          <p className="font-normal text-gray-000">
            진행중인 프로그램을 소개해드려요.
          </p>

          <button
            className="flex items-center gap-2 text-sm font-semibold text-gray-000"
            onClick={() => navigate("/program")}
          >
            더보기
            <IcoNext fill={"rgba(103, 101, 108, 1)"} />
          </button>
        </div>

        <div className="relative">
          <PrevButton
            className="top-20 -left-6"
            onClick={() => programSwiper?.slidePrev()}
          />

          <SwiperContainer
            slidesPerView={"auto"}
            navigation={true}
            loop={true}
            grabCursor={true}
            modules={[Navigation]}
            onBeforeInit={(swipper) => setProgramSwiper(swipper)}
          >
            {programs?.map((program) => (
              <SwiperSlide
                key={program.programId}
                className="flex flex-col w-48 gap-2 mx-[14px]"
              >
                <ProgramCard
                  {...program}
                  onClick={() =>
                    navigate(`/program/detail/${program.programId}`)
                  }
                />

                <Button
                  style={{ height: 36 }}
                  onClick={() =>
                    navigate(`/program/apply/${program.programId}`)
                  }
                >
                  <span className="flex items-center gap-2">
                    <IcoCheckOutlined className="w-4" stroke="white" />
                    신청하기
                  </span>
                </Button>
              </SwiperSlide>
            ))}
          </SwiperContainer>

          <NextButton
            className="top-20 -right-6"
            onClick={() => programSwiper?.slideNext()}
          />
        </div>
      </section>

      {/* <section className="py-16 bg-blue ">
        <SubTitle text="공지사항" className="font-bold text-white font-gmarket-sans" />
      </section> */}

      <section className="w-full max-w-[60rem] px-5 py-16 m-auto">
        <SubTitle
          text="공간안내"
          className="font-bold text-black font-gmarket-sans"
        />

        <div className="flex items-center justify-between mt-2 mb-11">
          <p className="font-normal text-gray-000">
            청년센터 공간을 소개해드려요.
          </p>

          {/* <button
            className="flex items-center gap-2 text-sm font-semibold text-gray-000"
            onClick={() => navigate("/program")}
          >
            더보기
            <IcoNext fill={"rgba(103, 101, 108, 1)"} />
          </button> */}
        </div>

        <div className="relative">
          <PrevButton
            className="top-20 -left-6"
            onClick={() => spaceSwiper?.slidePrev()}
          />
          <SwiperContainer
            slidesPerView={"auto"}
            navigation={true}
            loop={true}
            grabCursor={true}
            modules={[Navigation]}
            onBeforeInit={(swipper) => setSpaceSwiper(swipper)}
          >
            {spaces?.map((space, index) => (
              <SwiperSlide
                key={index}
                className="flex flex-col w-64 gap-2 mx-[14px]"
              >
                <img
                  className="h-[184px] object-cover rounded-lg"
                  src={space.fileUrl}
                  alt={space.spaceName}
                />
              </SwiperSlide>
            ))}
          </SwiperContainer>

          <NextButton
            className="top-20 -right-6"
            onClick={() => spaceSwiper?.slideNext()}
          />
        </div>

        <div className={"my-24"} />
      </section>
    </>
  );
}
