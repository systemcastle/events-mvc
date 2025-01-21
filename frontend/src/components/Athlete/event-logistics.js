import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import LogisticsItem from "./logistics-item";
import classes from "./event-logistics.module.css";
import FlagIcon from '@material-ui/icons/Flag';
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import SearchIcon from '@material-ui/icons/Search';

import imageLogo from "../../assets/images/extrovert-event.jpg";
import React, {Fragment} from "react";

function EventLogistics(props) {
  const { underInvestigation, country, image, sport } = props;

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <img src={image} alt="Image" width={400} height={400} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={SportsBaseballIcon} sport={true}>
          <time>{sport}</time>
        </LogisticsItem>
        <LogisticsItem icon={FlagIcon}>
          <time>{country}</time>
        </LogisticsItem>
          {underInvestigation && <LogisticsItem icon={SearchIcon}>
              <address>{underInvestigation && "Athlete is Under Investigation"}</address>
          </LogisticsItem>}
      </ul>
    </section>
  );
}

export default EventLogistics;
