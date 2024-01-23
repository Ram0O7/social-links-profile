import React, { useRef, useState } from "react";

const InputCard = ({
  getImage,
  getName,
  getCity,
  getCountry,
  getAbout,
  updateEditStatus,
}) => {
  const nameInputRef = useRef(null);
  const cityInputRef = useRef(null);
  const countryInputRef = useRef(null);
  const aboutInputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [hasError, setHasError] = useState(false);

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
      setHasError(true);
      return;
    }
    getImage(selectedImage);
    getName(nameInputRef.current.value);
    getCity(cityInputRef.current.value);
    getCountry(countryInputRef.current.value);
    getAbout(aboutInputRef.current.value);

    updateEditStatus();
  };

  return (
    <>
      {hasError && (
        <p className="text-red-700 text-center font-bold text-sm mb-4 animate-pulse">
          Please fill in all fields!
        </p>
      )}
      <section className="bg-dark-grey p-10 rounded-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3 max-w-xs"
          onFocus={() => setHasError(false)}
        >
          <div className="flex flex-col">
            <label htmlFor="file-input" className="mb-2">
              Avatar:
            </label>
            <input
              className="w-[280px] px-3 py-2 bg-grey text-xs rounded-md text-white"
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2">
              Name:
            </label>
            <input
              className="w-[280px] px-3 py-2 bg-grey text-xs rounded-md text-white"
              id="name"
              type="text"
              ref={nameInputRef}
            />
          </div>
          <div className="w-[280px] flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <label htmlFor="city" className="mb-2">
                City:
              </label>
              <input
                className="w-full px-3 py-2 bg-grey text-xs rounded-md text-white"
                id="city"
                type="text"
                ref={cityInputRef}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="country" className="mb-2">
                Country:
              </label>
              <input
                className="w-full px-3 py-2 bg-grey text-xs rounded-md text-white"
                id="country"
                type="text"
                ref={countryInputRef}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="about" className="mb-2">
              About:
            </label>
            <textarea
              className="w-[280px] px-3 py-2 bg-grey text-xs rounded-md text-white"
              id="about"
              type="text"
              maxLength={100}
              ref={aboutInputRef}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-grey font-bold hover:bg-grey/90 text-sm text-white px-3 py-2 rounded-md mt-2"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default InputCard;
