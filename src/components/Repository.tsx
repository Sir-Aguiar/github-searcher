import axios from "axios";
import React, { useEffect, useState } from "react";
import { GithubUser, UserRepository } from "../App";
import { AiOutlineFork, AiFillGithub } from "react-icons/ai";
import { GoRepoClone } from "react-icons/go";
import { IoIosArrowDropdown } from "react-icons/io";
interface PropsTypes {
  repo: UserRepository;
  user: GithubUser;
}

const Repository: React.FC<PropsTypes> = ({ repo, user }) => {
  const [moreInfosActive, toggleMoreInfos] = useState(false);
  return (
    <div className={`repository`}>
      <div className="flex flex-row items-center col-span-1 row-span-1">
        <h1 className={`mr-2 ${repo.fork ? "text-blue-800" : ""}`}>
          {repo?.full_name.replace(`${user.login}/`, "")}
        </h1>
        <IoIosArrowDropdown
          className="cursor-pointer"
          onClick={() => toggleMoreInfos(!moreInfosActive)}
        />
      </div>
      <div className="gitIcons">
        <span>
          {repo.forks_count} <AiOutlineFork size={20} />{" "}
        </span>
        <span>
          <GoRepoClone
            size={20}
            onClick={() => {
              navigator.clipboard.writeText(`git clone ${repo.clone_url}`);
              alert("git clone url copied");
            }}
          />{" "}
        </span>
        <span>
          <a href={repo.html_url} target="_blank">
            <AiFillGithub size={20} />
          </a>{" "}
        </span>
      </div>
      <div className={`moreInfos ${moreInfosActive ? "active" : ""}`}>
        <div className="moreHeader">
          <span className="bg-slate-200 p-1 rounded-md m-1">
            Owner: {repo.owner.login}
          </span>
          <span className="text-lg">
            Description:{" "}
            {repo.description ? repo.description : "No description"}
          </span>
          <span>Language: {repo.language}</span>
          <span>Topics:</span>
          <div className="topics">
            {repo.topics?.map((topic, index) => (
              <span
                className="topic"
                key={
                  (((index * Math.random()) / Math.random() ** 3) *
                    Math.random()) /
                  index ** Math.random()
                }
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repository;
