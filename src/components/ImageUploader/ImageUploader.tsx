import { useState } from "react";
import styles from "./ImageUploader.module.css";
import trashIcon from "../../assets/trash-icon.svg";
import uploadIcon from "../../assets/gallery-export.svg";

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
        setError("ფაილის ზომა მეტია 600KB-ზე.");
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
        {preview ? (
          <div className={styles.preview}>
            <img src={preview} alt="Preview" className={styles.previewImage} />
            <button onClick={(e) => deleteImage(e)}>
              <img src={trashIcon} alt="Delete" />
            </button>
          </div>
        ) : (
          <div
            className={styles.uploadClickCont}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <img src={uploadIcon} alt="" />
            <span className={styles.uploadText}>ატვირთე ფოტო</span>
            {error && <div style={{color:"red", fontSize:"11px"}}>{error}</div>}
          </div>
        )}
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
