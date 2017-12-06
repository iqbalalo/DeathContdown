import React from 'react';
import {DatePicker, Select, Input, Button, message} from 'antd';
import 'onsenui/css/onsenui.css';
import 'antd/lib/date-picker/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/radio/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/message/style/css'
import DeathCalendarPage from "./DeathCalendarPage";
import MyFunctions from './public/MyFunctions';

var global = new MyFunctions();
var countries = require('country-data').countries;
var countryList = [];
export default class UserInfoFormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            dateOfBirth: "",
            originCountry: "",
            livingCountry: "",
            seriousDisease: 0,
            doExercise: 0,
            gender:"male"
        }
    }

    componentWillMount() {
        this.fetchCountryList();
    }

    fetchCountryList() {
        countries = countries.all;
        for (let i = 0; i < countries.length; i++) {
            if (countries[i]["status"] == "assigned") {
                countryList.push(<Select.Option key={countries[i]["name"]}
                                                value={countries[i]["name"]}><img/>{countries[i]["name"]}</Select.Option>);
            }
        }
    }

    pushToDeathCalendarPage(userInfo) {
        this.props.navigator.pushPage({component: DeathCalendarPage, key:"DeathCalendar", props: {userInfo: userInfo}});
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeLivingCountry(e) {
        this.setState({
            livingCountry: e
        });
    }

    onChangeOriginCountry(e) {
        this.setState({
            originCountry: e
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e
        });
    }

    onChangeSeriousDisease(e) {
        this.setState({
            seriousDisease: e
        });
    }

    onChangeDoExercise(e) {
        this.setState({
            doExercise: e
        });
    }

    onBirthDateChange(date, dateString) {
        this.setState({
            dateOfBirth: dateString
        });
    }

    onClickSubmit(e) {

        if (this.state.name=="") {
            message.error('Name is required!', 5);
            return;
        }

        if (this.state.email=="") {
            message.error('Email is required!', 5);
            return;
        }

        if (this.state.originCountry=="") {
            message.error('Country you born is required!', 5);
            return;
        }

        if (this.state.livingCountry=="") {
            message.error('Country you live is required!', 5);
            return;
        }

        if (this.state.dateOfBirth=="") {
            message.error('Date of birth is required!', 5);
            return;
        }

        var dayDiff = global.dateDiff(new Date(this.state.dateOfBirth), new Date(), "day");

        if (dayDiff < 1) {
            message.error('Wrong birth date!', 5);
            return;
        }

        var userInfo = {
            name: this.state.name,
            email: this.state.email,
            dateOfBirth: this.state.dateOfBirth,
            livingCountry: this.state.livingCountry,
            originCountry: this.state.originCountry,
            seriousDisease: this.state.seriousDisease,
            doExercise: this.state.doExercise,
            gender: this.state.gender
        };

        this.pushToDeathCalendarPage(userInfo);
    }

    render() {
        return (
            <div style={{height:"100%", backgroundColor:"#f1f1f1", padding:"1em", overflow:"scroll"}}>
                <span style={{fontSize:"1.2em", display:"block"}}>Fill the information correctly to calculate and assume the week of death of your life.</span>
                <div style={{marginBottom: "1em"}}>
                    <h4>Name:</h4>
                    <Input placeholder="Name" style={{display: "block"}}
                           onChange={this.onChangeName.bind(this)}/>
                </div>
                <div style={{marginBottom: "1em"}}>
                    <h4>Email:</h4>
                    <Input placeholder="Email" ref="email" style={{display: "block"}}
                           onChange={this.onChangeEmail.bind(this)}/>
                </div>
                <div style={{marginBottom: "1em"}}>
                    <h4>Which country did you born:</h4>
                    <Select defaultValue="select" style={{display: "block"}}
                            onChange={this.onChangeOriginCountry.bind(this)}>
                        <Select.Option value="select">Select Country</Select.Option>
                        {countryList}
                    </Select>
                </div>
                <div style={{marginBottom: "1em"}}>
                    <h4>Which country do you live:</h4>
                    <Select defaultValue="select" style={{display: "block"}}
                            onChange={this.onChangeLivingCountry.bind(this)}>
                        <Select.Option value="select">Select Country</Select.Option>
                        {countryList}
                    </Select>
                </div>
                <div style={{marginBottom: "1em"}}>
                    <h4>Date of birth:</h4>
                    <DatePicker style={{display: "block"}} onChange={this.onBirthDateChange.bind(this)}/>
                </div>
                <div style={{marginBottom: "1em"}}>
                    <h4>Gender</h4>
                    <Select defaultValue="male" style={{display: "block"}} onChange={this.onChangeGender.bind(this)}>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                </div>
                <div style={{marginBottom: "1em"}}>
                    <h4>Do you have any vital disease?</h4>
                    <Select defaultValue="no" style={{display: "block"}}
                            onChange={this.onChangeSeriousDisease.bind(this)}>
                        <Select.Option value="no">No</Select.Option>
                        <Select.Option value="yes">Yes</Select.Option>
                    </Select>
                </div>
                <div style={{marginBottom: "1em"}}>
                    <h4>Do you exercise regularly?</h4>
                    <Select defaultValue="no" style={{display: "block"}} onChange={this.onChangeDoExercise.bind(this)}>
                        <Select.Option value="no">No</Select.Option>
                        <Select.Option value="yes">Yes</Select.Option>
                    </Select>
                </div>
                <div style={{marginTop: "2em", textAlign: "center", paddingTop: "1em", borderTop: "1px dashed #ddd"}}>
                    <Button type="normal" size="large" onClick={this.onClickSubmit.bind(this)}>Submit</Button>
                </div>
            </div>
        );
    }
}