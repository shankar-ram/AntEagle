
import 'react-tabs/style/react-tabs.css';
import './App.css';
import React, { Component, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Button, Nav, NavDropdown } from 'react-bootstrap';


// import { TVChartContainer } from "./components/TVChartContainer";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import logobtc from "./logobtc.svg";
import bnb from "./bnb.svg";
import eth from "./eth.svg";
import dot from "./dot.svg";
import axios from 'axios';
import swal from "sweet-alert";
import {ButtonGroup,ButtonToggle,ToggleButton,ToggleButtonGroup, TabPane,Table, NavbarBrand, NavItem} from 'react-bootstrap';
import logo from  './FInalCryptologo.png'
import { Container } from 'react-dom';

import { FormControl,InputLabel,FormHelperText,Select } from '@material-ui/core';
import Slider from "@material-ui/core/Slider";
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  CardFooter,
  CardSubtitle,
  Form,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
  DropdownItem,
  UncontrolledDropdown,
  CardText,
  Collapse,
  
} from 'reactstrap'
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import 'react-tabs/style/react-tabs.css';
import {Tabs,TabList,Tab,TabPanel} from 'react-tabs'
import NotificationAlert from "react-notification-alert";
import QRCode from "react-qr-code";
import classNames from "classnames";

function getStepContent(step) {
  switch (step) {
    case 0:
      return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}
const steps = ['Pay to the merchant', 'Create an ad group', 'Create an ad']
function getFinishIcon() {
  const path = 'M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.' +
  '5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139' +
  '.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5' +
  '-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 ' +
  '55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33' +
  '.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99' +
  '.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.' +
  '7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 10' +
  '1.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 ' +
  '20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z';
return (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    style={{ verticalAlign: '-.125em' }}
  >
    <path d={path} />
  </svg>
);
}

function getErrorIcon() {
  const path1 =
    'M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229' +
    '.2 512-512S794.8 0 512 0zm311.1 823.1c-40.4 40.4-87.5 72.2-139.9 9' +
    '4.3C629 940.4 571.4 952 512 952s-117-11.6-171.2-34.5c-52.4-22.2-99' +
    '.4-53.9-139.9-94.3-40.4-40.4-72.2-87.5-94.3-139.9C83.6 629 72 571.' +
    '4 72 512s11.6-117 34.5-171.2c22.2-52.4 53.9-99.4 94.3-139.9 40.4-4' +
    '0.4 87.5-72.2 139.9-94.3C395 83.6 452.6 72 512 72s117 11.6 171.2 3' +
    '4.5c52.4 22.2 99.4 53.9 139.9 94.3 40.4 40.4 72.2 87.5 94.3 139.9C' +
    '940.4 395 952 452.6 952 512s-11.6 117-34.5 171.2c-22.2 52.4-53.9 9' +
    '9.5-94.4 139.9z';
  const path2 =
    'M640.3 765.5c-19.9 0-36-16.1-36-36 0-50.9-41.4-92.3-92' +
    '.3-92.3s-92.3 41.4-92.3 92.3c0 19.9-16.1 36-36 36s-36-16.1-36-36c0' +
    '-90.6 73.7-164.3 164.3-164.3s164.3 73.7 164.3 164.3c0 19.9-16.1 36' +
    '-36 36zM194.2 382.4a60 60 0 1 0 120 0 60 60 0 1 0-120 0zM709.5 382' +
    '.4a60 60 0 1 0 120 0 60 60 0 1 0-120 0z';
  return (
    <svg
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 1024 1024"
      style={{ verticalAlign: '-.125em' }}
    >
      <path d={path1} />
      <path d={path2} />
    </svg>
  );
}
const icons = {
  finish: getFinishIcon(),
  error: getErrorIcon(),
};
// const steps = [{
//   title:"Step 1",
//   description: "Download MetaMask Wallet and Singup/Signin to open your account"
// },
// {
//   title : "Step 2",
//   description: "Select your Currency and Pay to the below Merchant"
// },
// {title : "Step 3",  description: "Go to pancake exhange swap to exchange your currency to AntNet (ANTEAG)"},
// {
//   title : "Step 4"
// }]

const useStyles = makeStyles((theme) => ({
  root: {

    backgroundColor: theme.palette.background.paper,
  },
}));

let context;
let upis = ['anteagle.tech@icici']
const tempupi = upis[0]
const all_socket = new WebSocket(`wss://stream.binance.com:9443/ws/!miniTicker@arr`);


function App() {
  const [users_USDT,setUsers_USDT]= React.useState([])
  const [users_BTC,setUsers_BTC]= React.useState([])
  const [users_BNB,setUsers_BNB]= React.useState([])
  const [users_ETH,setUsers_ETH]= React.useState([])
  const [value,setValue] =React.useState(2) 
  const [users_INRD,setUsers_INRD]= React.useState([])
  const [users_ANTEAG,setUsers_ANTEAG]= React.useState([])
  
  const[visible,setVisible ]=React.useState(localStorage.getItem("bank") ? true : false) 
  const [visible_1 ,setVisible_1]=React.useState(localStorage.getItem("bank") ? false :true)
  const [loading,setLoading]=React.useState( true)
  const [upi,setUpi] =React.useState(null) 
  const [amount1,setAmount1] =React.useState(null)
  const [recieve,setReceive]=React.useState(null)
  const [orig_amount,setOrig_amount ]=React.useState(null) 
  const [ upi_buy,setUpi_buy] =React.useState(false)
  const [accnumber_1,setAccno_1] =React.useState('')
  const [acnumber_2,setAccno_2] =React.useState('')
  const [bankname,setBankname] =React.useState('')
  const [validity,setValidity] =React.useState(false)
  const [accname,setAccname] =React.useState('')
  const [ifsc,setIfsc] =React.useState('')
  const [curr,setCurr] =React.useState('INRD')
  const [reqpay,setReqpay] =React.useState(false)
  const [payment,setPayment] =React.useState(false)
  const [final1,setFinal1] =React.useState(null)
  const [antlive,setAntlive] =React.useState(0)
  const [currentStep,setCurrentStep] =React.useState(0)
  const [activeSteps,setActiveSteps] =React.useState(0)
  const [sendername,setSendername] =React.useState('')
  const [senderupi,setSenderupi] =React.useState('')
  
 
  
  const [bank,setban] = React.useState([])
  const [splitButtonOpen, setSplitButtonOpen] = React.useState(false);
  const [wallet,setwallet] = React.useState(true);
  const [amount,setamount] = React.useState(0)
  const [currency,setcurrency] = React.useState('');


  const [liveusd, setliveusd] = React.useState(0)
  const [ANTEAG, setANTEAG] = React.useState(0)
  const [from, setfrom] = React.useState("BTC")
  const [to, setto] = React.useState("ANTEAG")
  const [fromvalue, setfromvalue] = React.useState(0)
  const [tovalue, settovalue] = React.useState(0);
  const [enteredText, setEnteredText] = React.useState('');
  const [tocurr, settocurr] = React.useState(null);
  const [ETH, setETH] = React.useState(0)
  const [BNB, setBNB] = React.useState(0)
  const [BTC, setBTC] = React.useState(0)
  const [final, setfinal] = React.useState(0)

  const [deposit, setDeposit]=React.useState(false);
  const [withdraw,setWithdraw]=React.useState(false);
  const [swap,setSwap]=React.useState(false);
  const [home,sethome] = React.useState(true);
  const [portfolio,setportfolio] = React.useState(false)
  const types=["BUY","SELL"];
  const [activeB, setActiveB] =React.useState(true)
  const [activeE, setActiveE] =React.useState(true)
  const [buy,setBuy]=React.useState('Stop-limit')
  const [sell,setSell]=React.useState('Stop-limit')
  const [exit,setExit]=React.useState(false)
  const [ stop_buy_trig ,setStop_buy_trig]=React.useState(0);
  const [stop_buy_stop,setStop_buy_stop]=React.useState(0);
  const [stop_buy_amount,setStop_buy_amount]=React.useState(0);
  const [stopTake_sell_trig,setStopTake_sell_trig]=React.useState(0);
  const [stopTake_sell_amount,setStopTake_sell_amount]=React.useState(0);
  const [stopTake_sell_total,setStopTake_sell_total]=React.useState(0);

 
  const [buy_total_full ,setbuy_total_full]=React.useState(0);
  const [quant,setQuant]=React.useState([]);
  const [pricee,setPrice]=React.useState([]);
  const [finalQuants,setFinalQuants]=React.useState([]);
  const [finalPrices,setFinalPrices]=React.useState([]);
  const [trade_quantity,settrade_quantity]=React.useState(0);
  const [trade_price,settrade_price]=React.useState(0);
  const [age, setAge] = React.useState('');
  const [trade_symbol,settrade_symbol]=React.useState(0);
  const [trade_type,settrade_type]=React.useState(0);
  const [sell_quantity,setsell_quantity]=React.useState(0);
  const [continueselling,setcontinueselling] = React.useState(false)
  const [switchtrade,setswitchtrade] = React.useState(true)
  const [sell_price,setsell_price]=React.useState(0);
  const [width,setwidth] = React.useState(window.innerWidth)
  const [isOpen, setIsOpen] = React.useState(false);
  const [pair,setpair] = React.useState('BTC/USDT')
  const [tradingvalue,settradingvalue] = React.useState('BTCUSDT');
  const [buy_limit_amount,setbuy_limit_amount] = React.useState(0);
  const [coin_limit_amount,setcoin_limit_amount]=React.useState(0);
  const [buy_limit_price,setbuy_limit_price] = React.useState(0);
  const [buy_market_amount,setbuy_market_amount] = React.useState(0);
  const [buy_market_price,setbuy_market_price] = React.useState(0);
  const [ limit_buy_total,  setlimit_buy_total]=React.useState(0);
  const [market_buy_total,setmarket_buy_totol]=React.useState(0);
  const [sell_limit_price,setsell_limit_price] = React.useState(0);
  const [full_trade_sell,set_full_trade_sell] = React.useState(0)
  const [sell_limit_amount,setsell_limit_amount] = React.useState(0);

  const [sell_market_price,setsell_market_price] = React.useState(0);
  const [sell_market_amount,setsell_market_amount] = React.useState(0);
  const [sell_limit_total,  setsell_limit_total]=React.useState(0);
  const [sell_market_total,  setsell_market_total]=React.useState(0);
  const [valid,setvalid] = React.useState(true)
  const [valid_s,setvalid_s] = React.useState(true)
  const [btc_u_vol,setbtc_u_vol] = React.useState(0)
  const [btc_vol,setbtc_vol] = React.useState(0)
  const [eth_u_vol,seteth_u_vol] = React.useState(0)
  const [eth_vol,set_eth_vol] = React.useState(0)
  const [bnb_u_vol,setbnb_u_vol] = React.useState(0)
  const [bnb_vol,setbnb_vol] = React.useState(0)
  const [ant_u_vol,setant_u_vol] = React.useState(0)
  const [loadin_cont,setloadin_cont] = React.useState(false)
  const [ant_vol,setant_vol] = React.useState(0)
  const [live_vol,setlivevol] = React.useState(0)
  const [liveprice_BTC,setlive_BTC] = React.useState(0)
  const [liveprice_BTC_u,setlive_BTC_u] = React.useState(0)
  
  const [liveprice_KSM,setlive_KSM] = React.useState(0)
  const [liveprice_KSM_u,setlive_KSM_u] = React.useState(0)

  
  const [liveprice_ATA,setlive_ATA] = React.useState(0)
  const [liveprice_ATA_u,setlive_ATA_u] = React.useState(0)

  const [liveprice_MANA,setlive_MANA] = React.useState(0)
  const [liveprice_MANA_u,setlive_MANA_u] = React.useState(0)

  const [liveprice_DGB,setlive_DGB] = React.useState(0)
  const [liveprice_DGB_u,setlive_DGB_u] = React.useState(0)

  const [liveprice_FTM,setlive_FTM] = React.useState(0)
  const [liveprice_FTM_u,setlive_FTM_u] = React.useState(0)

  const [liveprice_ALICE,setlive_ALICE] = React.useState(0)
  const [liveprice_ALICE_u,setlive_ALICE_u] = React.useState(0)

  const [liveprice_GTC,setlive_GTC] = React.useState(0)
  const [liveprice_GTC_u,setlive_GTC_u] = React.useState(0)

  const [liveprice_MATIC,setlive_MATIC] = React.useState(0)
  const [liveprice_MATIC_u,setlive_MATIC_u] = React.useState(0)
  
  const [liveprice_AXS,setlive_AXS] = React.useState(0)
  const [liveprice_AXS_u,setlive_AXS_u] = React.useState(0)
  
  const [liveprice_FTT,setlive_FTT] = React.useState(0)
  const [liveprice_FTT_u,setlive_FTT_u] = React.useState(0)
  
  const [liveprice_SOL,setlive_SOL] = React.useState(0)
  const [liveprice_SOL_u,setlive_SOL_u] = React.useState(0)
  
  const [liveprice_RUNE,setlive_RUNE] = React.useState(0)
  const [liveprice_RUNE_u,setlive_RUNE_u] = React.useState(0)
  
  const [liveprice_UNI,setlive_UNI] = React.useState(0)
  const [liveprice_UNI_u,setlive_UNI_u] = React.useState(0)

  const [liveprice_DOT,setlive_DOT] = React.useState(0)
  const [liveprice_DOT_u,setlive_DOT_u] = React.useState(0)
  
  const [liveprice_VET,setlive_VET] = React.useState(0)
  const [liveprice_VET_u,setlive_VET_u] = React.useState(0)
  
  const [liveprice_TFUEL,setlive_TFUEL] = React.useState(0)
  const [liveprice_TFUEL_u,setlive_TFUEL_u] = React.useState(0)

  const [liveprice_GRT,setlive_GRT] = React.useState(0)
  const [liveprice_GRT_u,setlive_GRT_u] = React.useState(0)

  const [liveprice_ADA,setlive_ADA] = React.useState(0)
  const [liveprice_ADA_u,setlive_ADA_u] = React.useState(0)

  const [liveprice_FIL,setlive_FIL] = React.useState(0)
  const [liveprice_FIL_u,setlive_FIL_u] = React.useState(0)

  const [liveprice_LINK,setlive_LINK] = React.useState(0)
  const [liveprice_LINK_u,setlive_LINK_u] = React.useState(0)
  
  const [liveprice_LUNA,setlive_LUNA] = React.useState(0)
  const [liveprice_LUNA_u,setlive_LUNA_u] = React.useState(0)

  const [liveprice_THETA,setlive_THETA] = React.useState(0)
  const [liveprice_THETA_u,setlive_THETA_u] = React.useState(0)
  
  
  const [liveprice_BNB_u,setlive_BNB_u] = React.useState(0)
  const [liveprice_BNB,setlive_BNB] = React.useState(0)
  const [liveprice_ETH,setlive_ETH] = React.useState(0)
  const [liveprice_ETH_u,setlive_ETH_u] = React.useState(0)
  const [liveprice_ANTEAG,setlive_ANTEAG] = React.useState(0)
  const [liveprice_ANTEAG_u,setlive_ANTEAG_u] = React.useState(0)
  const [liveprice,setlive] = React.useState(0)
  const [conversion,setconversion] = React.useState(0);
  const [curr_quant,setcurr] = React.useState(0)
  const [bought_price,set_bought_price] = React.useState()
  const [myorders,setmyorder] = React.useState([]);
  const [fillorders,setfillorders] = React.useState([])
  const [book,setbook] = React.useState([]);
  const [book_s,setbook_s] = React.useState([]);
  const [port,setport] = React.useState(false)
  const [c_order,setc_order] = React.useState([]);
 const toggle = () => setIsOpen(!isOpen);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  all_socket.onmessage = evt => {
    const g = JSON.parse(evt.data)
    for(let i=0;i<g.length;i++){
      if(g[i]["s"] == "BTCUSDT"){
       setlive_BTC(parseFloat(g[i]["c"]).toFixed(2))
       
      }
      if(g[i]["s"] == "BNBUSDT"){
        setlive_BNB(parseFloat(g[i]["c"]).toFixed(2))
       
      }
      if(g[i]["s"] == "ETHUSDT"){
        setlive_ETH(parseFloat(g[i]["c"]).toFixed(2))
       
      }
      if(g[i]["s"]=="KSMUSDT"){
        setlive_KSM(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="ATAUSDT"){
        setlive_ATA(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="MANAUSDT"){
        setlive_MANA(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="FTMUSDT"){
        setlive_FTM(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="DGBUSDT"){
        setlive_DGB(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="ALICEUSDT"){
        setlive_ALICE(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="GTCUSDT"){
        setlive_GTC(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="MATICUSDT"){
        setlive_MATIC(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="AXSUSDT"){
        setlive_AXS(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="FTTUSDT"){
        setlive_FTT(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="SOLUSDT"){
        setlive_SOL(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="RUNEUSDT"){
        setlive_RUNE(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="UNIUSDT"){
        setlive_UNI(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="DOTUSDT"){
        setlive_DOT(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="VETUSDT"){
        setlive_VET(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="TFUELUSDT"){
        setlive_TFUEL(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="GRTUSDT"){
        setlive_GRT(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="ADAUSDT"){
        setlive_ADA(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="FILUSDT"){
        setlive_FIL(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="LINKUSDT"){
        setlive_LINK(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="LUNAUSDT"){
        setlive_LUNA(parseFloat(g[i]["c"]).toFixed(2))
      }
      if(g[i]["s"]=="THETAUSDT"){
        setlive_THETA(parseFloat(g[i]["c"]).toFixed(2))
      }
  
  
    }
  }  
    
  useEffect(()=>{ 
     
    setInterval(()=>{
     
    axios({
      method:"get",
      url: "https://api.exchangerate.host/convert?from=USD&to=INR"
    }).then(res=>{
      localStorage.setItem("conversion",res.data.info.rate)
      setconversion(res.data.info.rate)
      if(pair == "ANTEAG/USDT"){
        setlive(parseFloat(8.08*conversion).toFixed(2))
        setlive_ANTEAG_u(parseFloat(8.08/conversion).toFixed(2))
      }
      if(pair == "ANTEAG/INRD"){
        setlive(8.08)
        setlive_ANTEAG(8.08)
      }
     
    })

    axios({
      method:"get",
      url: "https://api.exchangerate.host/convert?from=USD&to=INR"
    }).then(res=>{
      //console.log(res.data.info.rate)
      setliveusd(res.data.info.rate)
    })

    axios({
      method: 'get',
      url: `https://api.anteagle.tech/liveprice?pair=ANTEAG/USDT`
    }).then(res => {
      if (res.data[0]) {
        setANTEAG(res.data[0].price)
      }

    })

    axios({
      method : "get",
      url : `https://api.anteagle.tech/bankdetails?userid=${localStorage.getItem("userid")}`,
      headers : {
          'Accept' : "Application/json",
          'Content-type' : "Application/JSON"
      }
  }).then(res=>{
      setban(res.data.res[0])
      console.log(res.data.res[0])
  })
   
  },1000)

      
  
},[])
 
useEffect(()=>{
  am4core.ready(function() {
    
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    var chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    
    chart.legend = new am4charts.Legend();
    
    chart.data = [
      {
        country: "Bitcoin (BTC)",
        litres: 52
      },
      {
        country: "Ethereum (ETH)",
        litres: 90
      },
      {
        country: "Binance (BNB)",
        litres: 201.1
      },
      {
        country: "Automata (ATA)",
        litres: 165.8
      },
      {
        country: "Cardano (ADA)",
        litres: 139.9
      },
      {
        country: "Polkadot (DOT)",
        litres: 128.3
      },
      {
        country: "Axies (AXS)",
        litres: 99
      },
      {
        country: "Gitcoin (GTC)",
        litres: 60
      },
      {
        country: "Decentraland (MANA)",
        litres: 50
      }
    ];
    
    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";
    }); 
},[])

const notificationAlertRef = React.useRef(null);
    const notify = (place) => {
      var color = Math.floor(Math.random() * 5 + 1);
      var type;
      switch (color) {
        case 1:
          type = "primary";
          break;
        case 2:
          type = "success";
          break;
        case 3:
          type = "danger";
          break;
        case 4:
          type = "warning";
          break;
        case 5:
          type = "info";
          break;
        default:
          break;
      }
      var options = {};
      options = {
        place: place,
        message: (
          <div>
            <div>
            Successfully Copied to Clipboard
            </div>
          </div>
        ),
        type: type,
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7,
      };
      notificationAlertRef.current.notificationAlert(options);
    };
     
   


   

  return (
  <>
    <Navbar bg="light" expand="lg" style={{padding:"20px"}}>
    <img src={logo} style={{height:"70px",width:"70px"}}></img>{"   "}
       <Navbar.Brand href="#home" style={{fontFamily:"Strasua",marginLeft:"10px"}}>Anteagle Exchange</Navbar.Brand>
      <Navbar.Toggle />


      <Navbar.Collapse className="justify-content-center"  >
          <Nav.Link href="#home" onClick={()=>{
            sethome(true)
            setportfolio(false)
            setSwap(false)
            setWithdraw(false)
          }}>Home</Nav.Link>
          <Nav.Link href="#home" onClick={()=>{
            sethome(false)
            setportfolio(false)
            setWithdraw(false)
            setSwap(true)
          }}>Swap</Nav.Link>
          <Nav.Link href="#home" onClick={()=>{
            sethome(false)
            setportfolio(false)
            setSwap(false)
            setWithdraw(false)
          }}
          >Add Asset</Nav.Link>
          <Nav.Link href="#home"  onClick={()=>{
            sethome(false)
            setportfolio(false)
            setSwap(false)
            setWithdraw(true)
          }}>Withdraw Asset</Nav.Link>
          <Nav.Link href="#link" onClick={()=>{
            sethome(false)
            setportfolio(true)
            setSwap(false)
            setWithdraw(false)
          }}>Wallet  </Nav.Link>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end"  >
        <span style={{paddingRight:"50px"}}>

        </span>
       
      <Button style={{backgroundColor:"green", marginRight:'1rem'}}>Add INR </Button>
        {"   "}
        <Button color="secondary">Report a Problem</Button>
      
       <Nav.Link onClick={()=>{
        document.body.classList.remove("white-content")
      }}><img src="https://img.icons8.com/ios-glyphs/24/000000/twitter--v2.png"/></Nav.Link>
       <Nav.Link onClick={()=>{
        document.body.classList.remove("white-content")
      }}><img src="https://img.icons8.com/ios-filled/24/000000/telegram-app.png"/></Nav.Link>
      <Nav.Link onClick={()=>{
        document.body.classList.remove("white-content")
      }}><img src="https://img.icons8.com/material-outlined/24/000000/settings--v3.png"/></Nav.Link>
      </Navbar.Collapse>
    
  </Navbar>
{ home ? <div className="row" style={{paddingRight:"20px",marginLeft:"20px"}}>

<div class="tabs" style={{width:"20%"}}>
      <Row >
      <Tabs > 
        <TabList >
          <Tab>Single Trade</Tab> 
          <Tab>Full Trade</Tab>
        </TabList>
        <TabPanel>
        <ButtonGroup >
          <Button  size="lg"  className="bg-success"  style={{paddingRight:"2rem",paddingLeft:"2rem"}} onClick={()=>{
         setActiveB(true)
         
       }}>
        BUY
       </Button>
       
          <Button size="lg" className="bg-dark" style={{paddingRight:"2rem",paddingLeft:"2rem"}}  onClick={()=>{
            setActiveB(false)
         
           }}>
        SELL
       </Button>
       </ButtonGroup>
{/* 
       <ToggleButtonGroup type="checkbox" >
      <ToggleButton  size="lg" id="tbg-btn-1" value={1} onClick={()=>{
         setActiveB(true)
      }}>
        Option 1
      </ToggleButton>
      <ToggleButton size="lg"  id="tbg-btn-2" value={2} onClick={()=>{
         setActiveB(false)
      }}>
        Option 2
      </ToggleButton>
      </ToggleButtonGroup> */}
         
     
      {activeB?<>
        
        <Tabs>
          <TabList  style={{fontSize:"0.8rem"}}>
            <Tab>Limit</Tab>
            <Tab>Market</Tab>
            <Tab>Stop-limit
           
            {/* <Select  style={{fontSize:"0.79rem"}} id="select"  value={buy}
          onChange={(e)=>{
            
            setBuy(e.target.value)
          }}>
              <MenuItem value={'Stop-limit'}>Stop-limit</MenuItem>
              <MenuItem value={'Stop-market'}>Stop-market</MenuItem>
            </Select> */}
            </Tab>
           
          </TabList>
          <TabPanel>
            
              
            <Form>
              <Label>Price ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Label>
              <Input  onChange={(event)=>{
      setbuy_limit_price(parseFloat(event.target.value) )

    }} placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`}></Input>

           

              <Label>Amount ({`${pair.substr(0,pair.indexOf('/'))}`})</Label>
              <Input invalid={!valid} style={{color:"black"}} placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} disabled={true} value={buy_limit_amount} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
     if(parseFloat(event.target.value*buy_limit_price)>parseFloat(localStorage.getItem(curr))){
      setvalid(false)
     }
     else{
      setvalid(true)
      // setlimit_buy_total(parseFloat(event.target.value)*parseFloat(buy_limit_price))
     }
      
    }}></Input>

       

              <Label>Total ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Label>
              <Input invalid={!valid} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
      
     if(parseFloat(event.target.value)>parseFloat(localStorage.getItem(curr))){
        setvalid(false)
     }
     else{
      setvalid(true)
    
      setbuy_limit_amount(parseFloat(parseFloat(event.target.value) /parseFloat(buy_limit_price)) )
     }
      
    }}></Input>

              {/* <div>
     
      <br />
      <InputGroup>
        <InputGroupAddon addonType="prepend">Price</InputGroupAddon>
        <Input />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon addonType="prepend">Amount</InputGroupAddon>
        <Input />
      </InputGroup>
    </div> */}

              <Button size="lg" className="bg-success" style={{margin:"2rem 0 2rem 0",display:"block",width:"100%"}}>Buy {`${pair.substr(0,pair.indexOf('/'))}`}</Button>
            </Form>
            
          </TabPanel>
          
         
          <TabPanel>
          <Form>
              <Label>Price  ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Label>
              <Input placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} value={pair == "BTC/USDT" ? liveprice_BTC : pair == "BTC/INRD" ? parseFloat(liveprice_BTC*conversion).toFixed(2) : pair == "ETH/USDT" ? liveprice_ETH : pair == "ETH/INRD" ? parseFloat(liveprice_ETH*conversion).toFixed(2) : pair == "BNB/USDT" ? liveprice_BNB : pair == "BNB/INRD" ? parseFloat(liveprice_BNB*conversion).toFixed(2) : pair == "KSM/USDT" ? liveprice_KSM : pair == "KSM/INRD" ? parseFloat(liveprice_KSM*conversion).toFixed(2) : pair =="ATA/USDT"? liveprice_ATA : pair=="ATA/INRD" ? parseFloat(liveprice_ATA*conversion).toFixed(2) : pair=="MANA/USDT"? liveprice_MANA : pair=="MANA/INRD" ? parseFloat(liveprice_MANA*conversion).toFixed(2) : pair=="DGB/USDT"?liveprice_DGB: pair=="DGB/INRD"? parseFloat(liveprice_DGB*conversion).toFixed(2) : pair=="FTM/USDT"?liveprice_FTM: pair=="FTM/INRD"? parseFloat(liveprice_FTM*conversion).toFixed(2) : pair=="ALICE/USDT"?liveprice_ALICE: pair=="ALICE/INRD"? parseFloat(liveprice_ALICE*conversion).toFixed(2) : pair=="GTC/USDT"?liveprice_GTC: pair=="GTC/INRD"? parseFloat(liveprice_GTC*conversion).toFixed(2) : pair=="MATIC/USDT"?liveprice_MATIC: pair=="MATIC/INRD"? parseFloat(liveprice_MATIC*conversion).toFixed(2):pair=="AXS/USDT"?liveprice_AXS: pair=="AXS/INRD"? parseFloat(liveprice_AXS*conversion).toFixed(2): pair=="FTT/USDT"?liveprice_FTT: pair=="FTT/INRD"? parseFloat(liveprice_FTT*conversion).toFixed(2) :pair=="SOL/USDT"?liveprice_SOL: pair=="SOL/INRD"? parseFloat(liveprice_SOL*conversion).toFixed(2) :pair=="RUNE/USDT"?liveprice_RUNE: pair=="RUNE/INRD"? parseFloat(liveprice_RUNE*conversion).toFixed(2) :pair=="UNI/USDT"?liveprice_UNI: pair=="UNI/INRD"? parseFloat(liveprice_UNI*conversion).toFixed(2):pair=="DOT/USDT"?liveprice_DOT: pair=="DOT/INRD"? parseFloat(liveprice_DOT*conversion).toFixed(2) :pair=="VET/USDT"?liveprice_VET: pair=="VET/INRD"? parseFloat(liveprice_VET*conversion).toFixed(2):pair=="TFUEL/USDT"?liveprice_TFUEL: pair=="TFUEL/INRD"? parseFloat(liveprice_TFUEL*conversion).toFixed(2):pair=="GRT/USDT"?liveprice_GRT: pair=="GRT/INRD"? parseFloat(liveprice_GRT*conversion).toFixed(2):pair=="ADA/USDT"?liveprice_ADA: pair=="ADA/INRD"? parseFloat(liveprice_ADA*conversion).toFixed(2):pair=="FIL/USDT"?liveprice_FIL: pair=="FIL/INRD"? parseFloat(liveprice_FIL*conversion).toFixed(2):pair=="LINK/USDT"?liveprice_LINK: pair=="LINK/INRD"? parseFloat(liveprice_LINK*conversion).toFixed(2):pair=="LUNA/USDT"?liveprice_LUNA: pair=="LUNA/INRD"? parseFloat(liveprice_LUNA*conversion).toFixed(2):pair=="THETA/USDT"?liveprice_THETA: parseFloat(liveprice_THETA*conversion).toFixed(2)} disabled onChange={(event)=>{
                setbuy_market_price(event.target.value)
                
               

              }}></Input>

           

              <Label>Amount ({`${pair.substr(0,pair.indexOf('/'))}`})</Label>
              <Input disabled={true} style={{color:"black"}} placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} value={buy_market_amount} onChange={(event)=>{
     
    }} placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`}></Input>

     

              <Label>Total  ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Label>
              <Input invalid={!valid} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
    setbuy_market_price(parseFloat(pair == "BTC/USDT" ? liveprice_BTC : pair == "BTC/INRD" ? parseFloat(liveprice_BTC*conversion).toFixed(2) : pair == "ETH/USDT" ? liveprice_ETH : pair == "ETH/INRD" ? parseFloat(liveprice_ETH*conversion).toFixed(2) : pair == "BNB/USDT" ? liveprice_BNB : pair == "BNB/INRD" ? parseFloat(liveprice_BNB*conversion).toFixed(2) : pair == "KSM/USDT" ? liveprice_KSM : pair == "KSM/INRD" ? parseFloat(liveprice_KSM*conversion).toFixed(2) : pair =="ATA/USDT"? liveprice_ATA : pair=="ATA/INRD" ? parseFloat(liveprice_ATA*conversion).toFixed(2) : pair=="MANA/USDT"? liveprice_MANA : pair=="MANA/INRD" ? parseFloat(liveprice_MANA*conversion).toFixed(2) : pair=="DGB/USDT"?liveprice_DGB: pair=="DGB/INRD"? parseFloat(liveprice_DGB*conversion).toFixed(2) : pair=="FTM/USDT"?liveprice_FTM: pair=="FTM/INRD"? parseFloat(liveprice_FTM*conversion).toFixed(2) : pair=="ALICE/USDT"?liveprice_ALICE: pair=="ALICE/INRD"? parseFloat(liveprice_ALICE*conversion).toFixed(2) : pair=="GTC/USDT"?liveprice_GTC: pair=="GTC/INRD"? parseFloat(liveprice_GTC*conversion).toFixed(2) : pair=="MATIC/USDT"?liveprice_MATIC: pair=="MATIC/INRD"? parseFloat(liveprice_MATIC*conversion).toFixed(2):pair=="AXS/USDT"?liveprice_AXS: pair=="AXS/INRD"? parseFloat(liveprice_AXS*conversion).toFixed(2): pair=="FTT/USDT"?liveprice_FTT: pair=="FTT/INRD"? parseFloat(liveprice_FTT*conversion).toFixed(2) :pair=="SOL/USDT"?liveprice_SOL: pair=="SOL/INRD"? parseFloat(liveprice_SOL*conversion).toFixed(2) :pair=="RUNE/USDT"?liveprice_RUNE: pair=="RUNE/INRD"? parseFloat(liveprice_RUNE*conversion).toFixed(2) :pair=="UNI/USDT"?liveprice_UNI: pair=="UNI/INRD"? parseFloat(liveprice_UNI*conversion).toFixed(2):pair=="DOT/USDT"?liveprice_DOT: pair=="DOT/INRD"? parseFloat(liveprice_DOT*conversion).toFixed(2) :pair=="VET/USDT"?liveprice_VET: pair=="VET/INRD"? parseFloat(liveprice_VET*conversion).toFixed(2):pair=="TFUEL/USDT"?liveprice_TFUEL: pair=="TFUEL/INRD"? parseFloat(liveprice_TFUEL*conversion).toFixed(2):pair=="GRT/USDT"?liveprice_GRT: pair=="GRT/INRD"? parseFloat(liveprice_GRT*conversion).toFixed(2):pair=="ADA/USDT"?liveprice_ADA: pair=="ADA/INRD"? parseFloat(liveprice_ADA*conversion).toFixed(2):pair=="FIL/USDT"?liveprice_FIL: pair=="FIL/INRD"? parseFloat(liveprice_FIL*conversion).toFixed(2):pair=="LINK/USDT"?liveprice_LINK: pair=="LINK/INRD"? parseFloat(liveprice_LINK*conversion).toFixed(2):pair=="LUNA/USDT"?liveprice_LUNA: pair=="LUNA/INRD"? parseFloat(liveprice_LUNA*conversion).toFixed(2):pair=="THETA/USDT"?liveprice_THETA: parseFloat(liveprice_THETA*conversion).toFixed(2)))
     if(parseFloat(event.target.value)>parseFloat(localStorage.getItem(curr))){
      setvalid(false)
      
     }
     else{
      setvalid(true)
    
      setbuy_market_amount(parseFloat(event.target.value)/parseFloat(buy_market_price))
      
     }
      
    }}></Input>

              <Button size="lg" className="bg-success" style={{margin:"2rem 0 2rem 0",display:"block",width:"100%"}}>Buy {`${pair.substr(0,pair.indexOf('/'))}`}</Button>
            </Form>
          </TabPanel>
          <TabPanel>
              <Form style={{marginBottom:"1rem"}}>
                <Label>Trigger Price ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Label>
                <Input onChange={(event)=>{
      // setbuy_limit_price(parseFloat(event.target.value)  
      setStop_buy_trig(parseFloat(event.target.value) )

    }} placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`}></Input>

<Label>Stop Price ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Label>
                <Input onChange={(event)=>{
      // setbuy_limit_price(parseFloat(event.target.value)  
      setStop_buy_stop(parseFloat(event.target.value) )

    }} placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`}></Input>


                <Label>Amount ({`${pair.substr(0,pair.indexOf('/'))}`})</Label>
                <Input invalid={!valid} style={{color:"black"}} placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} disabled={true} value={stop_buy_amount} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
     if(parseFloat(event.target.value*stop_buy_trig)>parseFloat(localStorage.getItem(curr))){
      setvalid(false)
     }
     else{
      setvalid(true)
      // setlimit_buy_total(parseFloat(event.target.value)*parseFloat(buy_limit_price))
     }
      
    }}></Input>

                <Label>Total  ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Label>
                <Input  invalid={!valid} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
      
     if(parseFloat(event.target.value)>parseFloat(localStorage.getItem(curr))){
        setvalid(false)
     }
     else{
      setvalid(true)
    
      setStop_buy_amount(parseFloat(parseFloat(event.target.value) /parseFloat(stop_buy_trig)) )
     }
      
    }}></Input>

                <Button size="lg" className="bg-success" style={{margin:"2rem 0 2rem 0",display:"block",width:"100%"}}>Buy {`${pair.substr(0,pair.indexOf('/'))}`}</Button>
              </Form>
          </TabPanel>
      
        </Tabs>
        
       
      </>:
      <Tabs>
          <TabList style={{fontSize:"0.8rem"}}>
            <Tab>Limit</Tab>
            <Tab>Market</Tab>
            <Tab>Take-profit-market
            {/* <Select  style={{fontSize:"0.76rem"}} id="select"  value={sell}
          onChange={(e)=>{
            
            setSell(e.target.value)
          }}>
              <MenuItem value={'Stop-limit'}>Stop-limit</MenuItem>
              <MenuItem value={'Stop-market'}>Stop-market</MenuItem>
              <MenuItem value={'Take-Profit-Limit'}>Take-Profit-Limit</MenuItem>
              <MenuItem value={'Take-Profit-Market'}>Take-Profit-Market</MenuItem>
            </Select> */}
           </Tab>
            
            
          </TabList>
          <TabPanel>
         
            <Form>
              <Label>Price  ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Label>
              <Input placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      setStopTake_sell_trig(parseFloat(event.target.value))
    }}></Input>

           

              <Label>Amount ({`${pair.substr(0,pair.indexOf('/'))}`})</Label>
              <Input invalid={!valid_s} placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} value={stopTake_sell_amount} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
      if(parseFloat(event.target.value) > parseFloat(localStorage.getItem(curr))){
        setvalid_s(false)
      }
      else{
        setvalid_s(true)
        setStopTake_sell_amount(parseFloat(event.target.value))
      }
      
    }}></Input>

              <Slider
        defaultValue={30}
        getAriaValueText={(value)=>{
          const g = parseFloat(localStorage.getItem(`${pair.substr(0,pair.indexOf('/'))}`)*value/100).toFixed(5) 
          setStopTake_sell_amount(parseFloat(localStorage.getItem(`${pair.substr(0,pair.indexOf('/'))}`)*value/100).toFixed(5))
          setStopTake_sell_total(g*stopTake_sell_trig)
        }}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={100}
      />

              <Label>Total  ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Label>
              <Input invalid={!valid_s} disabled={true}  style={{color:"black"}} value={stopTake_sell_total} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf("/")+1,pair.length)}`} onChange={(event)=>{
      const curr = `${pair.substr(0,pair.indexOf('/'))}_Coins`
      const curdebt = `${pair.substr(0,pair.indexOf('/'))}_Debt`
      

     if(parseFloat(parseFloat(event.target.value)/parseFloat(stopTake_sell_trig))>parseFloat(localStorage.getItem(curr))){
        // alert("do you want to transact");
       const debt=parseFloat(localStorage.getItem(curr) )- parseFloat(event.target.value*stopTake_sell_trig);
       if(localStorage.getItem(curdebt) +debt > -9999  )
        localStorage.setItem( curdebt,localStorage.getItem(curdebt) +debt );
        //console.log(localStorage.getItem(curdebt) +debt);
        
        setvalid_s(false)
     }
     else{
      setvalid_s(true)
      // setsell_limit_amount(parseFloat(event.target.value)/parseFloat(sell_limit_price))
     }
      
    }}></Input>

              <Button size="lg"  className="bg-dark"  style={{margin:"2rem 0 2rem 0",display:"block",width:"100%"}}>Sell {`${pair.substr(0,pair.indexOf('/'))}`}</Button>
            </Form>
          </TabPanel>
          <TabPanel>
          <Form>
              <Label>Price  ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Label>
              <Input  placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} value={pair == "BTC/USDT" ? liveprice_BTC : pair == "BTC/INRD" ? parseFloat(liveprice_BTC*conversion).toFixed(2) : pair == "ETH/USDT" ? liveprice_ETH : pair == "ETH/INRD" ? parseFloat(liveprice_ETH*conversion).toFixed(2) : pair == "BNB/USDT" ? liveprice_BNB : pair == "BNB/INRD" ? parseFloat(liveprice_BNB*conversion).toFixed(2) : pair == "KSM/USDT" ? liveprice_KSM : pair == "KSM/INRD" ? parseFloat(liveprice_KSM*conversion).toFixed(2) : pair =="ATA/USDT"? liveprice_ATA : pair=="ATA/INRD" ? parseFloat(liveprice_ATA*conversion).toFixed(2) : pair=="MANA/USDT"? liveprice_MANA : pair=="MANA/INRD" ? parseFloat(liveprice_MANA*conversion).toFixed(2) : pair=="DGB/USDT"?liveprice_DGB: pair=="DGB/INRD"? parseFloat(liveprice_DGB*conversion).toFixed(2) : pair=="FTM/USDT"?liveprice_FTM: pair=="FTM/INRD"? parseFloat(liveprice_FTM*conversion).toFixed(2) : pair=="ALICE/USDT"?liveprice_ALICE: pair=="ALICE/INRD"? parseFloat(liveprice_ALICE*conversion).toFixed(2) : pair=="GTC/USDT"?liveprice_GTC: pair=="GTC/INRD"? parseFloat(liveprice_GTC*conversion).toFixed(2) : pair=="MATIC/USDT"?liveprice_MATIC: pair=="MATIC/INRD"? parseFloat(liveprice_MATIC*conversion).toFixed(2):pair=="AXS/USDT"?liveprice_AXS: pair=="AXS/INRD"? parseFloat(liveprice_AXS*conversion).toFixed(2): pair=="FTT/USDT"?liveprice_FTT: pair=="FTT/INRD"? parseFloat(liveprice_FTT*conversion).toFixed(2) :pair=="SOL/USDT"?liveprice_SOL: pair=="SOL/INRD"? parseFloat(liveprice_SOL*conversion).toFixed(2) :pair=="RUNE/USDT"?liveprice_RUNE: pair=="RUNE/INRD"? parseFloat(liveprice_RUNE*conversion).toFixed(2) :pair=="UNI/USDT"?liveprice_UNI: pair=="UNI/INRD"? parseFloat(liveprice_UNI*conversion).toFixed(2):pair=="DOT/USDT"?liveprice_DOT: pair=="DOT/INRD"? parseFloat(liveprice_DOT*conversion).toFixed(2) :pair=="VET/USDT"?liveprice_VET: pair=="VET/INRD"? parseFloat(liveprice_VET*conversion).toFixed(2):pair=="TFUEL/USDT"?liveprice_TFUEL: pair=="TFUEL/INRD"? parseFloat(liveprice_TFUEL*conversion).toFixed(2):pair=="GRT/USDT"?liveprice_GRT: pair=="GRT/INRD"? parseFloat(liveprice_GRT*conversion).toFixed(2):pair=="ADA/USDT"?liveprice_ADA: pair=="ADA/INRD"? parseFloat(liveprice_ADA*conversion).toFixed(2):pair=="FIL/USDT"?liveprice_FIL: pair=="FIL/INRD"? parseFloat(liveprice_FIL*conversion).toFixed(2):pair=="LINK/USDT"?liveprice_LINK: pair=="LINK/INRD"? parseFloat(liveprice_LINK*conversion).toFixed(2):pair=="LUNA/USDT"?liveprice_LUNA: pair=="LUNA/INRD"? parseFloat(liveprice_LUNA*conversion).toFixed(2):pair=="THETA/USDT"?liveprice_THETA: parseFloat(liveprice_THETA*conversion).toFixed(2)} disabled style={{color:"black"}} onChange={(event)=>{
      setsell_market_amount(parseFloat(event.target.value))
    }}></Input>

           

              <Label>Amount ({`${pair.substr(0,pair.indexOf('/'))}`})</Label>
              <Input  placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} value={sell_market_amount} onChange={(event)=>{
      setsell_market_amount(parseFloat(event.target.value))
    }}></Input>

              <Slider
        defaultValue={30}
        getAriaValueText={(value)=>{
        }}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={100}
      />

              <Label>Total  ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Label>
              <Input  invalid={!valid_s} value={sell_market_total} disabled={true} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf("/")+1,pair.length)}`} style={{color : "black"}}onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
      const curdebt = `${pair.substr(0,pair.indexOf('/'))}_Debt`
     if((parseFloat(event.target.value)/parseFloat(sell_market_price))>localStorage.getItem(curr)){
      setvalid_s(false)
     }
     else{
      setvalid_s(true)
      // setsell_market_amount(parseFloat(event.target.value)/parseFloat(sell_market_price))
     }
      
    }}></Input>

              <Button size="lg" className="bg-dark"  style={{margin:"2rem 0 2rem 0",display:"block",width:"100%"}}>Sell {`${pair.substr(0,pair.indexOf('/'))}`}</Button>
            </Form>
          </TabPanel>
          <TabPanel>
          <Form style={{marginBottom:"1rem"}}>
                <Label>Trigger Price ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Label>
                <Input placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      setsell_limit_price(parseFloat(event.target.value))
    }}></Input>

              

                <Label>Amount ({`${pair.substr(0,pair.indexOf('/'))}`})</Label>
                <Input invalid={!valid_s} placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} value={sell_limit_amount} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
      if(parseFloat(event.target.value) > parseFloat(localStorage.getItem(curr))){
        setvalid_s(false)
      }
      else{
        setvalid_s(true)
        setsell_limit_amount(parseFloat(event.target.value))
      }
      
    }}></Input>

<Slider
        defaultValue={30}
        getAriaValueText={(value)=>{
          const g = parseFloat(localStorage.getItem(`${pair.substr(0,pair.indexOf('/'))}`)*value/100).toFixed(5) 
          setsell_limit_amount(parseFloat(localStorage.getItem(`${pair.substr(0,pair.indexOf('/'))}`)*value/100).toFixed(5))
          setsell_limit_total(g*sell_limit_price)
        }}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={100}
      />


                <Label>Total  ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Label>
                <Input invalid={!valid_s} disabled={true}  style={{color:"black"}} value={sell_limit_total} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf("/")+1,pair.length)}`} onChange={(event)=>{
      const curr = `${pair.substr(0,pair.indexOf('/'))}_Coins`
      const curdebt = `${pair.substr(0,pair.indexOf('/'))}_Debt`
      

     if(parseFloat(parseFloat(event.target.value)/parseFloat(sell_limit_price))>parseFloat(localStorage.getItem(curr))){
        // alert("do you want to transact");
       const debt=parseFloat(localStorage.getItem(curr) )- parseFloat(event.target.value*buy_limit_price);
       if(localStorage.getItem(curdebt) +debt > -9999  )
        localStorage.setItem( curdebt,localStorage.getItem(curdebt) +debt );
        //console.log(localStorage.getItem(curdebt) +debt);
        
        setvalid_s(false)
     }
     else{
      setvalid_s(true)
      // setsell_limit_amount(parseFloat(event.target.value)/parseFloat(sell_limit_price))
     }
      
    }}></Input>

                <Button size="lg" className="bg-dark" style={{margin:"2rem 0 2rem 0",display:"block",width:"100%"}}>Sell {`${pair.substr(0,pair.indexOf('/'))}`}</Button>
              </Form>
          </TabPanel>
        </Tabs>
        }
       

       
        </TabPanel>
        <TabPanel>
            {!exit? 
                <> 
                <p style={{fontSize:"1.1rem",fontWeight:"400"}}>1.Entry Order</p>
              <Tabs>
          <TabList style={{fontSize:"0.8rem",marginTop:"-1rem"}}>
            <Tab>Limit</Tab>
            <Tab>Market</Tab>
           
            
            
          </TabList>
          <TabPanel>
              <Form style={{marginBottom:"1rem"}}>
              <Label>Price ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Label>
              <Input onChange={(event)=>{
      setbuy_limit_price(parseFloat(event.target.value) )
      var tempPrice=pricee;
      tempPrice.push(event.target.value);
      setPrice(tempPrice);

    }} placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`}></Input>

           

              <Label>Amount ({`${pair.substr(0,pair.indexOf('/'))}`})</Label>
              <Input  invalid={!valid}  style={{color:"black"}} disabled={true} placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} value={buy_limit_amount} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
     if(parseFloat(event.target.value*buy_limit_price)>parseFloat(localStorage.getItem(curr))){
      setvalid(false)
     }
     else{
      setvalid(true)
      //setbuy_limit_amount(parseFloat(event.target.value))
      var tempQuant=quant;
      tempQuant.push(event.target.value);
      setQuant(tempQuant);
     }
      
    }}></Input>

           

              <Label>Total ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Label>
              <Input  invalid={!valid} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
      //alert(curr)
     if(parseFloat(event.target.value)>parseFloat(localStorage.getItem(curr))){
        setvalid(false)
     }
     else{
      setvalid(true)
      
      setbuy_limit_amount(parseFloat(parseFloat(event.target.value) /parseFloat(buy_limit_price)) )
      var tempQuant=quant;
      tempQuant.push(parseFloat(event.target.value)/parseFloat(buy_limit_price));
      setQuant(tempQuant);
     }
      
    }}></Input>

              <Button size="lg" className="bg-dark"  style={{margin:"2rem 0 2rem 0",display:"block",width:"100%"}}  onClick={()=>{
                  setExit(true)
              }}>Next Exits {`>`}</Button>
            </Form>
            </TabPanel>
            <TabPanel>
            <Form  style={{marginBottom:"1rem"}}>
              <Label>Price  ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Label>
   <Input disabled style={{color:"black"}}  type="number" step="any" value={pair == "BTC/USDT" ? liveprice_BTC : pair == "BTC/INRD" ? parseFloat(liveprice_BTC*conversion).toFixed(2) : pair == "ETH/USDT" ? liveprice_ETH : pair == "ETH/INRD" ? parseFloat(liveprice_ETH*conversion).toFixed(2) : pair == "BNB/USDT" ? liveprice_BNB : pair == "BNB/INRD" ? parseFloat(liveprice_BNB*conversion).toFixed(2) : pair == "KSM/USDT" ? liveprice_KSM : pair == "KSM/INRD" ? parseFloat(liveprice_KSM*conversion).toFixed(2) : pair =="ATA/USDT"? liveprice_ATA : pair=="ATA/INRD" ? parseFloat(liveprice_ATA*conversion).toFixed(2) : pair=="MANA/USDT"? liveprice_MANA : pair=="MANA/INRD" ? parseFloat(liveprice_MANA*conversion).toFixed(2) : pair=="DGB/USDT"?liveprice_DGB: pair=="DGB/INRD"? parseFloat(liveprice_DGB*conversion).toFixed(2) : pair=="FTM/USDT"?liveprice_FTM: pair=="FTM/INRD"? parseFloat(liveprice_FTM*conversion).toFixed(2) : pair=="ALICE/USDT"?liveprice_ALICE: pair=="ALICE/INRD"? parseFloat(liveprice_ALICE*conversion).toFixed(2) : pair=="GTC/USDT"?liveprice_GTC: pair=="GTC/INRD"? parseFloat(liveprice_GTC*conversion).toFixed(2) : pair=="MATIC/USDT"?liveprice_MATIC: pair=="MATIC/INRD"? parseFloat(liveprice_MATIC*conversion).toFixed(2):pair=="AXS/USDT"?liveprice_AXS: pair=="AXS/INRD"? parseFloat(liveprice_AXS*conversion).toFixed(2): pair=="FTT/USDT"?liveprice_FTT: pair=="FTT/INRD"? parseFloat(liveprice_FTT*conversion).toFixed(2) :pair=="SOL/USDT"?liveprice_SOL: pair=="SOL/INRD"? parseFloat(liveprice_SOL*conversion).toFixed(2) :pair=="RUNE/USDT"?liveprice_RUNE: pair=="RUNE/INRD"? parseFloat(liveprice_RUNE*conversion).toFixed(2) :pair=="UNI/USDT"?liveprice_UNI: pair=="UNI/INRD"? parseFloat(liveprice_UNI*conversion).toFixed(2):pair=="DOT/USDT"?liveprice_DOT: pair=="DOT/INRD"? parseFloat(liveprice_DOT*conversion).toFixed(2) :pair=="VET/USDT"?liveprice_VET: pair=="VET/INRD"? parseFloat(liveprice_VET*conversion).toFixed(2):pair=="TFUEL/USDT"?liveprice_TFUEL: pair=="TFUEL/INRD"? parseFloat(liveprice_TFUEL*conversion).toFixed(2):pair=="GRT/USDT"?liveprice_GRT: pair=="GRT/INRD"? parseFloat(liveprice_GRT*conversion).toFixed(2):pair=="ADA/USDT"?liveprice_ADA: pair=="ADA/INRD"? parseFloat(liveprice_ADA*conversion).toFixed(2):pair=="FIL/USDT"?liveprice_FIL: pair=="FIL/INRD"? parseFloat(liveprice_FIL*conversion).toFixed(2):pair=="LINK/USDT"?liveprice_LINK: pair=="LINK/INRD"? parseFloat(liveprice_LINK*conversion).toFixed(2):pair=="LUNA/USDT"?liveprice_LUNA: pair=="LUNA/INRD"? parseFloat(liveprice_LUNA*conversion).toFixed(2):pair=="THETA/USDT"?liveprice_THETA: parseFloat(liveprice_THETA*conversion).toFixed(2)} onChange={(event)=>{
      var tempPrice=pricee;
      tempPrice.push(event.target.value);
      setPrice(tempPrice);
      // settrade_price(parseFloat(event.target.value) )

    }} >  ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Input>
   <Label>Amount  ({`${pair.substr(0,pair.indexOf('/'))}`})</Label>
   <Input   value={buy_market_amount} disabled={true} style={{color:"black"}} type="number" step="any" name="quantity"  onChange={(event)=>{
      var tempQuant=quant;
      tempQuant.push(event.target.value);
      setQuant(tempQuant);
      // settrade_quantity(parseFloat(event.target.value) )

    }}> </Input>

  
  <Label>Total  ( {`${pair.substr(pair.indexOf('/')+1,pair.length)}`} )</Label>
   <Input invalid={!valid} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
      
     if(parseFloat(event.target.value)>parseFloat(localStorage.getItem(curr))){
        setvalid(false)
     }
     else{
      setvalid(true)
     
      setbuy_market_amount(parseFloat(parseFloat(event.target.value) /parseFloat(pair == "BTC/USDT" ? liveprice_BTC : pair == "BTC/INRD" ? parseFloat(liveprice_BTC*conversion).toFixed(2) : pair == "ETH/USDT" ? liveprice_ETH : pair == "ETH/INRD" ? parseFloat(liveprice_ETH*conversion).toFixed(2) : pair == "BNB/USDT" ? liveprice_BNB : pair == "BNB/INRD" ? parseFloat(liveprice_BNB*conversion).toFixed(2) : pair == "KSM/USDT" ? liveprice_KSM : pair == "KSM/INRD" ? parseFloat(liveprice_KSM*conversion).toFixed(2) : pair =="ATA/USDT"? liveprice_ATA : pair=="ATA/INRD" ? parseFloat(liveprice_ATA*conversion).toFixed(2) : pair=="MANA/USDT"? liveprice_MANA : pair=="MANA/INRD" ? parseFloat(liveprice_MANA*conversion).toFixed(2) : pair=="DGB/USDT"?liveprice_DGB: pair=="DGB/INRD"? parseFloat(liveprice_DGB*conversion).toFixed(2) : pair=="FTM/USDT"?liveprice_FTM: pair=="FTM/INRD"? parseFloat(liveprice_FTM*conversion).toFixed(2) : pair=="ALICE/USDT"?liveprice_ALICE: pair=="ALICE/INRD"? parseFloat(liveprice_ALICE*conversion).toFixed(2) : pair=="GTC/USDT"?liveprice_GTC: pair=="GTC/INRD"? parseFloat(liveprice_GTC*conversion).toFixed(2) : pair=="MATIC/USDT"?liveprice_MATIC: pair=="MATIC/INRD"? parseFloat(liveprice_MATIC*conversion).toFixed(2):pair=="AXS/USDT"?liveprice_AXS: pair=="AXS/INRD"? parseFloat(liveprice_AXS*conversion).toFixed(2): pair=="FTT/USDT"?liveprice_FTT: pair=="FTT/INRD"? parseFloat(liveprice_FTT*conversion).toFixed(2) :pair=="SOL/USDT"?liveprice_SOL: pair=="SOL/INRD"? parseFloat(liveprice_SOL*conversion).toFixed(2) :pair=="RUNE/USDT"?liveprice_RUNE: pair=="RUNE/INRD"? parseFloat(liveprice_RUNE*conversion).toFixed(2) :pair=="UNI/USDT"?liveprice_UNI: pair=="UNI/INRD"? parseFloat(liveprice_UNI*conversion).toFixed(2):pair=="DOT/USDT"?liveprice_DOT: pair=="DOT/INRD"? parseFloat(liveprice_DOT*conversion).toFixed(2) :pair=="VET/USDT"?liveprice_VET: pair=="VET/INRD"? parseFloat(liveprice_VET*conversion).toFixed(2):pair=="TFUEL/USDT"?liveprice_TFUEL: pair=="TFUEL/INRD"? parseFloat(liveprice_TFUEL*conversion).toFixed(2):pair=="GRT/USDT"?liveprice_GRT: pair=="GRT/INRD"? parseFloat(liveprice_GRT*conversion).toFixed(2):pair=="ADA/USDT"?liveprice_ADA: pair=="ADA/INRD"? parseFloat(liveprice_ADA*conversion).toFixed(2):pair=="FIL/USDT"?liveprice_FIL: pair=="FIL/INRD"? parseFloat(liveprice_FIL*conversion).toFixed(2):pair=="LINK/USDT"?liveprice_LINK: pair=="LINK/INRD"? parseFloat(liveprice_LINK*conversion).toFixed(2):pair=="LUNA/USDT"?liveprice_LUNA: pair=="LUNA/INRD"? parseFloat(liveprice_LUNA*conversion).toFixed(2):pair=="THETA/USDT"?liveprice_THETA: parseFloat(liveprice_THETA*conversion).toFixed(2))).toFixed(4) )
      var tempQuant=quant;
      tempQuant.push(parseFloat(parseFloat(event.target.value) /parseFloat(pair == "BTC/USDT" ? liveprice_BTC : pair == "BTC/INRD" ? parseFloat(liveprice_BTC*conversion).toFixed(2) : pair == "ETH/USDT" ? liveprice_ETH : pair == "ETH/INRD" ? parseFloat(liveprice_ETH*conversion).toFixed(2) : pair == "BNB/USDT" ? liveprice_BNB : pair == "BNB/INRD" ? parseFloat(liveprice_BNB*conversion).toFixed(2) : pair == "KSM/USDT" ? liveprice_KSM : pair == "KSM/INRD" ? parseFloat(liveprice_KSM*conversion).toFixed(2) : pair =="ATA/USDT"? liveprice_ATA : pair=="ATA/INRD" ? parseFloat(liveprice_ATA*conversion).toFixed(2) : pair=="MANA/USDT"? liveprice_MANA : pair=="MANA/INRD" ? parseFloat(liveprice_MANA*conversion).toFixed(2) : pair=="DGB/USDT"?liveprice_DGB: pair=="DGB/INRD"? parseFloat(liveprice_DGB*conversion).toFixed(2) : pair=="FTM/USDT"?liveprice_FTM: pair=="FTM/INRD"? parseFloat(liveprice_FTM*conversion).toFixed(2) : pair=="ALICE/USDT"?liveprice_ALICE: pair=="ALICE/INRD"? parseFloat(liveprice_ALICE*conversion).toFixed(2) : pair=="GTC/USDT"?liveprice_GTC: pair=="GTC/INRD"? parseFloat(liveprice_GTC*conversion).toFixed(2) : pair=="MATIC/USDT"?liveprice_MATIC: pair=="MATIC/INRD"? parseFloat(liveprice_MATIC*conversion).toFixed(2):pair=="AXS/USDT"?liveprice_AXS: pair=="AXS/INRD"? parseFloat(liveprice_AXS*conversion).toFixed(2): pair=="FTT/USDT"?liveprice_FTT: pair=="FTT/INRD"? parseFloat(liveprice_FTT*conversion).toFixed(2) :pair=="SOL/USDT"?liveprice_SOL: pair=="SOL/INRD"? parseFloat(liveprice_SOL*conversion).toFixed(2) :pair=="RUNE/USDT"?liveprice_RUNE: pair=="RUNE/INRD"? parseFloat(liveprice_RUNE*conversion).toFixed(2) :pair=="UNI/USDT"?liveprice_UNI: pair=="UNI/INRD"? parseFloat(liveprice_UNI*conversion).toFixed(2):pair=="DOT/USDT"?liveprice_DOT: pair=="DOT/INRD"? parseFloat(liveprice_DOT*conversion).toFixed(2) :pair=="VET/USDT"?liveprice_VET: pair=="VET/INRD"? parseFloat(liveprice_VET*conversion).toFixed(2):pair=="TFUEL/USDT"?liveprice_TFUEL: pair=="TFUEL/INRD"? parseFloat(liveprice_TFUEL*conversion).toFixed(2):pair=="GRT/USDT"?liveprice_GRT: pair=="GRT/INRD"? parseFloat(liveprice_GRT*conversion).toFixed(2):pair=="ADA/USDT"?liveprice_ADA: pair=="ADA/INRD"? parseFloat(liveprice_ADA*conversion).toFixed(2):pair=="FIL/USDT"?liveprice_FIL: pair=="FIL/INRD"? parseFloat(liveprice_FIL*conversion).toFixed(2):pair=="LINK/USDT"?liveprice_LINK: pair=="LINK/INRD"? parseFloat(liveprice_LINK*conversion).toFixed(2):pair=="LUNA/USDT"?liveprice_LUNA: pair=="LUNA/INRD"? parseFloat(liveprice_LUNA*conversion).toFixed(2):pair=="THETA/USDT"?liveprice_THETA: parseFloat(liveprice_THETA*conversion).toFixed(2))).toFixed(4) );
      setQuant(tempQuant);
     }
      
    }}></Input>
     <Button size="lg" className="bg-dark"  style={{margin:"2rem 0 2rem 0",display:"block",width:"100%"}}  onClick={()=>{
                  setExit(true)
              }}>Next Exits {`>`}</Button>
    </Form>
            </TabPanel>

           
          </Tabs>

                </>:
            
                <> 
                <p style={{fontSize:"1.1rem",fontWeight:"400"}}>1.Exits <span><Button size=" sm"  style={{float:"right"}} onClick={()=>{
                  setExit(false)
                }}> {`<`}Back</Button></span></p>
                <ButtonGroup>
                  <Button  size="lg"  className="bg-success"  onClick={()=>{
                    setActiveE(true)
         
                  }}>
                   Target
                 </Button>
       
                 <Button size="lg" className="bg-dark"  onClick={()=>{
                    setActiveE(false)
         
                  }}>
                  Stop-Loss
                    </Button>
                </ButtonGroup>

                  {activeE ? 
                  
                  <> 
                    <Tabs>
                      <TabList >
                        <Tab>Stop-market</Tab>
                      </TabList>

                      <TabPanel>
                        <Form style={{marginTop:"0.5rem"}}>
                        <Label>Trigger Price</Label>
                        <Input></Input>

                        <Label>Profit</Label>
                        <Input></Input>
                        <Slider
        defaultValue={30}
        getAriaValueText={(value)=>{
        }}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={100}
      />
                           <Label>Quantity</Label>
                        <Input></Input>
                        <Slider
        defaultValue={30}
        getAriaValueText={(value)=>{
        }}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={100}
      />
          <Button size="lg" className="bg-dark" style={{display:"block",width:"100%",marginBottom:"2rem"}}>Add Target </Button>
          {/* <Button size="md" className="bg-primary" style={{display:"block",width:"100%"}} onClick={()=>{
            setExit(false)
          }}>Place Fulltrade </Button> */}
                        </Form>

                      </TabPanel>
                    </Tabs>
                  </>: 
                  <> 
                  
                    <Tabs>
                      <TabList>
                        <Tab>Stop-market</Tab>
                        <Tab>Stop-limit</Tab>
                        <TabPanel>
                        <Form style={{marginBottom:"2rem"}}>
                        <Label>Trigger Price</Label>
                        <Input></Input>

                        <Label>Profit</Label>
                        <Input></Input>
                        <Slider
        defaultValue={30}
        getAriaValueText={(value)=>{
        }}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={100}
      />
                           <Label>Quantity</Label>
                        <Input></Input>
                        <Slider
        defaultValue={30}
        getAriaValueText={(value)=>{
        }}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={100}
      />
          <Button size="lg" className="bg-dark" style={{display:"block",width:"100%",marginBottom:"2rem"}}>Add Stop-loss </Button>
                        </Form>
                        </TabPanel>
                        <Form  style={{marginBottom:"2rem"}}>
                        <Label>Trigger Price</Label>
                        <Input></Input>

                        <Label>Profit</Label>
                        <Input></Input>
                        <Slider
        defaultValue={30}
        getAriaValueText={(value)=>{
        }}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={100}
      />
                           <Label>Quantity</Label>
                        <Input></Input>
                        <Slider
        defaultValue={30}
        getAriaValueText={(value)=>{
        }}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={100}
      />
          <Button size="lg" className="bg-dark" style={{display:"block",width:"100%"}}>Add Stop-loss </Button>
                        </Form>
                        <TabPanel>

                        </TabPanel>

                      </TabList>
                    </Tabs>
                  
                  </>
                  
                  }


                </> }
              
        </TabPanel>
       
        
        </Tabs>
      </Row>
      {exit? 
      <>
      <Row>
      
      <h5>Trade Overview</h5>
      <Table style={{display:"block"}}>
      <thead>
        <tr>
          <th>Type</th>
          <th>Price</th>
          <th>Profit</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
      
      </tbody>
    </Table>
      </Row>
      </> :null
    }
