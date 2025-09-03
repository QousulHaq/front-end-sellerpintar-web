import React, { useRef } from 'react'

import Image from 'next/image'
import { useSession } from 'next-auth/react'

import AxiosInstance from '@/lib/axios'
import axios from 'axios'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { ImagePlus } from 'lucide-react'

const ImageUploader = ({ imageUrl, onImageChange, onErrorUpload }: { imageUrl: string, onImageChange: (data: string) => void, onErrorUpload: (data: string) => void }) => {

  const imageInputRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession();

  const pictureInputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await AxiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session?.user.accessToken}`
        },
      });
      console.log("Upload berhasil:", response.data)
      onImageChange(response.data.imageUrl)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        onErrorUpload(error.response?.data?.message || error.message)
        return
      }
      console.error(error)
    }
  }

  return (
    <div className="input-img space-y-1 w-[223px]">
      <Label className='text-slate-900 text-sm font-medium leading-5' htmlFor='picture'>Thumbnails</Label>
      <Input id='picture' type='file' className='hidden' ref={imageInputRef} onChange={pictureInputHandler}></Input>
      <div className="photo-input p-3 flex flex-col justify-center items-center gap-2 cursor-pointer h-[163px] border border-dashed border-slate-300 rounded-[8px] relative overflow-hidden" onClick={() => { imageInputRef.current?.click() }}>
        {
          imageUrl !== "" ? (
            <>
              <Image src={imageUrl === null ? "https://placehold.co/60x60/png" : imageUrl} fill className='absolute object-cover' alt='image-input' />
            </>
          ) : (
            <>
              <ImagePlus className='size-5 text-slate-500' />
              <div className="input-image-text-wrapper space-y-1">
                <p className='text-slate-500 text-xs font-normal leading-4 underline text-center'>Click to select files</p>
                <p className='text-slate-500 text-xs font-normal leading-4 text-center'>Suport File Type : jpg or png</p>
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default ImageUploader
