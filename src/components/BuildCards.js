import { Col, Row } from "react-bootstrap";

export default function BuildCards({cards, width, largeGap, mediumGap, smallGap}){
        const resultsRender = [];

        let gap = largeGap;
        if(width < 992)
            gap = mediumGap;
        if(width < 768)
            gap = smallGap;
        
        let rest = 0;
        rest = cards.length % gap;
        if(rest != 0)
          rest = gap - rest;

        let restCol = [];
        for(let i = 0; i < rest; i++){
            restCol.push(<Col></Col>);
        }

         for(let i = 0; i < cards.length; i+=gap){
           resultsRender.push(
               <div>
               <div style={{height:15}}></div>
              <Row>
              {
                cards.slice(i, i + gap)
                  .map(card => (
                    <Col>
                      {card}
                    </Col>
                  ))
              }
              {
                  i >= cards.length - gap && restCol.map(col => (col))
                  
              }
              </Row>
              </div>
            );
         }
         return resultsRender;
    }