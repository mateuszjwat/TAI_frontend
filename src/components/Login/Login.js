import React from 'react';
import { useState } from 'react';
import {Button, Card} from 'react-bootstrap'
import { Alert } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import ApiShooter from '../ApiShooter';
import useChangeTitle from '../ChangeTitle';


function Login (props){

    let history = useHistory();

    useChangeTitle("Fiszki Login");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorForm, setErrorForm] = useState(false);


    function handleLogin(e){
        e.preventDefault();
        ApiShooter.login(username, password).then(res => {
            console.log(res);
            let newUser = {
                username: username,
                realName: res.data.realName,
                token: res.data.token,
                isParent: res.data.parent
            }

            props.setUser(newUser);
            history.push('/');
            console.log(newUser.token);
        }).catch(err => {
            setErrorForm(true);
            console.log("złe passwordy");
        });
    }

    if(!props.user){
        return (
            <div>
                <div style={{height:40}}></div>
                <div style={{ display:'flex', justifyContent:'center' }}>
                <Card style={{ width: '30rem' }}>
                    <Card.Header>Witaj!</Card.Header>
                    <Card.Body>
                        <form className="login-form" onSubmit={handleLogin} autoComplete="on">
                            <h3 class='text-center'>Sign In</h3>

                            <div className="form-group">
                                <label>Enter Username</label>
                                <input type="username" className="form-control" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label>Enter password</label>
                                <input type="password" className="form-control" placeholder="hasło" onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <button value="Login" type="submit" className="btn btn-primary btn-block">Submit</button>
                            {errorForm
                                ? <Alert variant="danger"> Bad login credentials! </Alert>
                                : <br/>
                            }
                            
                            <p className="forgot-password text-right">
                                Don't have account? 
                                <a href="/signUp">Sign Up!</a>
                            </p>
                        </form>
                    </Card.Body>
                </Card>
                </div>
            </div>
        );
    }
    else {
        return <div></div>

    }
}
  
export default Login;