import React from "react";
import {Row,Col,Card} from "antd";
import {
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    CheckBox,
    notification,
    Modal
} from "antd";
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router,Route,Link,browserHistory} from "react-router";

class CommonComments extends React.Component{
    constructor(){
        super();
        this.state = {
            comments:""
        }
    };
    componentDidMount(){
        //组件渲染留言评论
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="
            +this.props.uniquekey,myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({
                    comments : json
                });
            })
    };
    handleSubmit(e){
        //自己评论
        e.preventDefault();
        var myFetchOptions = {
            method:"GET"
        };
        var formData = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&uniquekey="+this.props.uniquekey+"&userid="+localStorage.userid+"&comment="+formData.remark,myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                //通过自己的留言 进行留言板的重新渲染
                this.componentDidMount();
            });

    };
    addUserCollection(){
        //收藏事件
        var myFetchOptions = {
            method:"GET"
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey,myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                //收藏成功以后进行全局的提醒
                notification['success']({
                    message:"公告",
                    description:"收藏该文章成功"
                })
            });
    };
    render(){
        let {getFieldProps} = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length?
            comments.map((comment,index)=>(
                <Card key={index} title={comment.UserName} extra={<a href="#">发布于{comment.datetime}</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            "还没有评论";
        return(
            <div class="comment">
                <Row>
                    <Col span={24}>
                        {commentList}
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label="您的评论:">
                                <Input type="textarea" placeholder="输入区" {...getFieldProps('remark',{initialValue:""})}/>
                            </FormItem>
                            <Button type="primary" htmlType="submit">提交评论</Button>
                            &nbsp;&nbsp;
                            <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    };
}
export default CommonComments = Form.create({})(CommonComments);