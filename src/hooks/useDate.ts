import { useLocation } from "react-router";

const useDate = () => {
   const { search } = useLocation();
   const date = new URLSearchParams(search).get("date");

   return {
    date,
    dateAsLocaleDateString: date && new Date(date).toLocaleDateString('tr-TR'),
   }
}

export default useDate;