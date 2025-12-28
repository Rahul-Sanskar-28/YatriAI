import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Image as ImageIcon, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUpload, 
  currentImage, 
  className = '' 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(currentImage || null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('recipeImage', file);

      const token = localStorage.getItem('auth_token') || 'mock-token-tourist-123456789';
      
      // Determine upload endpoint based on current page/context
      const isPattachitraUpload = window.location.pathname.includes('patachitra') || 
                                  document.title.includes('Pattachitra') ||
                                  className?.includes('pattachitra');
      
      const uploadEndpoint = isPattachitraUpload 
        ? 'http://localhost:3001/api/pattachitra/upload-image'
        : 'http://localhost:3001/api/recipes/upload-image';
      
      const response = await fetch(uploadEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Upload failed');
      }

      const result = await response.json();
      const imageUrl = `http://localhost:3001${result.data.imageUrl}`;
      
      setPreviewImage(imageUrl);
      onImageUpload(imageUrl);
      
      console.log('✅ Image uploaded successfully:', result.data);
    } catch (error) {
      console.error('❌ Image upload error:', error);
      alert(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    uploadImage(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    onImageUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const openCamera = () => {
    cameraInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Recipe Photo
      </label>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileInputChange}
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {previewImage ? (
          // Image Preview
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative group"
          >
            <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
              <img
                src={previewImage}
                alt="Recipe preview"
                className="w-full h-full object-cover"
              />
              
              {/* Loading overlay */}
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                    <Loader className="w-5 h-5 animate-spin text-blue-500" />
                    <span className="text-sm font-medium">Uploading...</span>
                  </div>
                </div>
              )}

              {/* Remove button */}
              {!isUploading && (
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Replace buttons */}
              {!isUploading && (
                <div className="absolute bottom-2 left-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={openFileDialog}
                    className="flex-1 bg-white/90 text-gray-800 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Replace
                  </button>
                  <button
                    onClick={openCamera}
                    className="flex-1 bg-blue-500/90 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 flex items-center justify-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    Camera
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          // Upload Area
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {isUploading ? (
              // Uploading state
              <div className="flex flex-col items-center gap-3">
                <Loader className="w-8 h-8 animate-spin text-blue-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Uploading your recipe photo...
                </p>
              </div>
            ) : (
              // Upload options
              <div className="space-y-4">
                <div className="flex justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
                
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Add a photo of your recipe
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Drag and drop an image here, or click to browse
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={openCamera}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Camera className="w-5 h-5" />
                    Take Photo
                  </button>
                  
                  <button
                    type="button"
                    onClick={openFileDialog}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Image
                  </button>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Supports JPG, PNG, GIF up to 5MB
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;