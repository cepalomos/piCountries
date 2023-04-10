
export default function Creado({ create, data }) {
  function creation(create, data) {
    if (create) {
      return (
        <div className="creado-container">
          <h1 className="creado-title">{`La actividad que se creo fue ${data.name}`}</h1>
          <h2 className="creado-subtitle">{`Esta tiene una dificultad ${data.difficulty}`}</h2>
          <h2 className="creado-subtitle">{`La duracion de la actividad es ${data.duration} horas`}</h2>
          <h2 className="creado-subtitle">{`La temporada para realizar la actividad es ${data.season}`}</h2>
        </div>)
    } else {
      return (<h1 className="creado-agregar">{'Esta actividad ya existia se agregaron los paises a la actividad'}</h1>)
    }
  }
  const presentation = creation(create, data);

  return (
    <>
      {presentation}
    </>
  )
}