import { Text, Spacer, Grid, Card, Row, Button, styled, Input, Dropdown, Loading, Col } from "@nextui-org/react"
import { useContext, useEffect, useState } from "react";
import { UserContext, Web3Context } from "../../context";
import { useDepositContract } from "../../hooks/useDeposit";
import { Box } from "../Box";
import BN from 'bn.js';

export const Content = () => {
  const {web3}  = useContext(Web3Context);
  const {approve ,deposit, owner, whitelistToken} = useDepositContract(web3);
  const [coinAmount, setCoinAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [depositAmount, setDespositAmount] = useState("0");
  const [sbt, setSbt] = useState(false);
  
  

  const {currentAddress, setCurrentAddress, isLogin, setIsLogin} = useContext(UserContext);
  // const [isLogin, setIsLogin] = useState(false);

  useEffect(()=> {
    if(web3){
      setIsLogin(true);
    }
  }, [isLogin])

  const connect = async () =>{
    if (!web3){
      return;
    }
    const accounts = await web3.eth.requestAccounts();
    const currentAccount = accounts[0];
    setIsLogin(true);
    setCurrentAddress(currentAddress);
    console.log(currentAccount);
  }

  const addWhite = async () =>{
    if (!web3){
      return;
    }

    const owneraddress = await owner();
    console.log(owneraddress);
    const whitelist = await whitelistToken('0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3');
    console.log(whitelist);
    //addWhitelistToken('0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee');
  }

  const onChange = (e:any) =>{
    const { name, value }  = e.target;
    setCoinAmount(value);
  }

  const onDeposit = async () => {
    if (!web3){
      return;
    }

    //0x159c57e38928f211D0db14dEbb8d2C2e96250766
    const accounts = await web3.eth.requestAccounts();
    const currentAccount = accounts[0];

    //const approveResponse = await approve("0x7A04c5660bBA30cfDf2F75Dacf42b69033b4b76a", "10", {from : currentAccount})
    //console.log(approveResponse);
    const depositResponse = await deposit("0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7", coinAmount,{
      from : currentAccount,
      gas : 500000
    }).on('transactionHash', (txHash: string) => {
      console.log(txHash);
      setIsLoading(true);
    }).catch((e:any)=>{
      console.log(e);
      console.log('dsfasdfdsafsd');
      setIsLoading(false);
      setDespositAmount(coinAmount);
      setSbt(true);
    });
    console.log(depositResponse);
  }
  
  return(
    <>
      <MainView>
          <CartContainer gap={0}>
            <Grid sm={12} md={12}>
              <Card css={{ mw: "900px", width: "500px" }}  variant="bordered">
                <Card.Header>
                  <Text b>Desposit</Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ py: "$10" }}>
                  <Grid.Container>
                    <Grid xs={9}>
                      <Input width="350px" underlined placeholder="0" onChange={onChange} />
                    </Grid>
                    <Grid xs={3}>
                    <Dropdown>
                      <Dropdown.Button flat>BUSD</Dropdown.Button>
                      <Dropdown.Menu aria-label="Static Actions">
                        <Dropdown.Item key="new">BUSD</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    </Grid>
                  </Grid.Container>
                  <Spacer/>
                  <Grid.Container>
                    <Grid xs={9}>
                        <Text h4>Deposited Asset Amount </Text>
                      </Grid>
                      <Grid xs={3}>
                        <Text h4 color="primary" weight="bold">{depositAmount}</Text>
                      </Grid>
                      <Grid xs={9}>
                        <Text h4>Estimated Fee </Text>
                      </Grid>
                      <Grid xs={3}>
                        <Text h4 color="primary" weight="bold">0.2</Text>
                      </Grid>
                  </Grid.Container>
                </Card.Body>
                <Card.Divider />
                <Card.Footer>
                  <Row justify="center">
                    {isLogin===true ? (
                    <>
                    { isLoading===true ? (<Button onClick={onDeposit} size="lg" color="secondary">
                      <Loading type="points" color="warning"></Loading>
                    </Button>) :(<Button onClick={onDeposit} size="lg" color="secondary">
                      Deposit
                    </Button>) }
                    </>
                    
                    ):(<Button disabled size="lg" color="secondary">
                      Deposit
                    </Button>)}
                  </Row>
                  {/* <Button onPress={addWhite} size="lg" color="secondary">
                      addWhitelist
                    </Button> */}
                </Card.Footer>
              </Card>
            </Grid>
        </CartContainer>
        <Spacer/>
        <Spacer/>
        {
          sbt===true ? (
            <Card css={{ w: "360px", h: "600px" }}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src="https://firebasestorage.googleapis.com/v0/b/wewereat.appspot.com/o/KakaoTalk_Photo_2022-12-19-01-47-46.png?alt=media&token=1b3718c3-2839-4980-9628-58b70fddd96b"
        objectFit="cover"
        width="100%"
        height="90%"
        alt="Relaxing app background"
      />
    </Card.Body>
    <Card.Footer
      isBlurred
      css={{
        position: "absolute",
        bgBlur: "#0f111466",
        borderTop: "$borderWeights$light solid $gray800",
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Row>
        <Col>
          <Row>
            <Col>
              <Text color="#d1d1d1" size={12}>
                UNSTABLE TREASURIES
              </Text>
              <Text color="#d1d1d1" weight={"bold"} size={15}>
                Deposited Asset Amount : {depositAmount}
              </Text>
            </Col>
          </Row>
        </Col>
        
      </Row>
    </Card.Footer>
  </Card>
          ):(
            <></>
          )
        }
        
  
      </MainView>
    </>      
)}

export const MainView = styled("div",{
  padding: "$10",
  width: "100%",
  height: "100%",
  textAlign: "center",
  flexDirection: "column",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop : "50px"
});

export const CartContainer = styled(Grid.Container, {
  flexDirection: "column",
  display: "flex",
  alignItems: "center"
})