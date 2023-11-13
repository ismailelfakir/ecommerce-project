import axios from "axios";
import { server } from "../../server";

// create event
export const createevent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const config = { Headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    );
    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get all events of a seller
export const getAllEventsSeller = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsSellerRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events/${id}`);
    dispatch({
      type: "getAlleventsSellerSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsSellerFailed",
      payload: error.response.data.message,
    });
  }
};

// delete event of a seller
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteeventRequest",
    });

    const { data } = await axios.delete(
      `${server}/event/delete-seller-event/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteeventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteeventFailed",
      payload: error.response.data.message,
    });
  }
};

// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events`);
    dispatch({
      type: "getAlleventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsFailed",
      payload: error.response.data.message,
    });
  }
};

// event update information
export const updateEvent =
  (eventId,name, description, category, tags, originalPrice, discountPrice, stock) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateEventRequest",
      });

      const { data } = await axios.put(
        `${server}/event/update-event/${eventId}`,
        {
          name,
          description,
          category,
          tags,
          originalPrice,
          discountPrice,
          stock,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "updateEventSuccess",
        payload: data.event,
      });
    } catch (error) {
      dispatch({
        type: "updateEventFailed",
        payload: error.response.data.message,
      });
    }
  };