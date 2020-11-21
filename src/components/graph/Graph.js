import React from 'react'
import { Pie } from "react-chartjs-2";
import styles from "./Graph.module.css";

export default function Graph(props) {
  const getGraphData = () => {
    const { TotalConfirmed, TotalRecovered, TotalDeaths } = props.global;
    let countArray = []
    countArray.push(TotalConfirmed, TotalRecovered, TotalDeaths)
    return {
      labels: [
        "Active",
        "Recovered",
        "Death",
      ],
      height: 60,
      datasets: [
        {
          fill: false,
          borderColor: "#EBEEFE",
          pointBackgroundColor: "#fff",
          pointHoverRadius: 5,
          data: countArray,
          backgroundColor: [
            "#2C71D6",
            "#57A551",
            "#C9433C"
          ],
        },
      ],
    };
  };

  const data = getGraphData();
  return (
    <React.Fragment>
      <div className={styles.graph_card} >
        <div className={styles.info_container}>
          <p className={styles.heading}>World Statistics</p>
          <span className={styles.sub_heading}>Total Patients</span><br></br>
          <span className={styles.count}>{props.global.TotalConfirmed}</span>
        </div>
        <Pie data={data} width={100}
          height={100}
          options={{ maintainAspectRatio: false }} />
      </div>
    </React.Fragment>
  )

}