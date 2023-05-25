import Header from "components/Dashboard/Header";
import TaskTrackingSection from "components/Dashboard/TaskTrackingSection";
import useDate from "hooks/useDate";
import useUser from "hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "views/Dashboard/style.css";
import { DateTime } from "luxon";

const Dashboard = () => {
  const { activeUser } = useUser();
  const { date } = useDate();
  const navigate = useNavigate();
  
  useEffect(() => {
    const today = DateTime.now();
    const { day, month, year } = today;

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