import Header from "../Header/Header"
import './Service.scss'
function Service() {
    return (
        <>
            <div className="App">
                <Header />
            </div>
            <div className="container-Service">
                <div className="service-wrapper">
                    <div className="service">
                        <h1 className="h1S" >Our Service <span></span></h1>
                        <div className="cardsService">
                            <div className="cardService">
                                <i className="fa-brands fa-chromecast"></i>
                                <h2>spécialisée dans la fabrication de produits en acier inoxydable et en fer de haute qualité</h2>

                            </div> <div className="cardService">
                                <i className="fa-brands fa-chromecast"></i>
                                <h2> CristalInox propose des services d installation professionnelle pour garantir que tous nos produits sont correctement installés et sécurisés.</h2>

                            </div> <div className="cardService">
                                <i className="fa-brands fa-chromecast"></i>

                                <h2> Notre équipe de service clientèle est disponible pour répondre à toutes vos questions et préoccupations</h2>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Service