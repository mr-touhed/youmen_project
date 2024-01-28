import React from 'react';

const Loading = () => {
    return (
        <div className='bg-black w-full h-screen flex justify-center loading'>
           
            <svg viewBox='-20 0 400 160' >

                    
                    <text x="52%" y="26%" dy=".32em" textAnchor='middle' className='text-body'>
                        You
                    </text>
                    <text x="55%" y="65%" dy=".35em" textAnchor='middle' className='text-body'>
                        Man
                    </text>
                           
                    <path d="M 375.019 181.731 Q 385.344 165.433 395.669 181.731 L 448.768 265.55 Q 459.093 281.848 438.443 281.848 L 332.245 281.848 Q 311.595 281.848 321.92 265.55 Z" className="polygon"  bx:shape="triangle 311.595 165.433 147.498 116.415 0.5 0.14 1@51c47e97"></path>


            </svg>
        </div>
    );
};

export default Loading;