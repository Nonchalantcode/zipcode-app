import React from 'react'

const ZipForm = ({ 
	placeholder = '', 
	inputText = '', 
    onChange,
    onSubmit,
    resetHandler,
}) => {

	const updateInput = ({ target: { value } }) => {
		onChange(value.trim())
    }

    const submitHandler = (ev) => {
        ev.preventDefault()
        let zipcode = ev.target.zipcode.value.trim()
        onChange(zipcode)
        onSubmit(zipcode)
    }
    
	return (
		<form onSubmit={submitHandler}>
            <div className="inputs">
                <input 
                    type="text" 
                    value={inputText} 
                    name="zipcode"
                    onChange={updateInput}
                    placeholder={placeholder} />
                <button type="submit">Search</button>
                <button type="reset" onClick={resetHandler}>Reset</button>
            </div>
		</form>
	)
}

export default ZipForm