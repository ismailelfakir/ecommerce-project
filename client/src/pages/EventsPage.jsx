import React from "react";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";

const EventsPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <EventCard active={true} />
      <EventCard active={true} />
    </div>
  );
};

export default EventsPage;