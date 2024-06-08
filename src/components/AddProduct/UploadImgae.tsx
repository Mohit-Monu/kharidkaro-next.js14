"use client";
import { imageType } from "@/interfaces/form";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";

const UploadImage = ({
  sendImageLink,
  underProgress,
}: {
  sendImageLink: React.Dispatch<React.SetStateAction<imageType>>;
  underProgress: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  interface IImage {
    url: string;
    name: string;
    size: number;
    fileName: string;
    progress: number;
    id: number;
    loading: boolean;
  }

  const [images, setImages] = useState<IImage[]>([]);

  async function uploadImageHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    Array.from(files).forEach(async (file) => {
      underProgress(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (event) => {
        if (!event.target) {
          return;
        }
        const result = event.target.result as string;
        const name = file.name;
        const size = file.size;
        const id = Date.now();
        const uploadedImages = {
          id: id,
          url: result,
          name: name,
          size: size,
          fileName: "",
          progress: 0,
          loading: true,
        };
        setImages((prevImages) => [...prevImages, uploadedImages]);
        const formData = new FormData();
        formData.append("image", file);
        try {
          const response = await axios.post(
            "/api/seller/uploadImage",
            formData,
            {
              onUploadProgress: (progressEvent) => {
                let progress = 0;
                if (progressEvent.total) {
                  progress = Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                  );
                }
                setImages((prevImages) =>
                  prevImages.map((image) =>
                    image.id === id ? { ...image, progress } : image
                  )
                );
              },
            }
          );
          setImages((prevImages) =>
            prevImages.map((image) =>
              image.id === id
                ? { ...image, fileName: response.data.Url, loading: false }
                : image
            )
          );
          sendImageLink((prev) => [
            ...prev,
            { localPath: result, serverPath: response.data.Url },
          ]);
          underProgress(false);
        } catch {
          setImages((prevImages) =>
            prevImages.filter((image) => image.id !== id)
          );
          underProgress(false);
        }
      };
    });

    e.target.value = "";
  }

  async function deleteImageHandler(
    e: React.MouseEvent<HTMLButtonElement>,
    image: IImage
  ) {
    e.preventDefault();
    underProgress(true);

    setImages((prevImages) =>
      prevImages.map((img) =>
        img.id === image.id ? { ...img, loading: true } : img
      )
    );
    try {
      const response = await axios.delete("/api/seller/uploadImage", {
        params: {
          image: image.fileName,
        },
      });
      if (response.status === 200) {
        setImages((prevImages) =>
          prevImages.filter((img) => img.id !== image.id)
        );
        sendImageLink((prev) =>
          prev.filter((img) => img.serverPath !== image.fileName)
        );
        underProgress(false);
      } else {
        underProgress(false);
        throw new Error("Failed to delete image");
      }
    } catch {
      setImages((prevImages) =>
        prevImages.map((img) =>
          img.id === image.id ? { ...img, loading: false } : img
        )
      );
      underProgress(false);
    }
  }
  return (
    <div className="font-sans text-gray-900 border-box">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center w-full bg-gray-100 rounded-xl">
          <div className="mt-10 mb-10 text-center">
            <h2 className="text-2xl font-semibold mb-2">
              Upload your Product Image
            </h2>
            <p className="text-sm text-gray-500">
              File should be of format jpeg, png, gif, webp, jpg
            </p>
          </div>
          <div className="relative w-4/5 h-32 max-w-xs mb-10 bg-white-200 bg-gray-100-200 rounded-lg shadow-inner">
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              className="hidden"
              multiple
              onChange={uploadImageHandler}
            />
            <label
              htmlFor="file-upload"
              className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
            >
              <p className="z-10 text-sm font-light text-center text-gray-500">
                Drag & Drop your files here
              </p>
              <svg
                className="z-12 w-13 h-13 text-indigo-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
              </svg>
            </label>
          </div>
        </div>
      </div>
      {images.length > 0 && (
        <div className="pb-2 pl-2 pr-2">
          {images.map((image) => (
            <div key={image.id}>
              <div
                className="flex flex-row items-center justify-between bg-gray-100 rounded-lg shadow-md p-4 mt-2 "
                style={{ height: "100px" }}
              >
                <Image
                  width={70}
                  height={70}
                  src={image.url}
                  alt={image.name}
                  className="bg-gray-100 rounded-lg shadow-inner "
                />
                <div>
                  <p className="font-semibold">{image.name}</p>
                  <p className="text-xs text-gray-500">
                    {image.size / 1000} Kb
                  </p>
                </div>

                {image.loading === false ? (
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={(e) => {
                      deleteImageHandler(e, image);
                    }}
                  >
                    <RiDeleteBin7Fill className="w-6 h-6 " />
                  </button>
                ) : (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </div>

              <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                  style={{ width: `${image.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default UploadImage;
