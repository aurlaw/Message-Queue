import React from 'react';
import Col  from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row  from 'react-bootstrap/lib/Row';
import Helmet from "react-helmet/lib/Helmet";
import NavMenu from './NavMenu';
import Footer from './Footer'

export default props => (
<main>
  <Grid fluid>
    <Row>
      <Col sm={3}>
        <NavMenu />
      </Col>
      <Col sm={9}>
        <Helmet titleTemplate="%s | Message-Queue React">
          <meta charSet="utf-8" />
        </Helmet>
        <article>
          {props.children}
        </article>
      </Col>
    </Row>
  </Grid>
  <Footer />
</main>
);
