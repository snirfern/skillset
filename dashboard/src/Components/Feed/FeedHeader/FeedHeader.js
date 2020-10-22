import React, { useState } from "react";
import "./FeedHeader.css";
import { addComment } from "../../../Store/Actions";
import { useStore } from "../../../Store/Store";
import Spinner from "../../Spinner/Spinner";
function validate(inputsArr, values) {
  let errors = {};
  inputsArr.forEach((cI) => {
    if (!cI.validate(values[cI.title])) errors[cI.title] = 1;
  });

  return errors;
}
export default function FeedHeader({ inputs, fields }) {
  const { dispatch } = useStore();
  const [values, setValues] = useState(fields);
  const [loading, setLoading] = useState(false);
  const errors = validate(
    inputs.filter((cI) => cI.validate),
    values
  );

  async function addCommentHandler() {
    setLoading(true);
    const addCommentRes = await addComment(
      dispatch,
      values.Email,
      values.Message
    );
    if (addCommentRes && addCommentRes > 0) setValues(fields);
    setLoading(false);
  }
  const inputsMarkUp = inputs.map((cI, i) => (
    <div className="input_container" key={"inputs_header_" + i}>
      {cI.type === "input" ? (
        <div id={cI.id + "_" + cI.title} className="header_inputs">
          <input
            value={values[cI.title]}
            onChange={(e) => {
              setValues({ ...values, [cI.title]: e.target.value });
            }}
            style={{
              borderColor:
                values[cI.title].length > 0 && errors[cI.title] !== undefined
                  ? "red"
                  : "#d1d1d1",
            }}
            className={cI.customClass}
            placeholder={cI.placeholder}
            key={"input_" + cI.title}
          />
        </div>
      ) : (
        <div id={cI.id + "_" + cI.title} className="header_inputs">
          <textarea
            value={values[cI.title]}
            onChange={(e) => {
              setValues({ ...values, [cI.title]: e.target.value });
            }}
            className={cI.customClass}
            placeholder={cI.placeholder}
            key={"input_" + cI.title}
          />
        </div>
      )}
    </div>
  ));
  return (
    <div className="feed_header_container">
      {inputsMarkUp}

      <br />
      <div className="feed_header_spinner">
        {loading && <Spinner customClass="small" />}
      </div>
      <div className="submit_button">
        {!loading && (
          <button
            id="submit"
            style={{
              backgroundColor:
                Object.keys(errors).length === 0 ? "#46a9dd" : "grey",
            }}
            disabled={errors.length > 0}
            className="feed_header_botton"
            onClick={() => {
              addCommentHandler();
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
