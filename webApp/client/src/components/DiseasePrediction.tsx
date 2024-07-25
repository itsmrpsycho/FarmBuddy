import React, { useRef, useState } from "react";
import axios from "axios";
import ImageContainer from "./ImageContainer"; // Import the ImageContainer component

const Form = () => {
  const [imageVis, setImageVis] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [label, setLabel] = useState("");
  const [uploadingStatus, setUploadingStatus] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(event.currentTarget);
    const file = formData.get("file") as File | null;

    console.log("Form submitted");

    if (file && file.name != "") {
      setUploadingStatus(true);
      const selectedFile = file as File;
      console.log("File name:", selectedFile.name);
      console.log("File size:", selectedFile.size);
      console.log("File type:", selectedFile.type);

      // Send the file to the backend
      const formDataToSend = new FormData();
      formDataToSend.append("file!", selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:8080/uploadDisease",
          formDataToSend
        );

        console.log("File uploaded successfully", response.data);
        setImageVis(true);
        setUploadingStatus(false);
        setImgSrc(response.data.file_path);
        setLabel(response.data.model_output);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      console.log("No file selected");
    }
  };

  const handleClose = () => {
    setImageVis(false);
    setUploadingStatus(false);
    setLabel("");
    console.log("Close button clicked");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="file"
            className="form-control"
            id="inputGroupFile02"
            name="file"
            ref={fileInputRef}
          />
          {!imageVis && !uploadingStatus && (
            <input className="btn btn-primary" type="submit" value="Upload" />
          )}

          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => handleClose()}
          >
            Close
          </button>
        </div>
        <div>
          {!uploadingStatus && imageVis && (
            <ImageContainer imageVis={imageVis} label={label} imgSrc={imgSrc} />
          )}
        </div>
        <div className="centre-container">
          {uploadingStatus && (
            <img
              src="loading.gif"
              alt="Model is Processing image"
              width="50"
              height="50"
            />
          )}
        </div>
        <div className="centre-container">
          {uploadingStatus && <p>Model is processing the image</p>}
        </div>
      </form>
    </>
  );
};

export default Form;
