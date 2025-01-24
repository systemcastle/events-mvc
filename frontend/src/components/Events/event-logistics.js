import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import LogisticsItem from "./logistics-item";
import classes from "./event-logistics.module.css";

import imageLogo from "../../assets/images/extrovert-event.jpg";

function EventLogistics(props) {
  const { date, address, image, imageAlt, sport } = props;

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <img src={image} alt={imageAlt} width={400} height={400} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon} sport={true}>
          <time>{sport}</time>
        </LogisticsItem>
        <LogisticsItem icon={DateIcon}>
          <time>{date}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{address}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
