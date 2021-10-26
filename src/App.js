import { useEffect, useState } from "react"

const width = 8
const candyColors = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
]


const App = () => {

  const [curentColorArragementHandler, setCurentColorArragementHandler] = useState([])

  const createBoard = () =>{
    const randomColorArrangment = []
    for (let i=0; i<width*width; i++){
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangment.push(randomColor)
    }
    setCurentColorArragementHandler(randomColorArrangment)
  }

  useEffect(() => {
    createBoard()

  },[])

  return (
    <div className="app">
      <div className="game">
        {curentColorArragementHandler.map((candyColor, index) => (
          <img
            key={index}
            style={{backgroundColor: candyColor}}
            alt={candyColor}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
