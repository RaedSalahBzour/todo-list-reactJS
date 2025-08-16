import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

export default function EditDialog({ open, onClose, task, onSave }) {
  const [value, setValue] = useState(task.name);

  useEffect(() => {
    setValue(task.name);
  }, [task]);

  const handleSave = () => {
    if (value.trim() !== "") {
      onSave(value);
      onClose();
    }
  };
  if (!open) return null;
  return (
    <Dialog fullWidth open={open} onClose={() => onClose()}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Task"
          value={value}
          onChange={e => setValue(e.target.value)}
          autoFocus
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Close</Button>
        <Button onClick={handleSave}>Edit</Button>
      </DialogActions>
    </Dialog>
  );
}
