import { Skeleton } from "@mui/material";

function SearchHistoryElementSkeleton() {
    return (
        <div className="flex w-full cursor-default flex-row justify-between pb-2 pt-2">
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
