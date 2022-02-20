import axios from "axios";
import React, { useEffect, useState } from "react";
import Repository from "./components/Repository";
interface OptionalsGithubInfos {
  bio?: string;
  location?: string;
  email?: string;
  hireble?: boolean;
  twitter_username?: string;
}
export interface UserRepository {
  id: number;
  full_name: string;
  description?: string;
  fork: boolean;
  forks_count: number;
  clone_url: string;
  deployments_url?: string;
  commits_url: string;
  html_url: string;
  url: string;
  topics?: string[];
  language?: string;
  wathcers_count: number;
  owner: GithubUser;
}
export interface GithubUser extends OptionalsGithubInfos {
  name: string;
  login: string;
  avatar_url: string;
  public_repos: number;
  repos_url: string;
  html_url: string;
  followers: number;
  following: number;
  created_at: string;
  followers_url: string;
  following_url: string;
}

const App = () => {
  const [search, setSearch] = useState<string>("");
  const [user, setUser] = useState<GithubUser>();
  const [window, setWindow] = useState("Repositories");
  const [repositories, setRepositories] = useState<[UserRepository]>();
  const makeSearch = () => {
    axios.get(`https://api.github.com/users/${search}`).then((response) => {
      setUser(response.data);
      searchRepos(response.data.repos_url);
    });
  };
  const searchRepos = (url: string) => {
    axios
      .get(url ? url : `https://api.github.com/users/${search}/repos`)
      .then((response) => {
        setRepositories(response.data);
      });
  };
  return (
    <div className="flex-1 p-2 flex flex-col items- bg-root-bg">
      <div className="container p-1 flex justify-center xsm:flex-col">
        <input
          className="userInput"
          type="text"
          placeholder="Search for"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button className="searchButton" onClick={makeSearch}>
          Search{" "}
        </button>
      </div>
      {user && (
        <div className="profileContainer border-2 border-blue-900">
          <div className="profileHeader">
            <div className="userProfile">
              <img src={user?.avatar_url} className="w-32 rounded-full" />
              <h1 className="text-2xl opacity-80">{user?.name}</h1>
              <h2 className="text-xl text-center opacity-70">
                {user?.login} ({user.location})
              </h2>
            </div>
            <div className="profileInfoItem">
              <p>Followers: {user.followers}</p>
              <p>Following: {user.following}</p>
            </div>
            <div className="profileInfoItem">
              <p>Repositories: {user.public_repos}</p>
              <a
                href={user.html_url}
                target="_blank"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                Go to profile
              </a>
            </div>
          </div>
          <div className="profileContent">
            <div className="repositories ">
              {repositories?.map((repo) => (
                <Repository user={user} repo={repo} key={repo.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
