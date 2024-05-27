"use client"
import React, { useEffect, useState } from 'react'
import CirclularProgress from '@mui/material/CircularProgress';
import CustomInput from '../components/customInput/customInput';
import { Close, Countertops, Email, EuroSymbol, Money, Numbers, Wallet } from '@mui/icons-material';

export default function Activities() {

    const [showForm, setShowForm] = useState(false);
    const [activity, setActivity] = useState('');

    return (
        <div className="flex h-screen flex-row overflow-scroll bg-[url('/images/bg.png')] w-full">


            <div className="w-10/12 md:w-5/12 items-center m-auto" >

                <div>
                    <div className='font-bold text-[24px] text-center mb-4'>
                        {!showForm ?
                            "What do you wish to do ?" : "Fill the form to get started"}</div>

                    {!showForm &&
                        <div className='flex flex-col gap-y-4 justify-center py-4'>
                            <button onClick={() => {
                                setShowForm(true)
                                setActivity('transfer_token')
                            }
                            } className='p-2 text-white  rounded-lg px-4 object-center hover:bg-red-500 bg-red-400'>Transfer Sol</button>

                            <button onClick={() => {
                                setShowForm(true)
                                setActivity('mint_token')
                            }
                            } className='p-2 text-white  rounded-lg px-4 object-center hover:bg-red-500 bg-red-400'>Mint a New Token</button>
                            <button
                                onClick={() => {
                                    setShowForm(true)
                                    setActivity('transfer_mint_tokens')
                                }
                                } className='p-2 text-white  rounded-lg px-4 object-center hover:bg-red-500 bg-red-400'>Transfer Minted Token</button>
                        </div>
                    }

                    {showForm &&
                        <>
                            {activity == 'mint_token' ?

                                <div className='bg-red-400/10 p-[20px] rounded-2xl '>
                                    <div className='justify-end flex flex-row'>
                                        <Close onClick={() => setShowForm(false)} className='cursor-pointer' />
                                    </div>
                                    <div className='mb-3'>
                                        <CustomInput
                                            addOnStart={<Email size={10} />}
                                            label={"Token Name"}
                                            placeholder={"Enter Token Name"}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <CustomInput
                                            addOnStart={<Countertops size={10} />}
                                            label={"Token Symbol"}
                                            placeholder={"Enter your preffered Token Symbol"}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <CustomInput
                                            addOnStart={<Numbers />}
                                            label={"Token Supply"}
                                            type="number"
                                            placeholder={"Enter total supply of token"}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <CustomInput
                                            addOnStart={<EuroSymbol />}
                                            label={"Token Icon"}
                                            placeholder={"Enter url to token icon"}
                                        />
                                    </div>

                                    <div className='mb-3'>
                                        <div className='flex flex-row justify-center py-4'>
                                            <button onClick={() => setShowForm(true)} className='p-2 md:w-5/12 text-white  rounded-3xl px-4 object-center hover:bg-red-500 bg-red-400'>Mint</button>
                                        </div>
                                    </div>
                                </div>
                                : activity == "transfer_token" ?
                                    <div className='bg-red-400/10 p-[20px] rounded-2xl '>
                                        <div className='justify-end flex flex-row'>
                                            <Close onClick={() => setShowForm(false)} className='cursor-pointer' />
                                        </div>
                                        <div className='mb-3'>
                                            <CustomInput
                                                addOnStart={<Money size={10} />}
                                                label={"Amount to Transfer"}
                                                type={"number"}
                                                placeholder={"Enter amount to transfer in sol"}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <CustomInput
                                                addOnStart={<Wallet size={10} />}
                                                label={"Recipient Wallet Address"}
                                                placeholder={"Enter recipient wallet address"}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <div className='flex flex-row justify-center py-4'>
                                                <button onClick={() => setShowForm(true)} className='p-2 md:w-5/12 text-white  rounded-lg px-4 object-center hover:bg-red-500 bg-red-400'>Send</button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className='bg-red-400/10 p-[20px] rounded-2xl '>
                                        <div className='justify-end flex flex-row'>
                                            <Close onClick={() => setShowForm(false)} className='cursor-pointer' />
                                        </div>
                                        <div className='mb-3'>
                                            <CustomInput
                                                addOnStart={<Money size={10} />}
                                                label={"Amount of Tokens to Transfer"}
                                                type={"number"}
                                                placeholder={"Enter amount to transfer in sol"}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <CustomInput
                                                addOnStart={<Wallet size={10} />}
                                                label={"Recipient Wallet Address"}
                                                placeholder={"Enter recipient wallet address"}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <div className='flex flex-row justify-center py-4'>
                                                <button onClick={() => setShowForm(true)} className='p-2 md:w-5/12 text-white  rounded-lg px-4 object-center hover:bg-red-500 bg-red-400'>Transfer Tokens</button>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </>

                    }

                </div>


            </div>
        </div>

    )
}
