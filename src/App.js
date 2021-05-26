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
      <CartItems />
      <Shipping />
    </div>
  );
}

function CartItems() {
  const cart = useRecoilValue(cartState);

  if (Object.keys(cart).length === 0) return <p>No items here!!!</p>;

  return (
    <ul>
      {Object.entries(cart).map(([id, quantity]) => <li key={id}>{inventory[id].name} x {quantity}</li>)}
    </ul>
  );
}

function Shipping() {
  return(
    <div>
      {
        Object.entries(destinations)
          .map(([country, price]) => <button>{country} @ {price}</button>)
      }
    </div>
  );
}

export default App;
