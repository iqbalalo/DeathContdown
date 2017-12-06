import React from 'react';
import {Tabbar, Tab} from 'react-onsenui';
import HomePage from './HomePage';
import SettingsPage from './InfoPage';

export default class App extends React.Component {
    renderTabs() {
        return [
            {
                content: <HomePage key='HomePage'/>,
                tab: <Tab key='HomeTab' label='Home' icon='md-home'/>
            },
            {
                content: <SettingsPage key="'InfoPage"/>,
                tab: <Tab key='InfoTab' label='Info.' icon='md-info'/>
            }
        ]
    }

    render() {
        return (
            <Tabbar key='Tabber' initialIndex={0} renderTabs={this.renderTabs.bind(this)}/>
        );
    }
}