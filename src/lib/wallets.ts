export type WalletId = "metamask" | "backpack";

export type WalletStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "signing"
  | "signed-in"
  | "error";

export interface WalletState {
  status: WalletStatus;
  address: string | null;
  chainId: string | null;
  error: string | null;
}

export const initialWalletState: WalletState = {
  status: "idle",
  address: null,
  chainId: null,
  error: null,
};

export function truncateAddress(address: string, chars = 4): string {
  if (address.length <= chars * 2 + 2) return address;
  return `${address.slice(0, chars + 2)}…${address.slice(-chars)}`;
}

interface Eip1193Provider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
  providers?: Eip1193Provider[];
}

interface BackpackProvider {
  isBackpack?: boolean;
  publicKey?: { toString: () => string } | null;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  signMessage: (
    message: Uint8Array,
    encoding?: string
  ) => Promise<{ signature: Uint8Array } | Uint8Array>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
    backpack?: BackpackProvider;
  }
}

export function getMetaMaskProvider(): Eip1193Provider | null {
  if (typeof window === "undefined") return null;
  const eth = window.ethereum;
  if (!eth) return null;
  if (Array.isArray(eth.providers) && eth.providers.length > 0) {
    return eth.providers.find((p) => p.isMetaMask) ?? null;
  }
  return eth.isMetaMask ? eth : null;
}

export function getBackpackProvider(): BackpackProvider | null {
  if (typeof window === "undefined") return null;
  return window.backpack?.isBackpack ? window.backpack : null;
}

export function isMetaMaskInstalled(): boolean {
  return getMetaMaskProvider() !== null;
}

export function isBackpackInstalled(): boolean {
  return getBackpackProvider() !== null;
}

const SIGN_IN_MESSAGE = (address: string) =>
  `Sign in to Slipway Deploy\n\nWallet: ${address}\nIssued: ${new Date().toISOString()}\n\nThis request will not trigger a blockchain transaction or cost any gas fees.`;

export async function connectMetaMask(): Promise<{ address: string; chainId: string }> {
  const provider = getMetaMaskProvider();
  if (!provider) {
    throw new Error("not-installed");
  }
  const accounts = (await provider.request({
    method: "eth_requestAccounts",
  })) as string[];
  if (!accounts?.length) throw new Error("no-accounts");
  const chainId = (await provider.request({ method: "eth_chainId" })) as string;
  return { address: accounts[0], chainId };
}

export async function signInWithMetaMask(address: string): Promise<string> {
  const provider = getMetaMaskProvider();
  if (!provider) throw new Error("not-installed");
  const message = SIGN_IN_MESSAGE(address);
  const signature = (await provider.request({
    method: "personal_sign",
    params: [message, address],
  })) as string;
  return signature;
}

export async function connectBackpack(): Promise<{ address: string }> {
  const provider = getBackpackProvider();
  if (!provider) {
    throw new Error("not-installed");
  }
  const resp = await provider.connect();
  const address = resp.publicKey.toString();
  return { address };
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function signInWithBackpack(address: string): Promise<string> {
  const provider = getBackpackProvider();
  if (!provider) throw new Error("not-installed");
  const message = SIGN_IN_MESSAGE(address);
  const encoded = new TextEncoder().encode(message);
  const result = await provider.signMessage(encoded, "utf8");
  const signatureBytes = result instanceof Uint8Array ? result : result.signature;
  return bytesToHex(signatureBytes);
}

export async function disconnectBackpack(): Promise<void> {
  const provider = getBackpackProvider();
  await provider?.disconnect();
}

export const WALLET_INSTALL_URLS: Record<WalletId, string> = {
  metamask: "https://metamask.io/download/",
  backpack: "https://backpack.app/download",
};

export const WALLET_LABELS: Record<WalletId, string> = {
  metamask: "MetaMask",
  backpack: "Backpack",
};
