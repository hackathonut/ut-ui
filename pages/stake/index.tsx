import { Button, Link, Navbar, Text } from "@nextui-org/react";
import { NextPage } from "next";
import { Layout } from "../../components/Layout";


const Stake: NextPage = () =>{
    return(
        <Layout>
        <Navbar isBordered variant={"static"} maxWidth={"xl"}>
          <Navbar.Brand>
            <Text b color="inherit" hideIn="xg">
              UNSTABLE TREASURIES
            </Text>
          </Navbar.Brand>
          <Navbar.Content  activeColor={"primary"} variant={"underline-rounded"} hideIn="xs">
            <Navbar.Link href="/">Dashboard</Navbar.Link>
            <Navbar.Link isActive href="/stake">Stake</Navbar.Link>
            <Navbar.Link href="/xfarm">X-Farm</Navbar.Link>
          </Navbar.Content>
          <Navbar.Content>
            <Navbar.Item>
              <Button auto flat as={Link} href="#">
                Connect Wallet
              </Button>
            </Navbar.Item>
          </Navbar.Content>
        </Navbar>
    </Layout>
    )
}

export default Stake;