import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Breadcrumbs, Checkbox, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {
  DataGrid,
  GridActionsCellItem,
  renderActionsCell,
  renderBooleanCell,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import AlertComponent from "../common/AlertComponent";
import { useCallback, useEffect, useState } from "react";
import axiosReceptor from "../services/axiosReceptor";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeletePopUp from "../common/DeletePopUp";
import AddIcon from "@mui/icons-material/Add";

export default function AssignmentList() {
  const navigate = useNavigate();
  const [rows, setRows] = useState(undefined);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosReceptor.get("api/assignment/list").then((res) => {
      setRows(res?.data);
    });
  };

  const handleEditClick = (id) => {
    navigate(`/employeeform`, { state: { id: id, type: "edit" } });
  };

  const columns = [
    { field: "firstName", headerName: "Adı", width: 130 },
    { field: "lastName", headerName: "Soyadı", width: 130 },
    { field: "graduationStatus", headerName: "Okul Durumu", width: 130 },
    {
      field: "position",
      headerName: "Pozisyon",
      width: 130,
    },
    {
      field: "department",
      headerName: "Departman",
      width: 130,
    },
    {
      field: "maritalStatus",
      headerName: "Medeni Durum",
      width: 130,
    },
    {
      field: "isActive",
      headerName: "Aktif mi?",
      width: 130,
      renderCell: (row) => {
        return <Checkbox disable checked={row.row.isActive} />;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "İşlemler",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Container style={{ margin: "100px auto" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Breadcrumbs>
          <Typography variant="h6" mb={3}>
            Zimmet Listeleme
          </Typography>
        </Breadcrumbs>
        <Button
          className="grey-button"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => {
            navigate("/assignmentform");
          }}
        >
          Zimmetleme
        </Button>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ height: 400, width: "100%" }}>
          {rows !== undefined && (
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
            />
          )}
        </Box>
        <Stack
          direction="row"
          spacing={3}
          marginTop={5}
          justifyContent="space-between"
        >
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
    </Container>
  );
}
