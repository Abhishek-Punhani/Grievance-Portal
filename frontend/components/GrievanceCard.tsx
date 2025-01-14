"use client";
import React, { useState, useEffect } from 'react';
import Badge from './Badge';

interface GrievanceCardProps {
    title: string;
    description: string;
    status: boolean;
    userImages?: string[];
    votes: number;
    adminImages?: string[];
    adminComments?: string[];
    tags?: string[];
}

function GrievanceCard(props: GrievanceCardProps) {
    const [votes, setVotes] = useState(props.votes);
    const [upVoted, setUpVoted] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [discriptionSmall, setDiscriptionSmall] = useState(props.description);

    const handleUpVoteClick = () => {
        // TODO: Send request to the backend API
        if (upVoted) {
            setUpVoted(false);
            setVotes(votes - 1);
        } else {
            setUpVoted(true);
            setVotes(votes + 1);
        }
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
            if (props.description.length > 350) {
                setDiscriptionSmall(props.description.substring(0, 490) + "...Read More");
            } else {
                setDiscriptionSmall(props.description + "...Read More");
            }
    }, [props.description]);
    
    return (
        <div className='w-full md:w-[80%] p-4'>
            <div className='flex flex-col bg-[#fcffdf] min-h-40 justify-between p-4 rounded-lg shadow-md shadow-[#864e82] border-2 border-solid border-[#643861]'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-5'>
                        <h1 className='font-semibold text-lg'>{props.title}</h1>
                        <p className='font-light'>{props.status ? '🟢 Resolved' : '🟡 Pending'}</p>
                    </div>
                    {expanded ? (
                        <div onClick={handleExpandClick} className='text-xl h-full mr-4 text-black hover:cursor-pointer font-extrabold'>
                            ↩
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
                {expanded ? (
                    <div className='items-center justify-center'>
                        <div className='mt-2 items-center'>
                            <div className='flex gap-2 flex-wrap items-center justify-center'>
                                {props.userImages?.map((image, index) => (
                                    <img key={index} src={image} alt="userImage" className='w-full md:w-80' />
                                ))}
                            </div>
                            <p className='mt-2'>{props.description}</p>
                            <hr className='mt-2 border-1 border-solid border-black' />
                            <h1 className='mt-2 font-semibold text-lg'>Responses</h1>
                            <div className='flex gap-2 flex-wrap items-center justify-center'>
                                {props.adminImages?.map((image, index) => (
                                    <img key={index} src={image} alt="adminImage" className='w-full md:w-80' />
                                ))}
                            </div>
                            {props.adminComments?.map((comment, index) => (
                                <p key={index} className='mt-2 ml-6'>Admin: {comment}</p>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='items-center flex flex-col md:flex-row'>
                        {props.userImages && props.userImages.length > 0 && (
                            <img src={props.userImages[0]} alt="userImage" className='w-full md:w-40 md:h-20 mt-2 md:mr-4' />
                        )}
                        <p className='text-sm text-gray-500 mt-2 md:mt-0 hover:cursor-pointer' onClick={handleExpandClick}>
                            {discriptionSmall}
                        </p>
                    </div>
                )}
                <div className='flex gap-2 items-center mt-2'>
                    {upVoted ? (
                        <p onClick={handleUpVoteClick} className='w-6 h-6'>
                            <img src="./upvoted.svg" alt="upvoted" />
                        </p>
                    ) : (
                        <p onClick={handleUpVoteClick} className='w-6 h-6'>
                            <img src="./default.svg" alt="default" />
                        </p>
                    )}
                    <p className='text-xl'>{votes}</p>
                    <div className='flex gap-2 flex-wrap'>
                        {props.tags?.map((tag, index) => (
                            <Badge key={index} tag={tag} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GrievanceCard;