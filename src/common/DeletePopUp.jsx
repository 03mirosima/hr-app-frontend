import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeletePopUp({ handleClose, open, handleDelete }) {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Uyarı!</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Veriyi Silmek İstediğinize Emin Misiniz?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hayır</Button>
        <Button onClick={handleDelete}>Evet</Button>
      </DialogActions>
    </Dialog>
  );
}
