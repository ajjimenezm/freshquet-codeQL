import { ReactComponent as SearchIcon } from "../../assets/icons/SearchIcon.svg";
import { ReactComponent as FilterIcon } from "../../assets/icons/FilterIcon.svg";
import React from "react";
import { ShopFilters } from "../ShopFilters";

interface SearchFieldProps {
    id: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    getFilters: (minPrice: number, maxPrice: number, typeProduct: string, distanceFilter: string, distanceFilterValue: number) => void;
}

function SearchField(props: SearchFieldProps) {
    const [openModal, setOpen] = React.useState(false);
    const handleOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  }

  const handleClose = async (filters: any) => {
    setOpen(false);
    const minPrice = parseInt(filters.min_price);
    const maxPrice = parseInt(filters.max_price);
    const typeProduct = filters.product_type;
    const distanceFilter = filters.distanceFilter;
    const distanceFilterValue = filters.distanceFilterValue;
    console.log(minPrice, maxPrice, typeProduct, distanceFilter, distanceFilterValue);
    props.getFilters(minPrice, maxPrice, typeProduct, distanceFilter, distanceFilterValue);
  };

    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 pt-0.5">
                <SearchIcon className="stroke-fresh-morado" />
            </div>
            <input
                id="search"
                name="search"
                className="block h-10 w-full rounded-full border-2 border-solid border-fresh-morado bg-transparent py-2 pl-10 pr-3 font-outfit leading-5 text-fresh-morado selection:bg-fresh-azul placeholder:font-light placeholder:text-fresh-morado focus:outline-none"
                placeholder="Buscar"
                type="text"
                value={props.value}
                onChange={props.onChange}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
            />
            <ShopFilters open={openModal} handleClose={handleClose} handleCancel={handleCancel}/>
            <div
                className="absolute inset-y-0 right-4 mr-1 flex items-center"
                onClick={() => {
                    handleOpen();
                }}
            >
                <FilterIcon className="stroke-fresh-morado" />
            </div>
        </div>
    );
}

export default SearchField;
