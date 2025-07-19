import TwitterLogo from "../../assets/logos/twitterBlack.svg";
import InstagramLogo from "../../assets/logos/instagramBlack.svg";
import Discord from "../../assets/logos/discordBlack.svg";
import Youtube from "../../assets/logos/youtubeBlack.svg";

import { links } from "../../utils/links";

export const SocialIconGroup = ({ className = "" }) => {
  const height = 34;
  return (
    <div className={`flex gap-4 items-center ${className}`}>
      <a
        data-splitbee-event="Click Link: Twitter"
        href={links.twitter}
        target="_blank"
        rel="noreferrer">
        <TwitterLogo {...{ height }} />
      </a>
      <a
        data-splitbee-event="Click Link: Instagram"
        href={links.instagram}
        target={"_blank"}
        rel="noreferrer">
        <InstagramLogo {...{ height }} />
      </a>
      <a
        data-splitbee-event="Click Link: Discord"
        href={links.discord}
        target="_blank"
        rel="noreferrer">
        <Discord {...{ height }} />
      </a>
      <a
        data-splitbee-event="Click Link: Youtube"
        href={links.youtube}
        target="_blank"
        rel="noreferrer">
        <Youtube {...{ height }} />
      </a>
    </div>
  );
};