</div>

  <div className="col" style={{height:"100vh"}}>
  <div class="tabs" style={{width:"100%",marginBottom:"0.3rem"}}>
      
      <Navbar className="mr-auto" navbar>
        <NavItem style={{marginLeft:"1rem",marginTop:"-1.6rem"}}>
        <UncontrolledDropdown >
            
            <DropdownToggle tag="a" style={{fontSize:"1.2rem",borderRadius:"10px",borderWidth:'4px',textDecoration:"none",color:"black"}} caret>{pair}    </DropdownToggle>
           
            <DropdownMenu  style={{maxHeight:"20rem" ,overflow:"scroll"}} >
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('BTC/USDT');localStorage.setItem("pair",'BTC/USDT');settradingvalue('BTCUSDT');setlive(liveprice_BTC_u);setlivevol(btc_u_vol)}}>BTC/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('BTC/INRD');localStorage.setItem("pair",'BTC/INRD');settradingvalue('BTCINR');setlive(liveprice_BTC);setlivevol(btc_vol)}}>BTC/INRD</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('ETH/USDT');localStorage.setItem("pair",'ETH/USDT');settradingvalue('ETHUSDT');setlive(liveprice_ETH_u);setlivevol(eth_u_vol)}}>ETH/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('ETH/INRD');localStorage.setItem("pair",'ETH/INRD');settradingvalue('ETHINR');setlive(liveprice_ETH);setlivevol(eth_vol)}}>ETH/INRD</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('BNB/USDT');localStorage.setItem("pair",'BNB/USDT');settradingvalue('BNBUSDT');setlive(liveprice_BNB_u);setlivevol(bnb_u_vol)}}>BNB/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('BNB/INRD');localStorage.setItem("pair",'BNB/INRD');settradingvalue('BNBINR');setlive(liveprice_BNB);setlivevol(bnb_vol)}}>BNB/INR</DropdownItem>
              
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('KSM/USDT');localStorage.setItem("pair",'KSM/USDT');settradingvalue('KSMUSDT');setlive(liveprice_KSM_u);setlivevol(btc_u_vol)}}>KSM/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('KSM/INRD');localStorage.setItem("pair",'KSM/INRD');settradingvalue('KSMINR');setlive(liveprice_KSM);setlivevol(bnb_vol)}}>KSM/INRD</DropdownItem>
              
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('ATA/USDT');localStorage.setItem("pair",'ATA/USDT');settradingvalue('ATAUSDT');setlive(liveprice_ATA_u);setlivevol(btc_u_vol)}}>ATA/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('ATA/INRD');localStorage.setItem("pair",'ATA/INRD');settradingvalue('ATAINR');setlive(liveprice_ATA);setlivevol(bnb_vol)}}>ATA/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('MANA/USDT');localStorage.setItem("pair",'MANA/USDT');settradingvalue('MANAUSDT');setlive(liveprice_MANA_u);setlivevol(btc_u_vol)}}>MANA/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('MANA/INRD');localStorage.setItem("pair",'MANA/INRD');settradingvalue('MANAINR');setlive(liveprice_MANA);setlivevol(bnb_vol)}}>MANA/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('DGB/USDT');localStorage.setItem("pair",'DGB/USDT');settradingvalue('DGBUSDT');setlive(liveprice_DGB_u);setlivevol(btc_u_vol)}}>DGB/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('DGB/INRD');localStorage.setItem("pair",'DGB/INRD');settradingvalue('DGBINR');setlive(liveprice_DGB);setlivevol(bnb_vol)}}>DGB/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('FTM/USDT');localStorage.setItem("pair",'FTM/USDT');settradingvalue('FTMUSDT');setlive(liveprice_FTM_u);setlivevol(btc_u_vol)}}>FTM/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('FTM/INRD');localStorage.setItem("pair",'FTM/INRD');settradingvalue('FTMINR');setlive(liveprice_FTM);setlivevol(bnb_vol)}}>FTM/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('ALICE/USDT');localStorage.setItem("pair",'ALICE/USDT');settradingvalue('ALICEUSDT');setlive(liveprice_ALICE_u);setlivevol(btc_u_vol)}}>ALICE/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('ALICE/INRD');localStorage.setItem("pair",'ALICE/INRD');settradingvalue('ALICEINR');setlive(liveprice_ALICE);setlivevol(bnb_vol)}}>ALICE/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('GTC/USDT');localStorage.setItem("pair",'GTC/USDT');settradingvalue('GTCUSDT');setlive(liveprice_GTC_u);setlivevol(btc_u_vol)}}>GTC/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('GTC/INRD');localStorage.setItem("pair",'GTC/INRD');settradingvalue('GTCINR');setlive(liveprice_GTC);setlivevol(bnb_vol)}}>GTC/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('MATIC/USDT');localStorage.setItem("pair",'MATIC/USDT');settradingvalue('MATICUSDT');setlive(liveprice_MATIC_u);setlivevol(btc_u_vol)}}>MATIC/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('MATIC/INRD');localStorage.setItem("pair",'MATIC/INRD');settradingvalue('MATICINR');setlive(liveprice_MATIC);setlivevol(bnb_vol)}}>MATIC/INRD</DropdownItem>
            
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('AXS/USDT');localStorage.setItem("pair",'AXS/USDT');settradingvalue('AXSUSDT');setlive(liveprice_AXS_u);setlivevol(btc_u_vol)}}>AXS/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('AXS/INRD');localStorage.setItem("pair",'AXS/INRD');settradingvalue('AXSINR');setlive(liveprice_AXS);setlivevol(bnb_vol)}}>AXS/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('FTT/USDT');localStorage.setItem("pair",'FTT/USDT');settradingvalue('FTTUSDT');setlive(liveprice_FTT_u);setlivevol(btc_u_vol)}}>FTT/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('FTT/INRD');localStorage.setItem("pair",'FTT/INRD');settradingvalue('FTTINR');setlive(liveprice_FTT);setlivevol(bnb_vol)}}>FTT/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('SOL/USDT');localStorage.setItem("pair",'SOL/USDT');settradingvalue('SOLUSDT');setlive(liveprice_SOL_u);setlivevol(btc_u_vol)}}>SOL/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('SOL/INRD');localStorage.setItem("pair",'SOL/INRD');settradingvalue('SOLINR');setlive(liveprice_SOL);setlivevol(bnb_vol)}}>SOL/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('RUNE/USDT');localStorage.setItem("pair",'RUNE/USDT');settradingvalue('RUNEUSDT');setlive(liveprice_RUNE_u);setlivevol(btc_u_vol)}}>RUNE/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('RUNE/INRD');localStorage.setItem("pair",'RUNE/INRD');settradingvalue('RUNEINR');setlive(liveprice_RUNE);setlivevol(bnb_vol)}}>RUNE/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('UNI/USDT');localStorage.setItem("pair",'UNI/USDT');settradingvalue('UNIUSDT');setlive(liveprice_UNI_u);setlivevol(btc_u_vol)}}>UNI/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('UNI/INRD');localStorage.setItem("pair",'UNI/INRD');settradingvalue('UNIINR');setlive(liveprice_UNI);setlivevol(bnb_vol)}}>UNI/INRD</DropdownItem>
              
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('DOT/USDT');localStorage.setItem("pair",'DOT/USDT');settradingvalue('DOTUSDT');setlive(liveprice_DOT_u);setlivevol(btc_u_vol)}}>DOT/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('DOT/INRD');localStorage.setItem("pair",'DOT/INRD');settradingvalue('DOTINR');setlive(liveprice_DOT);setlivevol(bnb_vol)}}>DOT/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('VET/USDT');localStorage.setItem("pair",'VET/USDT');settradingvalue('VETUSDT');setlive(liveprice_VET_u);setlivevol(btc_u_vol)}}>VET/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('VET/INRD');localStorage.setItem("pair",'VET/INRD');settradingvalue('VETINR');setlive(liveprice_VET);setlivevol(bnb_vol)}}>VET/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('TFUEL/USDT');localStorage.setItem("pair",'TFUEL/USDT');settradingvalue('TFUELUSDT');setlive(liveprice_TFUEL_u);setlivevol(btc_u_vol)}}>TFUEL/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('TFUEL/INRD');localStorage.setItem("pair",'TFUEL/INRD');settradingvalue('TFUELINR');setlive(liveprice_TFUEL);setlivevol(bnb_vol)}}>TFUEL/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('GRT/USDT');localStorage.setItem("pair",'GRT/USDT');settradingvalue('GRTUSDT');setlive(liveprice_GRT_u);setlivevol(btc_u_vol)}}>GRT/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('GRT/INRD');localStorage.setItem("pair",'GRT/INRD');settradingvalue('GRTINR');setlive(liveprice_GRT);setlivevol(bnb_vol)}}>GRT/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('ADA/USDT');localStorage.setItem("pair",'ADA/USDT');settradingvalue('ADAUSDT');setlive(liveprice_ADA_u);setlivevol(btc_u_vol)}}>ADA/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('ADA/INRD');localStorage.setItem("pair",'ADA/INRD');settradingvalue('ADAINR');setlive(liveprice_ADA);setlivevol(bnb_vol)}}>ADA/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('FIL/USDT');localStorage.setItem("pair",'FIL/USDT');settradingvalue('FILUSDT');setlive(liveprice_FIL_u);setlivevol(btc_u_vol)}}>FIL/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('FIL/INRD');localStorage.setItem("pair",'FIL/INRD');settradingvalue('FILINR');setlive(liveprice_FIL);setlivevol(bnb_vol)}}>FIL/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('LINK/USDT');localStorage.setItem("pair",'LINK/USDT');settradingvalue('LINKUSDT');setlive(liveprice_LINK_u);setlivevol(btc_u_vol)}}>LINK/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('LINK/INRD');localStorage.setItem("pair",'LINK/INRD');settradingvalue('LINKINR');setlive(liveprice_LINK);setlivevol(bnb_vol)}}>LINK/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('LUNA/USDT');localStorage.setItem("pair",'LUNA/USDT');settradingvalue('LUNAUSDT');setlive(liveprice_LUNA_u);setlivevol(btc_u_vol)}}>LUNA/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('LUNA/INRD');localStorage.setItem("pair",'LUNA/INRD');settradingvalue('LUNAINR');setlive(liveprice_LUNA);setlivevol(bnb_vol)}}>LUNA/INRD</DropdownItem>
  
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('THETA/USDT');localStorage.setItem("pair",'THETA/USDT');settradingvalue('THETAUSDT');setlive(liveprice_FIL_u);setlivevol(btc_u_vol)}}>THETA/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('THETA/INRD');localStorage.setItem("pair",'THETA/INRD');settradingvalue('THETAINR');setlive(liveprice_FIL);setlivevol(bnb_vol)}}>THETA/INRD</DropdownItem>
  
  
              <DropdownItem style={{color:"black"}} onClick={()=>{setpair('ANTEAG/USDT');localStorage.setItem("pair",'ANTEAG/USDT');settradingvalue('ANTEAGUSDT');setlive(liveprice_ANTEAG_u);setlivevol(ant_u_vol)}}>ANTEAG/USDT</DropdownItem>
              <DropdownItem style={{color:"black"}}  onClick={()=>{setpair('ANTEAG/INRD');localStorage.setItem("pair",'ANTEAG/INRD');settradingvalue('ANTEAGINR');setlive(liveprice_ANTEAG);setlivevol(ant_vol)}}>ANTEAG/INRD</DropdownItem>
            </DropdownMenu>
          
          </UncontrolledDropdown>
        </NavItem>
        <Collapse isOpen={isOpen} navbar>     
        <NavItem style={{marginLeft:"2rem",fontSize:'1.2rem',textAlign:"center"}}>
              <CardText >Current {pair.substr(0,pair.indexOf('/'))} Price</CardText><CardText style={{color:"green",fontWeight:"bold",marginTop:"-1rem"}}>{pair == "BTC/USDT" ? liveprice_BTC : pair == "BTC/INRD" ? parseFloat(liveprice_BTC*conversion).toFixed(2) : pair == "ETH/USDT" ? liveprice_ETH : pair == "ETH/INRD" ? parseFloat(liveprice_ETH*conversion).toFixed(2) : pair == "BNB/USDT" ? liveprice_BNB : pair == "BNB/INRD" ? parseFloat(liveprice_BNB*conversion).toFixed(2) : pair == "KSM/USDT" ? liveprice_KSM : pair == "KSM/INRD" ? parseFloat(liveprice_KSM*conversion).toFixed(2) : pair =="ATA/USDT"? liveprice_ATA : pair=="ATA/INRD" ? parseFloat(liveprice_ATA*conversion).toFixed(2) : pair=="MANA/USDT"? liveprice_MANA : pair=="MANA/INRD" ? parseFloat(liveprice_MANA*conversion).toFixed(2) : pair=="DGB/USDT"?liveprice_DGB: pair=="DGB/INRD"? parseFloat(liveprice_DGB*conversion).toFixed(2) : pair=="FTM/USDT"?liveprice_FTM: pair=="FTM/INRD"? parseFloat(liveprice_FTM*conversion).toFixed(2) : pair=="ALICE/USDT"?liveprice_ALICE: pair=="ALICE/INRD"? parseFloat(liveprice_ALICE*conversion).toFixed(2) : pair=="GTC/USDT"?liveprice_GTC: pair=="GTC/INRD"? parseFloat(liveprice_GTC*conversion).toFixed(2) : pair=="MATIC/USDT"?liveprice_MATIC: pair=="MATIC/INRD"? parseFloat(liveprice_MATIC*conversion).toFixed(2):pair=="AXS/USDT"?liveprice_AXS: pair=="AXS/INRD"? parseFloat(liveprice_AXS*conversion).toFixed(2): pair=="FTT/USDT"?liveprice_FTT: pair=="FTT/INRD"? parseFloat(liveprice_FTT*conversion).toFixed(2) :pair=="SOL/USDT"?liveprice_SOL: pair=="SOL/INRD"? parseFloat(liveprice_SOL*conversion).toFixed(2) :pair=="RUNE/USDT"?liveprice_RUNE: pair=="RUNE/INRD"? parseFloat(liveprice_RUNE*conversion).toFixed(2) :pair=="UNI/USDT"?liveprice_UNI: pair=="UNI/INRD"? parseFloat(liveprice_UNI*conversion).toFixed(2):pair=="DOT/USDT"?liveprice_DOT: pair=="DOT/INRD"? parseFloat(liveprice_DOT*conversion).toFixed(2) :pair=="VET/USDT"?liveprice_VET: pair=="VET/INRD"? parseFloat(liveprice_VET*conversion).toFixed(2):pair=="TFUEL/USDT"?liveprice_TFUEL: pair=="TFUEL/INRD"? parseFloat(liveprice_TFUEL*conversion).toFixed(2):pair=="GRT/USDT"?liveprice_GRT: pair=="GRT/INRD"? parseFloat(liveprice_GRT*conversion).toFixed(2):pair=="ADA/USDT"?liveprice_ADA: pair=="ADA/INRD"? parseFloat(liveprice_ADA*conversion).toFixed(2):pair=="FIL/USDT"?liveprice_FIL: pair=="FIL/INRD"? parseFloat(liveprice_FIL*conversion).toFixed(2):pair=="LINK/USDT"?liveprice_LINK: pair=="LINK/INRD"? parseFloat(liveprice_LINK*conversion).toFixed(2):pair=="LUNA/USDT"?liveprice_LUNA: pair=="LUNA/INRD"? parseFloat(liveprice_LUNA*conversion).toFixed(2):pair=="THETA/USDT"?liveprice_THETA: parseFloat(liveprice_THETA*conversion).toFixed(2)} {pair.substr(pair.indexOf('/')+1,pair.length)}</CardText>
            </NavItem>
            </Collapse>    
      </Navbar>                
  </div>
  <TradingViewWidget
    symbol={'BTCUSDT'}
    theme={Themes.LIGHT}
    locale="en"
    width="100%"
    height="600vh"
  />
