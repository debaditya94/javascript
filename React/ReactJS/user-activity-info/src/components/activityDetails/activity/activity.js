import React from 'react';
import {DateChecker, TimeExtractor} from '../../../utilities/dateUtil';
// import './activity.css';

const Activity = (props) => {
        return (
            <div>
                <p>You were active from { DateChecker(props.activity.start_time, props.date) ? TimeExtractor(props.activity.start_time) : '12:00 AM' } till { DateChecker(props.activity.end_time, props.date) ? TimeExtractor(props.activity.end_time) : '11:59 PM'}</p>
            </div>
        );
};

export default Activity;