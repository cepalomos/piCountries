import { useDispatch } from "react-redux";
import { countryPagination } from "../redux/actions";
import '../css/Pagination.css';

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
    <div className="pagination-contenedor">
      <button className="pagination_button" onClick={handlerBack}>Atras</button>
      <div className="pagination-information">{`${pageNow}/${maxPages}`}</div>
      <button className="pagination_button" onClick={handlerFollow}>Adelante</button>
    </div>
  )
}