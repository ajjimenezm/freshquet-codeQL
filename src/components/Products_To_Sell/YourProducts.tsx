interface Product{
    name: string;
    img: string;
}

function YourProducts(props: Product){
    console.log(props)
    return (
        <div>
            <div className="product-card">
                <img src={props.img} />
                <h3>{props.name}</h3>
            </div>
        </div>
    )

}
export default YourProducts;