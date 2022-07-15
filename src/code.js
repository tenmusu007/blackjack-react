//   const [count, setCount] = useState(0)
//   const [deckId, setDeckId] = useState("")
//   const [cardsInfo, setCards] = useState()
//   const [playerHands, setplayerHands] = useState()
//   const [renderHands, setRenderHands] = useState()
//   console.log("deck ID", deckId);
//   console.log("card info", cardsInfo);
//   console.log("player Hands", playerHands);
//   useEffect(() => {
//     axios.get(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
//       .then(res => {
//         setDeckId(res.data.deck_id)
//         axios.get(`https://www.deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=6`)
//         .then(data=>setCards(data))
//       })
//   }, [])
//   const handlerDrewCard = () => {
//     setCount(count + 1)
//     setplayerHands(cardsInfo.data.cards)
//   }
//   const handlerShowHnds =()=>{
//     const renderHands = playerHands.map((value, index)=>{
//       console.log("map", value);
//       return(
//         <div key={index}>
//           <p>{value.suite}</p>
//           <h2>{value.value}</h2>
//           <img src={value.image} alt="" />
//         </div>
//       )
//     })
//     setRenderHands(renderHands)
//   }
//   return (
//     <div className="App">
//       <h2>{count}</h2>
//       {/* <h2>{reset}</h2> */}
//       <button onClick={handlerDrewCard}>start</button>
//       <div>--------</div>
//       <div></div>
//       <div>
//         <button onClick={handlerShowHnds}>draw</button>
//       </div>
//       {renderHands}
//     </div>
//   );