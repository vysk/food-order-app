import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const [btnIshighlighted, setBtnIshighlighted] = useState(false);

  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfcartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnIshighlighted ? styles.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIshighlighted(true);

    const timer = setTimeout(() => {
      setBtnIshighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={styles.badge}>{numberOfcartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
