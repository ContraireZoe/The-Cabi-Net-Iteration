import React, {useState, useEffect} from 'react';


const SpiceDisplay = (props) => {
    const [remainingPercentage, updateRemaining] = useState(props.remaining);
    const [inputValue, setInputValue] = useState('');
    //destructured object of the props, pased from SpiceContainer
    const { 
        name, 
        remaining, 
        containersize, 
        id,
        updateSpice,
        deleteSpice
    } = props;
    
    const handleClick = () => {
        const spiceObj = {
            remaining: Number(inputValue),
            id: Number(id)
        };
        //change the useState of the remaining useState variable
        updateRemaining(Number(inputValue))
        //invoke update spice (prop function)
        updateSpice(spiceObj);
        //clear the input field after submit
        setInputValue('')
    };

    function handleDel() {
        deleteSpice(id);
    }

    //only rerenders on updates 
    useEffect(() => {
    }, [remainingPercentage])

    return (
        <div className='spice-display'>
                <div className='info-display'>
                    <p>
                    <strong>Spice: {name}  </strong>
                    <em> Remaining: {remainingPercentage}%  </em>
                    <>Size: {containersize}  </>
                    </p>
                </div>
                <input type='number' value={inputValue} onChange={(e) => {setInputValue(e.target.value)}} id={`${id}`}></input>
                <button className='update' onClick={handleClick}>Update Amount</button>
                <button className='delete' onClick={handleDel}>Delete</button>
        </div>   
    );
};



export default SpiceDisplay;