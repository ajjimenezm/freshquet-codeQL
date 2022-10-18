import { Skeleton } from "@mui/material";

function AdvertisementCard() {
    return (
        <div className="flex flex-row h-25 items-center mt-3 mb-3">
            <Skeleton
                className="max-h-28 max-w-28 object-contain"
                variant="rectangular"
                animation="wave"
                sx={{ width: 112, height: 112 }}
            />
            <div className="pt-5 pb-5 h-36 ml-5 flex flex-col justify-evenly items-start">
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
export default AdvertisementCard;
