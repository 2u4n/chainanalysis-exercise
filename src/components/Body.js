/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
*/

// reactstrap components
import { Container, Jumbotron } from "reactstrap";
import Bitcoin from "./Bitcoin";
import Ethereum from "./Ethereum";

const Body = () => {
  const binanceUrl = "https://www.binance.com/en";
  const coinbaseUrl = "https://www.coinbase.com/";
  const geminiUrl = "https://www.gemini.com/";

  return (
    <div className="bg-gradient-dark pb-8 pt-3">
      <Container fluid>
        <Jumbotron>
          <h1 className="display-3">Hello!</h1>
          <p className="lead">
            Welcome to EzCrypto, the easiest platform to start trading
            cryptocurrencies.
          </p>
          <hr className="my-2" />
          <p>
            We recommend you which exchange to buy from based on their prices.
            Remember to get the most updated price when you're ready to trade.
            Happy trading 🚀
          </p>
        </Jumbotron>
        <div className="header-body">
          {/* Card stats */}
          <Bitcoin
            binanceUrl={binanceUrl}
            coinbaseUrl={coinbaseUrl}
            geminiUrl={geminiUrl}
          />
          <br />
          <Ethereum
            binanceUrl={binanceUrl}
            coinbaseUrl={coinbaseUrl}
            geminiUrl={geminiUrl}
          />
        </div>
      </Container>
    </div>
  );
};

export default Body;
