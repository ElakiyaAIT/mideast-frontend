import { useState, useRef, type ChangeEvent, type JSX } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { useTranslation } from '../../i18n';
import React from 'react';

interface DocumentUploadProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  maxFiles?: number;
  onChange?: (files: File[]) => void;
  onRemove?: (index: number) => void;
  disabled?: boolean;
}

export const DocumentUpload = ({
  label,
  error,
  helperText,
  required,
  maxFiles = 5,
  onChange,
  disabled,
  onRemove,
}: DocumentUploadProps): JSX.Element => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasError = Boolean(error);
  const canAddMore = files.length < maxFiles;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    handleFiles(Array.from(selectedFiles));
  };

  const handleFiles = (newFiles: File[]): void => {
    const remainingSlots = maxFiles - files.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);

    const validFiles = filesToAdd.filter((file) =>
      [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ].includes(file.type),
    );

    if (validFiles.length > 0) {
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      onChange?.(updatedFiles);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrag = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled || !canAddMore) return;

    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleRemove = (index: number): void => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onChange?.(updated);
    onRemove?.(index);
  };

  const handleClick = (): void => {
    if (!disabled && canAddMore) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className='w-full'>
      {label && (
        <label className='mb-2 block text-lg font-bold tracking-wide dark:text-gray-300'>
          {label}
          {required && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}

      {/* Drop Zone */}
      <div
        className={`
          relative rounded-3xl border-2 border-dashed p-6 text-center transition-all bg-white dark:bg-black
          ${
            dragActive
              ? 'border-primary bg-primary/5'
              : hasError
                ? 'border-red-500'
                : 'border-slate-300 dark:border-slate-600'
          }
          ${
            !disabled && canAddMore
              ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800'
              : ''
          }
          ${disabled && 'cursor-not-allowed opacity-50'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type='file'
          multiple
          accept='.pdf,.doc,.docx,.xls,.xlsx'
          onChange={handleFileChange}
          disabled={disabled || !canAddMore}
          className='hidden'
        />

        <div className='flex flex-col items-center justify-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700'>
            <span className='material-icons-outlined text-lg text-primary'>upload_file</span>
          </div>

          <div>
            <p className='text-sm font-medium text-slate-700 dark:text-slate-300'>
              <span className='text-primary font-bold'>{t('Click here')}</span> to upload documents
            </p>

            <p className='mt-1 text-xs text-slate-400'>
              PDF, DOC, DOCX, XLS, XLSX (Max {maxFiles})
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className='mt-4 space-y-2'>
          {files.map((file, index) => (
            <div
              key={index}
              className='flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900'
            >
              <p className='truncate text-sm text-slate-700 dark:text-slate-300'>{file.name}</p>

              {!disabled && (
                <button
                  type='button'
                  onClick={() => handleRemove(index)}
                  className='rounded-full bg-red-500 p-1 text-white hover:bg-red-600'
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {helperText && !hasError && (
        <div className='mt-2 text-sm text-gray-500 dark:text-gray-400'>{helperText}</div>
      )}

      {hasError && (
        <div className='mt-2 flex items-start gap-1 text-sm text-red-600 dark:text-red-400'>
          <AlertCircle size={16} className='mt-0.5 flex-shrink-0' />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
