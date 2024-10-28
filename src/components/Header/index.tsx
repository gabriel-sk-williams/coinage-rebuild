/* eslint-disable @next/next/no-img-element */
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

import { ConnectButton } from "../Actions";
//import { ConnectButton } from '@rainbow-me/rainbowkit';
import Logo from "../../assets/CoinageLogo.svg";
import { Button } from "../Actions";

// @ts-ignore
import { SocialIcon } from 'react-social-icons'
import { stringify } from 'querystring';
import Image from 'next/image'
import { useRouter } from "next/router";
import cx from "classnames";
import { NavItem } from './NavItem'
import { NavFAQ } from './NavFAQ'
import styles from '../../styles/Home.module.css';

import NextLink from "next/link";


export const Header = () => {

  /*
  const oldValue = useRef(0);
  const scrollDirection = useRef<null | "up" | "down">(null);
  const [trigger, setTrigger] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const router = useRouter();
  const showMobileMenu = false;
  */

  return (
    <header>
      <div className="max-w-[1200px] mx-auto flex flex-wrap p-4 px-6 pt-6 items-center gap-8 ">
        <NextLink href="https://www.coinage.media/">
          <Logo />
        </NextLink>

        <div className="hidden tab:flex mr-auto"> 
          <nav className="flex m-auto flex-col mb-10">
            {}
          </nav>
        </div>
        
        <div className="hidden tab:flex">
          <div className="flex gap-2 items-center justify-end">

            <NextLink href="https://app.unlock-protocol.com/checkout?id=a487f373-df67-4356-b750-a510e4822490">
              <Button modifier="secondary" className="">
                MINT
              </Button>
            </NextLink>

            {/*
            <div className="w-full max-w-[260px] m-auto mt-0 flex flex-col">
            <ConnectButton />
            </div>
            */}
          </div>
        </div>
      </div>
    </header>
  )
}