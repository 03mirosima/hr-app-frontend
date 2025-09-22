import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import * as React from "react";
import { useNavigate } from "react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Alert, Container, Snackbar, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axiosReceptor from "../services/axiosReceptor";
import AlertComponent from "../common/AlertComponent";

export default function EmployeeForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    tckn: "",
    birthDate: "",
    gender: "",
    maritalStatus: "",
    graduationStatus: "",
    isActive: false,
    department: "",
    position: "",
    role: "",
  });
  const [options, setOptions] = useState({
    department: [],
    gender: [],
    graduationStatus: [],
    inventoryStatus: [],
    inventoryType: [],
    maritalStatus: [],
    position: [],
    role: [],
  });
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const handleBack = React.useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const urls = [
      "Department",
      "Gender",
      "GraduationStatus",
      "InventoryStatus",
      "InventoryType",
      "MaritalStatus",
      "Position",
      "Role",
    ];
    Promise.all(urls.map((url) => axiosReceptor.get("api/enums/" + url)))
      .then(
        ([
          department,
          gender,
          graduationStatus,
          inventoryStatus,
          inventoryType,
          maritalStatus,
          position,
          role,
        ]) => {
          setOptions({
            department: department.data,
            gender: gender.data,
            graduationStatus: graduationStatus.data,
            inventoryStatus: inventoryStatus.data,
            inventoryType: inventoryType.data,
            maritalStatus: maritalStatus.data,
            position: position.data,
            role: role.data,
          });
        }
      )
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axiosReceptor.post("/api/employees/save", form);

      setOpenAlert(response.status === 200);
    } catch (err) {}
  };
  return (
    <Container style={{ margin: "100px auto" }}>
      <Typography variant="h6">Ekle</Typography>
      <Box component="form" autoComplete="off" sx={{ width: "100%" }}>
        <FormGroup>
          <Grid container spacing={2} sx={{ mb: 2, width: "100%" }}>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <TextField
                name="firstName"
                label="İsim"
                fullWidth
                onChange={(e) => onFormChange(e)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <TextField
                name="lastName"
                label="Soyisim"
                fullWidth
                onChange={(e) => onFormChange(e)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <TextField
                type="number"
                name="tckn"
                label="TCKN"
                fullWidth
                onChange={(e) => onFormChange(e)}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                    },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(e) => {
                    onFormChange({
                      target: {
                        name: "birthDate",
                        value: dayjs(e["$d"]).format("YYYY-MM-DD"),
                      },
                    });
                  }}
                  name="birthDate"
                  label="Doğum Tarihi"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <FormControl fullWidth>
                <InputLabel id="gender-label">Cinsiyet</InputLabel>
                <Select
                  labelId="gender-label"
                  name="gender"
                  label="Cinsiyet"
                  defaultValue=""
                  fullWidth
                  onChange={(e) => onFormChange(e)}
                >
                  {options &&
                    options.gender.map((item) => (
                      <MenuItem value={item.name}>{item.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <FormControl fullWidth>
                <InputLabel id="maritalStatus-label">Medeni Durum</InputLabel>
                <Select
                  labelId="maritalStatus-label"
                  name="maritalStatus"
                  label="Medeni Durum"
                  defaultValue=""
                  fullWidth
                  onChange={(e) => onFormChange(e)}
                >
                  {options &&
                    options.maritalStatus.map((item) => (
                      <MenuItem value={item.name}>{item.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>{" "}
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <FormControl fullWidth>
                <InputLabel id="graduationStatus-label">Okul Durumu</InputLabel>
                <Select
                  labelId="graduationStatus-label"
                  name="graduationStatus"
                  label="Okul Durumu"
                  defaultValue=""
                  fullWidth
                  onChange={(e) => onFormChange(e)}
                >
                  {options &&
                    options.graduationStatus.map((item) => (
                      <MenuItem value={item.name}>{item.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <FormControl fullWidth>
                <InputLabel id="department-label">Departman</InputLabel>
                <Select
                  labelId="department-label"
                  name="department"
                  label="Departman"
                  defaultValue=""
                  fullWidth
                  onChange={(e) => onFormChange(e)}
                >
                  {options &&
                    options.department.map((item) => (
                      <MenuItem value={item.name}>{item.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <FormControl fullWidth>
                <InputLabel id="position-label">Pozisyon</InputLabel>
                <Select
                  labelId="position-label"
                  name="position"
                  label="Pozisyon"
                  defaultValue=""
                  fullWidth
                  onChange={(e) => onFormChange(e)}
                >
                  {options &&
                    options.position.map((item) => (
                      <MenuItem value={item.name}>{item.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>{" "}
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <FormControl fullWidth>
                <InputLabel id="role-label">Rol</InputLabel>
                <Select
                  labelId="role-label"
                  name="role"
                  label="Rol"
                  defaultValue=""
                  fullWidth
                  onChange={(e) => onFormChange(e)}
                >
                  {options &&
                    options.role.map((item) => (
                      <MenuItem value={item.name}>{item.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
              <FormControl>
                <FormControlLabel
                  name="isActive"
                  control={<Checkbox size="large" onChange={() => {}} />}
                  label="Aktif mi?"
                  onChange={(e) => onFormChange(e)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </FormGroup>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button
            type="button"
            className="grey-button"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Geri
          </Button>
          <Button
            type="button"
            className="grey-button"
            variant="outlined"
            onClick={() => handleSubmit()}
          >
            Kaydet
          </Button>
        </Stack>
      </Box>
      {openAlert && (
        <AlertComponent type={"success"} text={"Kayıt başarılı!"} />
      )}
    </Container>
  );
}
