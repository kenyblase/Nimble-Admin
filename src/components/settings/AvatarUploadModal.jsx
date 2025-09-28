import { ChevronLeft } from "lucide-react";
import React, { useRef, useState } from "react";
import BlueGradientButton from "../BlueGradientButton";
import { useUploadAvatar } from "../../utils/useApis/useSettingsApis/useUploadAvatar";
import toast from "react-hot-toast";
import { useAuthStore } from "../../utils/api/store/useAuthStore";

function AvatarUploadModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [selectedImage, setSelectedImage] = useState('')
  const fileInputRef = useRef(null);
  const {uploadAvatar, isUploading} = useUploadAvatar()
  const {setAdmin} = useAuthStore()

  const fileToDataURL = (file)=> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

  const handleImageSelect = async(e)=>{
    const file = e.target.files[0];
    try {
      const dataURL = await fileToDataURL(file);
      setSelectedImage(dataURL)
    } catch (err) {
      console.error("Error:", err);
    }
  }

  const handleButtonClick = () => {
      fileInputRef.current.click(); // 👈 triggers the file picker
    };

  const handleUploadAvatar = async()=>{
    const admin = await uploadAvatar({selectedImage})
    setAdmin(admin)
    setSelectedImage('')
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-[#2E2E2E] opacity-70"
        onClick={onClose}
      />

      <div className="relative flex flex-col gap-4 bg-white w-[800px] max-w-full rounded-lg shadow-lg p-10 z-10">
        <div onClick={onClose} className="flex items-start gap-1">
          <ChevronLeft color="#666666"/> 
          <p className="text-[#666666] font-semibold">Back to edit</p>
        </div>
        
        <input ref={fileInputRef} onChange={handleImageSelect} type="file" accept=".jpeg,.jpg,.png,.gif,.mp4" id="image-picker" className="hidden"/>
        <div className="flex flex-col gap-5">
          {selectedImage ? (
            <div className="flex items-center justify-center h-72 ">
              <div className="flex flex-col items-center justify-center bg-[#FAFAFA] border-dashed border-[#EBEBEB] rounded-[20px]">
                <div className="rounded-[20px] py-5 px-5">
                <img src={selectedImage} alt="avatar preview" className="w-[225px] h-[250px] object-cover rounded-lg"/>
                </div>
              </div>
            </div>
          ) : (
            <label htmlFor="image-picker" className="flex items-center justify-center bg-[#FAFAFA] border-dashed border-[#EBEBEB] h-72 rounded-[20px]">
              <div className="flex flex-col items-center justify-center">
                <span>{icons.upload}</span>
                <p className="font-semibold text-lg text-[#666666] text-center">Click to choose file</p>
                <p className="font-medium text-sm text-[#BCBCBC] text-center">File format:  .JPEG, .PNG, .MP4, Gif</p>
                <p className="font-medium text-[10px] text-[#2AC472] text-center"><span className="text-[#D61C2B]">*</span>File size should not be more than 20mb</p>
              </div>
            </label>
          )}
          <div className="flex flex-col gap-4">
              <BlueGradientButton
                icon={icons.buttonUpload}
                text={selectedImage ? 'Upload this picture' : 'Select file to upload'}
                handleClick={selectedImage ? handleUploadAvatar : handleButtonClick}
                isLoading={isUploading}
              />
            <button disabled={isUploading} onClick={selectedImage ? handleButtonClick : onClose} className={`px-15 py-4 rounded-lg cursor-pointer font-semibold ${selectedImage ? 'text-[#D61C2B]' : 'text-[#666666]'}`}>{selectedImage ? 'No, Choose another one' : 'Cancel upload'}</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AvatarUploadModal;

const icons = {
  upload: <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M48.5257 23.7936H41.7824C36.2524 23.7936 31.7491 19.2903 31.7491 13.7603V7.01693C31.7491 5.73359 30.6991 4.68359 29.4157 4.68359H19.5224C12.3357 4.68359 6.52573 9.35026 6.52573 17.6803V38.3536C6.52573 46.6836 12.3357 51.3503 19.5224 51.3503H37.8624C45.0491 51.3503 50.8591 46.6836 50.8591 38.3536V26.1269C50.8591 24.8436 49.8091 23.7936 48.5257 23.7936ZM27.5957 31.5869C27.2457 31.9369 26.8024 32.1003 26.3591 32.1003C25.9157 32.1003 25.4724 31.9369 25.1224 31.5869L23.4424 29.9069V39.6836C23.4424 40.6403 22.6491 41.4336 21.6924 41.4336C20.7357 41.4336 19.9424 40.6403 19.9424 39.6836V29.9069L18.2624 31.5869C17.5857 32.2636 16.4657 32.2636 15.7891 31.5869C15.1124 30.9103 15.1124 29.7903 15.7891 29.1136L20.4557 24.4469C20.6191 24.3069 20.7824 24.1903 20.9691 24.0969C21.0157 24.0736 21.0857 24.0503 21.1324 24.0269C21.2724 23.9803 21.4124 23.9569 21.5757 23.9336C21.6457 23.9336 21.6924 23.9336 21.7624 23.9336C21.9491 23.9336 22.1357 23.9803 22.3224 24.0503C22.3457 24.0503 22.3457 24.0503 22.3691 24.0503C22.5557 24.1203 22.7424 24.2603 22.8824 24.4003C22.9057 24.4236 22.9291 24.4236 22.9291 24.4469L27.5957 29.1136C28.2724 29.7903 28.2724 30.9103 27.5957 31.5869Z" fill="#1C1C1C"/>
<path d="M41.3624 20.5734C43.579 20.5967 46.659 20.5967 49.2957 20.5967C50.6257 20.5967 51.3257 19.0334 50.3924 18.1001C47.0324 14.7167 41.0124 8.62675 37.559 5.17341C36.6024 4.21675 34.9457 4.87008 34.9457 6.20008V14.3434C34.9457 17.7501 37.839 20.5734 41.3624 20.5734Z" fill="#1C1C1C"/>
</svg>,

  buttonUpload: <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.69238 17.5156V11.5156L7.69238 13.5156" stroke="#EBF2FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.69238 11.5156L11.6924 13.5156" stroke="#EBF2FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.6924 10.5156V15.5156C22.6924 20.5156 20.6924 22.5156 15.6924 22.5156H9.69238C4.69238 22.5156 2.69238 20.5156 2.69238 15.5156V9.51562C2.69238 4.51562 4.69238 2.51562 9.69238 2.51562H14.6924" stroke="#EBF2FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.6924 10.5156H18.6924C15.6924 10.5156 14.6924 9.51562 14.6924 6.51562V2.51562L22.6924 10.5156Z" stroke="#EBF2FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
}
