import "components/SearchBar/style.css";
import searchIcon from "assets/icons/search.svg";

const SearchBar = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Add logic to search later
    const test = new FormData(e.target as HTMLFormElement)
    console.log(test.get("search"))
  };

  return (
    <div className="search-bar-container">
      <form action="post" onSubmit={handleSubmit}>
        <input type="text" name="search" placeholder="Search" />
      </form>
      <img src={searchIcon} alt="search" />
    </div>
  );
};

export default SearchBar;
