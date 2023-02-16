import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/hooks/useCategory";
import { Button } from "react-bootstrap";

const Category = (props) => {
  const { handleCategory } = props;
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return (
    <div className="card">
      <div className="card-header">Category</div>
      <ul className="list-group list-group-flush">
        <li
          className="list-group-item"
          style={{ cursor: "pointer" }}
          onClick={() => handleCategory("all")}
        >
          All
        </li>
        {categories?.map((category) => (
          <li
            key={category._id}
            className="list-group-item"
            style={{ cursor: "pointer" }}
            onClick={() => handleCategory(category._id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
