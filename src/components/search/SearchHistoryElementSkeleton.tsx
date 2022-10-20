import HistoryIcon from "@mui/icons-material/History";
import { Skeleton } from "@mui/material";

function SearchHistoryElementSkeleton() {
    return (
        <div className="flex w-full cursor-default flex-row justify-between pb-2 pt-2 hover:bg-gray-100 active:bg-gray-400">
            <Skeleton
                variant="rectangular"
                className="ml-2"
                animation="wave"
                sx={{ width: "100%" }}
            ></Skeleton>
        </div>
    );
}

export default SearchHistoryElementSkeleton;
