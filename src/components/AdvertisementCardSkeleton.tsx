import { Skeleton } from "@mui/material";

function AdvertisementCardSkeleton() {
    return (
        <div className="h-25 mt-3 mb-3 flex flex-row items-center">
            <Skeleton
                className="max-w-28 max-h-28 object-contain"
                variant="rectangular"
                animation="wave"
                sx={{ width: 112, height: 112 }}
            />
            <div className="ml-5 flex h-36 flex-col items-start justify-evenly pt-5 pb-5">
                <Skeleton
                    className="text-lg font-normal"
                    variant="text"
                    animation="wave"
                    sx={{ width: 100, height: 40 }}
                />
                <Skeleton
                    className="text-sm"
                    variant="text"
                    animation="wave"
                    sx={{ width: 200, height: 20 }}
                />
                <Skeleton
                    className="font-light"
                    variant="text"
                    animation="wave"
                    sx={{ width: 75, height: 30 }}
                />
                <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{ width: 100, height: 30 }}
                />
            </div>
        </div>
    );
}
export default AdvertisementCardSkeleton;
