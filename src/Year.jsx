import React from 'react';
import Block from 'Block';
import 'css/style.css';


export default class Year extends React.Component {
    constructor(){
        super();
        this.state = {
            year:null
        }
    }

    componentWillMount() {
        this.setState({
            year: this.props.year
        });
    }

    render() {
        var blocks = [];
        if (this.props.numOfBlockEachYear) {
            //Loop through blocks in a year
            for (var i=0; i<this.props.numOfBlockEachYear; i++) {
                if (this.props.blocksStartIndex + i <= 1) {
                    blocks.push(<Block key={this.props.blocksStartIndex + i} index={this.props.blocksStartIndex + i}
                                       type="born"
                    />);
                } else if (this.props.blocksStartIndex + i <= this.props.passedBlock && this.props.blocksStartIndex + i>1) {
                    blocks.push(<Block key={this.props.blocksStartIndex + i} index={this.props.blocksStartIndex + i}
                                       type="passed"
                    />);
                }
                else if (this.props.blocksStartIndex + i <= this.props.restBlock &&
                    this.props.blocksStartIndex + i>this.props.passedBlock) {
                    blocks.push(<Block key={this.props.blocksStartIndex + i} index={this.props.blocksStartIndex + i}
                                       type="rest"
                    />);
                }
                else if (this.props.blocksStartIndex + i <= this.props.restBlockMax &&  this.props.blocksStartIndex + i >= this.props.restBlock ) {
                    blocks.push(<Block key={this.props.blocksStartIndex + i} index={this.props.blocksStartIndex + i}
                                       type="restMax"
                    />);
                }
                else {
                    blocks.push(<Block key={this.props.blocksStartIndex + i} index={this.props.blocksStartIndex + i}
                                       type="uncertain"
                    />);
                }
            }
        }
        return (
            <div className="Year row">
                <div className="col-2">
                    <div className="block">
                        <div className="year-title">
                            <span className="age-prefix">Y</span>{this.state.year + 1}
                        </div>
                    </div>
                </div>
                {blocks}
            </div>
        );
    }
}