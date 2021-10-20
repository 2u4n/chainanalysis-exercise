import { useState, useEffect } from "react";
import { Button, Card, CardBody, Row, Col } from "reactstrap";
import PriceCard from "./PriceCard";
import moment from "moment";

const Ethereum = ({ binanceUrl, coinbaseUrl, geminiUrl }) => {
  const [geminiEthData, setGeminiEthData] = useState([
    { price: "Unable to update" },
  ]);
  const [coinbaseEthBuyData, setCoinbaseEthBuyData] = useState({
    data: {
      base: "ETH",
      currency: "USD",
      amount: "Unable to update",
    },
  });
  const geminiEthUrl = "https://api.gemini.com/v1/pricefeed/ethusd";
  const coinbaseEthBuyUrl = "https://api.coinbase.com/v2/prices/ETH-USD/buy";

  const [coinbaseEthSellData, setCoinbaseEthSellData] = useState({
    data: {
      base: "ETH",
      currency: "USD",
      amount: "Unable to update",
    },
  });
  const [binanceEthData, setBinanceEthData] = useState({
    symbol: "ETHUSDT",
    price: "Unable to update",
  });
  const coinbaseEthSellUrl = "https://api.coinbase.com/v2/prices/ETH-USD/sell";
  const binanceEthSellUrl =
    " https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT";

  const [lastUpdated, setLastUpdated] = useState(
    moment().format("MMMM Do YYYY, h:mm:ss a")
  );

  const refreshPrice = async () => {
    await fetch(geminiEthUrl)
      .then((res) => res.json())
      .then(
        (data) => {
          setGeminiEthData(data);
        },
        (error) => {
          setGeminiEthData([{ price: "Unable to update" }]);
        }
      );
    await fetch(coinbaseEthBuyUrl)
      .then((res) => res.json())
      .then(
        (data) => {
          setCoinbaseEthBuyData(data);
        },
        (error) => {
          setCoinbaseEthBuyData({
            data: {
              base: "ETH",
              currency: "USD",
              amount: "Unable to update",
            },
          });
        }
      );
    await fetch(coinbaseEthSellUrl)
      .then((res) => res.json())
      .then(
        (data) => {
          setCoinbaseEthSellData(data);
        },
        (error) => {
          setCoinbaseEthSellData({
            data: {
              base: "ETH",
              currency: "USD",
              amount: "Unable to update",
            },
          });
        }
      );
    await fetch(binanceEthSellUrl)
      .then((res) => res.json())
      .then(
        (data) => {
          setBinanceEthData(data);
        },
        (error) => {
          setBinanceEthData({
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

  const geminiEthPrice = geminiEthData[0].price;
  const binanceEthPrice = parseFloat(binanceEthData.price).toFixed(2);

  let firstBuyCard = null;
  let firstSellCard = null;
  if (geminiEthPrice > binanceEthPrice) {
    firstSellCard = (
      <PriceCard
        link={geminiUrl}
        exchangeName="Gemini"
        lastUpdated={lastUpdated}
        optimal={geminiEthPrice > coinbaseEthSellData.data.amount}
        price={geminiEthPrice}
      />
    );
    firstBuyCard = (
      <PriceCard
        link={binanceUrl}
        exchangeName="Binance"
        isBuying
        lastUpdated={lastUpdated}
        optimal={binanceEthPrice < coinbaseEthBuyData.data.amount}
        price={binanceEthPrice}
      />
    );
  } else {
    firstBuyCard = (
      <PriceCard
        link={geminiUrl}
        exchangeName="Gemini"
        isBuying
        lastUpdated={lastUpdated}
        optimal={geminiEthPrice > coinbaseEthSellData.data.amount}
        price={geminiEthPrice}
      />
    );
    firstSellCard = (
      <PriceCard
        link={binanceUrl}
        exchangeName="Binance"
        lastUpdated={lastUpdated}
        optimal={binanceEthPrice < coinbaseEthBuyData.data.amount}
        price={binanceEthPrice}
      />
    );
  }

  return (
    <Card className="bg-purple">
      <CardBody>
        <div className="h2 text-white font-weight-bold mb-0">
          Ethereum <i className="fab fa-ethereum" />
          <Button className="ml-3" onClick={refreshPrice}>
            Get updated price
          </Button>
        </div>
        <br />
        <div className="h3 text-white font-weight-bold mb-0">Where to buy:</div>
        <br />
        <Row>
          <Col>{firstBuyCard}</Col>
          <Col>
            <PriceCard
              link={coinbaseUrl}
              exchangeName="Coinbase"
              isBuying
              lastUpdated={lastUpdated}
              optimal={coinbaseEthBuyData.data.amount < geminiEthData[0].price}
              price={coinbaseEthBuyData.data.amount}
            />
          </Col>
        </Row>
        <div className="h3 text-white font-weight-bold mb-0">
          Where to sell:
        </div>
        <br />
        <Row>
          <Col>{firstSellCard}</Col>
          <Col>
            <PriceCard
              link={coinbaseUrl}
              exchangeName="Coinbase"
              lastUpdated={lastUpdated}
              optimal={coinbaseEthSellData.data.amount > binanceEthData.price}
              price={coinbaseEthSellData.data.amount}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Ethereum;
