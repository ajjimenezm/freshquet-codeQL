import BolsaBuscador from "../../assets/illustrations/Bolsa_Buscador.png";

function SearchPlaceHolder() {
    return (
        <div className="max-h-[calc(100vh-300px)] pl-8 pr-16">
            <div className="w-40 select-none font-outfit text-2xl font-semibold text-fresh-morado">
                ¿Qué te apetece hoy?
            </div>
            <img
                className="pointer-events-none mt-8 ml-7 max-h-[calc(100vh-400px)] select-none"
                src={BolsaBuscador}
                alt="Bolsa Buscador"
            />
        </div>
    );
}

export default SearchPlaceHolder;
