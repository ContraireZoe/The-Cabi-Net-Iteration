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
            <div className="titleDelete">
                <h4 className='cardTitle'>{name} </h4>
                <span className='delete' onClick={handleDel}>
                    <svg className="deleteIcon"xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-file-earmark-x" viewBox="0 0 16 16">
                    <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146z"/>
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                    </svg>
                </span>
            </div>
            <div className='info-display'>
                <span className='remainingTxt'>Remaining: {remainingPercentage}%</span>
                <span className='containerTxt'>Size: {containersize}  </span>
            </div>
            <div className="staticFields">
                <input className="updateRem" type='number' value={inputValue} placeholder="% Left"onChange={(e) => {setInputValue(e.target.value)}} id={`${id}`}></input>
                <div className='update' onClick={handleClick}>
                    <svg className="updateIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="lightgreen" class="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </div>
            </div>
        </div>   
    );
};



export default SpiceDisplay;