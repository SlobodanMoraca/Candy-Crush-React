import { useEffect, useState } from "react"
import ScoreBoard from "./components/ScoreBoard"
import BlueCandy from './images/blue-candy.png'
import GreenCandy from './images/green-candy.png'
import OrangeCandy from './images/orange-candy.png'
import PurpleCandy from './images/purple-candy.png'
import RedCandy from './images/red-candy.png'
import YellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'

const width = 8
const candyColors = [
  BlueCandy,
  GreenCandy,
  OrangeCandy,
  PurpleCandy,
  RedCandy,
  YellowCandy,
]


const App = () => {

  const [curentColorArragementHandler, setCurentColorArragementHandler] = useState([])
  const [squareBeingDraggedHandler, setSquareBeingDraggedHandler] = useState(null)
  const [squareBeingReplacedHandler, setSquareBeingReplacedHandler] = useState(null)
  const [scoreDisplayHandler, setScoreDisplayHandler] = useState(0)


  const checkForColumnOfFour = () => {
    for(let i=0; i<=39; i++){
      const columnOfFour = [i, i+width, i+(width*2), i+(width*3)]
      const decidedColor = curentColorArragementHandler[i]
      const isBlank = curentColorArragementHandler[i] === blank

      if(columnOfFour.every(square => curentColorArragementHandler[square] === decidedColor && !isBlank)){
        setScoreDisplayHandler((score) => score + 4 )
        columnOfFour.forEach(square => curentColorArragementHandler[square] = blank)
        return true
      }
    }
  }

  const checkForColumnOfThree = () => {
    for(let i=0; i<=47; i++){
      const columnOfThree = [i, i+width, i+(width*2)]
      const decidedColor = curentColorArragementHandler[i]
      const isBlank = curentColorArragementHandler[i] === blank

      if(columnOfThree.every(square => curentColorArragementHandler[square] === decidedColor && !isBlank)){
        setScoreDisplayHandler((score) => score + 3 )
        columnOfThree.forEach(square => curentColorArragementHandler[square] = blank)
        return true
      }
    }
  }

  const checkForRowOfFour = () => {
    for(let i=0; i<64; i++){
      const rowOfFour = [i, i+1, i+2, i+3]
      const decidedColor = curentColorArragementHandler[i]
      const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
      const isBlank = curentColorArragementHandler[i] === blank

      if(notValid.includes(i)) continue

      if(rowOfFour.every(square => curentColorArragementHandler[square] === decidedColor && !isBlank)){
        setScoreDisplayHandler((score) => score + 4 )
        rowOfFour.forEach(square => curentColorArragementHandler[square] = blank)
        return true
      }
    }
  }

  const checkForRowOfThree = () => {
    for(let i=0; i<64; i++){
      const rowOfThree = [i, i+1, i+2]
      const decidedColor = curentColorArragementHandler[i]
      const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
      const isBlank = curentColorArragementHandler[i] === blank

      if(notValid.includes(i)) continue

      if(rowOfThree.every(square => curentColorArragementHandler[square] === decidedColor && !isBlank)){
        setScoreDisplayHandler((score) => score + 3 )
        rowOfThree.forEach(square => curentColorArragementHandler[square] = blank)
        return true
      }
    }
  }

  const moveIntoSquareBelow = () => {
    for (let i=0; i<=55; i++){
      const firstRow = [0,1,2,3,4,5,6,7]
      const isFirstRow = firstRow.includes(i)

      if(isFirstRow && curentColorArragementHandler[i] === blank){
       let randomNumber = Math.floor(Math.random() * candyColors.length)
       curentColorArragementHandler[i] = candyColors[randomNumber]
      }

      if((curentColorArragementHandler[i + width]) === blank){
        curentColorArragementHandler[i+width] = curentColorArragementHandler[i]
        curentColorArragementHandler[i] = blank
      }
    }
  }

  const dragStart = (e) => {
    setSquareBeingDraggedHandler(e.target)
  }
  const dragDrop = (e) => {
    setSquareBeingReplacedHandler(e.target)
  }
  const dragEnd = (e) => {

    const squareBeingReplacedId = parseInt(squareBeingReplacedHandler.getAttribute('data-id'))
    const squareBeingDraggedId = parseInt(squareBeingDraggedHandler.getAttribute('data-id'))

    curentColorArragementHandler[squareBeingReplacedId] = squareBeingDraggedHandler.getAttribute('src')
    curentColorArragementHandler[squareBeingDraggedId] = squareBeingReplacedHandler.getAttribute('src')

    const validMoves = [
      squareBeingDraggedId +1,
      squareBeingDraggedId -1,
      squareBeingDraggedId -width,
      squareBeingDraggedId +width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)

    const isColumnFour = checkForColumnOfFour()
    const isRowFour =checkForRowOfFour()
    const isColumnThree =checkForColumnOfThree()
    const isRowThree =checkForRowOfThree()
    
    if(squareBeingReplacedId && 
      validMove && 
      (isColumnFour || isRowFour || isColumnThree|| isRowThree)){
        setSquareBeingDraggedHandler(null)
        setSquareBeingReplacedHandler(null)
    }else{
      curentColorArragementHandler[squareBeingReplacedId] = squareBeingReplacedHandler.getAttribute('src')
      curentColorArragementHandler[squareBeingDraggedId] = squareBeingDraggedHandler.getAttribute('src')
      setCurentColorArragementHandler([...curentColorArragementHandler])
    }
  }



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

  useEffect(() => {
    const timer = setInterval(()=>{
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      moveIntoSquareBelow()

      setCurentColorArragementHandler([...curentColorArragementHandler])
    }, 100)
    return () => clearInterval(timer)

  },[checkForColumnOfFour,checkForRowOfFour, checkForColumnOfThree,checkForRowOfFour,moveIntoSquareBelow, curentColorArragementHandler])

  return (
    <div className="app">
      <div className="game">
        {curentColorArragementHandler.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <ScoreBoard score={scoreDisplayHandler}/>
    </div>
  );
}

export default App;
