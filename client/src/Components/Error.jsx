
export default function Error({detalil: detail}){
  return(
    <>
      <h1>{detail.status}</h1>
      <h2>{detail.body}</h2>
    </>
  )
}