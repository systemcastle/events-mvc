import classes from "./logistics-item.module.css";
import SportsBaseballIcon from "@material-ui/icons/SportsBaseball";

function LogisticsItem(props) {
  const { icon: Icon, sport = false } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        {sport ? <SportsBaseballIcon /> : <Icon />}
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