<div style={{height:"100rem"}}>
<Col xs="12">
            <Card>
             
              <CardBody>
               <Tabs>
                <TabList>
                  <Tab>Open Orders()</Tab>
                  <Tab>Trade History</Tab>
                  <Tab>Order History ()</Tab>
                  
                </TabList>
                <TabPanel>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                    <th>Order ID</th>
                      <th>Date</th>
                      <th>Pair</th>
                      <th>type</th>
                      <th>Side</th>
                      <th>Price</th>
                      <th> Amount</th>
                      <th>Filled</th>
                      <th>Total</th>
                      <th>status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                
  
                  </tbody>
                </Table>
                </TabPanel>
                <TabPanel>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                    <th>Order ID</th>
                      <th>Date</th>
                      <th>Pair</th>
                      <th>type</th>
                      <th>Side</th>
                      <th>Price</th>
                      <th> Amount</th>
                      <th>Filled</th>
                      <th>Total</th>
                      <th>status</th>
                    </tr>
                  </thead>
                  <tbody>
                
               
               
                    
                  </tbody>
                </Table>
                </TabPanel>
                <TabPanel>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                    <th>Order ID</th>
                      <th>Date</th>
                      <th>Pair</th>
                      <th>type</th>
                      <th>Side</th>
                      <th>Price</th>
                      <th> Amount</th>
                      <th>Filled</th>
                      <th>Total</th>
                      <th>status</th>
                    </tr>
                  </thead>
                  <tbody>
                
                 {fillorders.map((ans,i)=>{
                   return(
                    <tr>
                      {  ans.map((res,i)=>{
                    return(
                      <td>{res}</td>
                    )
                   })}
                 
                       </tr>
                   )
                 
                      
                 })}
               
                    
                  </tbody>
                </Table>
                </TabPanel>
               </Tabs>
              </CardBody>
            </Card>
          </Col>         
