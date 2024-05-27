"use client"
import React, { useEffect, useRef, useState } from 'react'
import CustomInput from '../components/customInput/customInput';
import { Close, Countertops, Email, EuroSymbol, Money, Numbers, Wallet, FolderCopy, NumbersSharp } from '@mui/icons-material';

import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { CircularProgress } from '@mui/material';


export const labels = {
    'change-wallet': 'Change wallet',
    connecting: 'Connecting ...',
    'copy-address': 'Copy address',
    copied: 'Copied',
    disconnect: 'Disconnect',
    'has-wallet': 'Connect to Wallet',
    'no-wallet': 'Connect to Wallet',
    connected: 'Click to Disconnect',
}
export default function Activities() {
    const { connection } = useConnection();

    const { sendTransaction, signTransaction, wallet } = useWallet();

    const [showForm, setShowForm] = useState(false);
    const [activity, setActivity] = useState('');

    const [connected, setConnected] = useState(false)


    const [visible, setVisible] = useState(false)
    const [visibleMod, setVisibleMod] = useState(false)
    const [loading, setLoading] = useState(false)
    const [walletAddress, setWalletAddress] = useState('')

    // Wallet button
    const { setVisible: setModalVisible } = useWalletModal();

    const { buttonState, onConnect, onDisconnect, publicKey, walletIcon, walletName } = useWalletMultiButton({
        onSelectWallet() {
            setModalVisible(true);
        },
    });
    const [copied, setCopied] = useState(false);

    const [amount, setAmount] = useState("");
    const [recipient, setReciepient] = useState("");


    //Token Variables

    const [tokenName, setTokenName] = useState("");
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [tokenSupply, setTokenSupply] = useState("");
    const [tokenIcon, setTokenIcon] = useState("");
    const [decimals, setDecimals] = useState(1)


    const ref = useRef(null);
    useEffect(() => {
        if (onConnect) {
            onConnect();
        }
        if (!publicKey) {
            setConnected(false);
        } else {
            setConnected(true);
            setWalletAddress(publicKey?.toBase58());
        }

    }, [publicKey, onConnect])
    function startConnection() {
        setVisible(!visible);
        switch (buttonState) {
            case 'no-wallet':
                setModalVisible(true);
                break;
            case 'has-wallet':
                if (onConnect) {
                    onConnect();
                    setVisible(!visible);
                }
                break;
            case 'connected':
                if (onDisconnect) {
                    onDisconnect();
                }
                break;
        }
    }
    function copyClip() {
        navigator.clipboard.writeText(walletAddress);
    }


    async function transferSol() {
        if (amount == "") {
            alert('enter a valid amount');
            return
        }
        if (recipient == "") {
            alert("Recipient can't be empty");
            return;
        }

        setLoading(true)

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: recipient,
                lamports: LAMPORTS_PER_SOL * amount,
            }),
        );
        transaction.feePayer = publicKey;
        let blockhashObj = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhashObj.blockhash;

        try {
            const signed = await signTransaction(transaction);
            if (signed) {
                let signature = await connection.sendRawTransaction(signed.serialize());
                // // Confirm whether the transaction went through or not
                try {
                    let confirmed = await connection.confirmTransaction(signature);

                    if (confirmed) {
                        setLoading(false)

                        alert('Transaction successful')
                    }
                } catch (e) {
                    setLoading(false)

                    alert('Transaction failed')
                }
            }
        } catch (e) {
            setLoading(false)

            alert('Transaction Rejected')
        }


    }


    async function mintNewToken() {
        if (tokenIcon == "" || tokenName == "" || tokenSupply == "" || tokenSymbol == "") {
            alert('One of these fields is empty');
            return
        }
        setLoading(true)

        async function createToken() {

            const tokenKeyPair = Keypair.generate();

            const tokenMintAddress = await createMint(
                connection,
                wallet,
                publicKey,
                publicKey,
                decimals,
                tokenKeyPair
            )

            console.log(tokenMintAddress);
        }

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: recipient,
                lamports: LAMPORTS_PER_SOL * amount,
            }),
        );
        transaction.feePayer = publicKey;
        let blockhashObj = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhashObj.blockhash;

        try {
            const signed = await signTransaction(transaction);
            if (signed) {
                let signature = await connection.sendRawTransaction(signed.serialize());
                // // Confirm whether the transaction went through or not
                try {
                    let confirmed = await connection.confirmTransaction(signature);

                    if (confirmed) {
                        setLoading(false)

                        alert('Transaction successful')
                    }
                } catch (e) {
                    setLoading(false)

                    alert('Transaction failed')
                }
            }
        } catch (e) {
            setLoading(false)

            alert('Transaction Rejected')
        }


    }
    return (
        <div onClick={() => setVisible(false)} className="flex h-screen flex-row overflow-scroll bg-[url('/images/bg.png')] w-full">


            <div className="w-10/12 md:w-5/12 items-center m-auto" >
                {buttonState == 'connected' && <p className="text-[14px] text-vivd-lime-green text-center ">
                    {`${walletAddress.slice(0, 7)}....${walletAddress.slice(-3, walletAddress.length)}`} <span onClick={copyClip} className=''><FolderCopy /></span>
                </p>}
                <div className="flex flex-row justify-center absolute top-0 items-center">
                    {visible &&
                        <span style={{ position: 'absolute', zIndex: 9999999, left: '100px' }}>
                            <ul
                                aria-label="dropdown-list"
                                className={`wallet-adapter-dropdown-list wallet-adapter-dropdown-list-active`}
                                ref={ref}
                                role="menu"
                            >
                                {publicKey ? (
                                    <li
                                        className="wallet-adapter-dropdown-list-item"
                                        onClick={async () => {
                                            await navigator.clipboard.writeText(publicKey.toBase58());
                                            setCopied(true);
                                            setTimeout(() => setCopied(false), 400);
                                        }}
                                        role="menuitem"
                                    >
                                        {copied ? labels['copied'] : labels['copy-address']}
                                    </li>
                                ) : null}
                                <li
                                    className="wallet-adapter-dropdown-list-item"
                                    onClick={() => {
                                        setModalVisible(true);
                                        setOpenSmall(false);
                                    }}
                                    role="menuitem"
                                >
                                    {labels['change-wallet']}
                                </li>
                                {onDisconnect ? (
                                    <li
                                        className="wallet-adapter-dropdown-list-item"
                                        onClick={() => {
                                            onDisconnect();
                                            setOpenSmall(false);
                                        }}
                                        role="menuitem"
                                    >
                                        {labels['disconnect']}
                                    </li>
                                ) : null}
                            </ul>
                        </span>
                    }

                    <button onClick={startConnection} className="bg-[#FF8A00] mt-10  w-full px-6 py-2 shadow-sm rounded-xl text-white">
                        {labels[buttonState]}
                    </button>

                </div>
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
                                            onChange={(e) => setTokenName(e.target.value)}
                                            placeholder={"Enter Token Name"}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <CustomInput
                                            addOnStart={<Countertops size={10} />}
                                            label={"Token Symbol"}
                                            onChange={(e) => setTokenSymbol(e.target.value)}
                                            placeholder={"Enter your preffered Token Symbol"}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <CustomInput
                                            addOnStart={<Numbers />}
                                            label={"Token Supply"}
                                            type="number"
                                            onChange={(e) => setTokenSupply(e.target.value)}
                                            placeholder={"Enter total supply of token"}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <CustomInput
                                            addOnStart={<EuroSymbol />}
                                            label={"Token Icon"}
                                            onChange={(e) => setTokenIcon(e.target.value)}
                                            placeholder={"Enter url to token icon"}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <CustomInput
                                            addOnStart={<NumbersSharp />}
                                            label={"Decimals"}
                                            onChange={(e) => setDecimals(e.target.value)}
                                            placeholder={"Enter Decimals default is 1"}
                                        />
                                    </div>


                                    <div className='mb-3'>
                                        <div className='flex flex-row justify-center py-4'>
                                            <button onClick={() => setShowForm(true)} className='p-2 md:w-5/12 text-white  rounded-3xl px-4 object-center hover:bg-red-500 bg-red-400'>{loading ? <CircularProgress size={12} color="inherit" /> : "Mint"}</button>
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
                                                onChange={(e) => setAmount(e.target.value)}
                                                type={"number"}
                                                placeholder={"Enter amount to transfer in sol"}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <CustomInput
                                                addOnStart={<Wallet size={10} />}
                                                onChange={(e) => setReciepient(e.target.value)}
                                                label={"Recipient Wallet Address"}
                                                placeholder={"Enter recipient wallet address"}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <div className='flex flex-row justify-center py-4'>
                                                <button onClick={() => { transferSol() }} className='p-2 md:w-5/12 text-white  rounded-lg px-4 object-center hover:bg-red-500 bg-red-400'>{loading ? <CircularProgress size={12} color="inherit" /> : "Send"}</button>
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
                                                <button onClick={() => setShowForm(true)} className='p-2 md:w-5/12 text-white  rounded-lg px-4 object-center hover:bg-red-500 bg-red-400'>{loading ? <CircularProgress size={12} color="inherit" /> : "Transfer Tokens"}</button>
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
