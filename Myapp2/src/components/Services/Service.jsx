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
                                <p>
                                    <h2>Service 1</h2>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, rem. Doloribus, quibusdam voluptatum adipisci corrupti id cum iure excepturi tenetur incidunt, vero rem. Minima quibusdam ad adipisci distinctio ducimus sed?
                                </p>
                            </div> <div className="cardService">
                                <i className="fa-brands fa-chromecast"></i>
                                <p>
                                    <h2>Service 2</h2>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, rem. Doloribus, quibusdam voluptatum adipisci corrupti id cum iure excepturi tenetur incidunt, vero rem. Minima quibusdam ad adipisci distinctio ducimus sed?
                                </p>
                            </div> <div className="cardService">
                                <i className="fa-brands fa-chromecast"></i>
                                <p>
                                    <h2>Service 3</h2>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, rem. Doloribus, quibusdam voluptatum adipisci corrupti id cum iure excepturi tenetur incidunt, vero rem. Minima quibusdam ad adipisci distinctio ducimus sed?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Service