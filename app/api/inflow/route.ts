import { NextResponse } from 'next/server';
import { formatEther } from 'viem';

export const dynamic = 'force-dynamic';

const WALLET_ADDRESS = '0x8f689e3c86e207cc1031a4b89d3073704042e5cc';
const ETHERSCAN_API_KEY = 'GUCQAVTRPYUSTUXFBE7IVZS118C729HBU5';

export async function GET() {
    try {
        const now = Math.floor(Date.now() / 1000);
        const yesterday = now - (24 * 60 * 60);

        // V2 Endpoints
        const normalTxUrl = `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=${WALLET_ADDRESS}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
        const internalTxUrl = `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlistinternal&address=${WALLET_ADDRESS}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

        const [normalRes, internalRes] = await Promise.all([
            fetch(normalTxUrl).then(res => res.json()),
            fetch(internalTxUrl).then(res => res.json())
        ]);

        let totalWei = 0n;

        // Process Normal Txs
        if (normalRes.status === '1' && Array.isArray(normalRes.result)) {
            for (const tx of normalRes.result) {
                if (parseInt(tx.timeStamp) < yesterday) break; // Optimization: sorted desc, stop once we hit old txs

                // Check if incoming, successful, and not error
                if (
                    tx.to.toLowerCase() === WALLET_ADDRESS.toLowerCase() &&
                    tx.isError === '0' &&
                    tx.txreceipt_status === '1'
                ) {
                    totalWei += BigInt(tx.value);
                }
            }
        }

        // Process Internal Txs
        if (internalRes.status === '1' && Array.isArray(internalRes.result)) {
            for (const tx of internalRes.result) {
                if (parseInt(tx.timeStamp) < yesterday) break;

                // Check if incoming and successful (internal txs usually don't have isError in the same way, but check just in case)
                if (
                    tx.to.toLowerCase() === WALLET_ADDRESS.toLowerCase() &&
                    tx.isError === '0'
                ) {
                    totalWei += BigInt(tx.value);
                }
            }
        }

        const totalEth = Number(formatEther(totalWei));

        return NextResponse.json({
            inflow24h: totalEth
        });

    } catch (error) {
        console.error('Error fetching inflow data:', error);
        return NextResponse.json({ inflow24h: 0, error: 'Failed to fetch inflow' }, { status: 500 });
    }
}
