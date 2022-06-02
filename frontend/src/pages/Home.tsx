import React, { useEffect, useState } from 'react';
import { getAllPlants } from '../http/plantAPI';
import { RouteNames } from '../router/index';
import { Link } from 'react-router-dom';

interface IPlantsData {
    id: string;
    name: string;
}

const Home: React.FC = (): JSX.Element => {

    const [plantsData, setPlantsData] = useState<IPlantsData[]>([]);

    useEffect(() => {
        getAllPlants().then(data => setPlantsData(data))
    }, []
    )

    return (
        <div className="vh-100 d-flex flex-column px-3 ">

            {/* <div className="row d-flex h-25 align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>Сводка по производству ООО "Юникосметик"</h1>
                </div>
            </div> */}
            {/* <div className="row d-flex h-75 py-2"> */}
            <div className="row d-flex h-100 py-2">
                <div className="col-4"></div>
                <div className="col-4 flex-column d-flex h-100">

                    <div className="flex-fill d-flex flex-row overflow-hidden">
                        <div className="d-flex flex-column flex-grow-1 align-items-center justify-content-center">

                            {plantsData.length > 0 &&
                                plantsData.map(item =>
                                    <div className="row pt-1 pb-1 w-100">
                                        <Link to={RouteNames.DASHBOARD + `/${item.id}`}>
                                            <button
                                                key={item.id}
                                                className="btn btn-info btn-lg p-4 shadow-none w-100"
                                            >
                                                Табло {item.name}
                                            </button>
                                        </Link>
                                    </div>
                                )
                            }
                            <div className="row pt-1 pb-1 w-100">
                                <Link to={RouteNames.LOGIN}>
                                    <button
                                        key={"login"}
                                        className="btn btn-primary btn-lg p-4 shadow-none w-100"
                                    >
                                        Войти в систему
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    )
}

export default Home;