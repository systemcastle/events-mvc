import * as actionTypes from "../ActionTypes";
const initialState = {
    allAthletes: [],
    loading: false,
    selectedAthlete: {},
    error: "",
    success: null,
};

const eventsReducers = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.FETCHING_DATA_ATHLETE:
            return { ...state, loading: payload.loading };
        case actionTypes.SET_ATHLETE_ERROR:
            return { ...state, loading: false, error: payload.error };
        case actionTypes.SET_SUCCESS:
            return { ...state, success: payload.success, loading: false };
        case actionTypes.FETCH_ALL_ATHLETES:
            return { ...state, allAthletes: payload.allAthletes, loading: false };
        case actionTypes.SET_SELECTED_ATHLETE:
            return { ...state, selectedAthlete: payload.selectedAthlete };
        default:
            return state;
    }
};
export default eventsReducers;
