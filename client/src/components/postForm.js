import React, { useState } from "react";
import calendar from "./../icons/calendar.svg";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";

import { createPost } from "../actions";

import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { updatePost } from "../actions";

const initialState = {
  category: "",
  subject: "",
  description: "",
  company: "",
  location: "",
  image: {},
  link: "",
  date: new Date().toISOString(),
};
const PostForm = () => {
  const user = useSelector((state) => state.profile);

  const profileID = useSelector((state) => state.profile.result._id);
  const id = new URLSearchParams(useLocation().search).get("id");
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const item = useSelector((state) =>
    id ? state.posts.find((p) => p._id === id) : null
  );

  React.useEffect(() => {
    if (item) {
      // console.log(item);
      setForm({
        ...form,
        id: item._id,
        category: item.category,
        subject: item.subject,
        description: item.description,
        company: item.company,
        location: item.location,
        date: item.date,
        image: item.image,
        user: item.user,
        likes: item.likes,
        link: item.link,
        comments: item.comments,
      });
    }
  }, [item]);
  const handleChange = (e) => {
    if (e.target.name !== "image")
      setForm({ ...form, [e.target.name]: e.target.value });
    else {
      //console.log(e.target.files);
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item) form.user = profileID;
    setForm(form);
    if (file) {
      const fData = new FormData();
      fData.append("file", file);
      fData.append("upload_preset", "pcaizmnx");
      axios
        .post("https://api.cloudinary.com/v1_1/dmmoqg8gb/image/upload", fData)
        .then((res) => {
          //console.log(res);
          form.image = {
            imgId: res.data.public_id,
            imgUrl: res.data.secure_url,
          };
          setForm(form);
          if (item) dispatch(updatePost(id, form, history));
          else dispatch(createPost(form, history));
          // console.log(form);
        });
    } else {
      if (item) dispatch(updatePost(id, form, history));
      else dispatch(createPost(form, history));
    }
    //console.log(form);
    setForm(initialState);
  };
  return (
    <form onSubmit={handleSubmit} className="post-form">
      <select
        class="form-select form-select-lg mb-3"
        name="category"
        aria-label=".form-select-lg example"
        style={{ width: "max-content" }}
        onChange={handleChange}
        value={form.category}
      >
        <option selected>choose category</option>
        <option value="✍️ Article">✍️ Article</option>
        <option value="🔬️ Education">🔬️ Education</option>
        <option value="🗓️ Meetup">🗓️ Meetup</option>
        <option value="💼️ Job">💼️ Job</option>
      </select>

      <div class="mb-3">
        <input
          type="text"
          onChange={handleChange}
          class="form-control"
          value={form.subject}
          name="subject"
          placeholder="subject"
        />
      </div>

      <div class="mb-3">
        <textarea
          class="form-control"
          onChange={handleChange}
          name="description"
          value={form.description}
          placeholder="description"
          rows="3"
        ></textarea>
      </div>
      {(form.category === "🗓️ Meetup" || form.category === "💼️ Job") && (
        <div class="mb-3">
          <input
            type="text"
            onChange={handleChange}
            class="form-control"
            value={form.location}
            name="location"
            placeholder="location"
          />
        </div>
      )}
      {form.category === "💼️ Job" && (
        <div class="mb-3">
          <input
            type="text"
            onChange={handleChange}
            class="form-control"
            value={form.company}
            name="company"
            placeholder="company"
          />
        </div>
      )}
      {form.category === "🗓️ Meetup" && (
        <div class="mb-3">
          <input
            type="date"
            onChange={handleChange}
            class="form-control"
            value={form.date}
            name="date"
            placeholder="date"
          />
        </div>
      )}
      <div class="mb-3">
        <input
          type="text"
          onChange={handleChange}
          class="form-control"
          value={form.link}
          name="link"
          placeholder="link"
        />
      </div>
      <div class="mb-3">
        <input
          type="file"
          onChange={handleChange}
          class="form-control"
          name="image"
          placeholder="date"
        />
      </div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
export default PostForm;
