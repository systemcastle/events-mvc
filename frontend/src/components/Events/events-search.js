import React, { Fragment, useState } from "react";
import { Formik, Field } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import { useDispatch, useSelector } from "react-redux";

import * as Actions from "../../store/AllActions";
import classes from "./events-search.module.css";
import Model from "../Shared/Model";
import CreateEventForm from "./CreateEventForm";

function EventsSearch(props) {
  const [open, setOpen] = useState(false);
  const toggleModel = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();
  const submitHandler = (values, options) => {
    dispatch(Actions.searchEvents(values));
  };
  return (
    <Fragment>
      <Model open={open} setOpen={setOpen} title="Create an event">
        <CreateEventForm closeModal={toggleModel} />
      </Model>
      <Formik
        initialValues={{
          sport: "",
          date: new Date(),
        }}
        onSubmit={(values, options) => submitHandler(values, options)}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 w-full gap-2">
              <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    id="event-date"
                    label="Select Date"
                    inputVariant="outlined"
                    format="MM/DD/yyyy"
                    onChange={(value) => setFieldValue("date", value)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    value={values.date}
                    emptyLabel="Select Date"
                    animateYearScrolling={true}
                    allowKeyboardControl={false}
                    autoOk={true}
                    className="w-full"
                  />
                </MuiPickersUtilsProvider>
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
              Find Events
            </Button>
            <Button color="primary" variant="contained" onClick={toggleModel}>
              Create Event
            </Button>
          </form>
        )}
      </Formik>
    </Fragment>
  );
}

export default EventsSearch;
