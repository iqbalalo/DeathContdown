import React from 'react';
import {Navigator, Page, Toolbar} from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import 'css/style.css';

import UserInfoFormPage from 'UserInfoFormPage';
import DeathCalendarPage from "./DeathCalendarPage";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    renderPage(route, navigator) {
        const props = route.props || {};
        props.navigator = navigator;
        props.key = route.component.WrappedComponent ?  route.component.WrappedComponent.name : route.component.name;

        return React.createElement(route.component, props);
    }

    checkUserInfo() {
        // localStorage.clear();
        if (localStorage.getItem("userInfo") == null) {
            return UserInfoFormPage;
        } else {
            return DeathCalendarPage;
        }
    }
    render() {
        return (
            <Page key="home" className="page"
                  renderToolbar={() =>
                      <Toolbar>
                          <div className='center'>Death Countdown</div>
                      </Toolbar>
                  }>
                    <Navigator
                        initialRoute={{component: this.checkUserInfo()}}
                        renderPage={this.renderPage}
                        animation='fade'
                    />
            </Page>
        );
    }
}