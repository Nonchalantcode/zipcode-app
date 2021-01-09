import React from 'react'
import { v4 as uuidv4 } from 'uuid'

const ZipInfoPanel = ({ zipCodeInfo }) => {
    return (
        <div className="info-panel">
            <h2 className="heading">Information for zip code { zipCodeInfo['zip code'] }</h2>
            {
                Object
                    .keys(zipCodeInfo)
                    .map(item => {
                        return (
                            <div className="info" key={uuidv4()}>
                                <p>
                                    <span className="info-prop">{item}: </span>
                                    <span className="info-value">{zipCodeInfo[item]}</span>
                                </p>
                            </div>
                        )
                    })
            }
        </div>
    )
}

export default ZipInfoPanel