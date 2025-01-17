import React, { Fragment, useState } from "react";
import { Button, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import FlagIcon from '@material-ui/icons/Flag';
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import classes from "./event-item.module.css";

import * as Actions from "../../store/AllActions";

import imageLogo from "../../assets/images/coding-event.jpg";
import avatar from "../../assets/avatar.jpg";
import Model from "../Shared/Model";
import CreateEventForm from "./CreateAthlete";

function EventItem(props) {
  const {  image, id, athlete,name,sport,country,disbaleButtons } = props;
  const history = useHistory();
  const { athletes } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const toggleModel = () => {
    setOpen(!open);
  };

  const exploreEventHandler = () => {
    dispatch(Actions.setSelectedAthlete(athlete));
    history.push("/athlete/" + id);
  };
  const handleEdit = () => {
    dispatch(Actions.setSelectedAthlete(athlete));
    toggleModel();
  };
  const handleDelete = () => {
    dispatch(Actions.deleteAthlete(id));
  };

  return (
    <li className={classes.item}>
      <Model open={open} setOpen={setOpen} title="Create an event">
        <CreateEventForm closeModal={toggleModel} edit={true} />
      </Model>
      <img src={image ? image : avatar} alt={'image'} width={250} height={160} />
      <div className={classes.content}  >
        <div className={classes.summary}>
          <h2>{name}</h2>
          <div className={classes.date}>
            <SportsBaseballIcon />
            <time>{sport}</time>
          </div>
          <div className={classes.address}>
            <FlagIcon />
            <address>{country}</address>
          </div>
          {athlete.underInvestigation &&  <div className={classes.address} style={{color:"red"}}>
            <h3 style={{fontWeight:"bold"}}>Under Investigation</h3>
          </div>}
        </div>
        {!disbaleButtons && <div className={classes.actions}>
          <IconButton onClick={handleDelete} color={"primary"}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
          <IconButton onClick={handleEdit} color={"primary"}>
            <EditIcon></EditIcon>
          </IconButton>

          <Button
              className="mt-1"
              color="secondary"
              variant="contained"
              onClick={exploreEventHandler}
          >
            Explore Athlete <ArrowForwardIcon></ArrowForwardIcon>
          </Button>
        </div>}

      </div>
    </li>
  );
}

export default EventItem;
