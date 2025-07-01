import styles from "./InfoBox.module.scss";
import React from 'react';
import Card from "../card/Card";

const InfoBox = ({ cardClass, title, count, icons }) => {
  return (
    <div className={styles["info-box"]}>
      <Card cardClass={cardClass}>
        <h4>{title}</h4>
        <span>
          <h3>{count}</h3>
          {icons}
        </span>
      </Card>
    </div>
  );
};

export default InfoBox;
