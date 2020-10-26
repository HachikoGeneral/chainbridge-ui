import { createStyles, ITheme, makeStyles } from "@imploy/common-themes";
import React from "react";
import clsx from "clsx";
import { Typography } from "@imploy/common-components";
import { shortenAddress } from "../Utils/Helpers";
import { useWeb3 } from "@chainsafe/web3-context";

const useStyles = makeStyles(({ constants, palette }: ITheme) => {
  return createStyles({
    root: {
      display: "flex",
      position: "fixed",
      justifyContent: "space-between",
      padding: `${constants.generalUnit * 2}px ${constants.generalUnit * 4}px`,
      width: "100%",
      top: 0,
      left: 0,
      borderBottom: `1px solid ${palette.additional["gray"][6]}`,
      color: palette.additional["gray"][8],
      alignItems: "center",
    },
    state: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    indicator: {
      display: "block",
      height: 10,
      width: 10,
      borderRadius: "50%",
      backgroundColor: palette.additional["green"][6],
      marginRight: constants.generalUnit,
    },
    address: {
      marginRight: constants.generalUnit,
    },
    network: {},
  });
});

interface IAppHeader {}

const AppHeader: React.FC<IAppHeader> = () => {
  const classes = useStyles();
  const { isReady, address, network } = useWeb3();
  return (
    <header className={clsx(classes.root)}>
      <Typography variant="h4">ChainBridge Token Swap</Typography>
      <section className={classes.state}>
        {!isReady ? (
          <Typography variant="h5">No wallet connected</Typography>
        ) : (
          <>
            <div className={classes.indicator}></div>
            <Typography variant="h5" className={classes.address}>
              {address && shortenAddress(address)}
            </Typography>
            <Typography variant="h5" className={classes.address}>
              connected to <strong>{network}</strong>
            </Typography>
          </>
        )}
      </section>
    </header>
  );
};

export default AppHeader;