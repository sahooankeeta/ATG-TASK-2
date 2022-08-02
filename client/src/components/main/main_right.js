import geo from "./../../icons/geo-alt.svg";
import pen from "./../../icons/pen.svg";
import thumbs from "./../../icons/thumbs.svg";
import info from "./../../icons/info.svg";
import sarthakKamra from "./../../images/sarthak_kamra.png";
import sarahWest from "./../../images/sarah_west.png";
import ronalJones from "./../../images/ronal_jones.png";
import josephGray from "./../../images/joseph_gray.png";
import leisure from "./../../images/leisure.png";
import mba from "./../../images/mba.png";
import philosophy from "./../../images/philosophy.png";
import activism from "./../../images/activism.png";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
const MainRight = () => {
  const user = useSelector((state) => state.profile);
  return (
    <div className="content-right">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0",
            borderBottom: "0.4px solid #B8B8B8",
            marginBottom: "30px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={geo} alt="geo" style={{ marginRight: "15px" }} />
            {user?.result != null ? (
              <input
                style={{
                  background: "trasparent",
                  outline: "none",
                  border: "none",
                }}
                type="text"
                placeholder="Enter your location"
              />
            ) : (
              <span>Noida, India</span>
            )}
          </div>
          <img src={pen} alt="pen" />
        </div>
        <div
          style={{
            display: "flex",
            color: "#B8B8B8",
            alignItems: "flex-start",
            marginBottom: "35px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-exclamation-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
          </svg>
          <span style={{ marginLeft: "10px" }}>
            Your location will help us serve better and extend a personalised
            experience.
          </span>
        </div>
        {user?.result != null && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <img style={{ marginRight: "10px" }} src={thumbs} alt=".." />
              <span>RECOMMENDED GROUPS</span>
            </div>
            <ul>
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <div>
                  <img style={{ marginRight: "10px" }} src={leisure} alt=".." />
                  <span>Leisre</span>
                </div>
                <button
                  style={{
                    width: "60px",
                    height: "24px",
                    fontWeight: "400",
                    fontSize: "12px",
                    background: "#EDEEF0",
                    borderRadius: "14px",
                    border: "none",
                    outline: "none",
                  }}
                >
                  Follow
                </button>
              </li>
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <div>
                  <img
                    style={{ marginRight: "10px" }}
                    src={activism}
                    alt=".."
                  />
                  <span>Activism</span>
                </div>
                <button
                  style={{
                    width: "60px",
                    height: "24px",
                    fontWeight: "400",
                    fontSize: "12px",
                    background: "#EDEEF0",
                    borderRadius: "14px",
                    border: "none",
                    outline: "none",
                  }}
                >
                  Follow
                </button>
              </li>
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <div>
                  <img style={{ marginRight: "10px" }} src={mba} alt=".." />
                  <span>MBA</span>
                </div>
                <button
                  style={{
                    width: "60px",
                    height: "24px",
                    fontWeight: "400",
                    fontSize: "12px",
                    background: "#EDEEF0",
                    borderRadius: "14px",
                    border: "none",
                    outline: "none",
                  }}
                >
                  Follow
                </button>
              </li>
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <div>
                  <img
                    style={{ marginRight: "10px" }}
                    src={philosophy}
                    alt=".."
                  />
                  <span>philosophy</span>
                </div>
                <button
                  style={{
                    width: "60px",
                    height: "24px",
                    fontWeight: "400",
                    fontSize: "12px",
                    background: "#EDEEF0",
                    borderRadius: "14px",
                    border: "none",
                    outline: "none",
                  }}
                >
                  Follow
                </button>
              </li>
            </ul>
            <div style={{ position: "relative" }}>
              <button
                style={{
                  position: "absolute",
                  right: "0",
                  outline: "none",
                  border: "none",
                  background: "transparent",
                  color: "blue",
                }}
              >
                See more . .
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MainRight;
