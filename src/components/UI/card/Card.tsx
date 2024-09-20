import React from "react";
import classes from "./Card.module.scss";

interface CardProps {
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className={classes.card}>
      {/* Render header if provided */}
      {props.header && <div className={classes.header}>{props.header}</div>}
      
      {/* Render body if provided */}
      {props.body && <div className={classes.body}>{props.body}</div>}
      
      {/* Render footer if provided */}
      {props.footer && <div className={classes.footer}>{props.footer}</div>}
      
      {/* Render children as default if needed */}
      {props.children}
    </div>
  );
};

export default Card;
