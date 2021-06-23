import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Card, CardGroup } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import useChangeTitle from './ChangeTitle';  

function Home (props){

    useChangeTitle("Family tables");

    let welcome;
    if(props.user){
        welcome = <h3 class="display-4">Welcome back {props.user.username}</h3>
    } else {
        welcome = <h3 class="display-4">Welcome to best duty planner site!</h3>
    }

    function Zaleta({tytul, opis}) { 
        return(
            <div class="album py-5 bg-light">

            <div class="row" style={{display: 'flex', justifyContent: 'center'}}>
                <div class="col-md-10">
                <div class="card mb-4 shadow-sm">
                    <svg
                    class="bd-placeholder-img card-img-top text-center"
                    width="100%"
                    height="225"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    >
                    <rect width="100%" height="100%" fill="#55595c"></rect>
                    <text class="h2" fill="#eceeef" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">
                        {tytul}
                    </text>
                    
                    </svg>
                    <div class="card-body">
                    <p class="card-text">
                        {opis}
                    </p>
                    </div>
                </div>
                </div>
            </div>
        </div>

        );
    }

    return (
    <div>
        <Jumbotron>
            {welcome}

        <div >
      </div>
        </Jumbotron>
        
        <h1 class="text-center display-4" style={{height:130}}> Family tables pros</h1>
 
        <Row sm="1" xs="1" md="3">
        <Col><Zaleta tytul="Easy to use!" opis="Very easy to use planning table, accessible from anywhere!" /></Col>
        <Col><Zaleta tytul="Effective!" opis="Give away duties to your children in very effictive verifiable way!" /></Col>
        <Col><Zaleta tytul="Recommended!" opis="Recommended by all users worldwide!" /></Col>
        </Row>



    </div>
    );
}
  
export default Home;