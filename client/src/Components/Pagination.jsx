import { useDispatch } from "react-redux"
import { countryPagination } from "../redux/actions";

export default function Pagination({pageNow,arrayLength,maxPages}){
  const dispatch = useDispatch();

  function handlerBack(event){
    event.preventDefault();
    if(pageNow>1){
      dispatch(countryPagination(arrayLength,pageNow-1))
    }
  }

  function handlerFollow(event){
    event.preventDefault();
    if(!pageNow<maxPages){
      dispatch(countryPagination(arrayLength,pageNow+1))
    }
  }
  return(
    <>
      <button className="pagination_button" onClick={handlerBack}>atras</button>
      <div>{`${pageNow}/${maxPages}`}</div>
      <button className="pagination_button" onClick={handlerFollow}>delante</button>
    </>
  )
}