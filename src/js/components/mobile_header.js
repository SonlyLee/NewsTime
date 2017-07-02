import React from 'react';
import {Row, Col} from 'antd';
import {Router, Route, browserHistory,Link} from 'react-router';
import {Menu, Icon, Tabs, message,Form,Input,Button,CheckBox,Modal} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class MobileHeader extends React.Component{
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible:false,
            action:'login',
            hasLogined:false,
            userName:'',
            userid:0
        };
    };
    setModalVisible(value){
        this.setState({modalVisible:value});
    };
    handleClick(e){
        if(e.key='register'){
            this.setState({current:'register'});
            this.setModalVisible(true);
        }else{
            {
                this.setState({current:e.key})
            }
        }
    };
    handleSubmit(e){
        //页面开始向API提交数据
        e.preventDefault();
        var myFetchOptions = {
            method:  "GET"
        };
        var formData = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="+formData.password+"&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions).
        then(response=>response.json()).then(json=>{
            this.setState({userName:json.NickUserName,userid:json.UserId});
        });
        if(this.state.action == 'login'){
            this.setState({hasLogined:true});
        }
        message.success("请求成功!");
        this.setModalVisible(false);
    };
    login(){
        this.setState({
            modalVisible:true
        })
    };
    callback(key){
        if(key==1){
            this.setState({action:'login'});
        }else if(key==2){
            this.setState({action:'register'});
        }
    };

    render(){
        let {getFieldProps} = this.props.form;   //接收参数
        const userShow = this.state.hasLogined?
            <Link to={`/usercenter`}>
                <Icon type="inbox"/>
            </Link>
            :
            <Icon type="setting" onClick={this.login.bind(this)}/>
        return (
            <div id="mobileheader">
                <header>
                    <img src="./src/images/logo.png" alt="logo"/>
                    <span>NewsTime</span>
                    {userShow}
                </header>
                <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel = {()=>this.setModalVisible(false)} onOk = {()=>this.setModalVisible(false)}>
                    <Tabs type="card" onChange={this.callback.bind(this)}>
                        <TabPane tab="登录" key="1">
                            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账户">
                                    <Input placeholder="请输入你的账户" {...getFieldProps('userName')}/>
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password" placeholder="请输入你的密码" {...getFieldProps('password')}/>
                                </FormItem>
                                <Button type="primary" htmlType="submit">登录</Button>
                            </Form>
                        </TabPane>

                        <TabPane tab="注册" key="2">
                            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账户">
                                    <Input placeholder="请输入你的账户" {...getFieldProps('r_userName')}/>
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password" placeholder="请输入你的密码" {...getFieldProps('r_password')}/>
                                </FormItem>
                                <FormItem label="确认密码">
                                    <Input type="password" placeholder="请再次输入你的密码" {...getFieldProps('r_confirmPassword')}/>
                                </FormItem>
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
};
export default MobileHeader = Form.create({})(MobileHeader);