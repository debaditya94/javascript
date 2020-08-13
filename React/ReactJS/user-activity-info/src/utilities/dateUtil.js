import moment from 'moment-timezone';

const DateChecker = (givenDateTime, currentDateTime) => {
    let startTime = givenDateTime;
    let timeArray = startTime.split(' ');
    timeArray.pop();
    timeArray = [timeArray[1],timeArray[0],timeArray[2]];
    if (moment(currentDateTime).format("D MMM YYYY") === timeArray.join(' ')) return true;
    return false;
}

const TimeExtractor = (givenDateTime) => {
    return givenDateTime.split(' ')[3];
}

export  {DateChecker, TimeExtractor};