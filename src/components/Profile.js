import axios from "axios";
import { useState, useEffect } from 'react';
import { Card, ListGroup, Table, ProgressBar, Row, Col, Container} from "react-bootstrap";
import { Doughnut } from 'react-chartjs-2';
import {useHistory} from 'react-router-dom'
import ApiShooter from "./ApiShooter";
import useChangeTitle from "./ChangeTitle";


function Profile (props){
    useChangeTitle("Profile");
    const [data, setData] = useState(null);

    useEffect(() => {
        ApiShooter.getChildren(props.user.token).then(res => {
            setData(res.data);
        })
    }, []);

    function handleRowClick(){
        console.log("lol");
    }
    

    if(props.user){
        if(props.user.isParent){
            if(data){
                return(
                   <div>WIP</div>
                );
            }         
        }
    } 

    return <div></div>
}
  
export default Profile;