import DatePicker from "components/DatePicker";
import SearchBar from "../../SearchBar";
import ReportButton from "components/ReportButton";
import "components/Dashboard/Header/style.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-left-section">
        <ReportButton />
        <DatePicker />
      </div>
      <div className="header-right-section">
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
