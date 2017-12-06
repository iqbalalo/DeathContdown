import React from 'react';
import 'onsenui/css/onsenui.css';
import 'css/style.css';
import Year from 'Year';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';

export default class BlockHolder extends React.Component {
    constructor(){
        super();
        this.state = {
            numOfYear: null,
            numOfBlockEachYear: null,
            passedBlock: null,
            restBlock: null,
            restBlockMax: null,
            uncertainBlock: null
        }
    }

    componentWillMount() {
        this.setState({
            numOfYear:this.props.numOfYear,
            numOfBlockEachYear:this.props.numOfBlockEachYear,
            passedBlock: this.props.passedBlock,
            restBlock: this.props.restBlock,
            restBlockMax: this.props.restBlockMax,
            uncertainBlock: this.props.uncertainBlock
        });
    }
    render() {
        var years = [];
        if (this.props.numOfYear) {
            //Loop through years
            for (var i=0; i<this.state.numOfYear; i++) {
                years.push(<Year key={"year" + i} year={i}
                                 numOfBlockEachYear={this.state.numOfBlockEachYear}
                                 blocksStartIndex={(this.state.numOfBlockEachYear * i) + 1}
                                 passedBlock={this.state.passedBlock}
                                 restBlock={this.state.restBlock}
                                 restBlockMax={this.state.restBlockMax}/>);
            }
        }
        return (
            <div className="blockHolder">
                <span className="topMessage">{this.state.passedBlock} weeks passed from your life!</span>
                <span className="axisTopTitle">Weeks (1 block = 1 week and 1 row = 1 year = 52 weeks) &rarr;</span>
                {years}
                <div style={{marginTop:"5px"}}>
                    <span className="legend"><FontAwesome name="square" style={{color:"#d60000"}}></FontAwesome> Birth week</span>&nbsp;&nbsp;
                    <span className="legend"><FontAwesome name="square" style={{color:"#000000"}}></FontAwesome> Passed weeks</span>&nbsp;&nbsp;
                    <span className="legend"><FontAwesome name="square" style={{color:"#FFF"}}></FontAwesome> Weeks you may get</span>&nbsp;&nbsp;<br/>
                    <span className="legend"><FontAwesome name="window-close" style={{color:"#F1f1f1"}}></FontAwesome> Possible weeks of your Death</span>&nbsp;&nbsp;
                    <span className="legend"><FontAwesome name="square" style={{color:"#AB6E4C"}}></FontAwesome> Weeks you may not get</span>
                    <span className="bottomMessage">
                        Probably {this.state.restBlock - this.state.passedBlock} - {this.state.restBlockMax - this.state.passedBlock} weeks available to live. <br/>{this.state.restBlockMax - this.state.passedBlock <=1000 ? "You are very near to death!" : "Death is not so far."} Enjoy it with fullest!
                    </span>
                </div>
            </div>
        );
    }
}

