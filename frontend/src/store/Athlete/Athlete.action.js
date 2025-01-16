import axios from "../../utils/axios";
import * as actionTypes from "../ActionTypes";
import { success, error } from "../../utils/toast";

import { bufferToImage } from "../../utils/helpers";

const fetchingDataDispatcher = (loading) => ({
    type: actionTypes.FETCHING_DATA_ATHLETE,
    payload: {
        loading,
    },
});

const setErrorDispatcher = (error) => ({
    type: actionTypes.SET_ATHLETE_ERROR,
    payload: {
        error,
    },
});

const setSuccessDispatcher = (success) => ({
    type: actionTypes.SET_SUCCESS_ATHLETE,
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

export const createAthlete = (data, closeModal, edit) => async (dispatch) => {
    dispatch(fetchingDataDispatcher(true));
    try {
        let response;
        if (edit) {
            response = await axios.put("athlete/update", data);
        } else {
            response = await axios.post("athlete/create", data);
        }
        closeModal();
        success(response.data.message);
        dispatch(setSuccessDispatcher(response.data.message));
        dispatch(resetSuccess());
        dispatch(getAllAthletes());
    } catch (e) {
        error(e.response.data.message);
        dispatch(setErrorDispatcher(e.message));
        dispatch(resetError());
    }
};

const getAllEventsDispatcher = (allAthletes) => ({
    type: actionTypes.FETCH_ALL_ATHLETES,
    payload: {
        allAthletes,
    },
});

export const getAllAthletes = () => async (dispatch) => {
    dispatch(fetchingDataDispatcher(true));
    try {
        const response = await axios.get("athlete/");
        let events = [];
        response.data.data.forEach((event) => {
            if (event.athleteImage) {
                events.push({
                    ...event,
                    athleteImage: `data:image/png;base64,${bufferToImage(
                        event.athleteImage.data
                    )}`,
                });
            } else {
                events.push({
                    ...event,
                });
            }
        });
        dispatch(getAllEventsDispatcher(events));
    } catch (e) {
        dispatch(setErrorDispatcher(e.message));
        dispatch(resetError());
    }
};
export const setSelectedAthlete = (selectedAthlete) => ({
    type: actionTypes.SET_SELECTED_ATHLETE,
    payload: {
        selectedAthlete,
    },
});

export const deleteAthlete = (id) => async (dispatch) => {
    dispatch(fetchingDataDispatcher(true));
    try {
        let response = await axios.delete(`athlete/${id}`);
        success(response.data.message);
        dispatch(getAllAthletes());
        dispatch(setSuccessDispatcher(response.data.message));
        dispatch(resetSuccess());
    } catch (e) {
        error(e.response.data.message);
        dispatch(setErrorDispatcher(e.message));
        dispatch(resetError());
    }
};

export const searchAthlete = (data) => async (dispatch) => {
    dispatch(fetchingDataDispatcher(true));
    try {
        const response = await axios.post("athlete/search", data);
        let events = [];
        response.data.data.forEach((event) => {
            if (event.athleteImage) {
                events.push({
                    ...event,
                    athleteImage: `data:image/png;base64,${bufferToImage(
                        event.athleteImage.data
                    )}`,
                });
            } else {
                events.push({
                    ...event,
                });
            }
        });
        dispatch(getAllEventsDispatcher(events));
    } catch (e) {
        dispatch(setErrorDispatcher(e.message));
        dispatch(resetError());
    }
};
