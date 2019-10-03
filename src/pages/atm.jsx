import React, { Component } from 'react';
import './atm.css';


export default class Atm extends Component{
    constructor(props){
        super(props);
        this.state = {
            amount: 0,
            errorMessage: '',
            finalAmount: {},
        }
    }
    
    setAmount = (e) =>{
        this.setState({
            amount: e.target.value, 
        });

    }

    onHandleAtm = () =>{
        const { amount } = this.state;
        if(!amount){
            this.setState({ errorMessage: 'Please enter amount!', finalAmount: {} });
        } else{
            this.setState({ errorMessage: '' });
            const amounts = this.calculateAmount(amount);
            this.setState({
                finalAmount: amounts
            })
        }
    }

    calculateAmount = (amount) =>{
        const amountTypeArr = [2000, 500, 200, 100, 50, 20, 10]  
        const amountObj = {
            2000: 0,
            500: 0,
            200: 0,
            100: 0,
            50: 0,
            20: 0,
            10: 0
        }

        for(let i=0; i<amountTypeArr.length; i++){
            let note = parseInt(amount/amountTypeArr[i]);
            amountObj[amountTypeArr[i]] = note
            const remainingAmount = parseInt(amount%amountTypeArr[i]);
            amount = remainingAmount
        }
        return amountObj;
    }

    render(){
        const { errorMessage, finalAmount } = this.state;
        let displayAmount = Object.keys(finalAmount).map(key => 
            <tr><th>{key}:</th><td>{finalAmount[key]}</td></tr>
        );
        
        return (
            <div>
            <div className="atmHeader"><h2>ATM</h2></div>
            <div className="container">
            <div className="row error">{errorMessage}</div>
                <div className="row">
                    <div className="col-25" />
                    <div className="col-25">
                        <input type="number" name="atm" placeholder="Amount" onChange = {this.setAmount} />
                    </div>
                    <div className="col-25 atm"><span className="atmHeading">ATM Withdrawl Note:</span>{<table>{displayAmount}</table>}</div>
                    <div className="col-btn">
                        <input type="submit" value="Submit" onClick = {this.onHandleAtm} />
                    </div>
                </div>
            </div>
        </div>
        );
    }
}