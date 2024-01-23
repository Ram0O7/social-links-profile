import { useState } from "react";
import ProfileCard from "./components/ProfileCard";
import profileImg from "./assets/images/avatar-jessica.jpeg";
import InputCard from "./components/InputCard";

const App = () => {
  const [image, setImage] = useState(profileImg);
  const [name, setName] = useState("Jessica Randall");
  const [city, setCity] = useState("London");
  const [country, setCountry] = useState("United Kingdom");
  const [about, setAbout] = useState("Front-end developer and avid reader.");

  const [editStatus, setEditStatus] = useState(false);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-off-black">
      {!editStatus ? (
        <>
          <ProfileCard
            image={image}
            name={name}
            city={city}
            country={country}
            about={about}
          />
          <button
            className="mt-5 w-[80px] bg-primary text-off-black hover:bg-primary/90 px-3 py-2 rounded-md font-bold text-xs"
            onClick={() => setEditStatus(true)}
          >
            New
          </button>
        </>
      ) : (
        <>
          <InputCard
            image={image}
            name={name}
            city={city}
            country={country}
            about={about}
            getImage={(image) => setImage(image)}
            getName={(name) => setName(name)}
            getCity={(city) => setCity(city)}
            getCountry={(country) => setCountry(country)}
            getAbout={(about) => setAbout(about)}
            updateEditStatus={() => setEditStatus(false)}
          />
          <button
            className="mt-5 w-[80px] bg-primary text-off-black hover:bg-primary/90 px-3 py-2 rounded-md font-bold text-xs"
            onClick={() => setEditStatus(false)}
          >
            Cancel
          </button>
        </>
      )}
    </main>
  );
};

export default App;
