import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { DateChecker } from '../../utilities/dateUtil';
import Activity from './activity/activity';
import CustomInput from '../CustomInput/customInput'
import DatePicker from "react-datepicker";
import './activityDetails.css';
import "react-datepicker/dist/react-datepicker.css";


class ActivityDetails extends Component {

    state = {
        date: new Date(),
        activityList: []
    };

    filterTasksByDate = (activityTimeList, date) => {
        let filteredActivityList = [];
        filteredActivityList = activityTimeList.filter(activity => {
            return DateChecker(activity.start_time, date) || DateChecker(activity.end_time, date)
        });
        return filteredActivityList;
    }

    changeDateFilter = (date) => {
        this.setState({ date: date });
    }
    render() {
        let activityDiv;
        if (this.props.details) {
            console.log(this.props.details);
            const activityList = this.filterTasksByDate(this.props.details.activity_periods, this.state.date);
            console.log(activityList);
            if (activityList.length > 0) {
                activityDiv = activityList.map((activity, index) => {
                    return <Activity
                        date={this.state.date}
                        key={index}
                        activity={activity} />
                });
            } else {
                activityDiv = 'Sorry, no activities for today';
            }
        }

        return this.props.details ? (
            <Modal size="lg" show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.details.real_name} activities on </Modal.Title>
                    <DatePicker
                        className="pull-right"
                        selected={this.state.date}
                        onChange={date => this.changeDateFilter(date)}
                        minDate={new Date(-8640000000000000)}
                        customInput={<CustomInput />}
                    />
                    <div style={{alignSelf: 'center', marginLeft: '1%'}}> Click on the date to change it</div>
                </Modal.Header>
                <Modal.Body>
                    {/* <Activity Activity={this.state.activity}/>  */}
                    {activityDiv}
                </Modal.Body>
            </Modal>
        ) : null;
    }
};


export default ActivityDetails;