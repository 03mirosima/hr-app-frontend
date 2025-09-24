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

export default function AssignmentForm() {
  const location = useLocation();
  const [form, setForm] = useState({
    employeeId: "",
    inventoryId: "",
    assigner: "",
  });
  const [options, setOptions] = useState({
    employeeList: [],
    inventoryList: [],
  });
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const handleBack = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getData = () => {
    axiosReceptor.get("api/employees/list").then((res) => {
      setRows(res?.data);
    });
  };
  useEffect(() => {
    const urls = ["api/employees/list", "api/inventory/list"];
    Promise.all(urls.map((url) => axiosReceptor.get(url)))
      .then(([employeeList, inventoryList]) => {
        setOptions({
          employeeList: employeeList.data,
          inventoryList: inventoryList.data,
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
        const response = await axiosReceptor.post(
          "/api/assignment/create",
          form
        );
        setOpenAlert(response.status === 200);
      }
    } catch (err) {}
  };
  console.log(
    options.employeeList?.find((item) => {
      return item.id === form.employeeId;
    })?.firstName,
    "ldd"
  );
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
              <FormControl fullWidth>
                <InputLabel id="employeeId-label">Zimmetleyen Kişi</InputLabel>
                <Select
                  labelId="employeeId-label"
                  name="employeeId"
                  label="Zİmmetleyen Kişi"
                  fullWidth
                  value={
                    options.employeeList?.find((item) => {
                      return item.id === form.employeeId;
                    })?.id || ""
                  }
                  onChange={(e) => onFormChange(e)}
                >
                  {options &&
                    options.employeeList
                      .filter((item) => item?.id !== form.assigner)
                      .map((item_) => (
                        <MenuItem value={item_.id}>
                          {item_.firstName} {item_?.lastName}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <FormControl fullWidth>
                <InputLabel id="inventoryId-label">Envanter</InputLabel>
                <Select
                  labelId="inventoryId-label"
                  name="inventoryId"
                  label="Envanter"
                  value={
                    options.inventoryList.find((item) => {
                      return item.name === form.inventoryId;
                    })?.name || ""
                  }
                  fullWidth
                  onChange={(e) => onFormChange(e)}
                >
                  {options &&
                    options.inventoryList.map((item_) => (
                      <MenuItem value={item_.name}>{item_.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <FormControl fullWidth>
                <InputLabel id="employeeId-label">Zimmetleyen Kişi</InputLabel>
                <Select
                  labelId="employeeId-label"
                  name="assigner"
                  label="Zİmmetlenen Kişi"
                  fullWidth
                  value={
                    options.employeeList?.find((item) => {
                      return item.id === form.assigner;
                    })?.id || ""
                  }
                  onChange={(e) => onFormChange(e)}
                >
                  {options &&
                    options.employeeList
                      .filter((item) => item?.id !== form.employeeId)
                      .map((item_) => (
                        <MenuItem value={item_.id}>
                          {item_.firstName} {item_?.lastName}
                        </MenuItem>
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
