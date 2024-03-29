import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Redux/action";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../Style/Search.css";
import ClearIcon from "@mui/icons-material/Clear";



export default function Search() {
  const [search, setSearch] = useState("");
  //   console.log(search);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData);
  }, []);

  const apiData = useSelector((state) => state.dataReducer.data);

  return (
    <div className="search-x">
      <Navbar />

      <div className="search-y">
        <div className="search">
          <div className="input">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search For Restaurant or Dishes..."
            />
            <div className="icon">
              <Link to="/">
                <ClearIcon />
              </Link>
            </div>
          </div>

          <div className="data">
            <div className="display-data">
              {apiData
                .filter((food) => {
                  if (search === "") {
                    return "";
                  } else {
                    const res = food.title
                      .toLowerCase()
                      .includes(search.toLowerCase());

                    return res;
                  }
                })
                .map((ele, i) => {
                  return (
                    <div key={i} className="card-card">
                      <Link to={`/restaurantdetails/${ele.id}`}>
                        <div className="img">
                          <img src={ele.img} alt="" />;
                        </div>
                        <div className="all-data">
                          <div className="text">
                            <h5>{ele.title}</h5>
                            <p>{ele.type}</p>
                          </div>
                          <div className="flex">
                            <p className="rating">☆ {ele.rating} </p> •
                            <p>{ele.time} mins </p> •<p>₹ {ele.rate} for Two</p>
                          </div>
                          <hr />
                          <p className="coupon">{ele.coupon}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
