import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import Swiper from "swiper";
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/react";
import { SubTitle } from "../components/home/SubTitle";
import { ProgramCard } from "../components/common/ProgramCard";
import { NextButton } from "../components/home/NextButton";
import { PrevButton } from "../components/home/PrevButton";
import { Button } from "../components/common/Button";
import { IcoCheckOutlined, IcoNext } from "../assets";

import type { BannerListType, SpaceListType } from "../types/common";
import type { ProgramListType } from "../types/program";
import { CommonKey, ProgramKey } from "../queries/keys";

export default function HomePage() {
  const navigate = useNavigate();

  const [programSwiper, setProgramSwiper] = useState<Swiper | undefined>();
  const [spaceSwiper, setSpaceSwiper] = useState<Swiper | undefined>();

  // TODO: api 연동 및 useQuery 변경
  const { data: programs } = useQuery({
    queryKey: [CommonKey.list, { type: ProgramKey.program }],
    queryFn: async (): Promise<ProgramListType[]> => {
      const data = await fetch("dummy-data/program.json")
        .then((res) => res.json())
        .then((data) => data.programs);

      return data;
    },
  });

  // TODO: api 연동 및 useQuery 변경
  const { data: spaces } = useQuery({
    queryKey: [CommonKey.list, { type: CommonKey.space }],
    queryFn: async (): Promise<SpaceListType[]> => {
      const data = await fetch("dummy-data/space.json")
        .then((res) => res.json())
        .then((data) => data.spaces);

      return data;
    },
  });

  // TODO: api 연동 및 useQuery 변경
  const { data: banners } = useQuery({
    queryKey: [CommonKey.list, { type: CommonKey.banner }],
    queryFn: async (): Promise<BannerListType[]> => {
      const data = await fetch("dummy-data/space.json")
        .then((res) => res.json())
        .then((data) => data.spaces);

      return data;
    },
  });

  const handleApply = (id: string | number) => {
    // TODO: 신청 페이지로 이동
    console.log("신청", id);
    navigate(`/program/detail/${id}`);
  };

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
          {banners?.map((banner) => (
            <SwiperSlide
              key={banner.id}
              className="flex flex-col w-full h-[15rem] sm:h-[20rem] md:h-[30rem]"
            >
              <img className="object-cover h-full" src={banner.src} />
            </SwiperSlide>
          ))}
        </SwiperContainer>
      </section>

      <section className="w-full max-w-[57.5rem] px-5 py-16 m-auto">
        <SubTitle text="프로그램" />

        <div className="flex items-center justify-between mt-2 mb-11">
          <p>진행중인 프로그램을 소개해드려요.</p>

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
                key={program.id}
                className="flex flex-col w-48 gap-2 mx-[14px]"
              >
                <ProgramCard
                  {...program}
                  onClick={() => navigate(`/program/detail/${program.id}`)}
                />

                <Button
                  style={{ height: 36 }}
                  onClick={() => handleApply(program.id)}
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
        <SubTitle text="공지사항" className="text-white" />
      </section> */}

      <section className="w-full max-w-[57.5rem] px-5 py-16 m-auto">
        <SubTitle text="공간안내" />

        <div className="flex items-center justify-between mt-2 mb-11">
          <p>청년센터 공간을 소개해드려요.</p>

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
            {spaces?.map((space) => (
              <SwiperSlide
                key={space.id}
                className="flex flex-col w-64 gap-2 mx-[14px]"
              >
                <img
                  className="h-[184px] object-cover rounded-lg"
                  src={space.src}
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
