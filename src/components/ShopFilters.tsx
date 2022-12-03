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
import { Category } from "../types/Category";
import Slide from '@mui/material/Slide';
import { Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const style = {
  position: "absolute",
  bottom: "00",
  left: "0",
  width: "100%",
  height: "95%",
  display: "flex",
  flexDirection: "column",
  bgcolor: "background.paper",
  top: "4px solid #976D9C",
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


export const ShopFilters = (props: any) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [filters, setFilters] = useState({
    max_price: 0,
    min_price: -1,
    distanceFilter: false,
    distanceFilterValue: 10,
    product_type: "",
  });
  const handleChangeFilters = (event: any) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };
  
  const setMinPriceInput = () => {
    if(filters.min_price !== -1) return filters.min_price;
    else return "";
  }
  
  const setMaxPriceInput = () => {
    if(filters.max_price !== 0) return filters.max_price;
    else return "";
  }
  
  const setProductTypeValue = () => {
    if(filters.product_type !== "") return filters.product_type;
    else return "";
  }
  
  const setDistanceSlider = () => {
    if(filters.distanceFilter === true) return filters.distanceFilterValue;
    else return 0;
  }

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
      <Slide direction="up" in={props.open} mountOnEnter unmountOnExit>
        <Box sx={{ ...style}}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <div className="w-40 select-none font-outfit text-4xl font-semibold text-fresh-morado">
                  Filtros
              </div>
              <IconButton onClick={props.handleCancel}>
                <CloseIcon color="secondary"/>
              </IconButton>
            </div>
            <div className="mb-4 mt-4">
              <a className="w-40 select-none font-outfit text-m font-semibold text-fresh-morado">Precios</a>
              <div className="flex flex-col text-right">
                <div className="flex flex-row justify-around py-4">
                  <input
                    type="number"
                    name="min_price"
                    className="block h-10 w-full max-w-[40%] rounded-full border-2 border-solid border-fresh-morado bg-transparent py-2 pl-3 pr-3 font-outfit leading-5 text-fresh-morado selection:bg-fresh-azul placeholder:font-light placeholder:text-fresh-morado focus:outline-none"
                    onChange={handleChangeFilters}
                    value = {setMinPriceInput()}
                    placeholder="Minimo"
                  />
                  <input
                    type="number"
                    name="max_price"
                    className="block h-10 w-full max-w-[40%] rounded-full border-2 border-solid border-fresh-morado bg-transparent py-2 pl-3 pr-3 font-outfit leading-5 text-fresh-morado selection:bg-fresh-azul placeholder:font-light placeholder:text-fresh-morado focus:outline-none"
                    onChange={handleChangeFilters}
                    value = {setMaxPriceInput()}
                    placeholder="Maximo"
                  />
                </div>
              </div>
            </div>
            <Divider/>
            <div className="mb-4 mt-4">
              <a className="w-40 select-none font-outfit text-m font-semibold text-fresh-morado">Categoría de producto</a>
              <Box className=" mb-2 block text-sm font-medium text-gray-900 mt-4 mr-6 ml-6">
                <FormControl fullWidth color="secondary">
                <InputLabel id="demo-simple-select-label">
                  Categoría
                </InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  name="product_type"
                  label="Categoría"
                  value={setProductTypeValue()}
                  onChange={handleChangeFilters}
                  color="secondary"
                  >
                  <MenuItem value={Category.Fruta}>{Category.Fruta}</MenuItem>
                  <MenuItem value={Category.Verdura}>{Category.Verdura}</MenuItem>
                  <MenuItem value={Category.Legumbres}>
                      {Category.Legumbres}
                  </MenuItem>
                  <MenuItem value={Category.Otros}>{Category.Otros}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <Divider className="mb-4"/>
            <div className="mt-4">
              <a className="w-40 select-none font-outfit text-m font-semibold text-fresh-morado mb-6">Distancia</a>
              <Slider
                aria-label="Custom marks"
                defaultValue={10}
                getAriaValueText={valuetext}
                step={5}
                value={setDistanceSlider()}
                valueLabelDisplay="auto"
                marks={marks}
                onChange={handleLocationFilters}
                color="secondary"
                />
            </div>
          <div className="absolute inset-x-0 bottom-0 mb-4 mr-4 ml-4">
            <button
              className="w-full h-12 rounded-full bg-fresh-morado text-white font-outfit font-semibold text-m"
              onClick={() => {
                console.log(filters);
                props.handleClose(filters);
              }}
              >
              Guardar
            </button>
          </div>
        </Box>
      </Slide>
    </Modal>
  );
};
