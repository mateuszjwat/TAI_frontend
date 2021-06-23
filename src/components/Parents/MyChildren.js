import { useState, useEffect } from "react";
import ApiShooter from "../ApiShooter";
import { Table, ButtonGroup, Button, Card, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import Popup from "reactjs-popup";

export default function MyChildren(props){
    const [data, setData] = useState(null);
    const [token, setToken] = useState(null);
    let history = useHistory();

    useEffect(() => {
        if(props.user)
        ApiShooter.getChildren(props.user.token).then(res => {
            setData(res.data);
        })
    }, []);

    function handleRowClick(child){
        props.setChild(child);
        history.push("/childSite");
    }
    
    function handleMakeNewAccount(){
        history.push("/signUp");
    }

    if(props.user){
        if(props.user.isParent){
            function handleTokenChild(){
                ApiShooter.addTokenChild(props.user.token, token).then(res => {
                    console.log(res);
                    ApiShooter.getChildren(props.user.token).then(res => {
                        console.log(data);
                        setData(res.data);
                    })
                })
            }

            function handleDelete(child){
                ApiShooter.deleteChildFromParent(props.user.token, child.id).then(res => {
                    ApiShooter.getChildren(props.user.token).then(res => {
                        setData(res.data);
                    })
                })
            }

            if(data){
                return(
                    <div>
                        <ButtonGroup>
                            <Button onClick={handleMakeNewAccount}>
                                Make new child account
                            </Button>
                            <Popup trigger={<Button>
                                Add child from token
                            </Button>} position="right center">
                                <Card>
                                    <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label><b>Enter child token </b></Form.Label>
                                            <Form.Control type="text" placeholder="enter token" onChange={(e) => setToken(e.target.value)} />
                                        </Form.Group>
                                    </Form>
                                    <Button onClick={handleTokenChild}>add child</Button>
                                    </Card.Body>
                                </Card>
                            </Popup>
                            
                        </ButtonGroup>

                        <div style={{height:30}}></div>

                        {data.length > 0 &&
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Real name</th>
                                    <th>Duty count</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(child => (
                                    <tr> 
                                        <td  onClick={() => handleRowClick(child)}>{child.username}</td>
                                        <td  onClick={() => handleRowClick(child)}>{child.realName}</td>
                                        <td  onClick={() => handleRowClick(child)}>{child.duties.length}</td>
                                        <td><Button variant="danger" onClick={()=>{handleDelete(child)}}>Delete Account</Button></td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </Table>}
                    </div>
                );
            }         
        }
    } 

    return <div></div>
} 