import { Button, Card, CardBody, CardTitle, Col, Row } from "reactstrap";

const PriceCard = ({
  link,
  exchangeName,
  isBuying,
  lastUpdated,
  optimal,
  price,
}) => {
  return (
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        <Row>
          <div className="col">
            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
              Exchange: {exchangeName}
            </CardTitle>
            <span className="h2 font-weight-bold mb-0">
              Current {isBuying ? " buy " : " sell "} price: ${price}
            </span>
          </div>
          <Col className="col-auto">
            {optimal ? (
              <span className="badge badge-success text-nowrap">Good ✅</span>
            ) : (
              <span className="badge badge-danger text-nowrap">Bad ❌</span>
            )}
          </Col>
        </Row>
        <br />
        <Row>
          <div className="col">
            <Button color="primary">
              <a
                className="text-white"
                href={link}
                target="_blank"
                rel="noreferrer"
              >
                {isBuying ? "Buy" : "Sell"}
              </a>
            </Button>
          </div>
          <Col className="col-auto">
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-nowrap">Last updated: {lastUpdated}</span>
            </p>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default PriceCard;
