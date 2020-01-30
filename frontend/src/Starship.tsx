import React from "react";
import { IStarship } from "./App";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

interface IProp {
  starship: IStarship;
}

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: "30px 300px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginTop: 10,
    marginBottom: 0,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  progress: {
    height: 10
  }
});

export const Starship = (props: IProp) => {
  const { name, crew, passengers, hyperdrive_rating } = props.starship;
  const hyperdrive_rating_number = Number(hyperdrive_rating);
  const hyperdrive_progress_value = isNaN(hyperdrive_rating_number)
    ? 0
    : hyperdrive_rating_number * 16.66;

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        {/* name */}
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Name
        </Typography>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>

        {/* crew */}
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Crew
        </Typography>
        <Typography variant="h5" component="h2">
          {crew}
        </Typography>

        {/* passengers */}
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Passengers
        </Typography>
        <Typography variant="h5" component="h2">
          {passengers}
        </Typography>

        {/* hyperdrive_rating */}
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Hyperdrive Rating
        </Typography>
        <LinearProgress
          className={classes.progress}
          variant="determinate"
          value={hyperdrive_progress_value}
          color="secondary"
        />
      </CardContent>
    </Card>
  );
};

export default Starship;
