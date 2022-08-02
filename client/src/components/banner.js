import backgroundImg from "./../images/radek-grzybowski-eBRTYyjwpRY-unsplash.jpg";
import Modal from "./modal.js";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
const Banner = ({ handleLogout }) => {
  const user = useSelector((state) => state.profile);
  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "440px",
      }}
    >
      <div className="banner-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="white"
          class="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
        {user.result == null ? (
          <button
            type="button"
            class="btn "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            style={{
              background: "transparent",
              padding: "5px 10px",
              borderRadius: "5px",
              color: "white",
              border: "1px solid white",
            }}
          >
            Join Group
          </button>
        ) : (
          <button
            type="button"
            class="btn "
            onClick={() => handleLogout()}
            style={{
              background: "transparent",
              padding: "5px 10px",
              borderRadius: "5px",
              color: "white",
              border: "1px solid white",
            }}
          >
            Leave Group
          </button>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.6) 100%)",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "10%",
          zIndex: "2",
          color: "white",
        }}
      >
        <div
          style={{
            fontFamily: "IBM Plex Sans",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "36px",
            lineHeight: "47px",
          }}
        >
          Computer Engineering
        </div>
        <div
          style={{
            fontFamily: "IBM Plex Sans",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "18px",
            lineHeight: "23px",
          }}
        >
          142,765 Computer Engineers follow this
        </div>
      </div>
      {!user && <Modal />}
    </div>
  );
};
export default Banner;