</div>
  </div>
 
</div> : portfolio ?
<>
<div className="row" style={{padding:"40px"}}>
<div className="col chart2" >
<h3>Estimated Value</h3>
<div className="row" style={{marginTop:"2rem",padding:"10px"}}>
  <div className="col">
  <ul>
  <img style={{height:"30px",width:"30px"}} src={logobtc}></img> 10.09 {"btc".toUpperCase()}
</ul>
<ul>
  <img style={{height:"30px",width:"30px"}} src={bnb}></img> 10.09 {"bnb".toUpperCase()}
</ul>
<ul>
  <img style={{height:"30px",width:"30px"}} src={eth}></img> 10.09 {"eth".toUpperCase()}
</ul>
<ul>
  <img style={{height:"30px",width:"30px"}} src={dot}></img> 10.09 {"dot".toUpperCase()}
</ul>
  </div>
  <div className="col">
  <ul>
  <img style={{height:"30px",width:"30px"}} src={eth}></img> 10.09 {"eth".toUpperCase()}
</ul>
<ul>
  <img style={{height:"30px",width:"30px"}} src={bnb}></img> 10.09 {"bnb".toUpperCase()}
</ul>
<ul>
  <img style={{height:"30px",width:"30px"}} src={logobtc}></img> 10.09 {"btc".toUpperCase()}
