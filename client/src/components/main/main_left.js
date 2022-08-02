import React, { useEffect } from "react";

import calendar from "./../../icons/calendar.svg";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import Post from "./post.js";
import { getPosts } from "../../actions";
const MainLeft = () => {
  const posts = useSelector((state) => state.posts);
  //console.log(posts);
  const error = useSelector((state) => state.error);
  const isLoading = useSelector((state) => state.isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    //console.log(posts);
    console.log("in");
    dispatch(getPosts());
  }, [dispatch]);
  if (isLoading === true)
    return (
      <div className="content-left">
        <div>loading</div>
      </div>
    );
  if (posts)
    return (
      <div className="content-left">
        {posts.length > 0 ? (
          posts.map((post, id) => <Post post={post} key={`post-${id}`} />)
        ) : (
          <div>no posts yet</div>
        )}
      </div>
    );
};

export default MainLeft;
