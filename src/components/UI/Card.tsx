import type { PropsWithChildren } from "react";
import classes from "./Card.module.css";

interface CardProps extends PropsWithChildren<{ className?: string }> {}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
