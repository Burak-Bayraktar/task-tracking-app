import "components/SearchBar/style.css";
import searchIcon from "assets/icons/search.svg";
import { useTask } from "hooks/useTask";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useDate from "hooks/useDate";

const SearchBar = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const { filterBySearchKey, tasks } = useTask();
  const navigate = useNavigate();
  const { search } = useLocation();
  const { dateAsLocaleDateString } = useDate();

  useEffect(() => {
    updateSearchFromUrl();
  }, [search]);

  useEffect(() => {
    setSearchKey("");
    const searchParams = new URLSearchParams(search);
    searchParams.delete("search");
    navigate(`?${searchParams.toString()}`);
  }, [dateAsLocaleDateString, tasks]);

  const updateSearchFromUrl = () => {
    const searchParams = new URLSearchParams(search);
    const searchKey = searchParams.get("search");

    if (searchKey) {
      setSearchKey(searchKey);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchKey = e.target.value;
    setSearchKey(newSearchKey);
    updateUrl(newSearchKey);
    filterBySearchKey(newSearchKey);
  };

  const updateUrl = (newSearchKey: string) => {
    const searchParams = new URLSearchParams(search);
    if (newSearchKey !== "") {
      searchParams.set("search", newSearchKey);
    } else {
      searchParams.delete("search");
    }
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <div className="search-bar-container">
      <input type="text" name="search" value={searchKey} onChange={handleChange} placeholder="Search" />
      <img src={searchIcon} alt="search" />
    </div>
  );
};

export default SearchBar;
