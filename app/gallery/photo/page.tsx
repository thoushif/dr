import React from "react";

const OnlyImage = ({ params }: { params: { id: string } }) => {
  return <div>My Post: {params.id}</div>;
};

export default OnlyImage;
