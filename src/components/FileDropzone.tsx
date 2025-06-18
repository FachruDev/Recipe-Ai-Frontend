import React, { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { Button } from './ui/Button';

interface FileDropzoneProps {
  onFileSelected: (file: File) => void;
  onFileRemoved: () => void;
  selectedFile: File | null;
  accept: string;
  maxSize?: number; 
  onError?: (error: string) => void;
}

export function FileDropzone({
  onFileSelected,
  onFileRemoved,
  selectedFile,
  accept,
  maxSize = 1 * 1024 * 1024, 
  onError
}: FileDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    const fileType = file.type.toLowerCase();
    const acceptedTypes = accept.split(',').map(type => type.trim().toLowerCase());
    
    if (!acceptedTypes.some(type => {
      if (type.endsWith('/*')) {
        const category = type.split('/')[0];
        return fileType.startsWith(`${category}/`);
      }
      return type === fileType;
    })) {
      if (onError) onError(`Invalid file type. Please select ${accept} files.`);
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      if (onError) onError(`File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`);
      return;
    }

    onFileSelected(file);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
        isDragging
          ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
          : selectedFile
          ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20'
          : 'border-gray-300 dark:border-gray-700'
      }`}
      onClick={() => fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {selectedFile ? (
        <div className="text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-2">Selected file: {selectedFile.name}</p>
          <p className="text-xs text-gray-500 mb-3">
            {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type}
          </p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onFileRemoved();
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
          >
            Remove
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Drag and drop your image here, or click to browse
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Supported formats: JPG, PNG, GIF • Max size: {maxSize / (1024 * 1024)}MB
          </p>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept={accept}
        className="hidden"
      />
    </div>
  );
} 