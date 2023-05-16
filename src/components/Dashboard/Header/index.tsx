import DatePicker from "components/DatePicker";
import SearchBar from "../../SearchBar";
import 'components/Dashboard/Header/style.css'

const Header = () => {
  return (
    <div className="header-container">
        <DatePicker />
        <SearchBar />
    </div>
  )
}

export default Header;