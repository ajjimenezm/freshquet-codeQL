import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Modal, Button } from '@mui/material';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    bgcolor: 'background.paper',
    border: '2px solid #000',
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const ShopFilters = (props: any) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [filters, setFilters] = useState({
    max_price: "",
    min_price: "",
});
const handleChangeFilters = (event: any) => {
    setFilters({
        ...filters,
        [event.target.name]: event.target.value,
    });
};
  
  return (
    <Modal
    open={props.open}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
        <Box sx={{ ...style, width: 400 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Precio" {...a11yProps(0)} />
            <Tab label="Producto" {...a11yProps(1)} />
            <Tab label="Distancia" {...a11yProps(2)} />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            <div className="flex flex-col text-right">
                <div className="flex flex-row justify-around py-4">
                    <input type="number" name="min_price" className="max-w-[40%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " onChange={handleChangeFilters} placeholder="Precio Minimo" />
                    <input type="number" name="max_price" className="max-w-[40%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " onChange={handleChangeFilters} placeholder="Precio Maximo" />
                </div>

            </div>
            <div className="w-full text-right">
                <Button variant="contained" onClick={() => { props.handleClose(filters) }}>
                    Guardar
                </Button>
            </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
            Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
            Item Three
        </TabPanel>
        </Box>
    </Modal>
  );
}


// import { Modal, Box, Button } from "@mui/material"
// import { useState } from "react";
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


// const tabStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 'column',
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'white',
//     color: 'black',
//     fontSize: '1.5rem',
//     fontWeight: 'bold',
//     border: '1px solid black',
//     borderRadius: '5px',
//     margin: '0.5rem',
//     padding: '0.5rem',
//     cursor: 'pointer',
//     '&:hover': {
//         backgroundColor: 'black',
//         color: 'white',
//     },
//     '&:active': {
//         backgroundColor: 'black',
//         color: 'white',
//     },
//     '&:focus': {
//         backgroundColor: 'black',
//         color: 'white',
//     },
// };


//     return ( 
//     <Modal
//     open={props.open}
//     aria-labelledby="modal-modal-title"
//     aria-describedby="modal-modal-description"
//     >
//             <Box sx={{ ...style, width: 400 }}> 
//             <Tabs>
//                 <TabList style={tabStyle}>
//                     <Tab style={tabStyle}>Precio</Tab>
//                     <Tab style={tabStyle}>Tipo</Tab>
//                 </TabList>
//                 <TabPanel>
//                 <div className="flex flex-col text-right">
//                     <div className="flex flex-row justify-around py-4">
//                         <input type="number" name="min_price" className="max-w-[40%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " onChange={handleChange} placeholder="Precio Minimo" />
//                         <input type="number" name="max_price" className="max-w-[40%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " onChange={handleChange} placeholder="Precio Maximo" />
//                     </div>
//                 </div>
//                 <div className="w-full text-right">
//                     <Button variant="contained" onClick={() => { props.handleClose(filters) }}>
//                         Guardar
//                     </Button>
//                 </div>
//                 </TabPanel>
//                 <TabPanel>
//                     <div>
//                         <label>Min price</label>
//                         <input
//                             type="text"
//                             name="min_price"
//                             value={filters.min_price}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div>
//                         <label>Max price</label>
//                         <input
//                             type="text"
//                             name="max_price"
//                             value={filters.max_price}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <Button variant="contained" onClick={props.handleClose}>
//                         Apply
//                     </Button>
//                 </TabPanel>
//             </Tabs> 
            
//             </Box>
//         </Modal>
//         )
//     }
    // <Modal
    //     open={props.open}
    //     aria-labelledby="parent-modal-title"
    //     aria-describedby="parent-modal-description"
    // >
    //     <Box sx={{ ...style, width: 400 }}>
    //         <h3>Filtrar resultados</h3>
    //     </Box>
    // </Modal>