import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

const AlertComponent = ({ type, text, open }) => {
  return (
    <Snackbar open={true} autoHideDuration={10}>
      <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );
};
export default AlertComponent;
