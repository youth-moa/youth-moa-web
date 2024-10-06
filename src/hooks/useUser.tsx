export function useUser() {
  const accessToken = localStorage.getItem("accessToken");

  // const [isLogin, setIsLogin] = useState(false);

  // const getExpirationToken = async () => {
  //   try {
  //     const response = await checkExpirationToken();

  //     if (!response.success) {
  //       setIsLogin(false);
  //       localStorage.removeItem("accessToken");
  //       localStorage.removeItem("refreshToken");
  //       throw response;
  //     }

  //     // const accessToken = localStorage.getItem("accessToken");
  //     setIsLogin(true);
  //   } catch (error: any) {
  //     console.error(error);
  //   }
  // };

  return { accessToken };
}
