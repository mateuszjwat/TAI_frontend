import {Spinner, Alert, Card} from 'react-bootstrap'  
import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import useChangeTitle from '../ChangeTitle';
import ApiShooter from '../ApiShooter';


function SignUp (props){

    let history = useHistory();

    useChangeTitle("Family tables sign up");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [realName, setRealName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorForm, setErrorForm] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        if(!props.user){
            ApiShooter.register(realName, username, password).then((response) => {
                if(response.status == 200){
                    history.push('/login');
                }
            }).catch(err => {
                setErrorForm(true);
                setLoading(false);
            });
        } else {
            let data = {
                username,
                realName,
                password
            }
            ApiShooter.registerChild(props.user.token, data).then(res => {
                history.push("/myChildren");
            }).catch(err => {
                setErrorForm(true);
                setLoading(false);
            })
        }
    };

    
    let tekst = "Register!";
    let yourOrChild = "your";
    if(props.user){
        tekst = "Register your child!";
        yourOrChild = "child's";
    }

    return (
        <div>
            <div style={{height:40}}></div>
            <div style={{ display:'flex', justifyContent:'center' }}>
            <Card style={{ width: '30rem' }}>
                <Card.Header>{tekst}</Card.Header>
                <Card.Body>
                    {loading &&
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>}
                    <form onSubmit={handleLogin} autocomplete="on">
                        <h3 class='text-center'>Make new {props.user && "child"} account!</h3>
                        <br/>

                        <div className="form-group" autoComplete="on">
                            <label>Enter {yourOrChild} real name</label>
                            <input type="username" className="form-control" placeholder="enter real name" onChange={(e) => setRealName(e.target.value)} />
                        </div>

                        <div className="form-group" >
                            <label>Enter {yourOrChild} username</label>
                            <input type="name" className="form-control" placeholder="enter username"  onChange={(e) => setUsername(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label>Enter {yourOrChild} Password</label>
                            <input type="password" className="form-control" placeholder="enter password"  onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="btn btn-primary btn-block" type="submit">Sign Up</button>
                    </form>
                    {errorForm
                                ? <Alert variant="danger"> Bad credentials, username taken? </Alert>
                                : <br/>
                    }
                </Card.Body>
            </Card>
            </div>
        </div>
    );

}
  
export default SignUp;