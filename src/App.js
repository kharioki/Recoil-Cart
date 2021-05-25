import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const inventory = {
  a: { name: '🍗  Honey Glazed', price: 10 },
  b: { name: '☕️  Java espresso', price: 15 },
  c: { name: '🍧  Vanilla icecream', price: 9.5 },
};

const destinations = {
  NBO: 50,
  WST: 75,
  THK: 90,
};

function App() {
  return (
    <div>
      App
    </div>
  );
}

export default App;
