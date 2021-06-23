import { useHistory } from "react-router"
import { Col, Row, Container, Jumbotron } from "react-bootstrap";
import { Card, Button, Badge, Form, Tooltip } from "react-bootstrap";
import BuildCards from "../BuildCards";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiShooter from "../ApiShooter";
import { ListGroup, ListGroupItem , OverlayTrigger} from "react-bootstrap";
import { withWidth } from "@material-ui/core";
import useWindowDimensions from "../WindowsDim";
import { useEffect } from "react";
import Popup from "reactjs-popup";


export default function ChildSite(props){
    let history = useHistory();
    const [startDate, setStartDate] = useState(new Date());
    const [message, setMessage] = useState("");
    const {width, height} = useWindowDimensions();
    const [token, setToken] = useState(null);

    const [username, setUsername] = useState("");
    const [realName, setRealName] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        if(props.child){
            setUsername(props.child.username);
            setRealName(props.child.realName);
            setPassword("");
        }
    }, []);

    if(!props.child)
        history.push("/");
    
    if(props.child){

        function handleGetToken(){
            ApiShooter.login(props.child.username, password).then(res => {
                setToken(res.data.token);
                navigator.clipboard.writeText(res.data.token);
            })
        }

        function updateChildInfo(childId){
            let data = {
                password,
                username,
                realName
            }
            ApiShooter.updateChildAccount(props.user.token, data, childId ).then(res => {
                setShow(true);
            })
        }

        function addDuty(){
            let duty = {
                childId: props.child.id,
                dutyMessage: message,
                expiration: startDate
            }
            ApiShooter.addDuty(props.user.token, duty).then(res => {
                let child = {...props.child};
                child.duties = res.data;
                props.setChild(child);
            })
        }

        function handleDeleteDuty(dutyId){
            ApiShooter.deleteDuty(props.user.token, props.child.id, dutyId).then(res => {
                let child = {...props.child};
                child.duties = res.data;
                props.setChild(child);
            })
        }

        let cards = props.child.duties.map(duty => {
            let today = new Date(new Date().setHours(0,0,0,0));
            let dutyDay = new Date(new Date(duty.expiration).setHours(0,0,0,0));
         
            let variant = "primary";
            if(today > dutyDay){
                variant = "danger";
            }

            return (
            <Card className="addShadow">
                <Card.Body>
                    <Card.Title>{duty.addedBy}</Card.Title>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            <Card.Text>{duty.dutyMessage}</Card.Text>
                        </ListGroupItem>
                        <ListGroupItem variant = {variant}>
                            Expiration: {duty.expiration}
                        </ListGroupItem>
                    </ListGroup>
                    <Button variant="light" onClick={() => handleDeleteDuty(duty.id)}>Delete</Button>
                </Card.Body>
            </Card>
            );
        })

        return(
            <div>
            <Container fluid>
                <Row>
                    <Col>
                        {props.child.duties.length > 0? 
                         <BuildCards cards={cards} width={width} largeGap={2} mediumGap={1} smallGap={1}/>:
                        <Jumbotron>
                            Your child doesn't have any duties left
                        </Jumbotron>
                        }
                    </Col>
                    <Col>
                        <Card className="addShadow">
                            <Card.Body>
                                <Card.Header>
                                    <Card.Title>Add duty</Card.Title>
                                </Card.Header>
                                <Form>
                                    <div style={{height:30}}></div>
                                    <b>expiration: </b><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label><b>Duty message </b></Form.Label>
                                        <Form.Control as="textarea" rows={3} onChange={(e) => setMessage(e.target.value)} />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            <Button onClick={() => addDuty()}>
                                Add duty
                            </Button>
                        </Card>         
                        
                        <div style={{height:30}}></div>
                        <Card className="addShadow">
                            <Card.Body>
                                <Card.Header>
                                    <Card.Title>Update Child's account</Card.Title>
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
                                <Button onClick={() => updateChildInfo(props.child.id)}>
                                    Update child's info
                                </Button>
                            </OverlayTrigger>
                        </Card>                       
                    </Col>
                </Row>
            </Container>
            <Jumbotron>
            <Popup trigger={<Button block>Get child token</Button>} position="top center">
                {token == null? 
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label><b>Enter child password </b></Form.Label>
                                <Form.Control type="password" placeholder="enter new password" onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                        </Form>
                        <Button onClick={handleGetToken}>Get token</Button>
                    </Card.Body>
                </Card>:
                <div>
                <Card style={{width:300}}>
                    <Card.Body>
                     Token copied to clipboard!: {token}
                     </Card.Body>
                </Card>
                </div>}
            </Popup>
                
            </Jumbotron>
            </div>
        );
    }else{
        return <div></div>
    }
}