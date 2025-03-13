import { useState } from "react";
import styles from "./ImageUploader.module.css";
import trashIcon from "../../assets/trash-icon.svg";

interface ImageUploaderProps {
  onImageSelect: (file: File | null) => void;
}

export default function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSizeInBytes = 600 * 1024;
      if (file.size > maxSizeInBytes) {
        setError("File size exceeds 600KB. Please upload a smaller image.");
        setPreview(null);
        onImageSelect(null);
        return;
      }
      setError(null);
      onImageSelect(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const deleteImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onImageSelect(null);
    setPreview(null);
    setError(null);
  };

  return (
    <>
      <div className={styles.uploadContainer}>
        <div
          className={styles.uploadBox}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          {preview ? (
            <img src={preview} alt="Preview" className={styles.previewImage} />
          ) : (
            <span className={styles.uploadText}>Click to upload image</span>
          )}
          {preview && (
            <button onClick={(e) => deleteImage(e)}>
              <img src={trashIcon} alt="Delete" />
            </button>
          )}
        </div>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.hiddenInput}
        />
      </div>
    </>
  );
}
