import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext';

export const Transaction = (props) => {
    const { deleteTransaction } = useContext(GlobalContext);

    const sign = (props.transaction.amount<0?"-":"+");
    const amount = Math.abs(props.transaction.amount);
  return (
    <li className={props.transaction.amount < 0 ? "minus" : "plus"}>
        {props.transaction.text} <span>{sign}${amount}</span>
        <button onClick={() => deleteTransaction(props.transaction.id)} className="delete-btn">x</button>
    </li>
  )
}
