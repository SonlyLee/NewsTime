import React from "react";
import {Row, Col,BackTop} from 'antd';
import PCHeader from "./pc_header";
import PCFooter from "./pc_footer";
import PCNewsImageBlock from "./pc_news_image_block";
import CommonComments from "./common_comments";

export default class PCDetail extends React.Component{
    constructor() {
        super();
        this.state = {
            newsItem: ''
        };
    };
    componentDidMount(){
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="
            +this.props.params.uniquekey,myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({newsItem:json});
                document.title = this.state.newsItem.title +  '- Newstime | React 驱动的新闻平台';
            })
    };
    createMarkup(){
        return{__html:this.state.newsItem.pagecontent};
    };
    render() {
        return (
            <div>
                <PCHeader/>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className="container">
                        <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        {/*传给评论留言的是该文章的ID 通过该ID 文章获取相应的以前的评论*/}
                        <hr/>
                        <CommonComments uniquekey={this.props.params.uniquekey}/>
                    </Col>
                    <Col span={6}>
                        <div class="hotNews">
                            <PCNewsImageBlock count={40} type="top" width="100%" cartTitle="热门新闻" imageWidth="159px"/>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter/>
                <BackTop/>
            </div>
        );
    }
}