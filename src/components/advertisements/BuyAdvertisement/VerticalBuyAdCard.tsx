import { Skeleton } from "@mui/material";

interface VerticalBuyAdCardProps {
  name: string | undefined;
  description: string | undefined;
  pricePerKilogram: number | undefined;
  image: string | undefined;
}

function VerticalBuyAdCard(props: VerticalBuyAdCardProps) {
  return (
    <div className="mt-3 mb-3 ml-3 flex-col">
      {props.image ? (
        <img
          src={props.image}
          alt={props.name}
          className="aspect-square w-28 rounded-lg border-2 object-cover object-center"
        />
      ) : (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            width: 112,
            height: 112,
          }}
        />
      )}

      {props.name ? (
        <div className="text-lg font-normal">{props.name}</div>
      ) : (
        <Skeleton
          className="text-lg font-normal"
          variant="text"
          animation="wave"
          sx={{ width: 100, height: 40 }}
        />
      )}

      {props.description ? (
        <div className="text-sm">{props.description}</div>
      ) : (
        <Skeleton
          className="text-sm"
          variant="text"
          animation="wave"
          sx={{ width: 200, height: 15 }}
        />
      )}

      {props.pricePerKilogram ? (
        <div className="font-light">{`${props.pricePerKilogram} €/kg`}</div>
      ) : (
        <Skeleton
          className="font-light"
          variant="text"
          animation="wave"
          sx={{ width: 75, height: 15 }}
        />
      )}
    </div>
  );
}

export default VerticalBuyAdCard;
