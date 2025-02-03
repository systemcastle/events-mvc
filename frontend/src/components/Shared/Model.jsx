import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(1),
    position: "absolute",
    zIndex: 5000,
    "& .MuiDialogTitle-root": {
      padding: "5px",
      paddingLeft: "1em",
    },
  },
  dialogTitle: {
    paddingRight: "0px",
  },
  dialogContent: {
    padding: "10px 5px",
    overflowX: "hidden",
  },
}));

export default function Popup(props) {
  const { title, children, open, setOpen } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth="sm"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex" }}>
          <Typography
            variant="h6"
            component="div"
            style={{
              flexGrow: 1,
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
          <Button
            color="primary"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
