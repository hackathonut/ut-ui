import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Layout } from '../components/Layout'
import { Badge, Button, Card, Link, Navbar, Radio, styled, Text } from '@nextui-org/react'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext, Web3Context } from '../context'


export default function Home() {

  const {web3}  = useContext(Web3Context);
  const {currentAddress, setCurrentAddress, isLogin, setIsLogin} = useContext(UserContext);
  const [displayAddress, setDisplayAddress] = useState('');

  useEffect(()=> {
    if(web3){
      setIsLogin(true);
      console.log(isLogin);
    }
  }, [isLogin])

  useEffect(()=> {
    if(currentAddress!==''){
      setDisplayAddress(currentAddress.slice(0,6) + '....' + currentAddress.slice(currentAddress.length-4,currentAddress.length));
    }
  }, [currentAddress])


  const connect = async () =>{
    if (!web3){
      return;
    }
    setIsLogin(true);
    const accounts = await web3.eth.requestAccounts();
    const currentAccount = accounts[0];
    setCurrentAddress(currentAccount);
    console.log(currentAccount);
  }
  
  return (
      <Layout>
        <Navbar isBordered variant={"static"} maxWidth={"lg"}>
          <Navbar.Brand>
            <Text b color="inherit" hideIn="xg">
              UNSTABLE TREASURIES
            </Text>
          </Navbar.Brand>
          <Navbar.Content  activeColor={"primary"} variant={"underline-rounded"} hideIn="xs">
            <Navbar.Link isActive href="#">Dashboard</Navbar.Link>
            <Navbar.Link href="/stake">Stake</Navbar.Link>
            <Navbar.Link href="#">X-Farm</Navbar.Link>
          </Navbar.Content>
          <Navbar.Content>
            <Navbar.Item>
              {isLogin===true ? ( <Badge color="success">{displayAddress}</Badge>):(<Button auto flat as={Link} onClick={connect} href="#">
                Connect Wallet
              </Button>)}
            </Navbar.Item>
          </Navbar.Content>
        </Navbar>
    </Layout>
  )
}


export const VariantsSelectorWrapper = styled("div", {
  dflex: "center",
  position: "fixed",
  width: "100%",
  bottom: "10px",
  "& .nextui-radio-group-items": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "1fr",
    gridColumnGap: "$8",
    gridRowGap: "$2",
  },
});