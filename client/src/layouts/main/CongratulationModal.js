// material
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@material-ui/core";
import useAuth from "hooks/useAuth";

export default function LoginButton() {
  const { authModal, setAuthModal } = useAuth();

  const handleClose = () => {
    setAuthModal(null);
  };

  const open = Boolean(authModal === "congrat");

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 10, pb: 5, textAlign: "center" }}>
        <CheckCircleOutlineIcon
          color="primary"
          sx={{ width: 250, height: 250, mx: "auto" }}
        />
        <Typography
          variant="h2"
          color="black"
          sx={{
            fontWeight: 400,
            mb: 2,
            fontFamily: "Abril Fatface, cursive",
            textAlign: "center",
          }}
        >
          Congratulations!
        </Typography>
        <Typography
          variant="h3"
          color="black"
          sx={{
            fontWeight: 400,
            mb: 5,
            textAlign: "center",
          }}
        >
          Your account has been successfully created.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: "#131025", width: 0.5, mx: "auto" }}
          onClick={() => setAuthModal("login")}
        >
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
}
