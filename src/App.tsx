import { useState, useEffect } from "react";
import Outputbox from "./Outputbox";

interface Card {
  id: number;
  name: string;
  age: string;
  about: string;
  job: string;
}

const App = () => {
  const [details, setDetails] = useState({
    name: "",
    age: "",
    about: "",
    job: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const [allCards, setAllCards] = useState<Card[]>([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newId = allCards.length + 1;

    const newCard = {
      id: newId,
      name: details.name,
      age: details.age,
      about: details.about,
      job: details.job,
    };

    fetch("http://localhost:8000/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
    }).then(() => {
      console.log("POST");
      setAllCards((prevCards) => [...prevCards, newCard]);
    });

    setDetails({
      name: "",
      age: "",
      about: "",
      job: "",
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/details/${id}`, {
      method: "DELETE",
    }).then(() => {
      setAllCards((prevCards) => prevCards.filter((card) => card.id !== id));
    });
  };

  const fetchDetails = () => {
    fetch("http://localhost:8000/details")
      .then((response) => {
        return response.json();
      })
      .then((details) => {
        setAllCards(details);
      });
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="body">
      <h1>Profili</h1>
      <div className="input-wrapper">
        <form className="profile-inputs" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id=""
            placeholder="Name"
            onChange={handleChange}
            value={details.name}
            required
          />
          <input
            type="text"
            name="age"
            id=""
            placeholder="Age"
            onChange={handleChange}
            value={details.age}
            required
          />
          <input
            type="text"
            name="about"
            id=""
            placeholder="About me"
            onChange={handleChange}
            value={details.about}
            required
          />
          <input
            type="text"
            name="job"
            id=""
            placeholder="Job"
            onChange={handleChange}
            value={details.job}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <br />
      <hr></hr>
      <br />
      <div className="all-card-wrapper">
        {allCards.map((card) => (
          <div className="cards" key={card.id}>
            <Outputbox id={card.id} values={card} handleDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
