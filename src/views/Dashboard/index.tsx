import Header from "components/Dashboard/Header";
import TaskTrackingSection from "components/Dashboard/TaskTrackingSection";
import useDate from "hooks/useDate";
import useUser from "hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "views/Dashboard/style.css";

const Dashboard = () => {
  const { activeUser } = useUser();
  const { date } = useDate();
  const navigate = useNavigate();
  
  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    if (!date) {
      navigate(`?date=${year}-${month}-${day}`);
    }
  }, []);

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