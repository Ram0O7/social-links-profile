import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import ShowError from "./ShowError";
import capitalize from "../utils/capitalize";

const InputCard = ({
  getImage,
  getName,
  getCity,
  getCountry,
  getAbout,
  updateEditStatus,
  image,
  name,
  city,
  country,
  about,
  socialLinks,
  getSocialLinks,
  formRef,
  errorStatus,
  setErrorStatus,
}) => {
  const nameInputRef = useRef(null);
  const cityInputRef = useRef(null);
  const countryInputRef = useRef(null);
  const aboutInputRef = useRef(null);
  const linkInputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(image);

  const [links, setLinks] = useState(socialLinks);

  // Handler to handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setSelectedImage(URL.createObjectURL(file)); // Set the selected image file to state
  };

  // Handler to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !selectedImage ||
      nameInputRef.current.value.trim() === "" ||
      cityInputRef.current.value.trim() === "" ||
      countryInputRef.current.value.trim() === "" ||
      aboutInputRef.current.value.trim() === ""
    ) {
      setErrorStatus({
        hasError: true,
        errorMsg: "Please fill out all fields.",
      });
      return;
    }

    if (Object.keys(links).length === 0) {
      setErrorStatus({
        hasError: true,
        errorMsg: "Please add at least one link.",
      });
      return;
    }

    getImage(selectedImage);
    getName(nameInputRef.current.value);
    getCity(cityInputRef.current.value);
    getCountry(countryInputRef.current.value);
    getAbout(aboutInputRef.current.value);
    getSocialLinks(links);

    updateEditStatus();
  };

  const handleLinkAdd = (event, value) => {
    event.preventDefault();
    if (value.trim() === "" || !value.includes(".")) {
      linkInputRef.current.value = "";
      setErrorStatus({
        hasError: true,
        errorMsg: "Please enter a valid link.",
      });
      return;
    }

    if (errorStatus.hasError) {
      setErrorStatus((prev) => ({ ...prev, hasError: false }));
    }
    // get the key from the value
    const key = value
      .replace("://", ".")
      .split(".")
      .find(
        (val) =>
          val !== "https" && val !== "http" && val !== "www" && val !== "com"
      );

    setLinks((prev) => ({
      ...prev,
      [key]: value,
    }));

    linkInputRef.current.value = "";
  };

  useEffect(() => {
    nameInputRef.current.focus();

    nameInputRef.current.value = name;
    cityInputRef.current.value = city;
    countryInputRef.current.value = country;
    aboutInputRef.current.value = about;
  }, []);

  return (
    <>
      {errorStatus.hasError && <ShowError errorMsg={errorStatus.errorMsg} />}
      <section className="bg-dark-grey p-10 rounded-md max-w-xs">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
          onFocus={() => setErrorStatus({ hasError: false })}
        >
          <Input
            label="Avatar:"
            className="w-[280px] px-3 py-2 bg-grey text-xs rounded-md text-white"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
          />
          <Input
            label="Name:"
            placeholder="Jessica Randall"
            className="w-[280px] px-3 py-2 bg-grey text-xs rounded-md text-white"
            type="text"
            ref={nameInputRef}
          />
          <div className="w-[280px] flex items-center justify-between gap-3">
            <Input
              label="City:"
              placeholder="London"
              className="w-full px-3 py-2 bg-grey text-xs rounded-md text-white"
              type="text"
              ref={cityInputRef}
            />
            <Input
              label="Country:"
              placeholder="United Kingdom"
              className="w-full px-3 py-2 bg-grey text-xs rounded-md text-white"
              type="text"
              ref={countryInputRef}
            />
          </div>
          <Input
            label="About:"
            placeholder="I'm a front-end developer."
            textarea={true}
            className="w-[280px] px-3 py-2 bg-grey text-xs rounded-md text-white"
            type="text"
            maxLength={100}
            ref={aboutInputRef}
          />
          <div className="w-[280px] text-xs font-bold added-links flex flex-wrap gap-2">
            {Object.entries(links).map(([key, value]) => (
              <div
                key={key}
                className="relative bg-grey pl-1 pr-3 py-1 rounded-sm"
              >
                <button
                  type="button"
                  className="absolute top-0 right-1 text-[10px]"
                  onClick={() => {
                    const updatedLinks = { ...links };
                    // remove the link
                    delete updatedLinks[key];
                    setLinks(updatedLinks);
                  }}
                >
                  x
                </button>
                <span className="capitalize">{capitalize(key)}</span>
              </div>
            ))}
          </div>
          <div className="w-[280px] flex items-center justify-between gap-3">
            <Input
              label="Links:"
              placeholder="https://www.twitter.com"
              className="w-full px-3 py-2 bg-grey text-xs rounded-md text-white"
              type="text"
              ref={linkInputRef}
            />
            <Button
              text="Add"
              className="mt-5 w-[80px] bg-primary text-off-black hover:bg-primary/90 px-3 py-2 rounded-md font-bold text-xs"
              onClick={(e) => handleLinkAdd(e, linkInputRef.current.value)}
            />
          </div>
          <Button
            text="Submit"
            type="submit"
            className="w-full bg-grey font-bold hover:bg-grey/90 text-sm text-white px-3 py-2 rounded-md mt-2"
          />
        </form>
      </section>
    </>
  );
};

export default InputCard;