</ul>
<ul>
  <img style={{height:"30px",width:"30px"}} src={dot}></img> 10.09 {"dot".toUpperCase()}
</ul>
  </div>
</div>

</div>

<div className="col chart1">
<h3 >PortFolio Distribution</h3>
<div style={{height:"30rem"}} id="chartdiv"></div>

</div>
</div>
<br/>
<br/>
<br/>
<br/>
<br/>
  <div className="chart3" >
    <h1>Balance</h1>
  <div className='post-body' id=' post-body'>
  <div itemprop='description'>
    <div className='clear'></div>
    <table cellPadding="0" cellspacing="0" style={{textAlign: "left"}}>
      <tbody>
        <tr>
          <th>Asset</th>
          <th>Amount</th>
        </tr>
        <tr>
          <td>Responsive</td>
          <td>True <a href="http://www.responsinator.com/?url=https%3A%2F%2Finseosafelink.blogspot.com%2F" rel="nofollow noopener" target="_blank">Cek</a></td>
        </tr>
        <tr>
          <td>Mobile Friendly</td>
          <td>True <a href="https://search.google.com/test/mobile-friendly?id=aplzRM63N-IeaI3qmhwKwQ" rel="nofollow noopener" target="_blank">Cek</a></td>
        </tr>
        <tr>
          <td>Google PageSpeed Insights</td>
          <td>True <a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Finseosafelink.blogspot.com%2F&amp;tab=mobile" rel="nofollow noopener" target="_blank">Cek</a></td>
        </tr>
        <tr>
          <td>Google Testing Tools Validator</td>
          <td>True</td>
        </tr>
        <tr>
          <td>SEO Friendly</td>
          <td>True</td>
        </tr>
        <tr>
          <td>1 Column</td>
          <td>True</td>
        </tr>
        <tr>
          <td>2 Style</td>
          <td>True</td>
        </tr>
        <tr>
          <td>Crypto JS Script</td>
          <td>True</td>
        </tr>
        <tr>
          <td>Random Generate Link</td>
          <td>True</td>
        </tr>
        <tr>
          <td>Full Page Script or Auto Safelink</td>
          <td>True</td>
        </tr>
        <tr>
          <td>Well Documentation</td>
          <td>True</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  </div>
