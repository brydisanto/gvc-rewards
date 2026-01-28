import { NextResponse } from 'next/server';
import { createPublicClient, http, formatUnits, formatEther } from 'viem';
import { mainnet } from 'viem/chains';

export const dynamic = 'force-dynamic';

const WALLET_ADDRESS = '0x8f689e3c86e207cc1031a4b89d3073704042e5cc' as const;
const VIBESTR_CONTRACT = '0xd0cC2b0eFb168bFe1f94a948D8df70FA10257196' as const;
const PNKSTR_CONTRACT = '0xc50673EDb3A7b94E8CAD8a7d4E0cD68864E33eDF' as const;
const WETH_CONTRACT = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as const; // Wrapped ETH

const erc20Abi = [
    {
        name: 'balanceOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ name: '', type: 'uint256' }],
    },
    {
        name: 'decimals',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ name: '', type: 'uint8' }],
    },
] as const;

export async function GET() {
    try {
        const client = createPublicClient({
            chain: mainnet,
            transport: http('https://ethereum-rpc.publicnode.com'),
        });

        // Fetch all balances in parallel
        const [
            vibestrBalanceRaw,
            vibestrDecimals,
            pnkstrBalanceRaw,
            pnkstrDecimals,
            ethBalanceRaw,
            wethBalanceRaw,
        ] = await Promise.all([
            client.readContract({
                address: VIBESTR_CONTRACT,
                abi: erc20Abi,
                functionName: 'balanceOf',
                args: [WALLET_ADDRESS],
            }),
            client.readContract({
                address: VIBESTR_CONTRACT,
                abi: erc20Abi,
                functionName: 'decimals',
            }),
            client.readContract({
                address: PNKSTR_CONTRACT,
                abi: erc20Abi,
                functionName: 'balanceOf',
                args: [WALLET_ADDRESS],
            }),
            client.readContract({
                address: PNKSTR_CONTRACT,
                abi: erc20Abi,
                functionName: 'decimals',
            }),
            client.getBalance({ address: WALLET_ADDRESS }),
            client.readContract({
                address: WETH_CONTRACT,
                abi: erc20Abi,
                functionName: 'balanceOf',
                args: [WALLET_ADDRESS],
            }),
        ]);

        const vibestr = Number(formatUnits(vibestrBalanceRaw, vibestrDecimals));
        const pnkstr = Number(formatUnits(pnkstrBalanceRaw, pnkstrDecimals));
        const nativeEth = Number(formatEther(ethBalanceRaw));
        const weth = Number(formatEther(wethBalanceRaw)); // WETH has 18 decimals like ETH
        const eth = nativeEth + weth; // Combine ETH + WETH

        return NextResponse.json(
            { vibestr, pnkstr, eth },
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
                },
            }
        );
    } catch (error) {
        console.error('Error fetching wallet balances:', error);
        return NextResponse.json(
            { vibestr: 0, pnkstr: 0, eth: 0, error: 'Failed to fetch wallet balances' },
            { status: 500 }
        );
    }
}
