import '../css/Select.css';

export default function Select({ options, functionDispatch,nameSelector = "prueba" }) {
  const selectors = options.map(element => (
    <option
      value={element.id}
      key={element.id}
    >
      {element.name}
    </option>
  ))
  return (
    <>
      <select name={nameSelector} onChange={functionDispatch}>
        <option key={0} value={"reset"}>{`--${nameSelector}--`}</option>
        {selectors}
      </select>
    </>
  )
}