</> : swap? <>
                      <div className="row" style={{paddingRight:"40px",marginLeft:"40px"}}>

<div class="tabs" style={{width:"40%"}}>    
                          
        <Row>
          <Col>
            <Card >
              <CardHeader>SWAP YOUR COINS</CardHeader>
              <CardBody style={{alignSelf:"center",width:"100%"}}>
                <Card >
                    
                  <div style={{ textColor: "black", marginLeft: "1rem" }}>
                    <h3 style={{ color: "black", fontWeight: "bold", fontFamily: "Kanit,sans-serif" }}>Exchange</h3>
                    <p style={{ color: "black" }}>Trade Token in an Instant</p>
                  </div>


                  <div className="input" style={{ width: "98%", paddingLeft: "0.4rem" }}>

                    <div style={{ background: "#eeeaf4" }}></div>
                      <Label style={{ color: "black", padding: "0.3rem", width: "99%" }}>From</Label>
                      <p >Max Available {localStorage.getItem(`${from}_Coins`)}</p>
                      <Row>
                      <Col>
                      <Input placeholder={`ENTER ${from}`} onChange={(e) => {
                        if (parseFloat(e.target.value) > parseFloat(localStorage.getItem(`${from}_Coins`))) {
                          alert("Please Enter Amount less than or equal to your wallet balance")
                          setvalid(false);
                        }
                        else {

                          setfromvalue(parseFloat(e.target.value))
                          //console.log("from>>>>>>>>>>",from)
                          //console.log("to>>>>>>>>>>>>",to)
                          //console.log(parseFloat(e.target.value))

                          setvalid(true)
                          if (from == 'ETH') {  
                          if( to == 'INRD'){
                            setfinal(liveusd * ETH * parseFloat(e.target.value) * 0.98)
                          }
                          else if(to == 'USDT'){
                            setfinal(ETH * parseFloat(e.target.value) * 0.98)
                          }
                          else if(to == 'BNB'){
                            setfinal(((ETH * parseFloat(e.target.value))/(BNB)) * 0.98)
                          }
                          else if(to == 'BTC'){
                            setfinal(BTC * parseFloat(e.target.value) * 0.98)
                          }
                          else{
                            alert("Cannot convert to same type")
                          }}
                          else if (from == 'BTC') {
                            if( to == 'INRD'){
                              //console.log(75 * 2600000 * parseFloat(e.target.value) * 0.98 )
                              setfinal(75 * 2600000 * parseFloat(e.target.value) * 0.98 )
                            }
                            else if(to == 'USDT'){
                              setfinal(BTC * parseFloat(e.target.value) * 0.98 )
                            }
                            else if(to == 'BNB'){
                              setfinal(BNB * parseFloat(e.target.value) * 0.98 )
                            }
                            else if(to == 'ETH'){
                              setfinal(ETH * parseFloat(e.target.value) * 0.98 )
                            }
                            else{
                              alert("Cannot convert to same type")
                            }
                            
                          }
                          else if (from == 'BNB') {  
                            if( to == 'INRD'){
                            setfinal(75 * BTC * parseFloat(e.target.value) * 0.98 )
                          }
                          else if(to == 'USDT'){
                            setfinal(BTC * parseFloat(e.target.value) * 0.98 )
                          }
                          else if(to == 'BTC'){
                            setfinal(BNB * parseFloat(e.target.value) * 0.98 )
                          }
                          else if(to == 'ETH'){
                            setfinal(ETH * parseFloat(e.target.value) * 0.98 )
                          }
                          else{
                            alert("Cannot convert to same type")
                          } }
                          else if (from == 'ANTEAG') { 
                            if( to == 'INRD'){
                              setfinal(75 * BTC * parseFloat(e.target.value) * 0.98 )
                            }
                            else if(from == 'USDT'){
                              setfinal(BTC * parseFloat(e.target.value) * 0.98 )
                            }
                            else if(to == 'BNB'){
                              setfinal(BNB * parseFloat(e.target.value) * 0.98 )
                            }
                            else if(to == 'ETH'){
                              setfinal(ETH * parseFloat(e.target.value) * 0.98 )
                            }
                            else{
                              alert("Cannot convert to same type")
                            }
                           }
                          else if (from == 'USDT') { 
                            if( to == 'INRD'){
                              setfinal(75 * parseFloat(e.target.value) * 0.98 )
                            }
                            else if(to == 'BTC'){
                              setfinal(BTC * parseFloat(e.target.value) * 0.98 )
                            }
                            else if(to == 'BNB'){
                              setfinal(BNB * parseFloat(e.target.value) * 0.98 )
                            }
                            else if(to == 'ETH'){
                              setfinal(ETH * parseFloat(e.target.value) * 0.98 )
                            }
                            else{
                              alert("Cannot convert to same type")
                            }
                           }
                          else if (from == 'INRD') {  
                          
                          if( to == 'BTC'){
                            //console.log(parseFloat(e.target.value) * 0.98 )
                            setfinal((parseFloat(e.target.value)/(BTC*liveusd)) * 0.98 )
                          }
                          else if(to == 'USDT'){
                            setfinal((parseFloat(e.target.value)/(liveusd)) * 0.98 )
                          }
                          else if(to == 'BNB'){
                            setfinal((parseFloat(e.target.value)/(BNB * liveusd)) * 0.98 )
                          }
                          else if(to == 'ETH'){
                            setfinal((parseFloat(e.target.value)/(ETH * liveusd)) * 0.98 )
                          }
                          else{
                            alert("Cannot convert to same type")
                          } }
                        }



                      }} style={{ height: "1.5rem", width: "100%", background: "rgb(238,234,244)", marginTop: "1rem", marginLeft: "0.2rem" }}></Input>
                        </Col>
                        <Col>
                      <Select style={{ background: "rgb(238,234,244)",  marginTop: "0.7rem", height: "1.7rem", width: "20%", position: "absolute" }} value={from} onChange={(e) => {
                        setfrom(e.target.value)
                      }}>
                        <MenuItem value={"BTC"}  >BTC</MenuItem>
                        <MenuItem value={"INRD"}>INRD</MenuItem>
                        <MenuItem value={"ETH"}>ETH</MenuItem>
                        <MenuItem value={"BNB"}>BNB</MenuItem>
                        <MenuItem value={"USDT"}>USDT</MenuItem>
                        <MenuItem value={"ANTEAG"}>ANTEAG</MenuItem>
                      </Select>
                      </Col>
                      </Row>
                    {/* <CgArrowsExchangeV size={40} style={{ marginLeft: "50%", marginBottom: "1rem" }}></CgArrowsExchangeV> */}

                    
                      <Label style={{ color: "black", padding: "0.3rem", width: "99%" }}>To</Label>
                      <Row>
                        <Col>
                      
                      <Input placeholder={`You will Recieve ${final}`} style={{ underlineColorAndroid: "transparent", height: "1.5rem", width: "100%", background: "rgb(238,234,244)", marginTop: "1rem", paddingTop: "0.5rem", marginLeft: "0.2rem" }}></Input>
                        </Col>
                        <Col>
                      <Select style={{ background: "rgb(238,234,244)", marginTop: "0.7rem", height: "1.7rem", width: "20%", position: "absolute" }} value={to} onChange={(e) => {
                        setto(e.target.value)
                        switch (e.target.value) {
                          case 'ETH':
                            settocurr(ETH)
                          case 'BTC':
                            settocurr(BTC)
                          case 'BNB':
                            settocurr(BNB)
                          case 'ANTEAG':
                            settocurr(ANTEAG)
                          case 'USDT':
                            settocurr(1)
                          case 'INRD':
                            settocurr(liveusd)
                        }
                      }}>


                        <MenuItem value={"BTC"} >BTC</MenuItem>
                        <MenuItem value={"INRD"} >INRD</MenuItem>
                        <MenuItem value={"ETH"} >ETH</MenuItem>
                        <MenuItem value={"BNB"} >BNB</MenuItem>
                        <MenuItem value={"USDT"} >USDT</MenuItem>
                        <MenuItem value={"ANTEAG"} >ANTEAG</MenuItem>
                      </Select>
                      </Col>
                      </Row>
                    </div>
                    <Button className="btn btn-primary m-6" style={{ marginTop: "3rem", width: "100%" }} disabled={!valid} onClick={() => {
                      if (from.length != 0 || to.length != 0) {
                        if (from.length < localStorage.getItem(`${from}_Coins`) || to.length < localStorage.getItem(`${to}_Coins`)) {
                          const temp =parseFloat(localStorage.getItem(`${from}_Coins`))-parseFloat(fromvalue);
                          const temp1 = parseFloat(localStorage.getItem(`${to}_Coins`))+parseFloat(final)
                          alert(localStorage.getItem(`${to}_Coins`))
                          alert(from)
                          alert(localStorage.getItem(`${from}_Coins`))
                          axios({
                            url : `https://api.anteagle.tech/get${from.toLowerCase()}?coins=${temp}&userid=${localStorage.getItem("userid")}`,
                            method : "POST",
                            headers:{
                              "Accept" : "Application/json",
                              'Content-type' : "application/json"
                            }
                          }).then(res=>{
                            axios({
                              method : 'post',                            
                              url : `https://api.anteagle.tech/get${to.toLowerCase()}?coins=${temp1}&userid=${localStorage.getItem("userid")}`,
                              headers:{
                                "Accept" : "Application/json",
                                'Content-type' : "application/json"
                              }
                            }).then(res=>{
                              swal("SUCCESS","Swap Successfull","Success")
                              window.location = "/"
                            })
                          })
                          
                        }
                      }
                    }}>Convert</Button>
                 

                </Card>

              </CardBody>
            </Card>
          </Col>
        </Row>
    

