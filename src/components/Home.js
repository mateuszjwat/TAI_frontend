import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Card, CardGroup } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import useChangeTitle from './ChangeTitle';  

function Home (props){

    useChangeTitle("Family tables");

    let welcome;
    if(props.user){
        welcome = <h1 class="display-2">Witaj ponownie {props.user.username}</h1>
    } else {
        welcome = <h1 class="display-2">Witaj na najlepszej stronie z fiszkami!</h1>
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
      {/* <footer style={{float: 'right'}}>
        <p className="text-muted h4">
          Specjalne podziękowania dla <cite title="Source Title">Oli Kotuszewskiej</cite>
        </p>
      </footer> */}
      </div>
        </Jumbotron>
        
        <h1 class="text-center display-4" style={{height:130}}> Zalety fiszek</h1>
 
        <Row sm="1" xs="1" md="3">
        <Col><Zaleta tytul="Proste w obsłudze!" opis="Proste w użyciu i przyjazne dla nowych użytkowników. Masz do nich dostęp przez cały czas, gdy tylko jesteś online ;)" /></Col>
        <Col><Zaleta tytul="Szybka nauka!" opis="Fiszki pozwalają na skuteczną i efektywną naukę nowych słów czy innych skojarzeń" /></Col>
        <Col><Zaleta tytul="Wciągające!" opis="Fiszki są wciągające, bo działają jak test. Wystarczy tapnąć w ekran lub obrócić papierową fiszkę i już wiesz, czy znałeś odpowiedź. Nauka w ten sposób sprawia, że jesteś cały czas zangażowany." /></Col>
        </Row>



    </div>
    );
}
  
export default Home;