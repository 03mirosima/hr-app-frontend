import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

const AlertComponent = ({ type, text, open, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={1000} onClose={onClose}>
      <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );
};
export default AlertComponent;
