import React from "react";
import "./Feed.css";
import FeedHeader from "./FeedHeader/FeedHeader";
import FeedBody from "./FeedBody/FeedBody";
import validations from "../../Validations/Validations";
import { useStore } from "../../Store/Store";
import { setModalItem } from "../../Store/Actions";
import Modal from "../Modal/Modal";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import Toast from "../Toast/Toast";
export default function () {
  const { state, dispatch } = useStore();
  const { modalItem } = state;
  const { globalError } = state;

  return (
    <div>
      {globalError && <Toast />}
      {state.loading && (
        <div className="spinner_container">
          <Spinner />
        </div>
      )}
      {modalItem && (
        <Modal closeModal={() => setModalItem(dispatch, null)}>
          <div>
            <Message id="modal_item_message" post={modalItem} />
            <div className="extraContent">{modalItem.message}</div>
          </div>
        </Modal>
      )}
      <div
        className="feed_container"
        disabled={state.loading}
        style={{ opacity: state.loading ? 0.6 : 1 }}
      >
        <FeedHeader
          fields={{ Email: "", Message: "" }}
          inputs={[
            {
              id: 1,
              type: "input",
              title: "Email",
              placeholder: "Email",
              customClass: "email",
              validate: (v) => {
                return validations.Email.test(v.toString().toLowerCase());
              },
            },
            {
              id: 2,
              type: "textarea",
              title: "Message",
              placeholder: "Message",
              customClass: "message",
            },
          ]}
        />
        <FeedBody />
      </div>
    </div>
  );
}
