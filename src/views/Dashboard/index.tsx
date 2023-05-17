import Header from "components/Dashboard/Header";
import TaskTrackingSection from "components/Dashboard/TaskTrackingSection";
import "views/Dashboard/style.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
        <Header />
        <TaskTrackingSection />
    </div>
  )
}

export default Dashboard;