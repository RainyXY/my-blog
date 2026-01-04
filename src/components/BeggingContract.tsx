'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { beggingContractABI, BEGGING_CONTRACT_ADDRESS } from '@/contract/beggingContract';
import { parseEther, formatEther } from 'viem';

export default function BeggingContract() {
	const { address, isConnected } = useAccount();
	const [donationAmount, setDonationAmount] = useState('');

	const { data: contractBalance, refetch: refetchBalance } = useReadContract({
		address: BEGGING_CONTRACT_ADDRESS,
		abi: beggingContractABI,
		functionName: 'getContractBalance',
	});

	const { data: myDonation, refetch: refetchMyDonation } = useReadContract({
		address: BEGGING_CONTRACT_ADDRESS,
		abi: beggingContractABI,
		functionName: 'getDonation',
		args: address ? [address] : undefined,
		query: {
			enabled: !!address,
		},
	});

	const { data: owner } = useReadContract({
		address: BEGGING_CONTRACT_ADDRESS,
		abi: beggingContractABI,
		functionName: 'owner',
	});

	const { writeContract, data: hash, isPending: isWritePending } = useWriteContract();

	const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
		hash,
	});

	const handleDonate = () => {
		if (!donationAmount || parseFloat(donationAmount) <= 0) {
			alert('请输入有效的打赏金额');
			return;
		}

		writeContract({
			address: BEGGING_CONTRACT_ADDRESS,
			abi: beggingContractABI,
			functionName: 'donate',
			value: parseEther(donationAmount),
		});
	};

	const handleWithdraw = () => {
		writeContract({
			address: BEGGING_CONTRACT_ADDRESS,
			abi: beggingContractABI,
			functionName: 'withdraw',
		});
	};

	const isOwner = address === owner;

	return (
		<div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
			<div className="space-y-6">
				<div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
					<p className="text-sm text-purple-600 dark:text-purple-400 mb-2">合约地址</p>
					<p className="text-xs font-mono text-gray-700 dark:text-gray-300 break-all">{BEGGING_CONTRACT_ADDRESS}</p>
				</div>

				{!isConnected ? (
					<p className="text-center text-gray-600 dark:text-gray-400 py-8">请连接钱包以使用合约功能</p>
				) : (
					<>
						<div className="grid grid-cols-2 gap-4">
							<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
								<p className="text-sm text-green-600 dark:text-green-400 mb-1">合约余额</p>
								<p className="text-2xl font-bold text-green-700 dark:text-green-300">
									{contractBalance ? `${formatEther(contractBalance)} ETH` : '0 ETH'}
								</p>
							</div>
							<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
								<p className="text-sm text-blue-600 dark:text-blue-400 mb-1">我的打赏</p>
								<p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
									{myDonation ? `${formatEther(myDonation)} ETH` : '0 ETH'}
								</p>
							</div>
						</div>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									打赏金额 (ETH)
								</label>
								<div className="flex gap-2">
									<input
										type="number"
										step="0.001"
										min="0"
										value={donationAmount}
										onChange={(e) => setDonationAmount(e.target.value)}
										className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
										placeholder="输入打赏金额"
									/>
									<button
										onClick={handleDonate}
										disabled={isWritePending || isConfirming}
										className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{isWritePending || isConfirming ? '处理中...' : '打赏'}
									</button>
								</div>
							</div>

							{isOwner && (
								<div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
									<p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">您是合约所有者</p>
									<button
										onClick={handleWithdraw}
										disabled={isWritePending || isConfirming || !contractBalance || contractBalance === BigInt(0)}
										className="w-full px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{isWritePending || isConfirming ? '处理中...' : '提取所有资金'}
									</button>
								</div>
							)}
						</div>

						{hash && (
							<div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">交易哈希</p>
								<p className="text-xs font-mono text-gray-700 dark:text-gray-300 break-all">{hash}</p>
								{isConfirmed && (
									<p className="text-sm text-green-600 dark:text-green-400 mt-2">✓ 交易已确认</p>
								)}
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
