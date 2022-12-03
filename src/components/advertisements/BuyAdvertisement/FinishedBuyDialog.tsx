import Hands from "../../../assets/illustrations/HandsBuy.png";
interface FinishedBuyDialogProps {
    buyerName: string;
}
function FinishedAppDialog(props: FinishedBuyDialogProps) {
    return (
        <div className="flex flex-col items-center justify-center bg-fresh-fondo-azul">
            <div className="mx-14 text-center font-outfit text-[26px] font-semibold text-fresh-morado">
                ¡¡Gracias por confiar en{" "}
                <strong className="font-outfit">freshquet</strong>!!
            </div>
            <img src={Hands} className="mt-12 w-56" />
            <div className="mx-24 mt-10 text-center font-outfit text-sm font-semibold text-fresh-morado">
                Solicitud de compra enviada a{" "}
                <strong className="font-outfit">{props.buyerName}</strong>
            </div>
        </div>
    );
}

export default FinishedAppDialog;
