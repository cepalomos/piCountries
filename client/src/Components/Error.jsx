
export default function Error({detalil: detail}){
  return(
    <>
      <h1>{detail.status??"404"}</h1>
      <h2>{detail.body??'Recurso no encontrado'}</h2>
    </>
  )
}