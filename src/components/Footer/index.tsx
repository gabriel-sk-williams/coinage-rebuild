import styles from "./Footer.module.css";
import NextImage from "next/image";
import { Link } from "../Actions";
import { SocialIconGroup } from "../SocialIconGroup/SocialIconGroup";

export const Footer: React.FC = () => {
  return (
    <div className="bg-coinage-offWhite">
      <div className="content-wrapper">
        <div className={styles.footerWrapper}>

          {/*// STAY UP TO DATE*/}

          <div className={styles.bottomWrapper}>

            <div
              className={`${styles.socialWrapper} tab:pt-[32px] mx-auto max-w-[90%] w-full pb-[15px] border-b-[1px] tab:border-none border-coinage-gray ml-[20px] flex flex-col tab:flex-row tab:ml-auto`}>
              
              <p className="mono2 text-coinage-gray mb-[15px] tab:flex tab:gap-[10px] tab:flex-row  tab:ml-auto mt-auto tab:mb-auto mr-[15px]">
                <Link
                  modifier="text"
                  href="/terms">
                  TERMS &amp; CONDITIONS
                </Link>{" "}
                <span className="hidden tab:flex">|</span>{" "}
              </p>


              <SocialIconGroup className="w-[200px]" />
            </div>
            
            <div className={`${styles.privacyWrapper} m-4`}>
              <p>From:</p>
              <div
                className={`${styles.trustlessWrapper} flex flex-col tab:flex-row`}>
                <div className="w-[170px] mr-[30px] ml-0 mb-[15px] tab:mb-0">
                  <a href="https://www.trustless.media">
                    <NextImage 
                      src="/trustlessLogo.png" 
                      alt="Coinage Media Trivia" 
                      width={496} 
                      height={89}
                    />
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
