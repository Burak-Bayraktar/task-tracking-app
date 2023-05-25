import { DateTime } from 'luxon';
import { useLocation } from 'react-router-dom';
import { getIsoDate } from 'utils';

const useDate = () => {
   const { search } = useLocation();
   const dateFromUrl = new URLSearchParams(search).get("date");
   let isoDate: string | null = '';

   if (dateFromUrl) {
      isoDate = getIsoDate(dateFromUrl);
   }

   return {
    date: isoDate,
    dateAsLocaleDateString: isoDate && DateTime.fromISO(isoDate, { locale: 'tr' }).toLocaleString(),
   }
}

export default useDate;