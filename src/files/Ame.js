import React , {useState } from 'react'
// import {useNavigate} from 'react-router-dom' 


export default function App() {  
     
    function is_safe( r , c , oard , v ) {
        let e = 0 , f = 0 ;
        for(let i = 0 ; i < 9 ; i++){
            if(oard[r][i] === v){
                return false ;
            }
            if(oard[i][c] === v){
                return false ;
            }
            e = 3*(Math.floor(r/3)) + Math.floor(i/3) ;
            f = 3*(Math.floor(c/3)) + Math.floor(i%3)  ;
            
            if(oard[e][f] === v){
                return false ;
            } 
        } 
        return true ;
        
    }
    
    
    
    function suduko_solver( oard ){
        let n = 9;
        for(let r = 0 ; r < n ; r++){
            for(let c = 0 ; c < n ; c++ ){
                if(oard[r][c] === 0){
                    for(let v = 1 ; v <= 9 ; v++){
                        if(is_safe(r,c, oard ,v)){
                            oard[r][c] = v ;
    
                            const as = suduko_solver(oard);
                            if(as){
                                return true ;
                            }
                            else {
                                oard[r][c] = 0 ;
                            }
                        }
                    }
                    return false ;
                }
            }
        }
        return true ;
    }


    function suduko( oard , dummy  ){
        let n = 9;
        for(let r = 0 ; r < n ; r++){
            for(let c = 0 ; c < n ; c++ ){
                if(oard[r][c] !== 0){                  
                    if(!is_safe(r,c,dummy ,oard[r][c])){ 
                        return false ;
                    }
                    dummy[r][c] = oard[r][c]; 
                } 
            }
        }
        return true ;
    }
    

     
    


    const [stud , setstud] = useState([]) ; 

     

    
    let element_display = {
        display : 'none'  
    }



    let array = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]
    // let dummy = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]
    let temp = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]


    const demo_array = {
        1 : "" ,  2 : ""  ,  3 : "" ,  4 : "" ,  5 : "" ,  6 : "" ,  7 : "" ,  8 : "" ,  9 : "" ,  10 : "" ,  11 : "" ,  12 : "" ,  13 : "" ,  14 : "" ,  15 : "" ,  16 : "" ,  17 : "" ,  18 : "" ,  19 : "" ,  20 : "" ,  21 : "" ,  22 : "" ,  23 : "" ,  24: "" ,  25: "" ,  26: "" ,  27: "" ,  28: "" ,  29: "" ,  30: "" ,  31: "" ,  32: "" ,  33: "" ,  34: "" ,  35: "" ,   36: "" ,  37: "" ,  38: "" ,  39: "" ,  40: "" ,  41: "" ,  42: "" ,  43: "" ,  44: "" ,  45: "" ,  46: "" ,  47: "" ,  48: "" ,  49: "" ,  50: "" ,  51: "" , 52: "" ,  53: "" ,  54: "" ,  55: "" ,  56: "" ,  57: "" ,  58: "" ,  59: "" ,  60: "" ,  61: "" ,  62: "" ,   63: "" ,  64: "" ,  65: "" ,   66: "" ,  67: "" ,  68: "" ,  69: "" ,  70: "" ,   71: "" ,  72: "" ,  73: "" ,  74: "" ,  75: "" , 76: "" ,  77: "" ,  78: "" ,  79: "" ,  80: "" ,  81: ""  
    }

    const [array_element , setarray_element] = useState(demo_array); 

    const cs = (event)=> { 
        const name = event.target.name 
        const value = event.target.value 
        setarray_element((prev)=>{
            return   {  ...prev , [name] : value  }
        }) 
    }
    
    const solve = ()=> {    
        let i = 1
        for(let w = 0 ;w < 9 ; w++ ){  
            for(let j = 0 ;j < 9 ; j++){ 
                if(array_element[i] ===  "" ){
                    // array[w][j] = 0 ; 
                }
                else{
                    array[w][j] = Number(array_element[i]) ; 
                } 
                i++
            }   
        } 
        if(!suduko(array , temp)) {
            alert("Invalid Suduko") ;
            // setstud(array) ;
        }
        else {
            let ans  = suduko_solver(array);
            console.log(ans); 
            setstud(array) ;   
            let first_element = document.getElementById('first_element'); 
            first_element.style.display = 'none' ;
    
            let sec_element = document.getElementById('sec_element'); 
            sec_element.style.display = 'block' ;
        }    
        
    }

    // const av = useNavigate() ;
    // const new_sol =() => {
    //     av('/') ;
    // }

     
    const new_solve = () => {
        let first_element = document.getElementById('first_element'); 
        first_element.style.display = 'block' ;
 
        let sec_element = document.getElementById('sec_element'); 
        sec_element.style.display = 'none' ; 
    }
   
    

         
    return (
        <> 
        <div className='container'>
            <h1 id='heading'>SUDUKO-SOLVER </h1>
            <div id='first_element'>
                <h1>Enter The Numbers :</h1>
                <table>  
                    <tbody>  
                    <tr>  
                        <td ><input type="text" name='1' onChange={cs} /></td>   
                        <td><input type="text" name='2' onChange={cs} /></td>   
                        <td className='j'><input type="text" name='3' onChange={cs} /></td>   
                        <td><input type="text" name='4' onChange={cs} /></td>   
                        <td><input type="text" name='5' onChange={cs} /></td>   
                        <td className='j'><input type="text" name='6' onChange={cs} /></td>   
                        <td><input type="text" name='7' onChange={cs} /></td>   
                        <td><input type="text" name='8' onChange={cs} /></td>   
                        <td><input type="text" name='9' onChange={cs} /></td>   
                    </tr>    
                    <tr> 
                        <td><input type="text" name='10' onChange={cs} /></td>   
                        <td><input type="text" name='11' onChange={cs} /></td>   
                        <td><input type="text" name='12' onChange={cs} /></td>   
                        <td><input type="text" name='13' onChange={cs} /></td>   
                        <td><input type="text" name='14' onChange={cs} /></td>   
                        <td><input type="text" name='15' onChange={cs} /></td>   
                        <td><input type="text" name='16' onChange={cs} /></td>   
                        <td><input type="text" name='17' onChange={cs} /></td>   
                        <td><input type="text" name='18' onChange={cs} /></td>   
                    </tr>     
                    <tr>
                        <td><input type="text" name='19' onChange={cs} /></td>   
                        <td><input type="text" name='20' onChange={cs} /></td>   
                        <td><input type="text" name='21' onChange={cs} /></td>   
                        <td><input type="text" name='22' onChange={cs} /></td>   
                        <td><input type="text" name='23' onChange={cs} /></td>   
                        <td><input type="text" name='24' onChange={cs} /></td>   
                        <td><input type="text" name='25' onChange={cs} /></td>   
                        <td><input type="text" name='26' onChange={cs} /></td>   
                        <td><input type="text" name='27' onChange={cs} /></td>   
                    </tr>    
                    <tr>  
                        <td><input type="text" name='28' onChange={cs} /></td>   
                        <td><input type="text" name='29' onChange={cs} /></td>   
                        <td><input type="text" name='30' onChange={cs} /></td>   
                        <td><input type="text" name='31' onChange={cs} /></td>   
                        <td><input type="text" name='32' onChange={cs} /></td>   
                        <td><input type="text" name='33' onChange={cs} /></td>   
                        <td><input type="text" name='34' onChange={cs} /></td>   
                        <td><input type="text" name='35' onChange={cs} /></td>   
                        <td><input type="text" name='36' onChange={cs} /></td>   
                    </tr>    
                    <tr> 
                        <td><input type="text" name='37' onChange={cs} /></td>   
                        <td><input type="text" name='38' onChange={cs} /></td>   
                        <td><input type="text" name='39' onChange={cs} /></td>   
                        <td><input type="text" name='40' onChange={cs} /></td>   
                        <td><input type="text" name='41' onChange={cs} /></td>   
                        <td><input type="text" name='42' onChange={cs} /></td>   
                        <td><input type="text" name='43' onChange={cs} /></td>   
                        <td><input type="text" name='44' onChange={cs} /></td>   
                        <td><input type="text" name='45' onChange={cs} /></td>   
                    </tr>     
                    <tr>
                        <td><input type="text" name='46' onChange={cs} /></td>   
                        <td><input type="text" name='47' onChange={cs} /></td>   
                        <td><input type="text" name='48' onChange={cs} /></td>   
                        <td><input type="text" name='49' onChange={cs} /></td>   
                        <td><input type="text" name='50' onChange={cs} /></td>   
                        <td><input type="text" name='51' onChange={cs} /></td>   
                        <td><input type="text" name='52' onChange={cs} /></td>   
                        <td><input type="text" name='53' onChange={cs} /></td>   
                        <td><input type="text" name='54' onChange={cs} /></td>   
                    </tr> 
                    <tr>  
                        <td><input type="text" name='55' onChange={cs} /></td>   
                        <td><input type="text" name='56' onChange={cs} /></td>   
                        <td><input type="text" name='57' onChange={cs} /></td>   
                        <td><input type="text" name='58' onChange={cs} /></td>   
                        <td><input type="text" name='59' onChange={cs} /></td>   
                        <td><input type="text" name='60' onChange={cs} /></td>   
                        <td><input type="text" name='61' onChange={cs} /></td>   
                        <td><input type="text" name='62' onChange={cs} /></td>   
                        <td><input type="text" name='63' onChange={cs} /></td>   
                    </tr>    
                    <tr> 
                        <td><input type="text" name='64' onChange={cs} /></td>   
                        <td><input type="text" name='65' onChange={cs} /></td>   
                        <td><input type="text" name='66' onChange={cs} /></td>   
                        <td><input type="text" name='67' onChange={cs} /></td>   
                        <td><input type="text" name='68' onChange={cs} /></td>   
                        <td><input type="text" name='69' onChange={cs} /></td>   
                        <td><input type="text" name='70' onChange={cs} /></td>   
                        <td><input type="text" name='71' onChange={cs} /></td>   
                        <td><input type="text" name='72' onChange={cs} /></td>   
                    </tr>     
                    <tr>
                        <td><input type="text" name='73' onChange={cs} /></td>   
                        <td><input type="text" name='74' onChange={cs} /></td>   
                        <td><input type="text" name='75' onChange={cs} /></td>   
                        <td><input type="text" name='76' onChange={cs} /></td>   
                        <td><input type="text" name='77' onChange={cs} /></td>   
                        <td><input type="text" name='78' onChange={cs} /></td>   
                        <td><input type="text" name='79' onChange={cs} /></td>   
                        <td><input type="text" name='80' onChange={cs} /></td>   
                        <td><input type="text" name='81' onChange={cs} /></td>   
                    </tr>  
                </tbody> 
            </table> 
            <button onClick={solve} className='button' >Solved Suduko</button>
            {/* <button onClick={se} className='button' >Solved Suduko</button>  */}
        </div> 

        


        <div style={element_display}  id='sec_element'>
          <h1>Solved Suduko is : </h1> 
          <table>
              <thead> 
              </thead>
              <tbody>        
                  { 
                  stud.map((data ,i)=> 
                      <tr> 
                          <td>{data[0]}</td> 
                          <td>{data[1]}</td> 
                          <td>{data[2]}</td> 
                          <td>{data[3]}</td> 
                          <td>{data[4]}</td> 
                          <td>{data[5]}</td> 
                          <td>{data[6]}</td> 
                          <td>{data[7]}</td> 
                          <td>{data[8]}</td> 
                      </tr>
                      )      
                  } 
              </tbody> 
          </table> 

          <button onClick={new_solve} id='button' >New Suduko</button>
          {/* <button onClick={new_sol} id='button' >New Suduko</button> */}
      </div>


    </div>             
    </>  
  )
}
