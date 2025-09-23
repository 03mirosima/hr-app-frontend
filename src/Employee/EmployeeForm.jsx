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
import { useLocation, useNavigate } from "react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Alert,
  Breadcrumbs,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import axiosReceptor from "../services/axiosReceptor";
import AlertComponent from "../common/AlertComponent";

export default function EmployeeForm() {
  const location = useLocation();
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
    navigate(-1);
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

  useEffect(() => {
    if (location?.state?.type === "edit") {
      axiosReceptor
        .get(`/api/employees/list/${location.state.id}`)
        .then((res) => {
          setForm(res?.data);
        });
    }
  }, []);
  const handleSubmit = async () => {
    try {
      if (location?.state?.type === "edit") {
        const response = await axiosReceptor.put(
          `api/employees/update/${location?.state?.id}`,
          form
        );
        setOpenAlert(response.status === 200);
      } else {
        const response = await axiosReceptor.post("/api/employees/save", form);
        setOpenAlert(response.status === 200);
      }
    } catch (err) {}
  };
  return (
    <Container style={{ margin: "100px auto" }}>
      <Breadcrumbs>
        <Typography variant="h6" mb={3}>
          {location?.state?.type === "edit"
            ? "Çalışan Güncelle"
            : "Çalışan Ekle"}
        </Typography>
      </Breadcrumbs>
      <Box component="form" autoComplete="off" sx={{ width: "100%" }}>
        <FormGroup>
          <Grid container spacing={2} sx={{ mb: 2, width: "100%" }}>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <TextField
                name="firstName"
                label="İsim"
                fullWidth
                onChange={(e) => onFormChange(e)}
                value={form.firstName || ""}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <TextField
                name="lastName"
                label="Soyisim"
                fullWidth
                onChange={(e) => onFormChange(e)}
                value={form.lastName || ""}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <TextField
                type="number"
                name="tckn"
                label="TCKN"
                fullWidth
                value={form.tckn || ""}
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
                  /*  defaultValue={dayjs(form["birthDate"]).format("YYYY-MM-DD")} */
                  /*  value={form["birthDate"] || ""} */
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
                  fullWidth
                  value={
                    options.gender.find((item) => {
                      return item.name === form.gender;
                    })?.name || ""
                  }
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
                  value={
                    options.maritalStatus.find((item) => {
                      return item.name === form.maritalStatus;
                    })?.name || ""
                  }
                  fullWidth
                  onChange={(e) => onFormChange(e)}
                >
                  {options &&
                    options.maritalStatus.map((item) => (
                      <MenuItem value={item.name}>{item.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <FormControl fullWidth>
                <InputLabel id="graduationStatus-label">Okul Durumu</InputLabel>
                <Select
                  labelId="graduationStatus-label"
                  name="graduationStatus"
                  label="Okul Durumu"
                  value={
                    options.graduationStatus.find((item) => {
                      return item.name === form.graduationStatus;
                    })?.name || ""
                  }
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
                  value={
                    options.department.find((item) => {
                      return item.name === form.department;
                    })?.name || ""
                  }
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
                  value={
                    options.position.find((item) => {
                      return item.name === form.position;
                    })?.name || ""
                  }
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
                  defaultValue={
                    options.role.find((item) => {
                      return item.name === form.role;
                    })?.name || ""
                  }
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
                  control={
                    <Checkbox
                      size="large"
                      defaultChecked={form.isActive || ""}
                      onChange={(e) =>
                        onFormChange({
                          target: {
                            name: "isActive",
                            value: e.target.checked,
                          },
                        })
                      }
                    />
                  }
                  label="Aktif mi?"
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
            {location?.state?.type === "edit" ? "Güncelle" : "Kaydet"}
          </Button>
        </Stack>
      </Box>
      {openAlert && <AlertComponent type={"success"} text={"Başarılı!"} />}
    </Container>
  );
}
