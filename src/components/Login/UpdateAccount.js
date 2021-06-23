import { Card, Form, OverlayTrigger } from "react-bootstrap";
import { Tooltip, Button } from "react-bootstrap";
import {useEffect } from "react";
import { useState } from "react";
import ApiShooter from "../ApiShooter";

export default function UpdateAccount(props){
    const [username, setUsername] = useState("");
    const [realName, setRealName] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    let your = "your";
    if(props.child)
        your="child's";

    useEffect(() => {
        if(props.child){
            setUsername(props.child.username);
            setRealName(props.child.realName);
            setPassword("");
        } else if(props.user){
            setUsername(props.user.username);
            setRealName(props.user.realName);
            setPassword("");
        }
    }, []);


    function updateAccountInfo(){
        let data = {
            password,
            username,
            realName
        }
        if(props.child){
            ApiShooter.updateChildAccount(props.user.token, data, props.child.id).then(res => {
                setShow(true);
            });
        } else {
            ApiShooter.updateAccount(props.user.token, data).then(res => {
                ApiShooter.login(username, password).then(res => {
                    let newUser = {
                        username: username,
                        token: res.data.token,
                        isParent: res.data.parent
                    }
        
                    props.setUser(newUser);
                    setShow(true);
                })
            });
        }
    }

    return (
        <Card className="addShadow">
                            <Card.Body>
                                <Card.Header>
                                    <Card.Title>Update {your} account</Card.Title>
                                </Card.Header>
                                <Form>
                                    <div style={{height:30}}></div>
                                    <Form.Group>
                                        <Form.Label><b>Username </b></Form.Label>
                                        <Form.Control type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label><b>Real Name </b></Form.Label>
                                        <Form.Control type="text" value={realName} onChange={(e) => setRealName(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label><b>Password </b></Form.Label>
                                        <Form.Control type="password" placeholder="enter new password" onChange={(e) => setPassword(e.target.value)} />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip id="button-tooltip-2">Account updated!</Tooltip>}
                                show={show}
                            >
                                <Button onClick={() => updateAccountInfo()}>
                                    Update {your} info
                                </Button>
                            </OverlayTrigger>
                        </Card>                
    );

}