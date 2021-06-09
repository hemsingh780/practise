
import React , { useState , useCallback} from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import './ingredient.css'
import IngredientList from './IngredientList' 

const Ingredients = () => {
  
  const [userIngredients , setUserIngredients] = useState([])
  const [check,setCheck] = useState(false)
  const [newCheck,setNewCheck] = useState(false)  
  // useEffect(()=>{ 
  //   fetch('https://react-hooks-9edb5-default-rtdb.firebaseio.com/ingredients.json')
  //   .then(response => response.json())
  //   .then(responseData => {
  //     const loadedIngredients = [];
  //       for(const key in responseData){
  //         loadedIngredients.push({
  //           id:key,
  //           title:responseData[key].title,
  //           amount:responseData[key].amount
  //         });
  //       } 
  //       setUserIngredients(loadedIngredients)
  //   })
  // },[]);



    const filteredIngredientsHandler = useCallback(filterIngredients =>{
      setUserIngredients(filterIngredients)
      setCheck(true)
      
    },[])

  

    const addIngredientHandler = ingredient =>{
        fetch('https://react-hooks-9edb5-default-rtdb.firebaseio.com/ingredients.json',{
          method:'POST',
          body: JSON.stringify(ingredient),
          headers:{'Content-Type' : 'application/json'}
        }).then(response => {
          return response.json
        }).then(responseData => {
          setUserIngredients(prevIngredients =>[
            ...prevIngredients,
            {id: responseData.name,...ingredient}
            ])
        })
    }


  const removeIngredientHandler = ingredientId =>{
      fetch(`https://react-hooks-9edb5-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,{
        method:'DELETE'
      }).then(response =>{
        setUserIngredients(prevIngredients =>
          prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
          )
      })
  }

  let  list = <div className="loader">Loading...</div>   
   if(check){
      list  = <IngredientList Ingredients ={userIngredients} 
      onRemoveItem = {removeIngredientHandler}/>
    }
  


  return (  
      <div className="App">
          <h2>INGREDIENT TODO</h2>
          <IngredientForm 
              onAddIngredient = {addIngredientHandler}
          /> 
          
          <section>
             
             <Search 
               onLoadIngredients = {filteredIngredientsHandler}
              />

              {/* Need to add list here! */}
              {list}
    
          </section>

      </div>
    );

}

export default Ingredients;


