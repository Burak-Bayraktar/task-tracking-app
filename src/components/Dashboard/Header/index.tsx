import DatePicker from "components/DatePicker";
import SearchBar from "../../SearchBar";

const Header = () => {
  return (
    <div className="header-container">
        <DatePicker />
        <SearchBar />
    </div>
  )
}

export default Header;