</div>
</div>


</> :  withdraw ? <>

<div className="content">
          <Row style={{marginLeft:"0.5rem"}}>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Withdraw Your Amount</h5>
                  <h5 className="title">Total Amount : {localStorage.getItem("INRD_Coins")}</h5>
                </CardHeader> 
                <CardBody>
                  <Form>
                    <Label>Account Number</Label>    
                    <Input placeholder="Copy & Paste Your Address here to withdraw your coins" disabled="true" style={{color:"white"}} ></Input> {/*value={bank.Acc_no} */}
                    <Label>Account Holder Name</Label>
                    <Input placeholder="Enter Amount"  disabled="true" style={{color:"white"}} ></Input>  {/* value={bank.Acc_name}*/}

                    <Label>Enter Amount</Label>
                    <Input placeholder="Minimum Withdraw Amount 5000 INR" onChange={(e)=>{
                      if(e.target.value < 5000 || e.target.value > parseFloat(localStorage.getItem("INRD_Coins"))){
                        setwallet(true)
                      }
                      else{
                        setwallet(false)
                        setamount(e.target.value)
                      }
                     
                    }}>
                     
                    </Input>
        
                    <FormText>*Your Withdraw amount will be refunded back to this Account only in 10-15 mins</FormText>
                  </Form>
                 
  
                </CardBody>
                <CardFooter>
                  <Button disabled={wallet} className="btn-fill" color="primary" type="submit" onClick={()=>{
                      var end = parseFloat(localStorage.getItem("INRD_Coins")) - amount
                      axios({
                        method:"post",
                        url : `https://api.anteagle.tech/getinrd?coins=${end}&userid=${localStorage.getItem("userid")}`,
                        headers:{
                          "Accept": "application/json",
                        }
                      }).then(res=>{
                        console.log(res.data)
                      })
                       axios({
                        method:"post",
                        url: `https://api.anteagle.tech/requestbank?userid=${localStorage.getItem("userid")}&amount=${amount}`,
                        headers:{
                          'Accept' : 'Application/json',
                          'Content-type' : 'application/json'
                        }
                      }).then(res=>{
                        console.log(res.data)
                        if(res.data.message){
                          swal(`Submitted !!`,`Your request for withdraw has been submitted Successfully. Entered will be transfered to your Account in 15-20 mins \n Your Req ID is ${res.data.id}`,"success");
                          setInterval(()=>{
                            axios({
                              method: "post",
                              url : `https://api.anteagle.tech/checkbank?id=${res.data.id}`,
                              headers:{
                                "Accept" : "Application/json",
                                'Content-type' : "application/json"
                              }
                            }).then(res=>{
                              if(res.data.success){
                                const temp = parseFloat(localStorage.getItem(`INRD_Coins`))+parseFloat(this.state.final); 
                                console.log(temp)
                                  axios({
                                    method : "post",
                                    url : `https://api.anteagle.tech/get${this.state.curr.toLowerCase()}?coins=${temp}&userid=${localStorage.getItem("userid")}`,
                                    headers:{
                                      "Accept" : "Application/json",
                                      'Content-type' : "application/json"
                                    }
                                  }).then(res=>{
                                    window.location.href = "/"
                                  })
                                 
                              }
                            })
                          },1000)
                        }
                      })
                  }}>
                    Withdraw
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            
          </Row>
        </div> 


