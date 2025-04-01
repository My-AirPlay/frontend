'use client'
import React, { useState, useRef } from 'react';
import { Upload, Download } from 'lucide-react';

interface FileUploaderProps {
  onFileSelected?: (file: File) => void;
  supportedFormats?: string[];
  maxFileSize?: number; // in MB
  className?: string;
  uploadText?: string;
  browseText?: string;
  containerClassName?: string;
  icon?: React.ReactNode;
  id: string
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelected,
  supportedFormats = ['PDF', 'MSDOC'],
  maxFileSize = 40,
  className = '',
  uploadText = 'Upload or',
  browseText = 'Browse',
  containerClassName = '',
  icon = <Download size={24} className="text-white/60" />,
  id
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.size > maxFileSize * 1024 * 1024) {
      console.error(`File size exceeds limit of ${maxFileSize}MB`);
      return;
    }

    onFileSelected?.(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-2 border-dashed ${isDragging ? 'border-primary' : 'border-primary/50'} rounded-md p-10 flex flex-col items-center justify-center ${containerClassName}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}

    >
      <label className="flex flex-col items-center justify-center size-full" htmlFor={id}>
        <div className="w-16 h-16 bg-background rounded-full mb-4 flex items-center justify-center">
          {icon}
        </div>
        <div className="text-center">
          <p className="mb-2">
            {uploadText} <span className="text-primary cursor-pointer" onClick={handleBrowseClick}>{browseText}</span>
          </p>
          <p className="text-sm text-white/60">
            Supported formats: {supportedFormats.join(', ')}
          </p>
          <p className="text-sm text-white/60">
            File Size: Not more than {maxFileSize}MB
          </p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept={supportedFormats.map(format => `.${format.toLowerCase()}`).join(',')}
          id={id}
        />
      </label>
    </div>
  );
};

export default FileUploader;
