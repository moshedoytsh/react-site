import { useCurrentDisplay } from "../routes/CurrentDisplayContext";

const PageNotFound = () => {
  const { setDisplay } = useCurrentDisplay();

  return (
    <div>
      <h1>Page Not Found 😢</h1>
      <button onClick={() => setDisplay('home')}>Home</button>
    </div>
  )
}

export default PageNotFound;