import React, { useState, useEffect } from "react";
import CustomInput from "../../CustomInput/CustomInput";
import Message from "../../Message/Message";
import SearchIcon from "@material-ui/icons/Search";
import { useStore } from "../../../Store/Store";
import { getComments, setModalItem } from "../../../Store/Actions";
import "./FeedBody.css";
export default function FeedBody(props) {
  const { state, dispatch } = useStore();
  const feedLength = state.feed.length;
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    if (feedLength === 0) getComments(dispatch);
  }, [feedLength, dispatch]);
  let filteredData = state.feed;
  if (selectedFilter)
    filteredData = state.feed.filter((fD) => {
      return fD.email.toString().indexOf(selectedFilter) > -1;
    });
  return (
    <div className="feed_body_container">
      <div className="filter_input_container">
        {state.feed && (
          <CustomInput
            valueIn={selectedFilter}
            placeholder="Filter"
            icon={<SearchIcon />}
            onChange={(v) => {
              setSelectedFilter(v);
            }}
          />
        )}
      </div>
      <br />

      <div className="messages_container">
        {filteredData &&
          filteredData.length > 0 &&
          filteredData.map((cP, i) => (
            <div
              id={"selected_msg_" + i}
              key={"selected_msg_" + i}
              onClick={() => {
                setModalItem(dispatch, cP);
              }}
            >
              <Message key={"msg_container" + i} post={cP} />
            </div>
          ))}

        {state.feed.length === 0 && (
          <div className="no_data">Sorry m8. No such ..</div>
        )}
      </div>
    </div>
  );
}
