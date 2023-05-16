import Header from "components/Dashboard/Header";
import TaskTracker from "components/Dashboard/TaskTracker";

const Dashboard = () => {
  return (
    <div className="dashboard">
        <Header />
        <TaskTracker />
    </div>
  )
}

export default Dashboard;