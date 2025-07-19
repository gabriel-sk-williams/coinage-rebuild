import type {NextPage} from 'next';
import NextImage from 'next/image';
import {Button} from '../components/Actions';
import NextLink from 'next/link';
import { Footer } from '../components/Footer';

const Terms: NextPage = () => {
  return (
    <>
      <div className="roadmap-header flex h-[80vh] tab:h-[66vh] bg-coinage-purple relative overflow-hidden">
        <div className=" flex mt-[60px] tab:mt-auto mb-auto z-1 relative mx-[auto] max-w-[1200px] w-full px-4">
          <h1 className=" display1 text-coinage-white max-w-[720px]">Terms &amp; Conditions.</h1>
        </div>
      </div>

      <div className="bg-coinage-offWhite pt-20 pb-10">
        <p className="body2 body-width ml-auto mr-auto mb-[30px] ">This contest is sponsored by Trustless Media Inc. (&apos;Sponsor&apos;). By participating in the contest, each entrant agrees to abide by these official rules, including all eligibility requirements, and understands that the results of the contest, as determined by Sponsor and its agents, are final in all respects. This contest is subject to all federal, state, and local laws and regulations and is void where prohibited by law. This contest is in no way sponsored, endorsed, or administered by, or associated with, any third party platform where the contest might be promoted.</p>
        <p className="body2 body-width ml-auto mr-auto mb-[30px] ">Entrants must hold a Coinage membership pass to participate. A membership pass may be purchased at any time during the contest. Entrants must participate in the game as intended by the Sponsor. Entrants may not aid their performance by any technological means or otherwise manipulate the results. If the Sponsor suspects cheating or other inappropriate behavior, it reserves the right to void any results.</p>
        <p className="body2 body-width ml-auto mr-auto mb-[30px] ">Users compete to answer the most trivia questions correct in the allotted time. The user with the highest score on the leaderboard at the end of the game wins 0.2 ETH. Runner ups are the remaining wallets on the list of the top 5 and will win 0.08, respectively. All prizes will be airdropped to the wallets used to participate in the contest. Prizes are non-transferable, and no substitution or cash equivalent of prizes is permitted. Sponsor and its respective parent, affiliate and subsidiary companies, advisors, agents, and representatives are not responsible for any errors in the offer or administration of the contest, including, but not limited to, errors in any printing or posting or these official rules, the selection and announcement of any winner, or the distribution of any prize. Any attempt to damage the content or operation of this contest is unlawful and subject to possible legal action by Sponsor.</p>
        <p className="body2 body-width ml-auto mr-auto mb-[px]">By entering the contest, you agree to release Sponsor, and its officers, directors, advisors, employees and agents from any and all liability whatsoever for any injuries, losses, or damages of any kind due to participation in the Contest or acceptance, possession, use, or misuse of any prize. Sponsor reserves the right to change the rules of the contest in any way at any time.</p>
      </div>

      <div className="flex flex-col items-center text-center justify-between">
        <NextLink href="/">
          <Button modifier="secondary">
            BACK
          </Button>
        </NextLink>
      </div>

      <div className="bg-coinage-offWhite pt-20" />
      <Footer />
    </>
  );
};

export default Terms;
