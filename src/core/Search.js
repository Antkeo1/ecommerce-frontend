import React, { useEffect, useState } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    cargory: "",
    search: "",
    results: [],
    searched: false
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({
          ...data,
          categories: data
        });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    if (search) {
      list({
        search: search || undefined,
        category: category
      }).then(res => {
        if (res.error) {
          console.log(res.error);
        } else {
          setData({
            ...data,
            results: res,
            searched: true
          });
        }
      });
    }
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select onChange={handleChange("category")} className="btn mr-2">
              <option value="ALL">Pick Category</option>
              {categories.map((c, i) => {
                <option key={i} value={c._id}>
                  {c.name}
                </option>;
              })}
            </select>
          </div>

          <input
            onChange={handleChange("search")}
            type="search"
            className="form-control"
            placeHolder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      {JSON.stringify(results)}
    </div>
  );
};

export default Search;