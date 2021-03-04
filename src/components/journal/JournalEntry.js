import React from 'react'

export const JournalEntry = () => {
    return (
        <div>
            <div className="journal__entry pointer">

                <div 
                    className="journal__entry-picture"
                    style={{ 
                        backgroundSize:'cover',
                        backgroundImage: 'url(https://store-guides2.djicdn.com/guides/wp-content/uploads/2020/01/PTKS6188-696x392.jpg)'
                    }}
                >
                </div>
                <div className="journal__entry-body">
                    <p className="journal__entry-title">
                        Un nuevo día
                    </p>
                    <p className="journal__entry-content">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                    </p>
                </div>

                <div className="journal__entry-date-box">
                    <span>Monday</span>
                    <h4>28</h4>
                </div>

            </div>
        </div>
    )
}
