import styles from "./Charts.module.scss"


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Card from "../card/Card";
import { selectOrderHistory } from "../../redux/slice/orderSlice";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

const Charts = () => {
  const orders = useSelector(selectOrderHistory)
  const array =[]
  orders.map((item)=>{
    const { orderStatus } = item
    array.push(orderStatus)
  })
  const getOrderCount=(arr,value)=>{
    return arr.filter((n)=>n === value).length


  }
  // const x= getOrderCount(array,"Order Placed")
  // console.log(x);
  const [q1,q2,q3,q4]=["Order Placed","Processing...","Shipped...","Delivered"]
  const placed=getOrderCount(array,q1)
  const processing=getOrderCount(array,q2)
  const shipped=getOrderCount(array,q3)
  const delivered=getOrderCount(array,q4)
    const data = {
  labels:["Placed Orders","Processing","Shipped","Delivered"],
  datasets: [
    {
      label: 'Order Count',
      data: [placed,processing,shipped,delivered],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    
  ],
};
  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />;
      </Card>
    </div>
  )
}

export default Charts
