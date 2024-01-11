import React, { useEffect, useState } from 'react';

const DateUpdate: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDateTime: string = currentDateTime.toLocaleString();

  return (
    <div>
      {/* <h1>Tanggal dan Waktu Terkini:</h1> */}
      <p>{formattedDateTime}</p>
    </div>
  );
}

export default DateUpdate;