import React from "react"
import { Button, Col, Row } from "antd"

function Navbar() {
    return(
        <div style={{position: "fixed", width: "100%"}}>
            <Row>
                <Col span={8}>
                    This is our page i think
                </Col>
                <Col span={8}></Col>
                <Col span={8}>
                    <Button type="link" href="/other">Other</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Navbar