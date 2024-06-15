import React, {useState} from 'react';
import './App.css';
import {Country} from "./Country";
import {v1} from "uuid";

export type BanknotsType = 'USD' | 'RUB' | 'All'
export type MoneyType = {
    banknote: BanknotsType
    nominal: number
    id: string
}

let defaultMoney: Array<MoneyType> = [  // типизируем
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'RUB', nominal: 100, id: v1()},
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'RUB', nominal: 100, id: v1()},
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'RUB', nominal: 100, id: v1()},
]


export const moneyFilter = (money: Array<MoneyType>, filter: BanknotsType): Array<MoneyType> => {
    if (filter === 'All') return money
    return money.filter(m => m.banknote === filter)
}


function App() {
    const [money, setMoney] = useState<Array<MoneyType>>(defaultMoney)
    const [filterValue, setFilterValue] = useState<BanknotsType>('All')
    const filteredMoney: MoneyType[] = moneyFilter(money, filterValue)

    const addMoney = (banknote: BanknotsType) => {
        const newBanknote = {banknote: banknote, nominal: 100, id: v1()}
        setMoney([...money, newBanknote])
    }

    const removeMoney = (banknote: BanknotsType) => {
       const index = money.findIndex(b => b.banknote === banknote)
        if (index !== -1) {
            setMoney(money.filter((el, i) => i !== index));
        }
    }

    return (
        <div className="App">
            <Country
                data={filteredMoney}
                setFilterValue={setFilterValue}
                addMoney={addMoney}
                removeMoney={removeMoney}
            />
        </div>
    );
}

export default App;
