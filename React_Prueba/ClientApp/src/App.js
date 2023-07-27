import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";


const App = () => {

    const [autos, setAutos] = useState([])
    const [descripcion, setDescripcion] = useState("");

    const mostrarAutos = async () => {

        //la ruta dentro del fetch tiene que ser la misma configurada en el setupProxy y despues de la ultima barra
        //tiene que ir el mismo nombre configurado en la "Route" del controlador Ej:  "[Route("Lista")]" 
        const response = await fetch("api/auto/Lista");

        // "ok" es una propiedad devuelta por fetch
        if (response.ok) {

            const data = await response.json();
            setAutos(data);
        } else {

            console.log("status code: " + response.status);
        }
    }

    //Metodo convertir fecha XD
    const formatDate = (string) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = new Date(string).toLocaleDateString("es-AR", options);
        let hora = new Date(string).toLocaleTimeString();
        return fecha + " | " + hora
    }


    //En el useEffect al utilizar "[]" indicamos que este se va a EJECUTAR al iniciar la aplicacion 
    useEffect(() => {

        mostrarAutos();

    }, [])

    const guardarAuto = async (e) => {
        //"preventDefault" anula el evento de recarga que tiene el formulario por defecto
        e.preventDefault()

        const response = await fetch("api/auto/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({descripcion : descripcion})
        })

        if (response.ok) {
            setDescripcion("");
            await mostrarAutos(); 
        }
    }

    const eliminarAuto = async (id) => {

        const response = await fetch("api/auto/Cerrar/" + id, {
            method: "DELETE"
        })

        if (response.ok) {
            await mostrarAutos();
        }
    }


    return (
        <div className="container bg-black p-4 vh-100">
            <h2 className="text-white">Lista de Autos</h2>
            <div className="row">
                <div className="col-sm-12">
                    <form onSubmit={guardarAuto}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese el nombre del auto"
                                value={descripcion}
                                //el evento onChange se ejecuta cada vez que cambia el valor de la caja de texto y
                                //una vez q cambia el valor actualiza la variable descripcion a travez de la funcion "setDescripcion"
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                            <button className="btn btn-success" type="submit">Agregar</button>
                        </div>
                    </form>
                    
                </div>
            </div>

            <div className="row mt-4">
                <div className="cold-sm-12">
                    <div className="list-group">
                        {
                            autos.map(
                                (item) => (

                                    <div key={item.idAuto} className="list-group-item list-group-item-action">
                                        <h5 className="text-primary">{item.descripcion}</h5>
                                        <div className="d-flex justify-content-between">
                                            <small className="text-muted">{formatDate(item.fechaRegistro)}</small>
                                            <button onClick={() => eliminarAuto(item.idAuto)} className="btn btn-sm btn-outline-danger">Cerrar</button>
                                        </div>

                                    </div>
                                    
                                ) 

                            )
                        }

                    </div>
                
                </div>
            </div>
        </div>
    )

}

export default App;