'use client'

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PlusCircle, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
    values : string[] | [],
    onChange: (imgUrl:string) => void, 
    onRemove: (emptyString:string) => void,
    loading: boolean
}
export const ImageUpload = ({values, onChange, onRemove, loading} : ImageUploadProps) => {
    const CldUploadPreset_billboard = process.env.NEXT_PUBLIC_CLOUDINARY_BILLBOARD_UPLOAD_PRESET;
    
    const [isInClient, setIsInClient] = useState(false);

    useEffect(() => {
      setIsInClient(true)
    }, []);

    
    const onUpload = (result: any, widget : any) => {
        const uploadedImgUrl = result.info.secure_url;
        onChange(uploadedImgUrl);
        widget.close();
    }

    if (!isInClient) {
        return null;
    }
    
  return (
    <div>
        <div className="mb-4 flex items-center gap-4">
            {values.map((imgUrl) => (
                <div 
                key={imgUrl}
                className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                    <div 
                    className="absolute top-2 right-2 z-10"
                    >
                        <Button
                        type="button"
                        variant={"destructive"}
                        onClick={() => onRemove(imgUrl)}
                        size={"sm"}
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>

                    <Image 
                    fill
                    className="object-cover"
                    src={imgUrl}
                    alt="billboard image"
                    />
                </div>
            ))}
        </div>

        <CldUploadWidget uploadPreset={CldUploadPreset_billboard} onUpload={onUpload}>
            {({open}) => {

                const onClick = () => {
                    // Open cloudinary upload panel
                    open();
                }

                return(
                    <Button 
                    type="button" 
                    variant={"secondary"}
                    onClick={onClick}
                    >
                        <PlusCircle className="mr-2"/>
                        <span>Upload image(s)</span>
                    </Button>
                )
            }}
        </CldUploadWidget>

    </div>
  )
}

// this component contains 
// 1. img upload button
// 2. img viewer
// 3. delete uploaded img
