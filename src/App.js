import './App.css';
import React, { useState, useEffect } from 'react';
import Coin from './Coin';
import axios from 'axios';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  const updateCoinsData = ()=>{

    setInterval(()=>{

        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').then((res)=>{

        setCoins(res.data);
        console.log("Updated!");

      }).catch((err)=>{

        console.log(err);
      });

    }, 20000);

  }

  useEffect(()=>{

      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').then((res)=>{

          setCoins(res.data);

        }).catch((err)=>{

          console.log(err);
        });

    updateCoinsData();

    // eslint-disable-next-line
  }, []);

  const handleChange = (e)=>{

    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-title">getCrypto</h1>
        <h2 className="coin-text">Search a currency</h2>
        <form>
          <input type="text" placeholder='Search' className="coin-input" onChange={handleChange} value={search}/>
        </form>
      </div>
      {filteredCoins.map(coin=>{
          return (
            <Coin key={coin.id} name={coin.name} symbol={coin.symbol} image={coin.image} price={coin.current_price} volume={coin.total_volume} marketCap={coin.market_cap} priceChange={coin.price_change_percentage_24h} />
          );
        })}
    </div>
  );
}

export default App;
