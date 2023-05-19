import Header from "components/Dashboard/Header";
import TaskTrackingSection from "components/Dashboard/TaskTrackingSection";
import useUser from "hooks/useUser";
import "views/Dashboard/style.css";

const Dashboard = () => {
  const { activeUser } = useUser();

  return (
    <div className="dashboard">
        <div className="active-user">
          {activeUser?.name}
        </div>
        <Header />
        <TaskTrackingSection />
    </div>
  )
}

export default Dashboard;