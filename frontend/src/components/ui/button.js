import { Button } from "@material-ui/core";

function CustomButton(props) {
  return (
    <Button {...props} color="secondary" variant="contained">
      {props.children}
    </Button>
  );
}

export default CustomButton;
