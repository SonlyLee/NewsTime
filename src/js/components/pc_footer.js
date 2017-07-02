import React from 'react';
import {Row, Col} from 'antd';

export default class PCFooter extends React.Component {
    render() {
        return (
            <footer>
                <Row>
                    <Col span={3}></Col>
                    <Col span={18} class='footer'>
                        &copy;&nbsp;Failure is simply the opportunity to begin again. This time more intelligently. 000-123456
                    </Col>
                    <Col span={3}></Col>
                </Row>
            </footer>
        );
    };
}