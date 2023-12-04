import Images from "./Images";

const Outputbox = ({ id, values, handleDelete }) => (
  <div className="card-content">
    <Images />
    <h3>{`Profile ${id}`}</h3>
      <div className="outputs">{`Name: ${values.name}`}</div>
      <div className="outputs">{`Age: ${values.age}`}</div>
      <div className="outputs">{`About: ${values.about}`}</div>
      <div className="outputs">{`Job: ${values.job}`}</div>

    <button onClick={() => handleDelete(id)}>Delete</button>
  </div>
);

export default Outputbox;
