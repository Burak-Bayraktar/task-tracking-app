import DatePicker from "components/DatePicker";
import SearchBar from "../../SearchBar";
import ReportButton from "components/ReportButton";
import "components/Dashboard/Header/style.css";

const Header = () => {
  return (
    <div className="header-container">
      <ReportButton />
      <DatePicker />
      <SearchBar />
    </div>
  );
};

export default Header;
