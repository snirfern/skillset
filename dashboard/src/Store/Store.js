import React, { createContext, useContext, useReducer } from "react";
const StoreContext = createContext();
const initialState = {
  feed: [],
  modalItem: null,
  loading: true,
  globalError: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ERROR": {
      const { payload } = action;
      
      if (!payload || payload < 0) return { ...state, globalError: null };
      return {
        ...state,
        globalError: {
          type: "Network Error",
          error: "Some error occured during fetch operation",
        },
      };
    }
    case "ADD_COMMENT": {
      const { payload } = action;
      if (payload && payload.email && payload.id)
        return { ...state, feed: [...state.feed, payload], loading: false };

      return { ...state };
    }

    case "LOADING": {
      const { payload } = action;
      if (payload) return { ...state, loading: payload };
      return { ...state, loading: false };
    }
    case "GET_COMMENTS": {
      const { payload } = action;
      if (payload && Array.isArray(payload))
        return { ...state, feed: payload, loading: false };
      else {
        console.log("some error occured");
        return { ...state, loading: false };
      }
    }

    case "SET_MODAL_ITEM": {
      const { payload } = action;
      if (!payload) return { ...state, modalItem: null, loading: false };
      else if (
        state.modalItem &&
        state.modalItem.id &&
        state.modalItem.id === payload.id
      )
        return { ...state, modalItem: null, loading: false };
      return { ...state, modalItem: payload, loading: false };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
