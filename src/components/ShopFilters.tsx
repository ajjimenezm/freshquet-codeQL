import { Modal, Box, Button } from "@mui/material"
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export const ShopFilters = (props: any) => {
    const [filters, setFilters] = useState({
        max_price: "",
        min_price: "",
    });

    const handleChange = (event: any) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Modal
            open={props.open}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 400 }}>
                <h3>Filtrar resultados</h3>
                <div className="flex flex-col text-right">
                    <div className="flex flex-row justify-around py-4">
                        <input type="number" name="min_price" className="max-w-[40%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " onChange={handleChange} placeholder="Precio Minimo" />
                        <input type="number" name="max_price" className="max-w-[40%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " onChange={handleChange} placeholder="Precio Maximo" />
                    </div>

                </div>
                <div className="w-full text-right">
                    <Button variant="contained" onClick={() => { props.handleClose(filters) }}>
                        Guardar
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}