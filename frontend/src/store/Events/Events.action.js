import axios from "../../utils/axios";
import * as actionTypes from "../ActionTypes";
import { success, error } from "../../utils/toast";

import { bufferToImage } from "../../utils/helpers";

const fetchingDataDispatcher = (loading) => ({
  type: actionTypes.FETCHING_DATA,
  payload: {
    loading,
  },
});

const setErrorDispatcher = (error) => ({
  type: actionTypes.SET_EVENT_ERROR,
  payload: {
    error,
  },
});

const setSuccessDispatcher = (success) => ({
  type: actionTypes.SET_SUCCESS,
  payload: {
    success,
  },
});

const resetSuccess = () => (dispatch) => {
  setTimeout(() => {
    dispatch(setSuccessDispatcher(null));
  }, 5000);
};

const resetError = () => (dispatch) => {
  setTimeout(() => {
    dispatch(setErrorDispatcher(""));
  }, 5000);
};

export const createEvent = (data, closeModal, edit) => async (dispatch) => {
  dispatch(fetchingDataDispatcher(true));
  try {
    let response;
    if (edit) {
      response = await axios.put("events/update", data);
    } else {
      response = await axios.post("events/create", data);
    }
    closeModal();
    success(response.data.message);
    dispatch(setSuccessDispatcher(response.data.message));
    dispatch(resetSuccess());
    dispatch(getAllEvents());
  } catch (e) {
    error(e.response.data.message);
    dispatch(setErrorDispatcher(e.message));
    dispatch(resetError());
  }
};

const getAllEventsDispatcher = (allEvents) => ({
  type: actionTypes.FETCH_ALL_EVENTS,
  payload: {
    allEvents,
  },
});

export const getAllEvents = () => async (dispatch) => {
  dispatch(fetchingDataDispatcher(true));
  try {
    const response = await axios.get("events/");
    let events = [];
    response.data.data.forEach((event) => {
      let athletes = [];
      event.athletes.forEach((athlete) => {
        if (athlete.athleteImage) {
          athletes.push({
            ...athlete,
            athleteImage: `data:image/png;base64,${bufferToImage(
              athlete.athleteImage.data
            )}`,
          });
        } else {
          athletes.push({
            ...athlete,
          });
        }
      });
      if (event.eventImage) {
        events.push({
          ...event,
          eventImage: `data:image/png;base64,${bufferToImage(
            event.eventImage.data
          )}`,
          athletes,
        });
      } else {
        events.push({
          ...event,
          athletes,
        });
      }
    });
    dispatch(getAllEventsDispatcher(events));
  } catch (e) {
    dispatch(setErrorDispatcher(e.message));
    dispatch(resetError());
  }
};
export const setSelectedEvent = (selectedEvent) => ({
  type: actionTypes.SET_SELECTED_EVENT,
  payload: {
    selectedEvent,
  },
});

export const deleteEvent = (id) => async (dispatch) => {
  dispatch(fetchingDataDispatcher(true));
  try {
    let response = await axios.delete(`events/${id}`);
    success(response.data.message);
    dispatch(getAllEvents());
    dispatch(setSuccessDispatcher(response.data.message));
    dispatch(resetSuccess());
  } catch (e) {
    error(e.response.data.message);
    dispatch(setErrorDispatcher(e.message));
    dispatch(resetError());
  }
};

export const addAthleteToEvent = (data) => async (dispatch) => {
  dispatch(fetchingDataDispatcher(true));
  try {
    let response = await axios.patch(`events/addathlete`, data);
    success(response.data.message);
    let athletes = [];
    response.data.data.athletes.forEach((athlete) => {
      console.log(athlete);
      if (athlete.athleteImage !== null) {
        athletes.push({
          ...athlete,
          athleteImage: `data:image/png;base64,${bufferToImage(
            athlete.athleteImage.data
          )}`,
        });
      } else {
        athletes.push({
          ...athlete,
        });
      }
    });

    const image =
      response.data.data.eventImage !== null
        ? `data:image/png;base64,${bufferToImage(
            response.data.data.eventImage.data
          )}`
        : null;
    dispatch(
      setSelectedEvent({
        ...response.data.data,
        eventImage: image,
        athletes,
      })
    );
    dispatch(setSuccessDispatcher(response.data.message));
    dispatch(resetSuccess());
  } catch (e) {
    error(e.message);
    dispatch(setErrorDispatcher(e.message));
    dispatch(resetError());
  }
};
export const addResult = (data) => async (dispatch, getState) => {
  dispatch(fetchingDataDispatcher(true));
  try {
    let response = await axios.patch(`events/add-result`, data);
    success(response.data.message);
    dispatch(getAllEvents());
    const { events } = getState();
    dispatch(
      setSelectedEvent({
        ...events.selectedEvent,
        result: response.data.data.result,
      })
    );
    dispatch(setSuccessDispatcher(response.data.message));
    dispatch(resetSuccess());
  } catch (e) {
    error(e.response.data.message);
    dispatch(setErrorDispatcher(e.message));
    dispatch(resetError());
  }
};

export const searchEvents = (data) => async (dispatch) => {
  dispatch(fetchingDataDispatcher(true));
  try {
    const response = await axios.post("events/search", data);
    let events = [];
    response.data.data.forEach((event) => {
      let athletes = [];
      event.athletes.forEach((athlete) => {
        if (athlete.athleteImage) {
          athletes.push({
            ...athlete,
            athleteImage: `data:image/png;base64,${bufferToImage(
              athlete.athleteImage.data
            )}`,
          });
        } else {
          athlete.push({
            ...athlete,
          });
        }
      });
      if (event.eventImage) {
        events.push({
          ...event,
          eventImage: `data:image/png;base64,${bufferToImage(
            event.eventImage.data
          )}`,
          athletes,
        });
      } else {
        events.push({
          ...event,
          athletes,
        });
      }
    });
    dispatch(getAllEventsDispatcher(events));
  } catch (e) {
    dispatch(setErrorDispatcher(e.message));
    dispatch(resetError());
  }
};
