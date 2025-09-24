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

export default function InventoryForm() {
  const location = useLocation();
  const [form, setForm] = useState({
    serialNumber: "",
    brand: "",
    model: "",
    entryDate: "",
    type: "",
    status: "",
  });
  const [options, setOptions] = useState({
    inventoryStatus: [],
    inventoryType: [],
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
    const urls = ["InventoryStatus", "InventoryType"];
    Promise.all(urls.map((url) => axiosReceptor.get("api/enums/" + url)))
      .then(([inventoryStatus, inventoryType]) => {
        setOptions({
          inventoryStatus: inventoryStatus.data,
          inventoryType: inventoryType.data,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (location?.state?.type === "edit") {
      axiosReceptor
        .get(`/api/inventory/list/${location.state.id}`)
        .then((res) => {
          setForm(res?.data);
        });
    }
  }, []);
  const handleSubmit = async () => {
    try {
      if (location?.state?.type === "edit") {
        const response = await axiosReceptor.put(
          `api/inventory/update/${location?.state?.id}`,
          form
        );
        setOpenAlert(response.status === 200);
      } else {
        const response = await axiosReceptor.post("/api/inventory/save", form);
        setOpenAlert(response.status === 200);
      }
    } catch (err) {}
  };
  return (
    <Container style={{ margin: "100px auto" }}>
      <Breadcrumbs>
        <Typography variant="h6" mb={3}>
          {location?.state?.type === "edit"
            ? "Envanter Güncelle"
            : "Envanter Ekle"}
        </Typography>
      </Breadcrumbs>
      <Box component="form" autoComplete="off" sx={{ width: "100%" }}>
        <FormGroup>
          <Grid container spacing={2} sx={{ mb: 2, width: "100%" }}>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <TextField
                name="serialNumber"
                label="Seri Numarası"
                fullWidth
                onChange={(e) => onFormChange(e)}
                value={form.serialNumber || ""}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <TextField
                name="brand"
                label="Marka"
                fullWidth
                onChange={(e) => onFormChange(e)}
                value={form.brand || ""}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <TextField
                name="model"
                label="Model"
                fullWidth
                value={form.model || ""}
                onChange={(e) => onFormChange(e)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(e) => {
                    onFormChange({
                      target: {
                        name: "entryDate",
                        value: dayjs(e["$d"]).format("YYYY-MM-DD"),
                      },
                    });
                  }}
                  name="entryDate"
                  label="Depoya Giriş Tarihi"
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
                <InputLabel id="type-label">Tipi</InputLabel>
                <Select
                  labelId="type-label"
                  name="type"
                  label="Ürün Tipi"
                  fullWidth
                  value={
                    options.inventoryType?.find((item) => {
                      return item.name === form.type;
                    })?.name || ""
                  }
                  onChange={(e) => onFormChange(e)}
                >
                  {options &&
                    options.inventoryType.map((item) => (
                      <MenuItem value={item.name}>{item.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Ürün Durumu</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  label="Ürün Durumu"
                  value={
                    options.inventoryStatus.find((item) => {
                      return item.name === form.status;
                    })?.name || ""
                  }
                  fullWidth
                  onChange={(e) => onFormChange(e)}
                >
                  {options &&
                    options.inventoryStatus.map((item) => (
                      <MenuItem value={item.name}>{item.label}</MenuItem>
                    ))}
                </Select>
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
