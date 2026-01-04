'use client';
import React from 'react';

const Navibar = () => {
	return (
		<div className='fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-50 to-white dark:from-purple-900 dark:to-gray-800 border-b border-purple-200 dark:border-purple-700/50'>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex flex-col'>
					<h1 className='text-2xl font-bold text-purple-700 dark:text-purple-300 mb-1'>我的博客</h1>
					<p className='text-sm text-purple-600 dark:text-purple-400'>分享关于 Web 开发、设计和技术的见解和教程</p>
				</div>
			</div>
		</div>
	);
};

export default Navibar;
