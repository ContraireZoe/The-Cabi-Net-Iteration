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
                    <strong>{name}  </strong>
                    <em> Remaining: {remainingPercentage}%  </em>
                    <>Size: {containersize}  </>
                    </p>
                </div>
                <div className="staticFields">
                    <input type='number' value={inputValue} placeholder="Remaining Amount"onChange={(e) => {setInputValue(e.target.value)}} id={`${id}`}></input>
                    <button className='update' onClick={handleClick}>Update</button>
                    <button className='delete' onClick={handleDel}>x</button>
                </div>
        </div>   
    );
};



export default SpiceDisplay;