import React from "react";

const MyBtn = ({
  name,
  width = "w-auto",
}: {
  name: string;
  width?: string;
}) => {
  return (
    <button
      className={`px-24 py-3 text-base bg-primary text-white rounded-lg ${width}`}
    >
      {name}
    </button>
  );
};

export default MyBtn;
