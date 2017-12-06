import React from 'react';
import 'css/style.css';

export default class Block extends React.Component {
    constructor(){
        super();

        this.state = {
            id:null,
            type:null
        }
    }

    componentWillMount() {
        this.setState({
            id: this.props.index,
            type: this.props.type
        });
    }

    setColor() {
        switch (this.state.type) {
            case "born":
                return {
                    background: "#d60000",
                    color: "#FFFFFF"
                };
            case "passed":
                return {
                    background: "#383838",
                    color: "#ffffff"
                };
            case "rest":
                return {
                    background: "#FFFFFF",
                    color: "#FFFFFF"
                };
            case "uncertain":
                return {
                    background: "#AB6E4C",
                    color: "#000000"
                };
            case "restMax":
                return {
                    background: "#F1f1f1",
                    color: "#000"
                };
            default:
                return {
                    background: "#FFFFFF",
                    color: "#FFFFFF"
                };
        }
    }

    blockClick(e) {
        switch (this.state.type) {
            case "born":
                alert("Your birth week!");
                return;
            case "passed":
                alert("Week " + this.state.id + " has been passed away from your life and never return!");
                return;
            case "rest":
                alert("You may get the week " + this.state.id + " to live. Enjoy life as much as you can.");
                return;
            case "uncertain":
                alert("It depends on many factors to avail the week " + this.state.id + "! Best of luck.");
                return;
            case "restMax":
                alert("This " + this.state.id + " week might be your last of living, means Week of Death! Use your time preciously.");
                return;
            default:
                alert("Oops!");
                return;
        }
    }

    render() {
        return (
            <div className="Block col-1">
                <div id={'block' + this.props.index} className="block"
                     style={this.setColor()} onClick={this.blockClick.bind(this)}>
                    <span className="block-text">{this.state.type=="restMax" ? "x" : ""}</span>
                </div>
            </div>
        );
    }
}

