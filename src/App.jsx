import { useRef, useState } from "react";
import ProfileCard from "./components/ProfileCard";
import profileImg from "./assets/images/avatar-jessica.jpeg";
import InputCard from "./components/InputCard";
import Button from "./components/Button";

const App = () => {
  const [image, setImage] = useState(profileImg);
  const [name, setName] = useState("Jessica Randall");
  const [city, setCity] = useState("London");
  const [country, setCountry] = useState("United Kingdom");
  const [about, setAbout] = useState("Front-end developer and avid reader.");

  // passing to the child form component to handle reset form logic
  const formRef = useRef(null);

  const [errorStatus, setErrorStatus] = useState({
    hasError: false,
    errorMsg: "Please fill out all the fields.",
  });

  const [socialLinks, setSocialLinks] = useState({
    twitter: "https://twitter.com",
    github: "https://github.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  });

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
            socialLinks={socialLinks}
          />
          <Button
            text="Edit"
            className="mt-5 w-[80px] bg-primary text-off-black hover:bg-primary/90 px-3 py-2 rounded-md font-bold text-xs md:text-sm"
            onClick={() => setEditStatus(true)}
          />
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
            socialLinks={socialLinks}
            getSocialLinks={(socialLinks) => setSocialLinks(socialLinks)}
            formRef={formRef}
            errorStatus={errorStatus}
            setErrorStatus={(errorStatus) => setErrorStatus(errorStatus)}
          />
          <div className="w-[320px] flex items-center justify-between gap-3">
            <Button
              text="Reset"
              onClick={() => {
                formRef.current.reset();
                setErrorStatus((prev) => ({ ...prev, hasError: false }));
              }}
              type="button"
              className="mt-5 w-[80px] bg-primary text-off-black hover:bg-primary/90 px-3 py-2 rounded-md font-bold text-xs md:text-sm"
            />
            <Button
              className="mt-5 w-[80px] bg-primary text-off-black hover:bg-primary/90 px-3 py-2 rounded-md font-bold text-xs md:text-sm"
              text="Cancel"
              onClick={() => setEditStatus(false)}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default App;
