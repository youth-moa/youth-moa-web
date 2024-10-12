import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useContext } from "react";
import { Alert } from "./components/common/Alert";
import { router } from "./routes";
import { CommonContext } from "./store/CommonContext";

const queryClient = new QueryClient();

function App() {
  const { alert, setCommon } = useContext(CommonContext);
  const onCloseAlert = () => {
    setCommon &&
      setCommon((prev) => ({
        ...prev,
        alert: { ...prev.alert, isShow: false },
      }));
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        theme="light"
        limit={1}
      />
      {alert.isShow && (
        <Alert message={alert.message} onClick={onCloseAlert ?? (() => {})} />
      )}
    </>
  );
}

export default App;
