import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Categories from './components/Categories/Categories';
import Trends from './components/Trends/Trends'
import { items } from './feed.json';

let trends: any[] = items[0].includes;

trends = trends.map(({ title, thumbnail }: any) => ({desc: title, img: thumbnail }) );

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Categories />
      <Trends trends={trends}/>
    </div>
  );
};

export default App;
