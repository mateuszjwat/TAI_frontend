import { useState, useEffect } from "react";
import { Card, Button, ListGroup, ListGroupItem, Jumbotron } from "react-bootstrap";
import ApiShooter from "../ApiShooter";
import BuildCards from "../BuildCards";

export default function Duties(props){
    const [duties, setDuties] = useState([]);

    useEffect(() => {
        if(props.user)
        ApiShooter.getDuties(props.user.token).then(res => {
            setDuties(res.data);
        })
    }, []);

    if(props.user && !props.user.isParent){

        function handleFinishDuty(dutyId){
            ApiShooter.finishDuty(props.user.token, dutyId).then(res => {
                ApiShooter.getDuties(props.user.token).then(res => {
                    setDuties(res.data);
                })
            })
        }


        let cards = duties.map(duty => {
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
                    <Button variant="light" onClick={() => handleFinishDuty(duty.id)}>Finish Duty</Button>
                </Card.Body>
            </Card>
            );
        })

        return (
            <div>
                {duties.length == 0 &&
                <Jumbotron>
                    No more duties left! ^^
                </Jumbotron>
                }
                <BuildCards largeGap={4} mediumGap={2} smallGap={1} cards={cards} />
            </div>
        );
    }

    return (
        <div></div>
    );
}