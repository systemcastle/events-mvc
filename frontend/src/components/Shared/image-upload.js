import React, { useRef, useState, useEffect } from "react";
import { Button, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";

import "./image-upload.css";
import AvatarImage from "../../assets/avatar.jpg";
const useStyle = makeStyles((theme) => ({
  outerContainerImage: {
    "&.image-upload": {
      alignItem: "center",
    },
  },
  outerContainer: {
    marginBottom: "10px",
  },
  uploadImageButton: {
    fontSize: "0.8em",
    textTransform: "none",
  },
}));

const ImageUpload = (props) => {
  const { imageUrl, viewOnly, marginTop = 4 } = props;
  let image = imageUrl;
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const classes = useStyle();
  const filePickerRef = useRef();
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    let extension = event.target.files[0].type.split("/").pop();
    let extensionValid = true;
    if (extension === "jpg" || extension === "jpeg" || extension === "png") {
      extensionValid = true;
    } else {
      extensionValid = false;
    }
    if (
      event.target.files &&
      event.target.files.length === 1 &&
      extensionValid
    ) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
      image = "";
    } else {
      setIsValid(false);
      fileIsValid = false;
      setPreviewUrl("");
      image = "";
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div style={{ minHeight: "200px" }} className={`mt-${marginTop}`}>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div
        className={`image-upload center`}
        style={!match ? { paddingLeft: "0" } : { paddingLeft: "0em" }}
      >
        <div className="image-upload__preview">
          {previewUrl ? (
            <img src={previewUrl ? previewUrl : AvatarImage} alt="Preview" />
          ) : image ? (
            <img src={imageUrl} alt="Preview" />
          ) : (
            <img src={AvatarImage} alt="Default" />
          )}
        </div>
        {!viewOnly && (
          <Button
            variant="contained"
            disableElevation
            color="secondary"
            className={classes.uploadImageButton}
            onClick={pickImageHandler}
          >
            Upload Image
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
