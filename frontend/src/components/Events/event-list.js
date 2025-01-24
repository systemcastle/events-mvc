import React from "react";

import EventItem from "./event-item";
import classes from "./event-list.module.css";

function EventList(props) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          key={event._id}
          event={event}
          id={event._id}
          title={event.title}
          location={event.address}
          date={event.eventDate}
          image={event.eventImage}
        />
      ))}
    </ul>
  );
}

export default EventList;
