//import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';

import React, {useEffect, useState, useRef} from 'react';
import Logo from '../assets/CoinageLogo.svg';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
import Image from 'next/image';
import NextLink from 'next/link';
import { Link } from '../components/Actions';
import { Button, ConnectButton } from '../components/Actions';
import { RecordTable } from '../components/RecordTable';
import PageLoader from '../components/LoadingIndicators/PageLoader';
import { Footer } from '../components/Footer';

import {
  LitAbility,
  LitAccessControlConditionResource,
  createSiweMessage,
  generateAuthSig,
} from "@lit-protocol/auth-helpers";
import { LitNetwork } from "@lit-protocol/constants";
import * as LitJsSdk from '@lit-protocol/lit-node-client';
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { disconnectWeb3 } from '@lit-protocol/lit-node-client';
import * as ethers from "ethers";

import game from '../abi/game.json';
import * as CryptoJS from 'crypto-js'; // temp?

// noq 1009
// import keys from '../abi/coinage_keys.json';
// import pairs from '../abi/coinage_pairs.json';

// noq 99
import keys from '../abi/practice_keys.json';
import pairs from '../abi/local_pairs.json';

import cKeys from '../abi/coinage_keys.json';
import cPairs from '../abi/coinage_pairs.json';

import {useVercelRequest} from '../hooks/useVercel';
import {useKVRequest} from '../hooks/useKV';

import {useAccount} from 'wagmi';
import {EmailSignup} from '../components/EmailSignup';

//import { createWalletClient, parseEther } from 'viem';
//import { mainnet, goerli, sepolia } from 'viem/chains';
import { useWalletClient } from 'wagmi';
import { clientToSigner, useEthersSigner} from '../hooks/useEthers';

