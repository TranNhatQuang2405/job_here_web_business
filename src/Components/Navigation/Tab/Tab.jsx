import React from 'react'
import { Row, Col } from 'react-bootstrap'
import "./Tab.css"

function Tab({ data, currentTab, setCurrentTab }) {
    return (
        <Row>
            <Col>
                <div className="jh-box-item Tab__bound">
                    {data && data.length > 0 && data.map((tabName, index) =>
                        <div key={index}
                            onClick={() => setCurrentTab(index)}
                            className={"Tab_child" + (currentTab === index ? " currentTab" : "")}>
                            {tabName}
                        </div>
                    )}
                </div>
            </Col>
        </Row>
    )
}

export default Tab