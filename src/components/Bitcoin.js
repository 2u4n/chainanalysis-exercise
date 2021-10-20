import { useEffect, useState } from "react";
import { Button, Card, CardBody, Row, Col } from "reactstrap";
import PriceCard from "./PriceCard";
import moment from "moment";

const Bitcoin = ({ binanceUrl, coinbaseUrl, geminiUrl }) => {
  // BUY API
  const [geminiBtcData, setGeminiBtcData] = useState([
    { price: "Unable to update" },
  ]);
  const [coinbaseBtcBuyData, setCoinbaseBtcBuyData] = useState({
    data: {
      base: "BTC",
      currency: "USD",
      amount: "Unable to update",
    },
  });
  const geminiBtcUrl = "https://api.gemini.com/v1/pricefeed/btcusd";
  const coinbaseBtcBuyUrl = "https://api.coinbase.com/v2/prices/BTC-USD/buy";

  // SELL API
  const [coinbaseBtcSellData, setCoinbaseBtcSellData] = useState({
    data: {
      base: "BTC",
      currency: "USD",
      amount: "Unable to update",
    },
  });
  const [binanceBtcData, setBinanceBtcData] = useState({
    symbol: "BTCUSDT",
    price: "Unable to update",
  });
  const coinbaseBtcSellUrl = "https://api.coinbase.com/v2/prices/BTC-USD/sell";
  const binanceBtcSellUrl =
    " https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT";

  const [lastUpdated, setLastUpdated] = useState(
    moment().format("MMMM Do YYYY, h:mm:ss a")
  );

  const refreshPrice = async () => {
    await fetch(geminiBtcUrl)
      .then((res) => res.json())
      .then(
        (data) => {
          setGeminiBtcData(data);
        },
        (error) => {
          setGeminiBtcData([{ price: "Unable to update" }]);
        }
      );
    await fetch(coinbaseBtcBuyUrl)
      .then((res) => res.json())
      .then(
        (data) => {
          setCoinbaseBtcBuyData(data);
        },
        (error) => {
          setCoinbaseBtcBuyData({
            data: {
              base: "BTC",
              currency: "USD",
              amount: "Unable to update",
            },
          });
        }
      );
    await fetch(coinbaseBtcSellUrl)
      .then((res) => res.json())
      .then(
        (data) => {
          setCoinbaseBtcSellData(data);
        },
        (error) => {
          setCoinbaseBtcSellData({
            data: {
              base: "BTC",
              currency: "USD",
              amount: "Unable to update",
            },
          });
        }
      );
    await fetch(binanceBtcSellUrl)
      .then((res) => res.json())
      .then(
        (data) => {
          setBinanceBtcData(data);
        },
        (error) => {
          setBinanceBtcData({
            code: "200000",
            data: {
              sell: "Unable to update",
            },
          });
        }
      );
    setLastUpdated(moment().format("MMMM Do YYYY, h:mm:ss a"));
  };

  useEffect(() => {
    refreshPrice();
  }, []);

  const geminiBtcPrice = geminiBtcData[0].price;
  const binanceBtcPrice = parseFloat(binanceBtcData.price).toFixed(2);

  let firstBuyCard = null;
  let firstSellCard = null;
  if (geminiBtcPrice > binanceBtcPrice) {
    firstSellCard = (
      <PriceCard
        link={geminiUrl}
        exchangeName="Gemini"
        lastUpdated={lastUpdated}
        optimal={geminiBtcPrice > coinbaseBtcSellData.data.amount}
        price={geminiBtcPrice}
      />
    );
    firstBuyCard = (
      <PriceCard
        link={binanceUrl}
        exchangeName="Binance"
        isBuying
        lastUpdated={lastUpdated}
        optimal={binanceBtcPrice < coinbaseBtcBuyData.data.amount}
        price={binanceBtcPrice}
      />
    );
  } else {
    firstBuyCard = (
      <PriceCard
        link={geminiUrl}
        exchangeName="Gemini"
        isBuying
        lastUpdated={lastUpdated}
        optimal={geminiBtcPrice > coinbaseBtcSellData.data.amount}
        price={geminiBtcPrice}
      />
    );
    firstSellCard = (
      <PriceCard
        link={binanceUrl}
        exchangeName="Binance"
        lastUpdated={lastUpdated}
        optimal={binanceBtcPrice < coinbaseBtcBuyData.data.amount}
        price={binanceBtcPrice}
      />
    );
  }

  return (
    <Card className="bg-yellow">
      <CardBody>
        <div className="h2 font-weight-bold mb-0">
          Bitcoin <i className="fab fa-bitcoin" />{" "}
          <Button className="ml-3" onClick={refreshPrice}>
            Get updated price
          </Button>
        </div>

        <br />
        <div className="h3 font-weight-bold mb-0">Where to buy:</div>
        <br />
        <Row>
          <Col>{firstBuyCard}</Col>
          <Col>
            <PriceCard
              link={coinbaseUrl}
              exchangeName="Coinbase"
              isBuying
              lastUpdated={lastUpdated}
              optimal={coinbaseBtcBuyData.data.amount < geminiBtcData[0].price}
              price={coinbaseBtcBuyData.data.amount}
            />
          </Col>
        </Row>
        <br />
        <div className="h3 font-weight-bold mb-0">Where to sell:</div>
        <br />
        <Row>
          <Col>{firstSellCard}</Col>
          <Col>
            <PriceCard
              link={coinbaseUrl}
              exchangeName="Coinbase"
              lastUpdated={lastUpdated}
              optimal={coinbaseBtcSellData.data.amount > binanceBtcData.price}
              price={coinbaseBtcSellData.data.amount}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Bitcoin;
