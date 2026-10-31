"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import {
  connectBackpack,
  connectMetaMask,
  disconnectBackpack,
  getBackpackProvider,
  getMetaMaskProvider,
  initialWalletState,
  signInWithBackpack,
  signInWithMetaMask,
  truncateAddress,
  type WalletId,
  type WalletState,
} from "@/lib/wallets";

interface WalletContextValue {
  metamask: WalletState;
  backpack: WalletState;
  connect: (wallet: WalletId) => Promise<void>;
  disconnect: (wallet: WalletId) => void;
  activeWallet: WalletId | null;
}

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [metamask, setMetamask] = useState<WalletState>(initialWalletState);
  const [backpack, setBackpack] = useState<WalletState>(initialWalletState);
  const metamaskAddressRef = useRef<string | null>(null);

  const connect = useCallback(async (wallet: WalletId) => {
    const setState = wallet === "metamask" ? setMetamask : setBackpack;
    setState((prev) => ({ ...prev, status: "connecting", error: null }));

    try {
      if (wallet === "metamask") {
        const { address, chainId } = await connectMetaMask();
        setState({ status: "connected", address, chainId, error: null });
        setState((prev) => ({ ...prev, status: "signing" }));
        try {
          await signInWithMetaMask(address);
          setState({ status: "signed-in", address, chainId, error: null });
          toast.success(`Signed in with MetaMask as ${truncateAddress(address)}`);
        } catch {
          // Connected, but the user declined the signature — still a valid connected state.
          setState({ status: "connected", address, chainId, error: null });
          toast.message("Connected, but sign-in message was not signed.");
        }
      } else {
        const { address } = await connectBackpack();
        setState({ status: "connected", address, chainId: null, error: null });
        setState((prev) => ({ ...prev, status: "signing" }));
        try {
          await signInWithBackpack(address);
          setState({ status: "signed-in", address, chainId: null, error: null });
          toast.success(`Signed in with Backpack as ${truncateAddress(address)}`);
        } catch {
          setState({ status: "connected", address, chainId: null, error: null });
          toast.message("Connected, but sign-in message was not signed.");
        }
      }
    } catch (err) {
      const message =
        err instanceof Error && err.message === "not-installed"
          ? "not-installed"
          : err instanceof Error && /rejected|denied/i.test(err.message)
            ? "Connection request was rejected."
            : "Something went wrong while connecting.";
      setState({ ...initialWalletState, status: "error", error: message });
      if (message !== "not-installed") toast.error(message);
    }
  }, []);

  const disconnect = useCallback((wallet: WalletId) => {
    if (wallet === "metamask") {
      setMetamask(initialWalletState);
    } else {
      void disconnectBackpack();
      setBackpack(initialWalletState);
    }
  }, []);

  useEffect(() => {
    metamaskAddressRef.current = metamask.address;
  }, [metamask.address]);

  useEffect(() => {
    const provider = getMetaMaskProvider();
    if (!provider) return;

    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      if (!accounts?.length) {
        setMetamask(initialWalletState);
      } else if (accounts[0] !== metamaskAddressRef.current) {
        setMetamask((prev) => ({ ...prev, address: accounts[0], status: "connected" }));
      }
    };
    const handleChainChanged = (...args: unknown[]) => {
      const chainId = args[0] as string;
      setMetamask((prev) => (prev.address ? { ...prev, chainId } : prev));
    };

    provider.on("accountsChanged", handleAccountsChanged);
    provider.on("chainChanged", handleChainChanged);
    return () => {
      provider.removeListener("accountsChanged", handleAccountsChanged);
      provider.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  useEffect(() => {
    const provider = getBackpackProvider();
    if (!provider) return;

    const handleDisconnect = () => setBackpack(initialWalletState);
    provider.on("disconnect", handleDisconnect);
    return () => {
      provider.removeListener?.("disconnect", handleDisconnect);
    };
  }, []);

  const activeWallet: WalletId | null = metamask.address
    ? "metamask"
    : backpack.address
      ? "backpack"
      : null;

  const value = useMemo(
    () => ({ metamask, backpack, connect, disconnect, activeWallet }),
    [metamask, backpack, connect, disconnect, activeWallet]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within a WalletProvider");
  return ctx;
}
