import React from "react";
import ReactDOM from "react-dom";
import {Row,Col,Modal} from "antd";
import {Menu,Icon} from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {Tabs,message,Form,Input,Button,Checkbox,Card,notification,Upload} from "antd";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import {Router,Route,Link,browserHistory} from "react-router";
import PCHeader from "./pc_header";
import PCFooter from "./pc_footer";

export default class UserCenter extends React.Component{
    constructor(){
        super();
        this.state = {
            usercollection:"",
            usercomponents:"",
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
            }],
        }
    };
    componentDidMount() {
        var myFetchOptions = {
            method: "GET"
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({usercollection:json})
            });
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({usercomponents:json})
            });
    };
    handleCancel(){
        this.setState({ previewVisible: false });
    };
    handlePreview (file){
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };
    handleChange({ fileList }){
        this.setState({ fileList });
    };
    render(){
        //设置照片的预览
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const {usercollection,usercomponents} = this.state;
        const usercollectionList = usercollection.length?
            usercollection.map((uc,index)=>(
                <Card key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`}>查看</a>}>
                    <p>{uc.Title}</p>
                </Card>
            ))
            :
            <h1>"您还没有收藏任何的新闻!"</h1>;
        const usercomponentsList = usercomponents.length?
            usercomponents.map((comment,index)=>(
                <Card key={index} title={`于${comment.datetime}评论了文章${comment.uniquekey}`} extra={<a target="_blank" href={`/#/details/{comment.uniquekey}`}>查看</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            "没有评论";
        return(
            <div>
                <PCHeader/>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                <div className="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercollectionList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <div class="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercomponentsList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div className="clearfix">
                                    <Upload
                                        action="http://newsapi.gugujiankong.com/Handler.ashx"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                    >
                                        {fileList.length >= 3 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            </TabPane>
                            <TabPane tab="用户设置" key="4">
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter/>
            </div>
        )
    }
};