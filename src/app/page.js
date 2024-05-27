"use client"
import React, { useEffect, useState } from 'react'
import Activities from '../components/activities';
import WalletContextUser from '../app/context/walletContext';

export default function Home() {
    return (
        <WalletContextUser>
            <Activities />
        </WalletContextUser>

    )
}
