import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="dark:bg-gray-900">
          <Header activeHeading={4} />
          <div className={`${styles.section}`}>
            <EventCard active={true} data={allEvents && allEvents[0]} />
          </div>
          <br />
          <br />
          <Footer />
        </div>
      )}
    </>
  );
};

export default EventsPage;
