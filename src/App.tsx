import { Button, Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [load, loading] = useState<boolean>(false);
  const [size, SetSize] = useState<string>("150");
  const [text, SetText] = useState<string>("");
  const [img, setimg] = useState<string>("");

  function generateqr() {
    try {
      loading(true);
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
        text
      )}`;
      setimg(url);
    } catch (error: any) {
      toast.error("Error in Generating");
    } finally {
      loading(false);
    }
  }

  function downloadqr() {
    loading(true);
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const qrlink = document.createElement("a");
        qrlink.href = URL.createObjectURL(blob);
        qrlink.download = "QRcode.png";
        document.body.appendChild(qrlink);
        qrlink.click();
        document.body.removeChild(qrlink);
      });
    loading(false);
  }

  return (
    <>
      <div>
        <div className="flex justify-center items-center h-dvh bg-grd ">
          <div className="w-full mx-3 md:w-1/2 lg:w-1/4">
            <h1 className="text-blue-500 text-xl font-bold my-5">
              QR-Generator
            </h1>

            <div>
              {img !== "" ? (
                <div>
                  {load ? (
                    <div className="flex justify-center my-12 py-6">
                      <Spinner color="primary" />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={img}
                        id="qrimg"
                        className="  mx-auto py-5 "
                        alt=""
                      />
                    </div>
                  )}
                </div>
              ) : (
                <h1 className="text-center text-xl text-black my-12 py-6">
                  QR-Image
                </h1>
              )}
            </div>

            {/* 
                           <Skeleton className="rounded-lg w-1/2 mx-auto">
                  <div className="h-40  rounded-lg bg-blue-500"></div>
                </Skeleton> */}

            <Input
              variant="faded"
              type="text"
              size="sm"
              color="primary"
              className="my-4"
              value={text}
              label="Enter Content"
              onChange={(e: any) => SetText(e.target.value)}
            />

            <Input
              variant="faded"
              label="Enter Size (Recommended 150 )"
              type="number"
              size="sm"
              color="primary"
              className="my-4"
              value={size}
              onChange={(e: any) => SetSize(e.target.value)}
            />

            <div className="flex gap-5 justify-around my-12">
              <div className="text-center">
                <Button
                  className="text-blue-600 font-semibold bg-blue-200 border-2 border-blue-600"
                  onPress={downloadqr}
                >
                  Download
                </Button>
              </div>

              <div className="text-center">
                <Button
                  className="text-blue-600 font-semibold bg-blue-200 border-2 border-blue-600"
                  onPress={generateqr}
                  isLoading={load}
                >
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
