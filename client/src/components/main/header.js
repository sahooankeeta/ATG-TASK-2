import React from "react";
import joinPeople from "./../../icons/join_people.svg";
import leave from "./../../icons/leave.svg";
import decode from "jwt-decode";
import Modal from "./../modal.js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as actionType from "./../../helpers/constants.js";

import "./styles.scss";
const Header = ({ handleLogout }) => {
  const dispatch = useDispatch();

  const history = useHistory();
  const user = useSelector((state) => state.profile);
  const postsLength = useSelector((state) => state.posts.length);
  return (
    <header className="container-header">
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "21px",
          boxSizing: "content-box",
          borderBottom: "1px solid black",
        }}
      >
        All Posts({postsLength})
      </div>
      <ul className="filters-large">
        <li>article</li>
        <li>event</li>
        <li>education</li>
        <li>job</li>
      </ul>
      <div class="btn-group" className="filters-small">
        <button
          type="button"
          class="btn dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ background: "#F1F3F5" }}
        >
          Filters :All
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <button class="dropdown-item" type="button">
              Article
            </button>
          </li>
          <li>
            <button class="dropdown-item" type="button">
              Event
            </button>
          </li>
          <li>
            <button class="dropdown-item" type="button">
              Education
            </button>
          </li>
          <li>
            <button class="dropdown-item" type="button">
              Job
            </button>
          </li>
        </ul>
      </div>
      {user?.result != null && (
        <button
          class="btn btn-secondary view-form"
          onClick={() => history.push("/postForm")}
        >
          Write a Post
        </button>
      )}

      {user?.result != null ? (
        <button
          class=" container-header-modal-view"
          onClick={() => handleLogout()}
        >
          {" "}
          <img src={leave} alt="join" style={{ marginRight: "10px" }} />
          Leave Group{" "}
        </button>
      ) : (
        <button
          type="button"
          className="container-header-modal-view"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <img src={joinPeople} alt="join" style={{ marginRight: "10px" }} />
          Join Group
        </button>
      )}

      <Modal />
    </header>
  );
};

export default Header;
