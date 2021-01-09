import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const ZipForm = ({ 
    suggestions = [],
	placeholder = '', 
	inputText = '', 
    changeHandler,
    submitHandler,
    resetHandler,
}) => {
    let [suggestionIndex, setSuggestionIndex] = useState(-1)

	const updateInput = ({ target: { value } }) => {
		changeHandler(value.trim())
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        let zipcode = ev.target.zipcode.value.trim()
        changeHandler(zipcode)
        submitHandler(zipcode)
    }

    const selectSuggestion = ({ key }) => {
		/* Nothing to suggest */
		if( suggestions.length === 0 ) return 
        /* Cycle through the available suggestion suggestions or pick one */
		switch(key) {
			case 'Down': 
			case 'ArrowDown': {
				suggestionIndex + 1 < suggestions.length 
					? setSuggestionIndex(suggestionIndex + 1)
					: setSuggestionIndex(-1)
				break
			}
			case 'Up':
			case 'ArrowUp': {
				suggestionIndex === - 1
					? setSuggestionIndex(suggestions.length - 1)
					: setSuggestionIndex(suggestionIndex - 1)
				break
            }
            case 'Enter': {
                if(suggestionIndex !== -1) {
                    changeHandler(suggestions[suggestionIndex])
                }
                submitHandler(suggestions[suggestionIndex])
                setSuggestionIndex(-1)
            }
        }
    }
    
    const handleSuggestionClick = suggestion => {
		setSuggestionIndex(-1)
		changeHandler(suggestion)
	}
    
	return (
		<form onSubmit={onSubmit}>
            <div className="inputs">
                <input 
                    type="text" 
                    value={inputText} 
                    name="zipcode"
                    maxLength="5"
                    onChange={updateInput}
                    onKeyDown={selectSuggestion}
                    placeholder={placeholder} />
                <button type="reset" onClick={resetHandler}>Reset</button>
            </div>
            <div className="suggestions">
				<ul>
					{ 
						suggestions.map((item, index) => {
                        return <li 
                                    key={ uuidv4() } 
                                    className={`${index === suggestionIndex ? 'selected' : ''}`} 
                                    onClick={() => handleSuggestionClick(item.trim())}>
									{ item }
								</li> 
						})
					}
				</ul>
			</div>
		</form>
	)
}

export default ZipForm