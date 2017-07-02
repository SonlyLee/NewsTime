import React from 'react';
import {Row,Col} from 'antd';
import {Tabs,Carousel} from 'antd';
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true
        };
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} class="container">
                        <div class="leftContainer">
                            <div class="carousel">
                                <Carousel {...settings}>
                                    <div><img src="./src/images/carousel_1.png" alt="cbhchchsvb"/></div>
                                    <div><img src="./src/images/carousel_2.png" alt=""/></div>
                                    <div><img src="./src/images/carousel_3.png" alt=""/></div>
                                    <div><img src="./src/images/carousel_4.png" alt=""/></div>
                                    <div><img src="./src/images/carousel_5.png"/></div>
                                </Carousel>
                            </div>
                            <PCNewsImageBlock count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="106px"/>
                        </div>
                        <Tabs class="tabs_news">
                            <TabPane tab="头条新闻" key="1">
                                <PCNewsBlock count={22} type="top" width="100%" bordered="false"/>
                            </TabPane>
                            <TabPane tab="国际新闻" key="2">
                                <PCNewsBlock count={22} type="guoji" width="100%" bordered="false"/>
                            </TabPane>
                        </Tabs>
                        <div>
                            <PCNewsImageBlock count={9} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="130px"/>
                            <PCNewsImageBlock count={18} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="129px"/>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    };
}
