import React from "react";

const ProfileCard = ({ image, name, city, country, about }) => {
  return (
    <section className="flex text-center items-center flex-col gap-3 bg-dark-grey p-10 rounded-md max-w-[20rem]">
      <div className="profile_img w-20 h-20 rounded-full overflow-hidden">
        <img src={image} alt="a person" className="w-full object-contain" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-primary text-sm">
          {city}, {country}
        </p>
      </div>
      <p className="text-xs italic">"{about}"</p>
      <ul className="links flex flex-col gap-3">
        <li>
          <a href="https://twitter.com" target="_blank">
            Twitter
          </a>
        </li>
        <li>
          <a href="https://github.com" target="_blank">
            GitHub
          </a>
        </li>
        <li>
          <a href="https://instagram.com" target="_blank">
            Instagram
          </a>
        </li>
        <li>
          <a href="https://linkedin.com" target="_blank">
            LinkedIn
          </a>
        </li>
      </ul>
    </section>
  );
};

export default ProfileCard;
