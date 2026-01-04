'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import BeggingContract from './BeggingContract';

const Navibar = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<div className='fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-50 to-white dark:from-purple-900 dark:to-gray-800 border-b border-purple-200 dark:border-purple-700/50'>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex justify-between items-start'>
					<div className='flex flex-col'>
						<Link href="/" className='text-2xl font-bold text-purple-700 dark:text-purple-300 mb-1 hover:underline'>我的博客</Link>
						<p className='text-sm text-purple-600 dark:text-purple-400'>分享关于 Web 开发、设计和技术的见解和教程</p>
					</div>
					<div className='flex items-center gap-3'>
						<button
							onClick={() => setShowModal(true)}
							className='px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors'
						>
							打赏
						</button>
						<ConnectButton />
					</div>
				</div>
			</div>

			{showModal && (
				<div className='fixed inset-0 z-[100] flex items-center justify-center p-4'>
					<div
						className='absolute inset-0 bg-black/50 backdrop-blur-sm'
						onClick={() => setShowModal(false)}
					></div>
					<div className='relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200'>
						<button
							onClick={() => setShowModal(false)}
							className='absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-white dark:bg-gray-800 rounded-full p-1'
						>
							<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
							</svg>
						</button>
						<BeggingContract />
					</div>
				</div>
			)}
		</div>
	);
};

export default Navibar;
