import "components/ReportButton/style.css"

const ReportButton = () => {

  const handleClick = () => {
    // TODO: Open modal to report daily tasks
    console.log("ReportButton clicked")
  }

  return (
     <button className="report-button" onClick={handleClick}>Report Your Daily Tasks</button>
  )
}

export default ReportButton