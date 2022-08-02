import React, { useState } from "react";
import threeDots from "./../../icons/three-dots.svg";
import share from "./../../icons/share-fill.svg";
import bag from "./../../icons/bag.svg";
import { useDispatch, useSelector } from "react-redux";
import geo from "./../../icons/geo-alt.svg";
import pen from "./../../icons/pen.svg";
import { useHistory, useLocation } from "react-router-dom";
import thumbs from "./../../icons/thumbs.svg";
import info from "./../../icons/info.svg";
import calendar from "./../../icons/calendar.svg";
import userpic from "./../../images/user.png";
import { likePost, deletePost, createComment } from "../../actions";
import "./styles.scss";
const initialState = {
  comment: "",
};
const Post = ({ post }) => {
  //console.log(post);
  const [form, setForm] = useState(initialState);
  const user = useSelector((state) => state.profile);
  //console.log(user.result);
  const dispatch = useDispatch();
  const history = useHistory();
  // if (isLoading) return <div>loading</div>;
  const [likes, setLikes] = useState(post?.likes);
  const hasLikedPost = user.result
    ? post?.likes?.find((like) => like === user.result._id)
    : null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    form.post = post._id;
    form.user = user.result._id;
    setForm(form);
    console.log(form);
    dispatch(createComment(form));
    setForm(initialState);
  };
  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((i) => i !== user.result._id));
    } else {
      setLikes([...post.likes, user.result._id]);
    }
  };

  const Likes = () => {
    if (user.result)
      if (post && likes.length > 0) {
        return likes.find((like) => like === user.result._id) ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-hand-thumbs-up-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
            </svg>
            &nbsp;
            {post && likes.length > 2
              ? `You and ${likes.length - 1} others`
              : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-hand-thumbs-up"
              viewBox="0 0 16 16"
            >
              <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
            </svg>
            &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
          </>
        );
      }

    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-hand-thumbs-up"
          viewBox="0 0 16 16"
        >
          <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
        </svg>
        &nbsp;Like
      </>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px",

        maxHeight: "600px",
        border: "1px solid grey",
      }}
    >
      {post.image?.imgUrl && (
        <img
          src={post.image.imgUrl}
          class="card-img-top card-img"
          alt="card-1"
        />
      )}
      <div class="card-body">
        <h5 class="card-title" style={{ fontWeight: "500", fontSize: "18px" }}>
          {post.category}
        </h5>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <h2
            class="card-text"
            style={{
              fontWeight: "600",
              fontSize: "22px",
              lineHeight: "134.17%",
            }}
          >
            {post.subject}
          </h2>
          {user.result != null && user.result._id === post.user._id && (
            <div class="dropdown">
              <button
                type="button"
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  outline: "none",
                  border: "none",
                  background: "white",
                  marginLeft: "20px",
                }}
              >
                <img src={threeDots} alt="dots" style={{ height: "25px" }} />
              </button>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenu2"
              >
                <li>
                  <button
                    class="dropdown-item"
                    type="button"
                    onClick={() => history.push(`/post/edit?id=${post._id}`)}
                  >
                    Edit
                  </button>
                </li>

                <li>
                  <button
                    class="dropdown-item"
                    type="button"
                    onClick={() => dispatch(deletePost(post._id))}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        {post.category === "🗓️ Meetup" && (
          <div>
            {" "}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ display: "flex", alignItems: "center" }}>
                <img src={calendar} alt="date" style={{ marginRight: "5px" }} />
                {post.date}
              </span>
              <span style={{ display: "flex", alignItems: "center" }}>
                <img src={geo} alt="loaction" style={{ marginRight: "5px" }} />
                {post.location}
              </span>
            </div>
            <button
              class="btn btn-outline-secondary"
              style={{ color: "#E56135", width: "100%", marginTop: "15px" }}
              onClick={() => history.push(post.link)}
            >
              visit website
            </button>{" "}
          </div>
        )}
        {post.category === "💼️ Job" && (
          <div>
            {" "}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ display: "flex", alignItems: "center" }}>
                <img src={bag} alt="company" />
                {post.company}
              </span>
              <span style={{ display: "flex", alignItems: "center" }}>
                <img src={geo} alt="loaction" />
                {post.location}
              </span>
            </div>
            <button
              class="btn btn-outline-secondary"
              style={{ color: "#02B875", width: "100%", marginTop: "15px" }}
              onClick={() => history.push(post.link)}
            >
              Apply on Tmesjobs
            </button>{" "}
          </div>
        )}
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "#5C5C5C",
          }}
        >
          {post.description}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "25px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", flex: "1" }}>
            <img
              src={userpic}
              alt="p1"
              style={{
                marginRight: "15px",
                height: "35px",
                width: "35px",
                borderRadius: "100%",
              }}
            />
            <div className="name-tag">
              <span style={{ fontWeight: "600", fontSize: "18px" }}>
                {post.user.name}
              </span>

              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                  outline: "none",
                  border: "none",
                  background: "transparent",
                }}
                disabled={!user?.result}
                onClick={handleLike}
              >
                <Likes />
              </button>
            </div>
          </div>

          <div
            style={{
              background: "#EDEEF0",
              borderRadius: "2px",
              marginLeft: "20px",
              height: "36px",
              textAlign: "center",
              width: "42px",
            }}
          >
            <img src={share} alt="share" style={{ verticalAlign: "bottom" }} />
          </div>
        </div>
        <div className="comments" style={{ marginTop: "10px" }}>
          {user.result != null && (
            <form onSubmit={handleSubmit} style={{ display: "flex" }}>
              <input
                style={{ background: "#edeef0" }}
                type="text"
                placeholder="add comments"
                onChange={handleChange}
                value={form.comment}
                name="comment"
              />
              <button type="submit" className="btn btn-primary">
                comment
              </button>
            </form>
          )}
          <div>
            {post &&
              post.comments.length > 0 &&
              post.comments.map((comment, id) => (
                <div style={{ display: "flex" }} ket={`comment-${comment._id}`}>
                  <div style={{ fontWeight: "600", marginRight: "10px" }}>
                    {comment.user.name}
                  </div>
                  <div style={{ flex: "1" }}>{comment.content}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
