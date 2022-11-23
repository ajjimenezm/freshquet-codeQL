import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Modal,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import Slider from "@mui/material/Slider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  display: "flex",
  flexDirection: "column",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function valuetext(value: number) {
  return `${value}°C`;
}

const marks = [
  {
    value: 5,
    label: "5 KM",
  },
  {
    value: 50,
    label: "50 KM",
  },
  {
    value: 100,
    label: "100 KM",
  },
];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const ShopFilters = (props: any) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [filters, setFilters] = useState({
    max_price: 0,
    min_price: -1,
    distanceFilter: false,
    distanceFilterValue: 0,
    product_type: "",
  });
  const handleChangeFilters = (event: any) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleLocationFilters = (event: any) => {
    setFilters({
      ...filters,
      distanceFilterValue: event.target.value,
      distanceFilter: event.target.value !== 0,
    });
  };

  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Precio" {...a11yProps(0)} />
            <Tab label="Producto" {...a11yProps(1)} />
            <Tab label="Distancia" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className="flex flex-col text-right">
            <div className="flex flex-row justify-around py-4">
              <input
                type="number"
                name="min_price"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full max-w-[40%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm "
                onChange={handleChangeFilters}
                placeholder="Precio Minimo"
              />
              <input
                type="number"
                name="max_price"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full max-w-[40%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm "
                onChange={handleChangeFilters}
                placeholder="Precio Maximo"
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box className=" mb-2 block text-sm font-medium text-gray-900">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Tipo de producto
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                name="product_type"
                label="Tipo de usuario"
                onChange={handleChangeFilters}
              >
                <MenuItem value="freshh">freshh</MenuItem>
                <MenuItem value="miscellaneous">miscellaneous</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* Location filter */}
          <Slider
            aria-label="Custom marks"
            defaultValue={10}
            getAriaValueText={valuetext}
            step={5}
            valueLabelDisplay="auto"
            marks={marks}
            onChange={handleLocationFilters}
          />
        </TabPanel>
        <Button
          variant="contained"
          onClick={() => {
            console.log(filters);
            props.handleClose(filters);
          }}
        >
          Guardar
        </Button>
      </Box>
    </Modal>
  );
};