const Home: NextPage = () => {

  const [error, setError] = useState<string | null>(null);
  const [flagged, setFlagged] = useState<boolean>(false);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [outOfAttempts, setOutOfAttempts] = useState<boolean>(false);

  const [gameOver, setGameOver] = useState<boolean>(false); // set game on/off
  const [showMain, setShowMain] = useState<boolean>(true);
  const [loadingQuiz, setLoadingQuiz] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [scorePosted, setScorePosted] = useState<boolean>(false);
  const [rank, setRank] = useState<number | null>(null);

  const [countdown, setCountdown] = useState<number | null>(null);
  const [key, setKey] = useState(0); // resets clock
  const [question, setQuestion] = useState(game.initialQuestion);
  const [userAnswer, setUserAnswer] = useState<string>(''); // display answers

  const [index, setIndex] = useState<null | number>(null);
  const [record, setRecord] = useState<Array<boolean>>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [quizEnds, setQuizEnds] = useState<number>(new Date().getTime());
  const [userEntry, setUserEntry] = useState<string>('');

  const answer = useRef<string>(''); // holds encrypted correct answer
  // const authSignature = useRef<JsonAuthSig | undefined>(undefined);
  const log = useRef<Array<number>>([]); // holds generated indeces

  // HOOKS
  const {address, isConnected, isDisconnected} = useAccount(); // Rainbow Wallet
  const { data: walletClient } = useWalletClient({ chainId: game.chainId }) // wagmi
  const signer = walletClient ? clientToSigner(walletClient) : undefined; // custom

  const {loading, entries, postScore, getWallet } = useVercelRequest();
  const {attempts, getAttempts, increment, decrement } = useKVRequest(address || 'unknown');



const hasCoinageSuite = [
  {
      contractAddress: "0x4776DEFcF622c60C6419CCcc9eE9E9042fadf3F7",
      standardContractType: "ERC1155" as const,
      chain: "ethereum" as const,
      method: "balanceOfBatch",
      parameters: [
        ":userAddress,:userAddress,:userAddress",
        "1,2,3"
      ],
      returnValueTest: {
        "comparator": ">" as const,
        "value": "0" as const,
      },
  },
  { operator: "or" },
  {
      contractAddress: '0xe8B5C935764742cda69eb71b7F01Cf1c4e70b567',
      standardContractType: 'ERC721' as const,
      chain: 'base' as const,
      method: 'balanceOf',
      parameters: [
          ":userAddress"
      ],
      returnValueTest: {
          comparator: '>' as const,
          value: '0' as const
      }
  }
];

  async function authenticate(
    address: `0x${string}` | undefined,
    signer: ethers.ethers.JsonRpcSigner | undefined
  ) {

    //authSignature.current = undefined;
    setError(null);

    const encryptedWallet = await getWallet();

    const ethersWallet = await ethers.Wallet.fromEncryptedJson(encryptedWallet, "nurbs")

    if (address && signer && ethersWallet) {
      try {

        const litNodeClient = new LitNodeClient({
          litNetwork: LitNetwork.DatilTest, // DatilDev
          debug: false,
          // checkNodeAttestation: true,
        });

        await litNodeClient.connect();
        console.log("✅ Connected LitNodeClient to Lit network");
        console.log("🔄 Getting Session Sigs via an Auth Sig...");

        const { capacityDelegationAuthSig } =
          await litNodeClient.createCapacityDelegationAuthSig({
            uses: '1',
            dAppOwnerWallet: ethersWallet,
            capacityTokenId: "956", // TODO: update August 18
            delegateeAddresses: [address],
          });

        if ( capacityDelegationAuthSig ) console.log("authorized user", capacityDelegationAuthSig);
        // const expiration = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();

        const sessionSigs = await litNodeClient.getSessionSigs({
          chain: "ethereum",
          expiration: new Date(Date.now() + 1000 * 60 * 10 ).toISOString(), // 10 minutes
          resourceAbilityRequests: [
            {
              resource: new LitAccessControlConditionResource("*"),
              ability: LitAbility.AccessControlConditionDecryption,
            },
          ],
          authNeededCallback: async ({
            uri,
            expiration,
            resourceAbilityRequests,
          }) => {
            const toSign = await createSiweMessage({
              uri,
              expiration,
              resources: resourceAbilityRequests,
              statement: 'Please sign for access to the Coinage Trivia Challenge!',
              walletAddress: await signer.getAddress(),
              nonce: await litNodeClient.getLatestBlockhash(),
              litNodeClient,
            });
    
            return await generateAuthSig({
              signer: signer,
              toSign,
            });
          },
          capacityDelegationAuthSig,
        });

        const [q] = cPairs.trivia[0];
        const [kq] = cKeys.trivia[0];

        const result = await LitJsSdk.decryptToString({
          accessControlConditions: hasCoinageSuite,
          chain: game.chain,
          ciphertext: q,
          dataToEncryptHash: kq,
          sessionSigs,
        }, litNodeClient);

        if (!result) {
          // flag and kick
          setFlagged(true);
          console.log('You do NOT have a Coinage NFT');
        } else {
          setFlagged(false);
          setAuthorized(true);
        }

        console.log("✅ Got Session Sigs via an Auth Sig");

      } catch (error) {
        console.error(error);
      } finally {
        disconnectWeb3();
      }
    }
  }

  const startQuiz = async () => {
    if (address && authorized) {
      // await client.connect(); // TODO: Lit Protocol
      increment(address.toString());
      setShowMain(false);
      setLoadingQuiz(true);
      await getQuestion(true);
    }
  };

  const getQuestion = async (init: boolean) => {

    const genIndex = (noq: number): number => {
      const ndx = Math.floor(Math.random() * noq);
      return log.current.includes(ndx) ? genIndex(noq) : ndx;
    };

    if (log.current.length === game.noq) return endQuiz('All questions exhausted.');

    const chosen = genIndex(game.noq);
    const [q, a] = pairs.trivia[chosen];
    const [kq, ka] = keys.trivia[chosen];
    setIndex(chosen);

    const dq = await decryptString(q, kq);
    if (dq) {
      setQuestion(dq);
      if (init) activate();
    }

    // will happen on checkAnswer (asynchronously)
    const da = await decryptString(a, ka);
    if (da) answer.current = da.trim().toLowerCase();
  };

  const activate = () => {
    setRank(null);
    setScorePosted(false);
    setCountdown(3);
  };

  const handleSubmit = async (evt: any) => {
    evt.preventDefault();
    const result = checkAnswer();
    const newRecord = record;
    newRecord.push(result);
    setRecord([...newRecord]);

    const correctAnswers = newRecord.filter((result) => result).length;
    setCorrectAnswers(correctAnswers);

    setUserAnswer('');
    if (active) getQuestion(false);
  };

  const checkAnswer = () => {
    const level = userAnswer.trim().toLowerCase();
    return level.length ? level === answer.current : false;
  };

  const decryptString = async (eString: string, eKey: string) => {
    // TODO: lit protocol
    try {

      /*
      const result = await LitJsSdk.decryptToString({
        accessControlConditions: hasEth,
        chain: game.chain,
        ciphertext: eString,
        dataToEncryptHash: eKey,
        sessionSigs,
      }, client);
      */

      const decryptedString = CryptoJS.AES.decrypt(eString, 'gigas').toString(CryptoJS.enc.Utf8);
      const obj = JSON.parse(decryptedString)

      if (obj.question) return obj.question
      if (obj.answer) return obj.answer
      //return obj.question

    } catch (error) {
      console.log('Decryption error:', error);
      return false;
    }
  };

  const endQuiz = async (reason: string) => {
    let message = reason === 'All questions exhausted.' ? reason : '';
    setQuestion(message);
    setUserAnswer('');
    setActive(false);
    setIsLoadingResults(true);
    setShowResults(true);
  };

  const gotoLeaderboard = () => {
    if (showMain) setShowMain(false);
    if (showResults) setShowResults(false);
    setShowLeaderboard(true);
  };

  // reset from Leaderboard or Results
  const resetQuiz = () => {
    if (showResults) setShowResults(false);
    if (showLeaderboard) setShowLeaderboard(false);
    setShowMain(true);
    setQuestion(game.initialQuestion);
    setUserAnswer('');
    setRecord([]);
    log.current = [];
  };

  const setUserRank = () => {
    if (userEntry.length && entries && entries !== null && Array.isArray(entries)) {
      let {address, score, timestamp} = JSON.parse(userEntry);

      let index = entries.findIndex((element) => element.address === address && element.score === score && element.timestamp === timestamp);

      setRank(index+1)
    }
  }

  //
  // useEffect() Hooks
  //

  /*
  // automatically get signature after wallet connect and authorize
  useEffect(() => {
    if (!authSignature.current && isConnected && provider) {
      generateAuthSig(provider, address);
    }
  }, [isConnected, provider]); // eslint-disable-line react-hooks/exhaustive-deps
  */

  // limits attempts
  useEffect(() => {
    if (attempts > 4) setOutOfAttempts(true);
  }, [attempts]); 

  // updates results when score is posted
  useEffect(() => {

    // getResults after game is over
    
    if (entries) {
      let stamped = entries.map(entry => ({
        address: entry.address,
        score: entry.score,
        timestamp: convertTimestamp(entry.timestamp)
      }));
      console.log(stamped);
    }
    
    setIsLoadingResults(loading);
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  // updates rank and leaderboard when entries are loaded
  useEffect(() => {
    setIsLoadingLeaderboard(loading);
    if (!loading && entries && userEntry) setUserRank();
  }, [entries, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  // gets remaining attempts when wallet is connected
  useEffect(() => {
    if (address) getAttempts(address.toString());
  }, [address]); // eslint-disable-line react-hooks/exhaustive-deps

  // endQuiz -> setShowResults(true) -> setUserEntry() -> postScore()
  useEffect(() => {
    const currentEntry = {
      address: address ? address.toString() : 'unknown',
      score: correctAnswers,
      timestamp: quizEnds.toString(),
    };
    setUserEntry(JSON.stringify(currentEntry));

    if (address && showResults && !scorePosted) {
      console.log(currentEntry)
      postScore(currentEntry);
      setScorePosted(true);
    }
  }, [showResults]); // eslint-disable-line react-hooks/exhaustive-deps

  // adds index of latest questin to log
  useEffect(() => {
    if (index !== null && !log.current.includes(index)) {
      const newLog = log.current;
      newLog.push(index);
      log.current = newLog;
    }
  }, [log, index]);

  // checks for quizEnd every second
  useEffect(() => {
    const updateTimer = setInterval(() => {
      var now = new Date().getTime();

      if (now < quizEnds) {
        console.log("tick");
      } else if (active && now > quizEnds) {
        clearInterval(updateTimer);
        endQuiz("Time's up!");
      }
    }, 1000);

    return () => {
      clearInterval(updateTimer);
      // disconnectWeb3(); // TODO: lit protocol
    };

  }, [quizEnds, active]); // eslint-disable-line react-hooks/exhaustive-deps

  // Updates countdown at loadingQuiz page
  useEffect(() => {
    const updateCountdown = setInterval(() => {

      if (countdown === null) return;

      if (countdown !== null) {
        if (countdown > 0) {
          setCountdown( prevState => prevState !== null ? prevState-1 : null);
        } else {
          setCountdown(null);
          setLoadingQuiz(false);
          setActive(true);
          setUserAnswer('');
          const currentTime = new Date().getTime();
          const endTime = currentTime + (game.duration*1000);
          setQuizEnds(endTime);
          setKey((prevKey) => prevKey + 1); // resets/starts clock
        }
      }

    }, 1000);

    return () => {
      clearInterval(updateCountdown)
    };

  }, [countdown]) // eslint-disable-line react-hooks/exhaustive-deps

  // Clear auth sig if wallet is disconnected
  useEffect(() => {
    if (isDisconnected) {
      // disconnectWeb3(); // TODO: lit protocol
      setAuthorized(false);
      // authSignature.current = undefined;
    }
  }, [isDisconnected]);

  const displayInfoText = () => {
    const mintText = flagged ? 'subhead3 text-coinage-red py-2' : 'subhead3 text-coinage-gray py-2';

    const number = 5 - attempts;
    const finalCount = `You have ${number} attempts remaining to get the highest score.`;

    return (
      gameOver ? (
        <div>
          <div className="flex-col items-center">
          <p className="subhead1 text-coinage-orange py-2 mt-4 mb-2">
          {`Thanks for playing Coinage Trivia ${game.name}!`}
          </p>
          <p className="subhead3 text-coinage-gray py-2 mb-6">
            {`The winner was wallet {0xaF7dda...} with a score of 20.`} <br/>
            {'Game 3 will launch in the near future, open to anyone with a crypto wallet.'}<br/>
            {'See you soon!'}
          </p>
          </div>
        </div>
      ) : !address ? (
        <div>
          <p className="subhead3 text-coinage-gray py-2 mt-4 mb-2">
            {'Connect your wallet to get started.'}
          </p>
          <ConnectButton />
        </div>
      ) : !authorized ? (
        <p className={mintText}>
          {'You will need a Coinage membership pass in your wallet to play.'} <br />
          {"Don't have one? "}
          <NextLink className="text-coinage-blue" href="https://www.coinage.media/about#mint">
            {'Mint now.'}
          </NextLink>
        </p>
      ) : outOfAttempts ? (
        <p className="subhead3 text-coinage-gray py-2">
          {'You are out of remaining attempts.'} <br />
          {'Mint a new Coinage NFT to another wallet or wait until next week!'}
        </p>
      ) : (
        <p className="subhead3 text-coinage-gray py-2">
          {'You are ready to rock!'} <br />
          {finalCount}
        </p>
      )
    );
  };

  const displayCountdown = () => {
    return countdown === 0 ? 'START' : countdown;
  }
  
  const displayRules = () => {
    return (
        <p className="body2 text-coinage-blue pt-16">
          {'One word only. Last names only. Not case sensitive.'} <br />
          {'Press "Return" if you don\'t know an answer.'}
        </p>
    );
  }

  const displayQuestion = (q: string) => {
    return <p className="subhead1 text-coinage-blue mb-2 mt-1">{q.replace('&apos;', "'")}</p>;
  };

  const displayScore = () => {
    return (
      <div className="flex flex-col items-center text-center justify-between">
        <p className="display2 text-coinage-orange mb-1 mt-1">SCORE: {correctAnswers}</p>
      </div>
    );
  };

  const displayResult = () => {
    if (userEntry.length && entries && entries !== null && Array.isArray(entries)) {
      let {address, score, timestamp} = JSON.parse(userEntry);

      let index = entries.findIndex((element) => element.address === address && element.score === score && element.timestamp === timestamp);

      let rank = index + 1;
      let lastDigit = rank % 10;
      let suffix = rank === 11 ? 'th' : rank === 12 ? 'th' : rank === 13 ? 'th' : lastDigit === 1 ? 'st' : lastDigit === 2 ? 'nd' : lastDigit === 3 ? 'rd' : 'th';

      //const display = `Congratulations — you placed ${place}${suffix}.`;
      const display = `RANK: ${rank}${suffix}`;


      let sub = rank-3;
      let start = sub < 0 ? 0 : sub;
      let end = rank+2;

      return rank > 0 ? (
        <div>
          <p className="subhead1 text-coinage-blue mb-2 mt-1">
            {display}
          </p>
          <table className="table-fixed">
            <thead className="">
              <tr>
                <th className={'subhead3 text-coinage-orange'}>Rank</th>
                <th className={'subhead3 text-coinage-orange'}>Address</th>
                <th className={'subhead3 text-coinage-orange'}>Score</th>
                <th className={'subhead3 text-coinage-orange'}>Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y-2">
              {entries.slice(start, end).map((entry, index) => resultRow(entry, index+start))}
            </tbody>
          </table>
        </div>
      ) : (
        <div/>
      )
    } else {
      // console.log('entry', entry, entries);
      return <p className="subhead1 text-coinage-blue mb-2 mt-1">{'Failed to get results'}</p>;
    }
  };

  const convertTimestamp = (ts: string) => {
    const date = new Date(parseInt(ts));

    // Sunday = 0, Monday = 1, ... (See below):
    const di = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    let day = di === 0 ? "Sun" 
      : di === 1 ? "Mon"
      : di === 2 ? "Tue"
      : di === 3 ? "Wed"
      : di === 4 ? "Thur"
      : di === 5 ? "Fri"
      : di === 6 ? "Sat"
      : "";

    let hour = hours < 10 ? `0${hours}`: hours;
    let minute = minutes < 10 ? `0${minutes}`: minutes;
    let second = seconds < 10 ? `0${seconds}`: seconds;

    let time = `${hour}:${minute}:${second}`;
    let disp = `${time} ${day}`;

    return disp;
  }

  const displayUserRank = () => {
    const rankClass = 'mono2 subhead3 text-coinage-orange px-12';
    let {address, score, timestamp} = JSON.parse(userEntry);

    let disp = convertTimestamp(timestamp);

    return rank && userEntry && rank > 10 ? (
      <tr className="h-8">
        <td className={rankClass}>{rank}</td>
        <td className={rankClass}>{address.slice(0, 8)}</td>
        <td className={rankClass}>{score}</td>
        <td className={rankClass}>{disp}</td>
      </tr>
    ) : (<tr/>)
  }

  const resultRow = (entry: any, index: number) => {

    const rowClass = address && entry.timestamp === quizEnds.toString()
      ? 'mono2 subhead3 text-coinage-orange px-12'
      : 'mono2 subhead3 text-coinage-gray px-12';

    // let disp = convertTimestamp(entry.timestamp)

    return (
      <tr key={index} className="h-8">
        <td className={rowClass}>{index + 1}</td>
        <td className={rowClass}>{entry.address.slice(0, 8)}</td>
        <td className={rowClass}>{entry.score}</td>
        <td className={rowClass}>{entry.timestamp}</td>
      </tr>
    );
  };

  const row = (entry: any, index: number) => {

    const rowClass = address && entry.address === address
      ? 'mono2 subhead3 text-coinage-orange px-12'
      : 'mono2 subhead3 text-coinage-blue px-12';

    let disp = convertTimestamp(entry.timestamp)

    return (
      <tr key={index} className="h-8">
        <td className={rowClass}>{index + 1}</td>
        <td className={rowClass}>{entry.address.slice(0, 8)}</td>
        <td className={rowClass}>{entry.score}</td>
        <td className={rowClass}>{disp}</td>
      </tr>
    );
  };

  return (
    <div className={"flex flex-col h-screen justify-between"}>
      <Head>
        <title>Coinage Trivia</title>
        <meta name="web3 trivia" content="Coinage Media" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header>
        <div className="max-w-[1200px] mx-auto flex flex-wrap p-4 px-6 pt-6 items-center justify-between gap-8 ">
          <NextLink href="https://www.coinage.media/">
            <Logo />
          </NextLink>

          <div className="hidden tab:flex mr-auto w-128"/>

          <div className={"hidden tab:flex flex-row"}>
            <div className="flex gap-2 justify-end">
              {/*"flex gap-2 items-center justify-end"*/}
                <Link
                  className={""} ///*tab:!max-w-none tab:!w-auto*/
                  modifier={flagged ? 'flagged' : 'secondary'}
                  href="https://www.coinage.media/about#mint">
                  {"MINT"}
                </Link>

              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center justify-between">
        {showMain ? (
          <>
            <div className="justify-between items-center">
              <p className="display3 text-center text-coinage-blue mb-2 mt-1">
                {'WELCOME TO'}
                <br />
                {'THE COINAGE TRIVIA CHALLENGE!'}
              </p>
            </div>
            <Image src="/Hero.png" alt="Coinage Media Trivia" width={400} height={400} />
            <div className="w-10/12 flex flex-col items-center text-center justify-between">
              {displayInfoText()}
              {/* Either show the play button or prompt user to connect the wallet */}
              { gameOver ? (
                <div className="flex flex-col items-center text-center justify-between">
                <Button modifier="secondary" onClick={() => gotoLeaderboard()}>
                  RESULTS
                </Button>
                <p className="w-7/12 subhead3 text-center text-coinage-gray pt-16">
                  {'Sign up for email updates to be notified of your final place, prizes, and future games:'}
                </p>
                  <EmailSignup title="" />
              </div>

              ) : isConnected && !authorized ? (
                <div className="pt-4">
                  <Button modifier="primary" onClick={() => authenticate(address, signer)}>
                    AUTHENTICATE
                  </Button>
                </div>
              ) : isConnected && authorized && outOfAttempts ? (
                <div className="pt-4">
                  <Button modifier="secondary" onClick={gotoLeaderboard}>
                    LEADERBOARD
                  </Button>
                </div>
              ) : isConnected && authorized && !outOfAttempts ? (
                <>
                  <div className="pt-4">
                    <Button modifier="primary" onClick={startQuiz}>
                      PLAY
                    </Button>
                  </div>
                  <div className="pt-4">
                    <Button modifier="secondary" onClick={gotoLeaderboard}>
                      LEADERBOARD
                    </Button>
                  </div>
                </>
              ) : (
                <div />
              )}
            </div>
          </>
        ) : loadingQuiz ? (
            <div className="justify-between text-center items-center pt-16">
              <p className="display3 text-center text-coinage-blue mb-2 mt-1">{'GAME LOADING...'}</p>
              <p className="subhead1 text-center text-coinage-gray mb-2 mt-1">{'(get your keyboard ready)'}</p>
              <p className="display1 text-center text-coinage-orange mb-2 mt-1">{displayCountdown()}</p>
              {displayRules()}
            </div>
        ) : active ? (
          <>
            <CountdownCircleTimer
              key={key}
              isPlaying={active}
              duration={game.duration}
              colors={['#03329C', '#388697', '#FF4517', '#540505']}
              colorsTime={[120, 30, 10, 0]}
              strokeWidth={10} //12
              size={180}
              onComplete={() => {
                [true, 1000];
              }}
            >
              {({remainingTime}) => remainingTime}
            </CountdownCircleTimer>
            <RecordTable record={record} />

            <div className="w-10/12 flex flex-col items-center text-center justify-between">
              {displayQuestion(question)}
              <form onSubmit={handleSubmit}>
                <input autoFocus className="focus:outline-none bg-transparent text-center subhead1 text-coinage-orange mb-2 mt-1" placeholder="Just Start Typing..." value={userAnswer} onChange={(evt) => setUserAnswer(evt.target.value)}></input>
              </form>
              {/* {displayInput(userAnswer)} */}
            </div>
            <div className="w-5/12 flex flex-col items-center text-center justify-between">
            {displayRules()}
            </div>
          </>
        ) : showResults ? (
          <div className="justify-between pt-16"> {/*items-center */}
            <p className="subhead1 text-center text-coinage-blue mt-1">{"Time's up!"}</p>
            {displayScore()}

            {isLoadingResults ? (
              <p className="subhead1 text-center text-coinage-gray mb-2 mt-1">{'Loading results...'}</p>
            ) : (
              <div className="flex flex-col text-center items-center justify-between">
                {displayResult()}
                <div className="pt-4">
                  <Button modifier="primary" onClick={resetQuiz}>
                    PLAY AGAIN
                  </Button>
                </div>
                <div className="pt-4">
                  <Button modifier="secondary" onClick={gotoLeaderboard}>
                    LEADERBOARD
                  </Button>
                </div>
                <p className="w-7/12 subhead3 text-center text-coinage-gray pt-16">
                  {'Sign up for email updates to be notified of your final place, prizes, and future games.'}
                </p>
                <EmailSignup title="" />
              </div>
            )}

          </div>
        ) : showLeaderboard ? (
          <>
            <Image src="/Leaderboard_Image.png" alt="Coinage Media Trivia" width={500} height={100} />
            <div className="py-6">
              <p className="subhead3 text-center text-coinage-orange mb-2 mt-1">
                Practice Game Final Results
              </p>

              <table className="table-fixed">
                <thead className="">
                  <tr>
                    <th className={'subhead3 text-coinage-orange'}>Rank</th>
                    <th className={'subhead3 text-coinage-orange'}>Address</th>
                    <th className={'subhead3 text-coinage-orange'}>Score</th>
                    <th className={'subhead3 text-coinage-orange'}>Timestamp</th>
                  </tr>
                </thead>
                {entries && entries !== null && Array.isArray(entries) ? (
                  <tbody className="divide-y-2">
                    {/*utt.map((entry, index) => resultRow(entry, index))*/}
                    {entries.slice(0, 10).map((entry, index) => row(entry, index))}
                    {displayUserRank()}
                  </tbody>
                ) : (
                  <tbody className="divide-y-2">
                    <tr>
                      <td className="px-12"></td>
                      <td className="px-12"></td>
                      <td className="px-12"></td>
                      <td className="px-12"></td>
                    </tr>
                  </tbody>
                )}
              </table>

              {isLoadingLeaderboard ? (
                <div className="justify-between items-center">
                  <PageLoader />
                </div>
              ) : (
                <div />
              )}
            </div>

            {outOfAttempts ? (
              <div className="flex flex-col items-center text-center justify-between">
                <div className="pt-4">
                  <Button modifier="secondary" onClick={resetQuiz}>
                    TRIVIA HOME
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center justify-between">
                <div className="pt-4">
                  <Button modifier="secondary" onClick={resetQuiz}>
                    TRIVIA HOME
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
