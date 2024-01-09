"use client";
import { ShowcaseData, showcaseSchema } from "@/components/events/SchemaZOD";
import DroneDropdown from "@/components/gallery/dropdown";
import HeightMarker from "@/components/gallery/HeighMarker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getBase64 } from "@/lib/utils";
import HcaptchaForm from "@/lib/utils/HCatchaForm";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";

import { useDropzone } from "react-dropzone";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldValue,
} from "react-hook-form";
import { MdOutlineCloudUpload, MdPreview } from "react-icons/md";
import CustomModal from "@/lib/utils/CustomModal";
import { FaArrowsAltV } from "react-icons/fa";
import { uploadImageToSanity } from "@/lib/sanity/sanity.upload";

const ShowcaseForm = ({ drones }: { drones: Drone[] }) => {
  const form = useForm({
    resolver: zodResolver(showcaseSchema),
  });
  const [preview, setPreview] = useState<string | unknown>();
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    getValues,
  } = form;
  const { acceptedFiles, getRootProps, getInputProps, isDragAccept } =
    useDropzone({
      onDrop: async (files) => {
        setPreview(await getBase64(files[0]));
        setValue("image", files[0]);
      },
    });
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null);
  const handleHCaptchaVerify = (token: string | null) => {
    setHCaptchaToken(token);
  };
  const onSubmit1 = async (data: any) => {
    if (!hCaptchaToken) {
      toast({
        description: "finish the captcha",
        variant: "destructive",
      });
      return;
    }
    console.log("capta now is", hCaptchaToken);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md   p-4">
          <code className="text-slate-700">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      ),
    });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdImage, setCreatedImage] = useState<ImageUploadResponse | null>(
    null
  );
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const openPreview = () => {
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const onSubmit = async (data: any) => {
    if (!hCaptchaToken) {
      toast({
        description: " ⚠️ Please complete the hCaptcha challenge",
      });
      return;
    }
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md   p-4">
          <code className="text-slate-700">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      ),
    });
    if (!getValues().image) {
      toast({
        description: " ⚠️ Please select an image to upload",
      });
      return;
    }

    // Upload the image to Sanity and get the created image document
    const createdImage = await uploadImageToSanity(
      getValues().image,
      getValues().selectedDrone,
      getValues().caption,
      getValues().height
    );

    if (createdImage) {
      setCreatedImage(createdImage);
      toast({
        description: " ✔️ Successfuly uploaded",
        variant: "success",
      });
    } else {
      toast({
        description:
          " ⚠️ Sorry, we could not save your file, please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <div className="w-full text-slate-900">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Email</FormDescription>
                  <FormControl>
                    <Input
                      placeholder="Email to be displayed in showcase"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full ml-2 text-slate-900">
            <FormField
              name="selectedDrone"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <FormItem>
                  <FormDescription className="ml-2">Drone</FormDescription>
                  <DroneDropdown
                    drones={drones}
                    onSelect={(drone) => field.onChange(drone)}
                  />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="flex">
          <div className="mt-2 w-36 h-36 text-slate-900">
            <Card
              {...getRootProps({ onClick: (e) => e.preventDefault() })}
              className={`bg-muted h-36 w-36 flex justify-center items-center border-dashed border-2 hover:border-muted-foreground/50 hover:cursor-pointer  `}
            >
              <>
                <MdOutlineCloudUpload className="h-60" />

                <input
                  type="file"
                  name="file"
                  // onChange={e => changeFile(e)}
                  {...getInputProps()}
                />
              </>
            </Card>
          </div>
          <div className="w-full mt-2 ml-2 text-slate-900">
            <Textarea
              {...register("caption")}
              maxLength={250}
              placeholder={"captured with care.."}
              className="h-36"
              rows={4}
              cols={50}
            />
          </div>
          <div className="flex flex-col items-center mt-2 ml-2 ">
            <HcaptchaForm onVerify={handleHCaptchaVerify} />
          </div>
        </div>
        <div className="flex items-center mt-2 ml-2 "></div>

        {acceptedFiles && acceptedFiles.length > 0 && (
          <div>
            <div className="flex items-center justify-between">
              <Card
                className={` h-36 w-64 flex justify-center flex-wrap items-center bg-muted bottom-2 p-2`}
                onClick={openModal}
              >
                <FaArrowsAltV title="took from height" />
                {getValues().height} ft
              </Card>
              <Card
                className={` h-36 w-64  flex justify-center flex-wrap items-center bg-muted bottom-2 p-2`}
                onClick={openPreview}
              >
                <div className="relative ">
                  <img
                    width="0"
                    height="0"
                    style={{ width: "80px", height: "auto" }}
                    src={preview as string | undefined}
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="p-2 text-lg font-semibold text-white bg-black bg-opacity-50 rounded">
                      <MdPreview />
                    </span>
                  </div>
                </div>
              </Card>
              <Button
                type="submit"
                className="flex items-center justify-center w-64 p-2 text-lg bg-green-200 hover:bg-green-300 h-36 bottom-2 text-slate-900 "
              >
                Save this
              </Button>

              {isModalOpen && (
                <CustomModal onClose={closeModal}>
                  <div className="relative transition-transform duration-200 ease-out">
                    <Controller
                      name="height"
                      control={control}
                      defaultValue={0}
                      render={({ field }) => (
                        <HeightMarker
                          heightParam={0}
                          setHeightParam={(h) => field.onChange(h)}
                        />
                      )}
                    />
                  </div>
                </CustomModal>
              )}
            </div>
            <div>
              {isPreviewOpen && (
                <CustomModal onClose={closePreview}>
                  <div className="relative transition-transform duration-200 ease-out">
                    <img
                      src={preview as string | undefined}
                      alt="drone image"
                      width={0}
                      height={0}
                      style={{ height: "auto", width: "400px" }}
                    />
                    <div className="absolute inset-0 flex items-start justify-start">
                      <span className="p-2 text-sm font-semibold text-white bg-black bg-opacity-50 ">
                        {getValues().height}
                      </span>
                    </div>
                    <div className="absolute inset-0 bottom-0 flex items-end justify-items-start ">
                      <span className="p-2 text-sm font-semibold text-white truncate bg-black bg-opacity-50">
                        {getValues().caption}
                      </span>
                    </div>
                  </div>
                </CustomModal>
              )}
            </div>
          </div>
        )}

        {/* Third Row with three buttons, set height, see /hide preview and save */}

        {/* {Object.keys(errors).map((errorKey, index) => (
          <div key={index} className="text-red-500">
            {errors[errorKey]?.message}
          </div>
        ))} */}
      </form>
    </Form>
  );
};

export default ShowcaseForm;