</> : <> 

<div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <Row style={{marginLeft:"0.5rem"}}>
        
          <Col md="12">
            <Card>
              <CardBody>
                <div className="places-buttons">
                  
                  <Row>
                    <Col className="ml-auto mr-auto text-center" md="6">
                      <CardTitle tag="h4">
                        DEPOSIT
                        <p className="category">Deposit your Currency to these Address</p>
                      </CardTitle>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ml-auto mr-auto" lg="8">
                    <Tabs>
    <TabList>
      <Tab>BTC</Tab>
      <Tab>ETH</Tab>
      <Tab>USDT</Tab>
      <Tab>BNB</Tab>
    </TabList>

    <TabPanel>

       <Label>YOUR BTC ADDRESS</Label>
       <InputGroup>
       <Input placeholder="18HwcqpEf7nSdMGgrnw2WCnrkGjnTpEyek" disabled="true"/><Button onClick={()=>{

         notify('tr')
       }} style={{marginTop:"-0.17rem"}}><img src="https://img.icons8.com/fluent-systems-regular/20/000000/copy.png"/></Button>
       </InputGroup>
       <Label>SCAN THIS TO GET CODE</Label>
      <br/>
       <QRCode value="18HwcqpEf7nSdMGgrnw2WCnrkGjnTpEyek" />

    </TabPanel>
    <TabPanel>
    <Label>YOUR ETH ADDRESS</Label>
       <InputGroup>
       <Input placeholder="0xf218970b176c262cb4e5d15bb4195c6973077848" disabled="true"/><Button onClick={()=>{
         notify('tr')
       }} style={{marginTop:"-0.17rem"}}><img src="https://img.icons8.com/fluent-systems-regular/20/000000/copy.png"/></Button>
       </InputGroup>
       <Label>SCAN THIS TO GET CODE</Label>
      <br/>
       <QRCode value="0xf218970b176c262cb4e5d15bb4195c6973077848" />
    </TabPanel>
    <TabPanel>
    <Label>YOUR USDT ADDRESS</Label>
       <InputGroup>
       <Input placeholder="0xf218970b176c262cb4e5d15bb4195c6973077848" disabled="true"/><Button onClick={()=>{
         notify('tr')
       }} style={{marginTop:"-0.17rem"}}><img src="https://img.icons8.com/fluent-systems-regular/20/000000/copy.png"/></Button>
       </InputGroup>
       <Label>SCAN THIS TO GET CODE</Label>
      <br/>
       <QRCode value="0xf218970b176c262cb4e5d15bb4195c6973077848" />
    </TabPanel>
    <TabPanel>
    <Label>YOUR BNB ADDRESS</Label>
       <InputGroup>
       <Input placeholder="0xf218970b176c262cb4e5d15bb4195c6973077848" disabled="true"/><Button onClick={()=>{
         notify('tr')
       }} style={{marginTop:"-0.17rem"}}><img src="https://img.icons8.com/fluent-systems-regular/20/000000/copy.png"/></Button>
       </InputGroup>
       <Label>SCAN THIS TO GET CODE</Label>
      <br/>
       <QRCode value="0xf218970b176c262cb4e5d15bb4195c6973077848" />
    </TabPanel>
  
  </Tabs>
                    </Col>
                  </Row>
                 
                </div>
              </CardBody>
              <CardFooter>
                <Button  className="btn-fill" color="primary" type="submit">
                  DEPOSIT
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>

</>


          



}


  </  >
  );
}

export default App;
