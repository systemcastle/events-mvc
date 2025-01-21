import React, { Fragment, useState } from "react";
import { Formik, Field } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";

import { useDispatch } from "react-redux";

import * as Actions from "../../store/AllActions";
import classes from "./events-search.module.css";
import Model from "../Shared/Model";
import CreateEventForm from "./CreateAthlete";

function EventsSearch(props) {
  const [open, setOpen] = useState(false);
  const toggleModel = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();
  const submitHandler = (values) => {
    dispatch(Actions.searchAthlete(values));
  };
  return (
    <Fragment>
      <Model open={open} setOpen={setOpen} title="Create an athlete">
        <CreateEventForm closeModal={toggleModel} />
      </Model>
      <Formik
        initialValues={{
          sport: "",
          country: '',
        }}
        onSubmit={(values, options) => submitHandler(values, options)}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 w-full gap-2">
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
            </div>
            <Button color={"secondary"} variant="contained" type="submit">
              Find Athlete
            </Button>
            <Button color="primary" variant="contained" onClick={toggleModel}>
              Create Athlete
            </Button>
          </form>
        )}
      </Formik>
    </Fragment>
  );
}

export default EventsSearch;
