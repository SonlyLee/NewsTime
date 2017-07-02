import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {Button} from 'antd';
import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import PCDetail from './components/pc_detail';
import MobileDetail from './components/mobile_details';
import UserCenter from './components/user_center';
import MobileUserCenter from './components/mobile_user_center'
export default class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query="(min-device-width:1224px)">
                    <Router history={hashHistory}>
                        <Route path="/" component={PCIndex}></Route>
                        <Route path="/details/:uniquekey" component={PCDetail}></Route>
                        <Route path="/usercenter" component={UserCenter}></Route>
                    </Router>
                </MediaQuery>
                <MediaQuery query="(max-device-width:1224px)">
                    <Router history={hashHistory}>
                        <Route path="/" component={MobileIndex}></Route>
                        <Route path="/details/:uniquekey" component={MobileDetail}></Route>
                        <Route path="/usercenter" component={MobileUserCenter}></Route>
                    </Router>
                </MediaQuery>
            </div>
        );
    };
}
ReactDOM.render(
    <Root/>, document.getElementById('mainContainer'));
