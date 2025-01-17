import React, { useState } from "react";
import { Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem, FormControlLabel, Switch,
} from "@material-ui/core";


import ImageUpload from "../Shared/image-upload";
import { convertToFormData } from "../../utils/helpers";
import * as Actions from "../../store/AllActions";

const CreateAthlete = (props) => {
  const dispatch = useDispatch();
  const { selectedAthlete } = useSelector((state) => state.athletes);
  const { closeModal, edit = false } = props;
  const [eventImage, setEventImage] = useState(
    edit ? selectedAthlete.eventImage : ""
  );

  const submitHandler = (values, options) => {
    dispatch(
      Actions.createAthlete(
        convertToFormData({
          ...values,
          // eventDate: moment(values.date).format("MM/d/yyyy"),
          athleteImage: eventImage,
        }),
        closeModal,
        edit
      )
    );
  };
  const inputHandler = (id, photo, fileIsValid) => {
    setEventImage(photo);
  };
  return (
    <Formik
      initialValues={
        edit
          ? { ...selectedAthlete }
          : {
              sport: "",
              name: '',
              country: "",
              underInvestigation: false,
            }
      }
      onSubmit={(values, options) => submitHandler(values, options)}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <form action="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-center">
              <ImageUpload
                id={"image"}
                onInput={inputHandler}
                errorText={"Please provide an image."}
                imageUrl={edit ? selectedAthlete.athleteImage : ""}
              />
            </div>
              <div>
                  <Field
                      as={TextField}
                      label="Name"
                      name="name"
                      type="text"
                      required
                      variant="outlined"
                      className="w-full"
                  />
              </div>
            <div>
              <FormControl variant="outlined" className="w-full">
                <InputLabel id="demo-simple-select-outlined-label">
                  Sports
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Age"
                  onChange={(e) => {
                    setFieldValue("sport", e.target.value);
                  }}
                  value={values.sport}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="soccer">Soccer</MenuItem>
                  <MenuItem value="tennis">Tennis</MenuItem>
                  <MenuItem value="cricket">Cricket</MenuItem>
                  <MenuItem value="basketball">BasketBall</MenuItem>
                  <MenuItem value="badminton">Badminton</MenuItem>
                  <MenuItem value="golf">Golf</MenuItem>
                  <MenuItem value="baseball">Baseball</MenuItem>
                  <MenuItem value="baseball">Baseball</MenuItem>
                </Select>
              </FormControl>
            </div>

              <div>
                  <FormControl variant="outlined" className="w-full">
                      <InputLabel id="demo-simple-select-outlined-country">
                          Country
                      </InputLabel>
                      <Select
                          labelId="demo-simple-select-outlined-country"
                          id="demo-simple-select-country"
                          label="Country"
                          onChange={(e) => {
                              setFieldValue("country", e.target.value);
                          }}
                          value={values.country}
                      >
                          <MenuItem value="">
                              <em>None</em>
                          </MenuItem>
                          <MenuItem value="usa">USA</MenuItem>
                          <MenuItem value="france">France</MenuItem>
                          <MenuItem value="canada">Canada</MenuItem>
                          <MenuItem value="spain">Spain</MenuItem>
                          <MenuItem value="russia">Russia</MenuItem>
                          <MenuItem value="china">China</MenuItem>
                          <MenuItem value="brazil">Brazil</MenuItem>
                          <MenuItem value="southkorea">South Korea</MenuItem>
                          <MenuItem value="germany">Germany</MenuItem>
                          <MenuItem value="england">England</MenuItem>
                          <MenuItem value="scotland">Scotland</MenuItem>
                          <MenuItem value="ireland">Ireland</MenuItem>
                      </Select>
                  </FormControl>
              </div>
            <div>
                <FormControlLabel
                    control={
                        <Switch
                            checked={values.underInvestigation}
                            onChange={e=>setFieldValue('underInvestigation',e.target.checked)}
                            color="primary"
                        />
                    }
                    label="Under Investigation"
                />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                color="primary"
                variant="contained"
                onClick={props.closeModal}
              >
                Cancel
              </Button>
              <Button color={"secondary"} variant={"contained"} type={"submit"}>
                Submit
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
export default CreateAthlete;
