import React from 'react';
import {Page, Toolbar} from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'css/style.css';
import BlockHolder from "BlockHolder";
import MyFunctions from './public/MyFunctions';
import $ from 'jquery';

var global = new MyFunctions();
var lifeExpectData = require('./public/LifeExpectancyData.json');

export default class DeathCalendarPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: "",
            numOfYear: 0,
            numOfBlockEachYear: 0,
            passedBlock: 0,
            restBlock: 0,
            restBlockMax:0,
            uncertainBlock: 0,
            dataSaved: false
        }

        if (localStorage.getItem("userInfo") == null) {
            localStorage.setItem("userInfo", JSON.stringify(this.props.userInfo));
        } else {
            this.state = {
                dataSaved: true
            };
        }

    }

    componentWillMount() {
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.setState({
            userInfo: {
                name: userInfo.name,
                email: userInfo.email,
                dateOfBirth: userInfo.dateOfBirth,
                originCountry: userInfo.originCountry,
                livingCountry: userInfo.livingCountry,
                seriousDisease: userInfo.seriousDisease,
                doExercise: userInfo.doExercise,
                gender: userInfo.Gender
            },
            numOfYear: 100,
            numOfBlockEachYear: 52,
            passedBlock: this.calculatePassedBlock(userInfo.dateOfBirth),
            uncertainBlock: 100 * 52
        });

        var restBlock = this.calculateRestBlock(userInfo);
        var restBlockMax = this.calculateRestBlockMax(userInfo);

        if (restBlock<restBlockMax) {
            this.setState({
                restBlock: restBlock,
                restBlockMax: restBlockMax
            });
        } else {
            this.setState({
                restBlock: restBlockMax,
                restBlockMax: restBlock
            });
        }

        if (this.state.dataSaved == false) {
            $.post("http://iqbalhossain.info/death-countdown/",
                {
                    name: userInfo.name,
                    gender: userInfo.gender,
                    dateOfBirth: userInfo.dateOfBirth,
                    email: userInfo.email,
                    originCountry: userInfo.originCountry,
                    livingCountry: userInfo.livingCountry,
                    hasSeriousDisease: userInfo.seriousDisease,
                    doExercise: userInfo.doExercise
                },
                function (response, status) {
                    console.log(response, status);
                });
            this.setState({
                dataSaved: true
            });
        }
    }

    calculatePassedBlock(dateOfBirth) {
        return global.dateDiff(new Date(dateOfBirth), new Date(), "week");
    }

    calculateUncertainBlock(dateOfBirth) {
        return global.dateDiff(new Date(dateOfBirth), new Date(), "week");
    }

    calculateRestBlock(userInfo) {
        var livingCountryExpectancy = this.getLifeExpectancyBasedOnLivingCountry(userInfo.livingCountry, userInfo.gender,
            userInfo.seriousDisease,
            userInfo.doExercise);

        var result = global.addTime(new Date(userInfo.dateOfBirth), livingCountryExpectancy, "year", "week");
        return result;
    }

    calculateRestBlockMax(userInfo) {
        var originCountryExpectancy = this.getLifeExpectancyBasedOnOriginCountry(userInfo.originCountry,
            userInfo.gender,
            userInfo.seriousDisease,
            userInfo.doExercise);

        var result = global.addTime(new Date(userInfo.dateOfBirth), originCountryExpectancy, "year", "week");
        return result;
    }

    getLifeExpectancyBasedOnLivingCountry(livingCountry, gender, disease, exercise) {
        for (var i = 0; i < lifeExpectData.length; i++) {
            var obj = lifeExpectData[i];
            if (obj.Country == livingCountry) {
                //If person has no disease and do exercise regularly can get expectancy according to gender
                if (disease == "no" && exercise == "yes") {
                    if (gender == "male") {
                        return obj.Malelife;
                    } else {
                        return obj.Femalelife;
                    }
                } else {
                    return obj.Bothsexeslife;
                }
            }
        }
    }

    getLifeExpectancyBasedOnOriginCountry(originCountry, gender, disease, exercise) {
        for (var i = 0; i < lifeExpectData.length; i++) {
            var obj = lifeExpectData[i];
            if (obj.Country == originCountry) {
                //If person has no disease and do exercise regularly can get expectancy according to gender
                if (disease == "no" && exercise == "yes") {
                    if (gender == "male") {
                        return obj.Malelife;
                    } else {
                        return obj.Femalelife;
                    }
                } else {
                    return obj.Bothsexeslife;
                }
            }
        }
    }


    render() {
        return (
            <Page className="page">
                <div style={{height: "100%", backgroundColor: "#dec6a9", overflow: "scroll", textAlign: "center", position: "relative"}}>
                    <span className="userName">Hi, {this.state.userInfo.name}</span>
                    <img src={require('./public/deadbody.jpg')} className="topImage" width="100%"/>
                    <BlockHolder
                        numOfYear={this.state.numOfYear}
                        numOfBlockEachYear={this.state.numOfBlockEachYear}
                        passedBlock={this.state.passedBlock}
                        restBlock={this.state.restBlock}
                        restBlockMax={this.state.restBlockMax}
                        uncertainBlock={this.state.uncertainBlock}
                    />
                </div>
            </Page>
        );
    }
}