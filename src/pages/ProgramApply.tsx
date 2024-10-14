import { MenuItem, Select } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserInfo } from "../api/auth";
import { getProgramById } from "../api/program";
import { IcoCheckFilled, IcoCheckOutlined } from "../assets";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { Label } from "../components/common/Label";
import { StatusBadge } from "../components/common/StatusBadge";
import { Title } from "../components/common/Title";
import { List } from "../components/sign-up/List";
import Container from "../layouts/Container";
import { Section } from "../layouts/Section";
import { ProgramKey, UserKey } from "../queries/keys";
import { CommonContext } from "../store/CommonContext";
import { dateFormat } from "../utils";

export default function ProgramApplyPage() {
  const navigate = useNavigate();
  const { programId } = useParams();
  const { setCommon } = useContext(CommonContext);

  // const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    userPhoneNumber: "",
    userMainAddress: "",
    userDetailAddress: "",
    selectedCourse: "",
    subjectiveAnswer: "",
    objectiveAnswer: "",
    fileUrl: "",
    personalInfoAgree: false,
  });
  const [objectiveErrorMsg, setObjectiveErrorMsg] = useState("");
  const [subjectiveErrorMsg, setSubjectiveErrorMsg] = useState("");
  const [courseeErrorMsg, setCourseeErrorMsg] = useState("");

  const { data: program } = useQuery({
    queryKey: [ProgramKey.program, { id: programId }], // query key
    queryFn: () => getProgramById(Number(programId)), // API 호출 함수
  });

  const { data: user } = useQuery({
    queryKey: [UserKey.user],
    queryFn: async () => {
      const data = await getUserInfo();
      return data;
    },
  });

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const applyProgram = async () => {
    if (!form.selectedCourse) {
      setCourseeErrorMsg("필수 항목입니다.");
      return;
    } else setCourseeErrorMsg("");
    if (!form.subjectiveAnswer) {
      setSubjectiveErrorMsg("필수 항목입니다.");
      return;
    } else setSubjectiveErrorMsg("");
    if (!form.objectiveAnswer) {
      setObjectiveErrorMsg("필수 항목입니다.");
      return;
    } else setObjectiveErrorMsg("");
    if (!form.personalInfoAgree) {
      setCommon &&
        setCommon((prev) => ({
          ...prev,
          alert: {
            isShow: true,
            message: "개인정보 수집에 동의해주세요.",
          },
        }));
      return;
    }

    navigate(-1);
    toast.success("신청되었습니다.");
    // try {
    //   const response = await applylProgram({
    //     programId: Number(programId),
    //     body: form,
    //   });

    //   if (!response.success) {
    //     throw response;
    //   }

    //   navigate(-1);
    //   toast.success("신청되었습니다.");
    // } catch (error: any) {
    //   console.error(error);

    //   setCommon &&
    //     setCommon((prev) => ({
    //       ...prev,
    //       alert: {
    //         isShow: true,
    //         message: error.data.message,
    //       },
    //     }));
    // }
  };

  if (!program) return <></>;

  return (
    <>
      <Container hasBgColor>
        <Title title="프로그램 신청" />

        <div className="my-5" />

        <section className="flex flex-col items-center justify-center w-full gap-3">
          <Section>
            <SubTitle title="프로그램 정보" />

            <div className="my-5" />

            <section className="flex gap-6">
              <img
                src={program.programResponseDTO?.programImageUrl}
                alt="thumbnail"
                className="object-cover w-48 rounded-lg h-[11.5rem]"
              />

              <div className="flex flex-col h-full gap-3">
                <StatusBadge status={program.programResponseDTO?.status} />
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-medium text-black">
                    {program.programResponseDTO?.programName}
                  </h3>
                  <p className="text-sm font-normal text-gray-001">
                    {dateFormat(program.programResponseDTO?.programStartDate)} ~{" "}
                    {dateFormat(program.programResponseDTO?.programEndDate)}
                  </p>
                </div>
              </div>
            </section>
          </Section>

          <Section>
            <div className="flex flex-col w-full gap-5">
              <SubTitle title="강좌 선택" />

              <Select
                sx={{ height: "46px" }}
                onChange={(e: any) =>
                  setForm((prev) => ({
                    ...prev,
                    selectedCourse: e.target.value,
                  }))
                }
                value={form.selectedCourse}
              >
                {/* {program.courses?.map((course, index) => (
                  <MenuItem key={index}>{course}</MenuItem>
                ))} */}
                {["강좌1", "강좌2", "강좌3"].map((course, index) => (
                  <MenuItem key={index} value={course}>
                    {course}
                  </MenuItem>
                ))}
              </Select>
              {courseeErrorMsg && (
                <p className={`text-red text-xs -mt-3 ml-4 w-max`}>
                  {courseeErrorMsg}
                </p>
              )}
            </div>
          </Section>

          <Section>
            <SubTitle title="신청자 정보" />

            <ul className="w-full flex flex-col gap-4 my-14 max-w-[46rem] items-center justify-center md:gap-7">
              <List>
                <Label label="이름" className="col-span-1" />

                <div className="w-full md:col-span-3">
                  <Input
                    type="text"
                    placeholder="이름을 입력해주세요."
                    name={"userName"}
                    onChange={changeValue}
                    value={user?.userInfo?.applicantName}
                    disabled
                    // helpText={emailErrorMsg}
                  />
                </div>
              </List>

              <List>
                <Label label="핸드폰 번호" className="col-span-1" />

                <div className="w-full md:col-span-3">
                  <Input
                    type="text"
                    placeholder="핸드폰번호를 입력해주세요."
                    name={"userPhoneNumber"}
                    onChange={changeValue}
                    value={user?.userInfo?.applicantPhoneNumber}
                    disabled
                    // helpText={emailErrorMsg}
                  />
                </div>
              </List>

              <List>
                <Label label="이메일" className="col-span-1" />

                <div className="w-full md:col-span-3">
                  <Input
                    type="text"
                    placeholder="이메일을 입력해주세요."
                    name={"userEmail"}
                    onChange={changeValue}
                    value={user?.userInfo?.applicantEmail}
                    disabled
                    // helpText={emailErrorMsg}
                  />
                </div>
              </List>

              <li className="flex flex-col items-start w-full gap-2 md:grid md:grid-cols-4">
                <Label label="주소" className="col-span-1" />
                {/* <div className="flex flex-col w-full gap-3 md:col-span-2"> */}
                <div className="flex flex-col w-full gap-3 md:col-span-3">
                  <Input
                    type="text"
                    name="applicantMainAddress"
                    disabled
                    value={user?.userInfo?.applicantMainAddress}
                    // value={address.mainAddress}
                  />

                  <span className="w-full h-[46px] md:col-span-2">
                    <Input
                      type="text"
                      placeholder="상세주소를 입력해주세요."
                      name="applicantDetailAddress"
                      value={user?.userInfo?.applicantDetailAddress}
                      disabled
                      // onChange={(e) =>
                      //   setAddress((prev) => ({
                      //     ...prev,
                      //     detailAddress: e.target.value,
                      //   }))
                      // }
                    />
                  </span>
                </div>

                {/* <span className="w-full h-[46px] md:col-span-1 md:ml-3">
                  <Button
                    type={BUTTON_TYPE.fill}
                    // onClick={() => setIsAddressOpen(true)}
                    onClick={() => {}}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <IcoSearch stroke="white" />
                      재검색
                    </span>
                  </Button>
                </span> */}
              </li>
            </ul>
          </Section>

          <Section>
            <div className="h-full">
              <SubTitle title="추가 정보" />

              <div className="my-5" />

              <section className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <h3 className="font-medium text-gray-000">주관식 질문 1</h3>

                  <div className="h-[46px]">
                    <Input
                      placeholder="답변을 입력해주세요."
                      value={form.subjectiveAnswer}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          subjectiveAnswer: e.target.value,
                        }))
                      }
                      helpText={subjectiveErrorMsg}
                    />
                  </div>
                </div>

                {/* {program.objectiveQuestions &&
                  program.objectiveQuestions?.map((question, index) => (
                    <div key={index} className="flex flex-col w-full gap-3">
                      <h3 className="font-medium text-gray-000">
                        {question?.questionTitle}
                      </h3>

                      <Select sx={{ height: "46px" }}>
                        {question.options?.map((option, idx) => (
                          <MenuItem key={idx}>{option}</MenuItem>
                        ))}
                      </Select>
                    </div>
                  ))} */}
                {[
                  {
                    questionTitle: "객관식 질문 1",
                    options: ["선택A", "선택B"],
                  },
                ].map((question, index) => (
                  <div key={index} className="flex flex-col w-full gap-3">
                    <h3 className="font-medium text-gray-000">
                      {question?.questionTitle}
                    </h3>

                    <Select
                      sx={{
                        height: "46px",
                      }}
                      value={form.objectiveAnswer}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          objectiveAnswer: e.target.value,
                        }))
                      }
                    >
                      {question.options?.map((option, idx) => (
                        <MenuItem key={idx} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                    {objectiveErrorMsg && (
                      <p className={`text-red text-xs -mt-3 ml-4 w-max`}>
                        {objectiveErrorMsg}
                      </p>
                    )}
                  </div>
                ))}

                {/* <div className="flex flex-col w-full gap-5">
                  <h3 className="font-medium text-gray-000">첨부파일</h3>

                  <ul className="flex flex-wrap gap-3">
                    <li className="items-center rounded-[20px] border border-blue bg-blue-opacity text-blue font-semibold text-sm px-3.5 py-1 flex gap-3">
                      <p>첨부파일</p>
                      <button>
                        <IcoCancel
                          stroke="rgba(48, 60, 233, 1)"
                          width={12}
                          height={12}
                        />
                      </button>
                    </li>
                  </ul>

                  <div className="h-[46px]">
                    <Button onClick={() => {}}>
                      <div className="flex gap-2">
                        <IcoFileDownload />
                        첨부파일 업로드
                      </div>
                    </Button>
                  </div>
                </div> */}
              </section>
            </div>
          </Section>

          <Section>
            <section className="flex items-center justify-between mb-3">
              <SubTitle title="개인정보 수집 동의" />

              <button
                className="flex items-center gap-1"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    personalInfoAgree: !prev.personalInfoAgree,
                  }))
                }
              >
                {form.personalInfoAgree ? (
                  <IcoCheckFilled
                    width={28}
                    height={20}
                    fill="rgba(48, 60, 233, 1)"
                    stroke="rgba(48, 60, 233, 1)"
                  />
                ) : (
                  <IcoCheckOutlined
                    width={28}
                    stroke="rgba(144, 144, 146, 1)"
                  />
                )}
                <p
                  className={`font-medium ${
                    form.personalInfoAgree ? "text-blue" : "text-gray-002"
                  }`}
                >
                  동의
                </p>
              </button>
            </section>

            <section className="px-8 py-6 rounded-lg bg-gray-005">
              <h3 className="text-sm font-bold">개인정보수집 및 초상 이용</h3>

              <br />

              <ul className="text-sm font-light">
                <li>
                  <p>1. 개인정보 수집 항목</p>
                  <p>- 개인 식별 정보: 성명, 생년월일, 성별, 연락처</p>
                  <p>- 프로그램 촬영 사진 및 영상 전체</p>
                </li>

                <br />

                <li>
                  <p>2. 개인정보 수집 및 이용목적</p>
                  <p>
                    강좌신청 예약 접수 및 행정 지출 증빙 및 사업 홍보 등을 위해
                    활용
                  </p>
                </li>
              </ul>
            </section>
          </Section>
        </section>

        <div className="w-[12rem] my-8 h-12">
          <Button onClick={applyProgram}>신청하기</Button>
        </div>
      </Container>
      {/* {isAddressOpen && (
        <AddressModal
          onClose={() => setIsAddressOpen(false)}
          onChangeAddress={handleChangeAddress}
        />
      )} */}
    </>
  );
}

function SubTitle({ title }: { title: string }) {
  return <h1 className="text-xl font-semibold">{title}</h1>;
}
