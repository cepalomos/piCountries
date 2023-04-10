import Card from "./Card";
import { Link } from 'react-router-dom'
import '../css/Cards.css';

export default function Cards({countries}) {
  const li = countries.map(({ id, name, flag, continents }) => (
    <li key={id}>
      <Link to={`/home/${id}`}>
        <Card name={name} flag={flag} continents={continents} />
      </Link>
    </li>
  ));
  return (
    <ul className="cards-list">
      {li}
    </ul>
  )
}