import { styled } from "@nextui-org/react";
import { HTMLAttributes } from "react";
import { Content } from "../Content";


export const Layout = ({
  children
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <Box
      css={{
        maxW: "100%"
      }}
    >
      {children}
      <Content />
    </Box>);
}



const Box =  styled("div", {
  boxSizing: "border-box",
});

