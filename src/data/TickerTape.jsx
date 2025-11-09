import React, { useEffect, useRef } from "react";

const TickerTape = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        // Clean up previous scripts
        const existingScript = document.getElementById("tradingview-widget-script");
        if (existingScript) existingScript.remove();

        const script = document.createElement("script");
        script.id = "tradingview-widget-script";
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.async = true;

        // Widget configuration
        script.innerHTML = JSON.stringify({
          symbols: [
            { proName: "BITSTAMP:BTCUSD", title: "BTC/USD" },
            { proName: "BITSTAMP:ETHUSD", title: "ETH/USD" },
            { proName: "BINANCE:BNBUSDT", title: "BNB/USDT" },
            { proName: "COINBASE:SOLUSD", title: "SOL/USD" },
          ],
          colorTheme: "dark",
          isTransparent: false,
          displayMode: "adaptive",
          locale: "en",
        });

        containerRef.current.appendChild(script);

        script.onerror = () => {
          console.error("Failed to load TradingView script.");
        };
      } catch (error) {
        console.error("Error initializing TradingView widget:", error);
      }
    }
  }, []);

  return <div ref={containerRef}></div>;
};

export default TickerTape;
