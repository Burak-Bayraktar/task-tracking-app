import "components/ReportButton/style.css"
import { useModal } from "hooks/useModal";

const ReportButton = () => {
  const { addModal } = useModal();

  const handleClick = () => {
    addModal("Report", null);
  }

  return (
     <button className="report-button" onClick={handleClick}>Report Your Daily Tasks</button>
  )
}

export default ReportButton