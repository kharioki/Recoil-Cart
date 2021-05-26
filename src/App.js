import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const inventory = {
  a: { name: '🍗   Honey Glazed', price: 10 },
  b: { name: '☕️   Java espresso', price: 15 },
  c: { name: '🍧   Vanilla icecream', price: 9.5 },
};

const destinations = {
  NBO: 50,
  WST: 75,
  THK: 90,
};

const cartState = atom({
  key: 'cartState',
  default: {}
});

function App() {
  return (
    <RecoilRoot>
      <AvailableItems />
      <Cart />
    </RecoilRoot>
  );
}

function AvailableItems() {
  const [cart, setCart] = useRecoilState(cartState);

  return(
    <div>
      <h2>Available Items</h2>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
      <ul>
        {
          Object.entries(inventory).map(([id, { name, price }]) => (
            <li key={id}>
              {name} @ ${price.toFixed(2)}
              <button onClick={() => {
                setCart({ ...cart, [id]: (cart[id] || 0) + 1 });
              }}>add</button>
              {cart[id] && <button onClick={() => {
                const copy = { ...cart };
                if (copy[id] === 1) {
                  delete copy[id];
                  setCart(copy);
                } else {
                  setCart({ ...copy, [id]: (copy[id]) - 1 });
                }
              }}>rem</button>}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

function Cart() {
  return(
    <div>
      <h2>Cart</h2>
    </div>
  );
}

export default App;
