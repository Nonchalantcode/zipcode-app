import React from 'react'

const ZipInfoPanel = ({ zipCodeInfo }) => {
    return (
        <div className="info-panel">
            <h2 class="heading">Information for zip code { zipCodeInfo['zip code'] }</h2>
            {
                Object
                    .keys(zipCodeInfo)
                    .map(item => {
                        return (
                            <div className="info">
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