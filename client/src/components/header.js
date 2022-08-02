import logo from "./../images/wholelogo.png";
import React, { useEffect } from "react";
import * as actionType from "./../helpers/constants.js";
import search from "./../icons/search.svg";
import user_pic from "./../images/user.png";
import "./style.scss";
import decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const Header = ({ handleLogout }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.profile);

  return (
    <nav class="navbar navbar-light bg-light">
      <div className="nav-small">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#868E96"
          class="bi bi-square-fill"
          viewBox="0 0 16 16"
        >
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
        </svg>
        <svg
          style={{ marginLeft: "10px" }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#868E96"
          class="bi bi-circle-fill"
          viewBox="0 0 16 16"
        >
          <circle cx="8" cy="8" r="8" />
        </svg>
        <svg
          style={{ transform: "rotate(180deg)", marginLeft: "10px" }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#868E96"
          class="bi bi-triangle-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"
          />
        </svg>
      </div>
      <div class="nav-big">
        <img src={logo} alt="profile-img" onClick={() => history.push("/")} />

        <form
          style={{
            background: "#F2F2F2",
            borderRadius: "21px",
            display: "flex",
            alignItems: "center",
            width: "30%",
            padding: "3px 15px",
          }}
        >
          <img src={search} alt="search" />
          <input
            type="search"
            placeholder="Search for your favorite groups in ATG"
            aria-label="Search"
            style={{
              outline: "none",
              background: "#F2F2F2",
              border: "none",
              color: "#5C5C5C",
              fontWeight: "600",
              flex: "1",
            }}
          />
        </form>
        {user?.result != null ? (
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-light dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img className="profile-img" src={user_pic} alt="profile" />
              <span>{user?.result?.name}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  class="dropdown-item"
                  type="button"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div style={{ fontWeight: "600" }}>
            Create account.<span style={{ color: "blue" }}>It’s free!</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-down-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
