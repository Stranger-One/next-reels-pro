"use client";

import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video" | "file";
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType="image",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    console.log("Success", response);
    setError(null);
    setUploading(false);
    onSuccess(response);
  };

  const handleUploadProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onprogress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      if (onProgress) {
        onProgress(Math.round(percentComplete));
      }
    }
  };

  const handleUploadStart = () => {
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video")) {
        setError("Please select a video file");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        // 100MB
        setError(
          "Video file size is too large. Please select a file under 100MB"
        );
        return false;
      }
    } else {
      const imageTypes = ["image/png", "image/jpeg", "image/webp"];
      if (!imageTypes.includes(file.type)) {
        setError("Please select an image file");
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        // 100MB
        setError(
          "Image file size is too large. Please select a file under 10MB"
        );
        return false;
      }
    }

    return true;
  };

  return (
    <div className="App">
      <IKUpload
        fileName={
          fileType === "video" ? `video-${Date.now()}` : `image-${Date.now()}`
        }
        useUniqueFileName={true}
        validateFile={validateFile}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadProgress={handleUploadProgress}
        onUploadStart={handleUploadStart}
        folder={fileType === "video" ? "/video" : "/image"}
        className="file-input file-input-bordered w-full"
        accept={fileType === "video" ? "video/*" : "image/*"}
      />

      {
        uploading && (
            <div className="flex items-center gap-2 text-sm text-primary">
                <Loader2 className="animate-spin w-5 h-5" />
            </div>
        )
      }

      {
        error && (
            <div className="text-red-500 text-sm">{error}</div>
        )
      }
      
    </div>
  );
}
